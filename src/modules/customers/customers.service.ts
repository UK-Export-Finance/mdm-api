import { Injectable, NotFoundException } from '@nestjs/common';
import { GetCustomersInformaticaQueryDto } from '@ukef/modules/informatica/dto/get-customers-informatica-query.dto';
import { InformaticaService } from '@ukef/modules/informatica/informatica.service';
import { SalesforceService } from '@ukef/modules/salesforce/salesforce.service';

import { GetCustomersResponse, GetCustomersResponseItem } from './dto/get-customers-response.dto';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { DTFSCustomerDto } from './dto/dtfs-customer.dto';
import { CreateCustomerSalesforceResponseDto } from '../salesforce/dto/create-customer-salesforce-response.dto';
import { GetCustomersSalesforceResponse } from './dto/get-customers-salesforce-response.dto';
import { NumbersService } from '../numbers/numbers.service';
import { CreateUkefIdDto } from '../numbers/dto/create-ukef-id.dto';
import { UkefId } from '../numbers/entities/ukef-id.entity';
import { DunAndBradstreetService } from '@ukef/helper-modules/dun-and-bradstreet/dun-and-bradstreet.service';

@Injectable()
export class CustomersService {
  constructor(
    private readonly informaticaService: InformaticaService,
    private readonly salesforceService: SalesforceService,
    private readonly numbersService: NumbersService,
    private readonly dunAndBradstreetService: DunAndBradstreetService,
  ) { }

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

  async getOrCreateCustomer(DTFSCustomerDto: DTFSCustomerDto): Promise<GetCustomersResponse> {
    const backendQuery: GetCustomersInformaticaQueryDto = {
      companyreg: DTFSCustomerDto.companyRegistrationNumber
    }

    try {
      const existingCustomersInInformatica = await this.informaticaService.getCustomers(backendQuery);
      if (existingCustomersInInformatica?.[0]) {
        // if (existingCustomersInInformatica[0]?.isLegacyRecord === false) {
        return existingCustomersInInformatica.map(
          (customerInInformatica): GetCustomersResponseItem => ({
            partyUrn: customerInInformatica.partyUrn,
            name: customerInInformatica.name,
            sfId: customerInInformatica.sfId,
            companyRegNo: customerInInformatica.companyRegNo,
            type: customerInInformatica.type,
            subtype: customerInInformatica.subtype,
            isLegacyRecord: customerInInformatica.isLegacyRecord,
          })
        );
        // } else {
        //   if (existingCustomersInInformatica[0]?.isLegacyRecord === true && existingCustomersInInformatica[0]?.partyUrn) {
        //     try {
        //       const partyUrn = existingCustomersInInformatica[0].partyUrn
        //       this.createCustomerByURN(DTFSCustomerDto, partyUrn)
        //     } catch (error) { }
        //   }
        // }
      }
    } catch (error) {
      if (error instanceof NotFoundException) {
        const createUkefIdDto: CreateUkefIdDto[] = [{
          numberTypeId: 2,
          createdBy: "DTFS Automated Customer Creation User",
          requestingSystem: "MDM"
        }]
        // TODO: replace this with a call to Salesforce's NUMGEN table once that's in place (or just remove altogether if SF can generate a PartyURN on creation quickly enough to be returned in the subsqeuent GET)
        try {
          const numbersServiceResponse: UkefId[] = await this.numbersService.create(createUkefIdDto)
          const partyUrn = numbersServiceResponse[0].maskedId
          const createdCustomerResponse = await this.createCustomerByURN(DTFSCustomerDto, partyUrn)
          return createdCustomerResponse.map(
            (createdCustomer): GetCustomersResponseItem => ({
              partyUrn: createdCustomer.partyUrn,
              name: createdCustomer.name,
              sfId: createdCustomer.sfId,
              companyRegNo: createdCustomer.companyRegNo,
              type: null,
              subtype: null,
              isLegacyRecord: false,
            })
          )
        } catch (error) { }
      }
    }
  }

  private async createCustomerByURN(DTFSCustomerDto: DTFSCustomerDto, partyUrn: string): Promise<GetCustomersSalesforceResponse> {
    let dunsNumber: string = null
    try {
      dunsNumber = await this.dunAndBradstreetService.getDunAndBradstreetNumberByRegistrationNumber(DTFSCustomerDto.companyRegistrationNumber)
    } catch (error) { }

    const createCustomerDto: CreateCustomerDto = {
      "Name": DTFSCustomerDto.companyName,
      "Party_URN__c": partyUrn,
      "D_B_Number__c": dunsNumber,
      "Company_Registration_Number__c": DTFSCustomerDto.companyRegistrationNumber,
    }

    const createCustomerResponse: CreateCustomerSalesforceResponseDto = await this.salesforceService.createCustomer(createCustomerDto)

    const createdCustomerResponse: GetCustomersSalesforceResponse = [{
      "partyUrn": partyUrn,
      "name": DTFSCustomerDto.companyName,
      "sfId": createCustomerResponse?.success ? createCustomerResponse.id : null,
      "companyRegNo": DTFSCustomerDto.companyRegistrationNumber,
    }]
    return createdCustomerResponse
  }
}
