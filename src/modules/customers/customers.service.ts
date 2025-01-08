import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { DunAndBradstreetService } from '@ukef/helper-modules/dun-and-bradstreet/dun-and-bradstreet.service';
import { GetCustomersInformaticaQueryDto } from '@ukef/modules/informatica/dto/get-customers-informatica-query.dto';
import { InformaticaService } from '@ukef/modules/informatica/informatica.service';
import { SalesforceService } from '@ukef/modules/salesforce/salesforce.service';
import { Response } from 'express';

import { GetCustomersResponse, GetCustomersResponseItem } from './dto/get-customers-response.dto';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { DTFSCustomerDto } from './dto/dtfs-customer.dto';
import { CreateCustomerSalesforceResponseDto } from '../salesforce/dto/create-customer-salesforce-response.dto';
import { GetCustomersSalesforceResponse } from './dto/get-customers-salesforce-response.dto';
import { NumbersService } from '../numbers/numbers.service';
import { CreateUkefIdDto } from '../numbers/dto/create-ukef-id.dto';
import { UkefId } from '../numbers/entities/ukef-id.entity';

@Injectable()
export class CustomersService {
  constructor(
    private readonly informaticaService: InformaticaService,
    private readonly salesforceService: SalesforceService,
    private readonly numbersService: NumbersService,
    private readonly dunAndBradstreetService: DunAndBradstreetService,
  ) {}

  async getCustomers(backendQuery: GetCustomersInformaticaQueryDto): Promise<GetCustomersResponse> {
    const customersInInformatica = await this.informaticaService.getCustomers(backendQuery);
    return customersInInformatica.map(
      (customerInInformatica): GetCustomersResponseItem => ({
        partyUrn: customerInInformatica.partyUrn,
        name: customerInInformatica.name,
        sfId: customerInInformatica.sfId,
        companyRegNo: customerInInformatica.companyRegNo,
        type: customerInInformatica.type,
        subtype: customerInInformatica.subtype,
        isLegacyRecord: customerInInformatica.isLegacyRecord,
      }),
    );
  }

  async getDunAndBradstreetNumber(registrationNumber: string): Promise<string> {
    return await this.dunAndBradstreetService.getDunAndBradstreetNumberByRegistrationNumber(registrationNumber);
  }

  async getOrCreateCustomer(res: Response, DTFSCustomerDto: DTFSCustomerDto): Promise<GetCustomersResponse> {
    const backendQuery: GetCustomersInformaticaQueryDto = {
      companyreg: DTFSCustomerDto.companyRegistrationNumber,
    };

    try {
      const existingCustomersInInformatica = await this.informaticaService.getCustomers(backendQuery);
      if (existingCustomersInInformatica?.[0]) {
        if (existingCustomersInInformatica[0]?.isLegacyRecord === false) {
          res.status(200).json(
            existingCustomersInInformatica.map(
              (customerInInformatica): GetCustomersResponseItem => ({
                partyUrn: customerInInformatica.partyUrn,
                name: customerInInformatica.name,
                sfId: customerInInformatica.sfId,
                companyRegNo: customerInInformatica.companyRegNo,
                type: customerInInformatica.type,
                subtype: customerInInformatica.subtype,
                isLegacyRecord: customerInInformatica.isLegacyRecord,
              }),
            ),
          );
          return;
        } else if (existingCustomersInInformatica[0]?.isLegacyRecord === true && existingCustomersInInformatica[0]?.partyUrn) {
          let dunsNumber: string = null;
          try {
            dunsNumber = await this.dunAndBradstreetService.getDunAndBradstreetNumberByRegistrationNumber(DTFSCustomerDto.companyRegistrationNumber);
          } catch (error) {
            throw error;
          }
          try {
            const partyUrn = existingCustomersInInformatica[0].partyUrn;
            const isLegacyRecord = true;
            const createdCustomer = await this.createCustomerByURNAndDUNS(DTFSCustomerDto, partyUrn, dunsNumber, isLegacyRecord);
            res.status(201).json(createdCustomer);
            return;
          } catch (error) {
            throw error;
          }
        }
      } else {
        throw new InternalServerErrorException();
      }
    } catch (error) {
      if (error instanceof NotFoundException) {
        const createUkefIdDto: CreateUkefIdDto[] = [
          {
            numberTypeId: 2,
            createdBy: 'DTFS Automated Customer Creation User',
            requestingSystem: 'MDM',
          },
        ];
        // TODO: replace this with a call to Salesforce's NUMGEN table once that's in place
        let dunsNumber: string = null;
        try {
          dunsNumber = await this.dunAndBradstreetService.getDunAndBradstreetNumberByRegistrationNumber(DTFSCustomerDto.companyRegistrationNumber);
        } catch (error) {
          throw error;
        }
        let partyUrn: string = null;
        try {
          const numbersServiceResponse: UkefId[] = await this.numbersService.create(createUkefIdDto);
          partyUrn = numbersServiceResponse[0].maskedId;
        } catch (error) {}
        try {
          const isLegacyRecord = false;
          const createdCustomer = await this.createCustomerByURNAndDUNS(DTFSCustomerDto, partyUrn, dunsNumber, isLegacyRecord);
          res.status(201).json(createdCustomer);
          return;
        } catch (error) {
          throw error;
        }
      } else {
        throw error;
      }
    }
  }

  private async createCustomerByURNAndDUNS(
    DTFSCustomerDto: DTFSCustomerDto,
    partyUrn: string,
    dunsNumber: string,
    isLegacyRecord: boolean,
  ): Promise<GetCustomersResponse> {
    const createCustomerDto: CreateCustomerDto = {
      Name: DTFSCustomerDto.companyName,
      Party_URN__c: partyUrn,
      D_B_Number__c: dunsNumber,
      Company_Registration_Number__c: DTFSCustomerDto.companyRegistrationNumber,
    };
    try {
      const createCustomerResponse: CreateCustomerSalesforceResponseDto = await this.salesforceService.createCustomer(createCustomerDto);
      const createdCustomerResponse: GetCustomersSalesforceResponse = [
        {
          partyUrn: partyUrn,
          name: DTFSCustomerDto.companyName,
          sfId: createCustomerResponse?.success ? createCustomerResponse.id : null,
          companyRegNo: DTFSCustomerDto.companyRegistrationNumber,
        },
      ];
      return createdCustomerResponse.map(
        (createdCustomer): GetCustomersResponseItem => ({
          partyUrn: createdCustomer.partyUrn,
          name: createdCustomer.name,
          sfId: createdCustomer.sfId,
          companyRegNo: createdCustomer.companyRegNo,
          type: null,
          subtype: null,
          isLegacyRecord: isLegacyRecord,
        }),
      );
    } catch (error) {
      throw error;
    }
  }
}
