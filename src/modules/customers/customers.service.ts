import { Injectable } from '@nestjs/common';
import { GetCustomersInformaticaQueryDto } from '@ukef/modules/informatica/dto/get-customers-informatica-query.dto';
import { InformaticaService } from '@ukef/modules/informatica/informatica.service';
import { SalesforceService } from '@ukef/modules/salesforce/salesforce.service';

import { GetCustomersResponse, GetCustomersResponseItem } from './dto/get-customers-response.dto';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { DTFSCustomerDto } from './dto/dtfs-customer.dto';
import { CreateCustomerSalesforceResponseDto } from '../salesforce/dto/create-customer-salesforce-response.dto';
import { GetCustomersSalesforceResponse, GetCustomersSalesforceResponseItem } from './dto/get-customers-salesforce-response.dto';
import { CompanyRegistrationNumberDto } from './dto/company-registration-number.dto';
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

  async getCustomersSalesforce(companyRegistrationNumberDto: CompanyRegistrationNumberDto): Promise<GetCustomersSalesforceResponse> {
    const customersInSalesforce = await this.salesforceService.getCustomers(companyRegistrationNumberDto);
    return customersInSalesforce.map(
      (customerInSalesforce): GetCustomersSalesforceResponseItem => ({
        partyUrn: customerInSalesforce.Party_URN__c,
        name: customerInSalesforce.Name,
        sfId: customerInSalesforce.Id,
        companyRegNo: customerInSalesforce.Company_Registration_Number__c
      })
    )
  }

  async createCustomer(DTFSCustomerDto: DTFSCustomerDto): Promise<GetCustomersSalesforceResponse> {
    // TODO: replace this with a call to Salesforce's NUMGEN table once that's in place (or just remove altogether if SF can generate a PartyURN on creation quickly enough to be returned in the subsqeuent GET)
    const createUkefIdDto: CreateUkefIdDto[] = [{
      numberTypeId: 2,
      createdBy: "DTFS Automated Customer Creation User",
      requestingSystem: "MDM"
    }]
    let partyUrn: string = null
    try {
      const numbersServiceResponse: UkefId[] = await this.numbersService.create(createUkefIdDto)
      partyUrn = numbersServiceResponse[0].maskedId
    } catch (error) { }

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
