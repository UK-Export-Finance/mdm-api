import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CREDIT_CLASSIFICATION_STATUS, EXAMPLES, RISK_ENTITY } from '@ukef/constants';
import { DunAndBradstreetService } from '@ukef/helper-modules/dun-and-bradstreet/dun-and-bradstreet.service';
import { salesforceFormattedCurrentDate } from '@ukef/helpers/date-formatter.helper';
import { GetCustomersInformaticaQueryDto } from '@ukef/modules/informatica/dto/get-customers-informatica-query.dto';
import { InformaticaService } from '@ukef/modules/informatica/informatica.service';
import { SalesforceService } from '@ukef/modules/salesforce/salesforce.service';
import { HttpStatusCode } from 'axios';
import { Response } from 'express';

import { CreateUkefIdDto } from '../numbers/dto/create-ukef-id.dto';
import { UkefId } from '../numbers/entities/ukef-id.entity';
import { NumbersService } from '../numbers/numbers.service';
import { CreateCustomerSalesforceResponseDto } from '../salesforce/dto/create-customer-salesforce-response.dto';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { DTFSCustomerDto } from './dto/dtfs-customer.dto';
import { GetCustomersResponse, GetCustomersResponseItem } from './dto/get-customers-response.dto';

@Injectable()
export class CustomersService {
  constructor(
    private readonly informaticaService: InformaticaService,
    private readonly salesforceService: SalesforceService,
    private readonly numbersService: NumbersService,
    private readonly dunAndBradstreetService: DunAndBradstreetService,
  ) {}

  /**
   * Retrieves a list of customers from Informatica based on the provided query.
   *
   * @param {GetCustomersInformaticaQueryDto} backendQuery - The query parameters for fetching customers from Informatica.
   * @returns {Promise<GetCustomersResponse>} A promise that resolves to a list of customer response items.
   */
  async getCustomers(backendQuery: GetCustomersInformaticaQueryDto): Promise<GetCustomersResponse> {
    const customersInInformatica = await this.informaticaService.getCustomers(backendQuery);
    return customersInInformatica.map(
      (customerInInformatica): GetCustomersResponseItem => ({
        partyUrn: customerInInformatica.partyUrn,
        name: customerInInformatica.name,
        sfId: customerInInformatica.sfId,
        companyRegNo: customerInInformatica.companyRegNo,
        probabilityOfDefault: customerInInformatica.probabilityOfDefault,
        ukEntity: customerInInformatica.ukEntity,
        ukefIndustryName: customerInInformatica.ukefIndustryName,
        ukefSectorName: customerInInformatica.ukefSectorName,
        type: customerInInformatica.type,
        subtype: customerInInformatica.subtype,
        isLegacyRecord: customerInInformatica.isLegacyRecord,
        riskEntity: customerInInformatica.riskEntity,
        creditClassificationStatus: customerInInformatica.creditClassificationStatus,
        creditClassificationDate: customerInInformatica.creditClassificationDate,
      }),
    );
  }

  /**
   * Retrieves the Dun & Bradstreet (DUNS) number for a customer by its registration number.
   *
   * @param {string} registrationNumber - The company registration number.
   * @returns {Promise<string>} A promise that resolves to the DUNS number.
   */

  async getDunAndBradstreetNumber(registrationNumber: string): Promise<string> {
    return await this.dunAndBradstreetService.getDunAndBradstreetNumberByRegistrationNumber(registrationNumber);
  }

  /**
   * Retrieves or creates a customer record in the system based on the provided customer DTO.
   *
   * @param {Response} res - The HTTP response object to send as the response.
   * @param {DTFSCustomerDto} DTFSCustomerDto - The DTO containing customer details.
   * @returns {Promise<GetCustomersResponse>} A promise that resolves to the customer response items.
   * @throws {InternalServerErrorException} If the customer does not exist and cannot be created.
   */
  async getOrCreateCustomer(res: Response, DTFSCustomerDto: DTFSCustomerDto): Promise<GetCustomersResponse> {
    const backendQuery: GetCustomersInformaticaQueryDto = {
      companyreg: DTFSCustomerDto.companyRegistrationNumber,
    };

    try {
      const existingCustomersInInformatica = await this.informaticaService.getCustomers(backendQuery);

      // If the customer does exist in Informatica
      if (existingCustomersInInformatica?.[0]) {
        return await this.handleInformaticaResponse(res, DTFSCustomerDto, existingCustomersInInformatica);
      } else {
        throw new InternalServerErrorException();
      }
    } catch (error) {
      // If the customer does not exist in Informatica
      if (error instanceof NotFoundException) {
        await this.handleInformaticaCustomerNotFound(res, DTFSCustomerDto);
      } else {
        throw error;
      }
    }
  }

