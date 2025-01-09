import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { DunAndBradstreetService } from '@ukef/helper-modules/dun-and-bradstreet/dun-and-bradstreet.service';
import { GetCustomersInformaticaQueryDto } from '@ukef/modules/informatica/dto/get-customers-informatica-query.dto';
import { InformaticaService } from '@ukef/modules/informatica/informatica.service';
import { SalesforceService } from '@ukef/modules/salesforce/salesforce.service';
import { Response } from 'express';

import { CreateUkefIdDto } from '../numbers/dto/create-ukef-id.dto';
import { UkefId } from '../numbers/entities/ukef-id.entity';
import { NumbersService } from '../numbers/numbers.service';
import { CreateCustomerSalesforceResponseDto } from '../salesforce/dto/create-customer-salesforce-response.dto';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { DTFSCustomerDto } from './dto/dtfs-customer.dto';
import { GetCustomersResponse, GetCustomersResponseItem } from './dto/get-customers-response.dto';
import { GetCustomersSalesforceResponse } from './dto/get-customers-salesforce-response.dto';

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
        return await this.handleInformaticaResponse(existingCustomersInInformatica, res, DTFSCustomerDto);
      } else {
        throw new InternalServerErrorException();
      }
    } catch (error) {
      if (error instanceof NotFoundException) {
        await this.handleInformaticaCustomerNotFound(res, DTFSCustomerDto);
      } else {
        throw error;
      }
    }
  }

  private async handleInformaticaResponse(existingCustomersInInformatica, res, DTFSCustomerDto): Promise<GetCustomersResponse> {
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
      await this.createCustomerWithLegacyUrn(existingCustomersInInformatica, res, DTFSCustomerDto);
    }
  }

  private async createCustomerWithLegacyUrn(existingCustomersInInformatica, res, DTFSCustomerDto) {
    let dunsNumber: string = null;
    dunsNumber = await this.dunAndBradstreetService.getDunAndBradstreetNumberByRegistrationNumber(DTFSCustomerDto.companyRegistrationNumber);
    const [{ partyUrn }] = existingCustomersInInformatica;
    const isLegacyRecord = true;
    const createdCustomer = await this.createCustomerByURNAndDUNS(DTFSCustomerDto, partyUrn, dunsNumber, isLegacyRecord);
    res.status(201).json(createdCustomer);
    return;
  }

  private async handleInformaticaCustomerNotFound(res, DTFSCustomerDto) {
    const createUkefIdDto: CreateUkefIdDto[] = [
      {
        numberTypeId: 2,
        createdBy: 'DTFS Automated Customer Creation User',
        requestingSystem: 'MDM',
      },
    ];
    // TODO: replace this with a call to Salesforce's NUMGEN table once that's in place
    let dunsNumber: string = null;
    dunsNumber = await this.dunAndBradstreetService.getDunAndBradstreetNumberByRegistrationNumber(DTFSCustomerDto.companyRegistrationNumber);
    let partyUrn: string = null;
    try {
      const numbersServiceResponse: UkefId[] = await this.numbersService.create(createUkefIdDto);
      partyUrn = numbersServiceResponse[0].maskedId;
    } catch {}
    const isLegacyRecord = false;
    const createdCustomer = await this.createCustomerByURNAndDUNS(DTFSCustomerDto, partyUrn, dunsNumber, isLegacyRecord);
    res.status(201).json(createdCustomer);
    return;
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
  }
}