  /**
   * Handles the response when a customer is found in Informatica.
   *
   * @param {Response} res - The HTTP response object to send as the response.
   * @param {DTFSCustomerDto} DTFSCustomerDto - The DTO containing customer details.
   * @param {any[]} existingCustomersInInformatica - List of existing customers found in Informatica.
   * @returns {Promise<GetCustomersResponse>} A promise that resolves to the customer response items.
   */
  private async handleInformaticaResponse(res, DTFSCustomerDto, existingCustomersInInformatica): Promise<GetCustomersResponse> {
    if (existingCustomersInInformatica[0]?.isLegacyRecord === false) {
      // If the customer exists as a non-legacy record in Salesforce (via Informatica)
      return res.status(HttpStatusCode.Ok).json(
        existingCustomersInInformatica.map(
          (customerInInformatica): GetCustomersResponseItem => ({
            partyUrn: customerInInformatica?.partyUrn,
            name: customerInInformatica?.name,
            sfId: customerInInformatica?.sfId,
            companyRegNo: customerInInformatica?.companyRegNo,
            type: customerInInformatica?.type,
            subtype: customerInInformatica?.subtype,
            isLegacyRecord: customerInInformatica?.isLegacyRecord,

            // TODO [APIM-616]: Return below from Informatica
            // probabilityOfDefault: DTFSCustomerDto?.probabilityOfDefault,
            // ukEntity: DTFSCustomerDto?.ukEntity,
            // ukefIndustryName: DTFSCustomerDto?.ukefIndustryName,
            // ukefSectorName: DTFSCustomerDto?.ukefSectorName,
            // riskEntity: DTFSCustomerDto?.riskEntity,
            // classificationStatus: DTFSCustomerDto?.classificationStatus,
            // classificationStatusDate: DTFSCustomerDto?.classificationStatusDate,
          }),
        ),
      );
    } else if (existingCustomersInInformatica[0]?.isLegacyRecord === true) {
      if (existingCustomersInInformatica[0]?.partyUrn) {
        // If the customer only exists as a legacy record in Salesforce (fetched via Informatica) and has a URN
        await this.createCustomerWithLegacyURN(res, DTFSCustomerDto, existingCustomersInInformatica);
      } else {
        // If the customer only exists as a legacy record in Salesforce (fetched via Informatica) but has no URN
        await this.createCustomerByURN(res, DTFSCustomerDto);
      }
    }
  }

  /**
   * Creates a customer record using the legacy URN from Informatica.
   *
   * @param {Response} res - The HTTP response object to send as the response.
   * @param {DTFSCustomerDto} DTFSCustomerDto - The DTO containing customer details.
   * @param {any[]} existingCustomersInInformatica - List of existing customers found in Informatica.
   * @returns {Promise<void>}
   */
  private async createCustomerWithLegacyURN(res, DTFSCustomerDto, existingCustomersInInformatica) {
    await this.createCustomerByURN(res, DTFSCustomerDto, existingCustomersInInformatica);
  }

  /**
   * Creates a customer record, creating a new URN as it does so.
   *
   * @param {Response} res - The HTTP response object to send as the response.
   * @param {DTFSCustomerDto} DTFSCustomerDto - The DTO containing customer details.
   * @returns {Promise<void>}
   */
  private async handleInformaticaCustomerNotFound(res, DTFSCustomerDto) {
    await this.createCustomerByURN(res, DTFSCustomerDto);
  }

  /**
   * Creates a customer record using a generated or existing URN.
   *
   * @param {Response} res - The HTTP response object to send as the response.
   * @param {DTFSCustomerDto} DTFSCustomerDto - The DTO containing customer details.
   * @param {any[] | null} existingCustomersInInformatica - List of existing customers found in Informatica or null.
   * @returns {Promise<void>}
   */
  private async createCustomerByURN(res, DTFSCustomerDto, existingCustomersInInformatica = null) {
    let partyUrn: string;
    let isLegacyRecord: boolean;

    // TODO: replace this with a call to Salesforce's NUMGEN table once that's in place
    const dunsNumber = await this.dunAndBradstreetService.getDunAndBradstreetNumberByRegistrationNumber(DTFSCustomerDto.companyRegistrationNumber);

    if (existingCustomersInInformatica) {
      isLegacyRecord = true;
      [{ partyUrn }] = existingCustomersInInformatica;
    } else {
      isLegacyRecord = false;
      const createUkefIdDto: CreateUkefIdDto[] = [
        {
          numberTypeId: 2,
          createdBy: 'DTFS Automated Customer Creation User',
          requestingSystem: 'MDM',
        },
      ];
      try {
        const numbersServiceResponse: UkefId[] = await this.numbersService.create(createUkefIdDto);
        partyUrn = numbersServiceResponse[0].maskedId;
      } catch {
        partyUrn = null;
      }
    }

    const createdCustomer = await this.createCustomerByURNAndDUNS(DTFSCustomerDto, partyUrn, dunsNumber, isLegacyRecord);
    return res.status(HttpStatusCode.Created).json(createdCustomer);
  }

  /**
   * Creates a customer record using the provided name, company registration number, URN, DUNS number, and legacy status.
   *
   * @param {DTFSCustomerDto} DTFSCustomerDto - The DTO containing customer details.
   * @param {string} partyUrn - The unique party URN for the customer.
   * @param {string} dunsNumber - The DUNS number for the customer.
   * @param {boolean} isLegacyRecord - Indicates if the record is a legacy record.
   * @returns {Promise<GetCustomersResponse>} A promise that resolves to the created customer response items.
   */
  private async createCustomerByURNAndDUNS(
    DTFSCustomerDto: DTFSCustomerDto,
    partyUrn: string,
    dunsNumber: string,
    isLegacyRecord: boolean,
  ): Promise<GetCustomersResponse> {
    const salesForceDate = salesforceFormattedCurrentDate();

    const createCustomerDto: CreateCustomerDto = {
      Name: DTFSCustomerDto.companyName,
      Party_URN__c: partyUrn,
      D_B_Number__c: dunsNumber,
      Company_Registration_Number__c: DTFSCustomerDto.companyRegistrationNumber,
      CCM_Credit_Risk_Rating__c: EXAMPLES.CUSTOMER.CREDIT_RISK_RATING,
      CCM_Credit_Risk_Rating_Date__c: salesForceDate,
      CCM_Loss_Given_Default__c: EXAMPLES.CUSTOMER.LOSS_GIVEN_DEFAULT,
      CCM_Probability_of_Default__c: DTFSCustomerDto.probabilityOfDefault,
      CCM_Citizenship_Class__c: DTFSCustomerDto.ukEntity,
      CCM_Primary_Industry__c: DTFSCustomerDto.ukefIndustryName,
      CCM_Primary_Industry_Group__c: DTFSCustomerDto.ukefSectorName,
      CCM_Industry__c: DTFSCustomerDto.ukefIndustryName,
      CCM_Industry_Group__c: DTFSCustomerDto.ukefSectorName,
      CCM_Assigned_Rating__c: RISK_ENTITY.CORPORATE,
      CCM_Watch_List__c: CREDIT_CLASSIFICATION_STATUS.GOOD,
      CCM_Watch_List_Date__c: salesForceDate,
    };

    const salesforceCreateCustomerResponse: CreateCustomerSalesforceResponseDto = await this.salesforceService.createCustomer(createCustomerDto);

    return [
      {
        partyUrn: partyUrn,
        name: DTFSCustomerDto.companyName,
        sfId: salesforceCreateCustomerResponse?.success ? salesforceCreateCustomerResponse.id : null,
        companyRegNo: DTFSCustomerDto.companyRegistrationNumber,
        type: null,
        subtype: null,
        isLegacyRecord: isLegacyRecord,
        probabilityOfDefault: DTFSCustomerDto.probabilityOfDefault,
        ukEntity: DTFSCustomerDto.ukEntity,
        ukefIndustryName: DTFSCustomerDto.ukefIndustryName,
        ukefSectorName: DTFSCustomerDto.ukefSectorName,
        riskEntity: RISK_ENTITY.CORPORATE,
        creditClassificationStatus: CREDIT_CLASSIFICATION_STATUS.GOOD,
        creditClassificationDate: salesForceDate,
      },
    ];
  }
}
