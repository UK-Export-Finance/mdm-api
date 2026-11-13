import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { HttpStatusCode } from 'axios';
import { Response } from 'express';
import { PinoLogger } from 'nestjs-pino';
import { EXAMPLES } from '@ukef/constants';
import { FallbackToLegacyDataEnum } from '@ukef/constants/enums/fallbackToLegacyData';
import { DunAndBradstreetService } from '@ukef/helper-modules/dun-and-bradstreet/dun-and-bradstreet.service';
import { salesforceFormattedCurrentDate } from '@ukef/helpers/date-formatter.helper';
import { SalesforceService } from '@ukef/modules/salesforce/salesforce.service';

import { CreateUkefIdDto } from '@ukef/modules/numbers/dto/create-ukef-id.dto';
import { UkefId } from '@ukef/modules/numbers/entities/ukef-id.entity';
import { NumbersService } from '@ukef/modules/numbers/numbers.service';
import { CreateCustomerSalesforceResponseDto } from '@ukef/modules/salesforce/dto/create-customer-salesforce-response.dto';
import { GetSalesforceAccountResponseDto } from '@ukef/modules/salesforce/dto/get-salesforce-account-response.dto';
import { GetSalesforceLegacyAccountResponseDto } from '@ukef/modules/salesforce/dto/get-salesforce-legacy-account-response.dto';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { DTFSCustomerDto } from './dto/dtfs-customer.dto';
import { GetCustomersQueryDto } from './dto/get-customers-query.dto';
import { GetCustomersResponse } from './dto/get-customers-response.dto';

@Injectable()
export class CustomersService {
  constructor(
    private readonly salesforceService: SalesforceService,
    private readonly numbersService: NumbersService,
    private readonly dunAndBradstreetService: DunAndBradstreetService,
    private readonly logger: PinoLogger,
  ) {}

  /**
   * Retrieves a list of customers from Salesforce based on the provided query.
   *
   * @param {GetCustomersQueryDto} query - The query parameters for fetching customers from Salesforce.
   * @returns {Promise<GetCustomersResponse>} A promise that resolves to a list of customer response items.
   */
  async getCustomers(query: GetCustomersQueryDto): Promise<GetCustomersResponse> {
    switch (query.fallbackToLegacyData) {
      case 'yes':
        const accounts = await this.getSalesforceAccounts(query);
        return accounts.length ? accounts : await this.getSalesforceLegacyAccounts(query);
      case 'no':
        return await this.getSalesforceAccounts(query);
      case 'legacy-only':
        return await this.getSalesforceLegacyAccounts(query);
      default:
        throw new Error(`Invalid value for fallbackToLegacyData: ${query.fallbackToLegacyData}`);
    }
  }

  /**
   * Retrieves a list of Salesforce accounts based on the provided query.
   *
   * @param {GetCustomersQueryDto} query - The query parameters for fetching a list of Salesforce accounts.
   * @returns {Promise<GetCustomersResponse>} A promise that resolves to a list of account response items.
   */
  private async getSalesforceAccounts(query: GetCustomersQueryDto): Promise<GetCustomersResponse> {
    const salesforceGetCustomersResponse = await this.salesforceService.getCustomers(query);

    return salesforceGetCustomersResponse.map(this.mapCustomerInSalesforceToResponse);
  }

  private mapCustomerInSalesforceToResponse(customer: GetSalesforceAccountResponseDto) {
    return {
      partyUrn: customer.Party_URN__c,
      name: customer.Name,
      sfId: customer.Id,
      companyRegNo: customer.Company_Registration_Number__c,
      probabilityOfDefault: customer.CCM_Probability_of_Default__c,
      ukEntity: customer.CCM_Citizenship_Class__c,
      ukefIndustryName: customer.CCM_Industry__c,
      ukefSectorName: customer.CCM_Industry_Group__c,
      type: customer.Account_Type__c,
      subtype: customer.Account_Sub_Type__c,
      isLegacyRecord: false,
      riskEntity: customer.CCM_Risk_Entity__c,
      creditClassificationStatus: customer.CCM_Credit_Risk_Rating__c,
      creditClassificationDate: customer.CCM_Credit_Risk_Rating_Date__c,
    };
  }

  /**
   * Retrieves a list of Salesforce accounts based on the provided query.
   *
   * @param {GetCustomersQueryDto} query - The query parameters for fetching a list of Salesforce accounts.
   * @returns {Promise<GetCustomersResponse>} A promise that resolves to a list of account response items.
   */
  private async getSalesforceLegacyAccounts(query: GetCustomersQueryDto): Promise<GetCustomersResponse> {
    const salesforceGetCustomersResponse = await this.salesforceService.getLegacyCustomers(query);

    return salesforceGetCustomersResponse.map(this.mapLegacyCustomerInSalesforceToResponse);
  }

  private mapLegacyCustomerInSalesforceToResponse(customer: GetSalesforceLegacyAccountResponseDto) {
    return {
      partyUrn: customer.M2_1_MCD_Party_URN__c,
      name: customer.M2_1_MCD_Party_Name__c,
      sfId: customer.Id,
      companyRegNo: customer.M2_1_MCD_Company_Reg_Number__c,
      probabilityOfDefault: null,
      ukEntity: customer.M2_1_MCD_UK_or_Overseas__c,
      ukefIndustryName: null,
      ukefSectorName: null,
      type: customer.M2_1_MCD_Party_Type__c,
      subtype: customer.M2_1_MCD_Party_Sub_Type__c,
      isLegacyRecord: true,
      riskEntity: null,
      creditClassificationStatus: null,
      creditClassificationDate: null,
    };
  }

  /**
   * Retrieves the Dun & Bradstreet (DUNS) number for a customer by its registration number.
   *
   * @param {string} registrationNumber - The company registration number.
   * @returns {Promise<string>} A promise that resolves to the DUNS number.
   */

  async getDunAndBradstreetNumber(registrationNumber: string): Promise<string> {
    try {
      this.logger.info('Finding DUNS number for company %s in Dun and Bradstreet', registrationNumber);

      const dunsNumber = await this.dunAndBradstreetService.getDunAndBradstreetNumberByRegistrationNumber(registrationNumber);

      this.logger.info('Found DUNS number for company %s in Dun and Bradstreet', registrationNumber);

      return dunsNumber;
    } catch (error) {
      if (error instanceof NotFoundException) {
        this.logger.warn('DUNS number not found for company %s in Dun and Bradstreet', registrationNumber);
      } else {
        this.logger.error('Error finding DUNS number for company %s in Dun and Bradstreet', registrationNumber);
      }

      throw error;
    }
  }

  /**
   * Retrieves or creates a customer record in the system based on the provided customer DTO.
   *
   * @param {Response} res - The HTTP response object to send as the response.
   * @param {DTFSCustomerDto} dtfsCustomerDto - The DTO containing customer details.
   * @returns {Promise<GetCustomersResponse>} A promise that resolves to the customer response items.
   * @throws {InternalServerErrorException} If the customer does not exist and cannot be created.
   */
  async getOrCreateCustomer(res: Response, dtfsCustomerDto: DTFSCustomerDto): Promise<GetCustomersResponse> {
    const query: GetCustomersQueryDto = {
      companyReg: dtfsCustomerDto.companyRegistrationNumber,
      fallbackToLegacyData: FallbackToLegacyDataEnum.YES,
    };

    try {
      const existingCustomers = await this.getCustomers(query);

      // If the customer does exist in Salesforce
      if (existingCustomers?.[0]) {
        return await this.handleExistingCustomerSalesforceResponse(res, dtfsCustomerDto, existingCustomers);
      }

      this.logger.error('Salesforce returned no customers for company %s without a not-found response', dtfsCustomerDto.companyRegistrationNumber);

      throw new InternalServerErrorException();
    } catch (error) {
      // If the customer does not exist in Salesforce
      if (error instanceof NotFoundException) {
        this.logger.info('Customer for company %s not found in Salesforce; creating in Salesforce', dtfsCustomerDto.companyRegistrationNumber);

        return await this.handleSalesforceCustomerNotFound(res, dtfsCustomerDto);
      }

      this.logger.error('Error getting or creating customer for company %s', dtfsCustomerDto.companyRegistrationNumber);

      throw error;
    }
  }

  /**
   * Handles the response when a customer is found in Salesforce.
   *
   * @param {Response} res - The HTTP response object to send as the response.
   * @param {DTFSCustomerDto} dtfsCustomerDto - The DTO containing customer details.
   * @param {any[]} existingCustomers - List of existing customers found in Salesforce.
   * @returns {Promise<GetCustomersResponse>} A promise that resolves to the customer response items.
   */
  private async handleExistingCustomerSalesforceResponse(res, dtfsCustomerDto, existingCustomers): Promise<GetCustomersResponse> {
    if (existingCustomers[0]?.isLegacyRecord === false) {
      this.logger.info('Salesforce customer exists, returning existing customer records');

      // If the customer exists as a non-legacy record in Salesforce
      return res.status(HttpStatusCode.Ok).json(existingCustomers);
    }

    if (existingCustomers[0]?.isLegacyRecord === true) {
      if (existingCustomers[0]?.partyUrn) {
        this.logger.info('Creating Salesforce customer for company %s using legacy party URN', dtfsCustomerDto.companyRegistrationNumber);

        // If the customer only exists as a legacy record in Salesforce and has a URN
        return await this.createCustomerWithLegacyURN(res, dtfsCustomerDto, existingCustomers);
      }

      this.logger.info('Legacy customer for company %s has no party URN; generating one before Salesforce creation', dtfsCustomerDto.companyRegistrationNumber);

      // If the customer only exists as a legacy record in Salesforce but has no URN
      return await this.createCustomerByURN(res, dtfsCustomerDto);
    }

    this.logger.warn('Salesforce returned an unrecognised legacy status for company %s', dtfsCustomerDto.companyRegistrationNumber);

    return undefined;
  }

  /**
   * Creates a customer record using the legacy URN.
   *
   * @param {Response} res - The HTTP response object to send as the response.
   * @param {DTFSCustomerDto} DTFSCustomerDto - The DTO containing customer details.
   * @param {any[]} existingCustomers - List of existing customers.
   * @returns {Promise<void>}
   */
  private async createCustomerWithLegacyURN(res, DTFSCustomerDto, existingCustomers) {
    return await this.createCustomerByURN(res, DTFSCustomerDto, existingCustomers);
  }

  /**
   * Creates a customer record, creating a new URN as it does so.
   *
   * @param {Response} res - The HTTP response object to send as the response.
   * @param {DTFSCustomerDto} dtfsCustomerDto - The DTO containing customer details.
   * @returns {Promise<void>}
   */
  private async handleSalesforceCustomerNotFound(res, DTFSCustomerDto) {
    return await this.createCustomerByURN(res, DTFSCustomerDto);
  }

  /**
   * Creates a customer record using a generated or existing URN.
   *
   * @param {Response} res - The HTTP response object to send as the response.
   * @param {DTFSCustomerDto} dtfsCustomerDto - The DTO containing customer details.
   * @param {any[] | null} existingCustomers - List of existing customers found in Salesforce or null.
   * @returns {Promise<void>}
   */
  private async createCustomerByURN(res, dtfsCustomerDto, existingCustomers = null) {
    let partyUrn: string;
    let isLegacyRecord: boolean;

    // TODO: replace this with a call to Salesforce's NUMGEN table once that's in place
    const dunsNumber = await this.getDunAndBradstreetNumber(dtfsCustomerDto.companyRegistrationNumber);

    if (existingCustomers) {
      isLegacyRecord = true;
      [{ partyUrn }] = existingCustomers;
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
        this.logger.info('Generating party URN for company %s', dtfsCustomerDto.companyRegistrationNumber);

        const numbersServiceResponse: UkefId[] = await this.numbersService.create(createUkefIdDto);
        partyUrn = numbersServiceResponse[0].maskedId;

        this.logger.info('Generated party URN for company %s', dtfsCustomerDto.companyRegistrationNumber);
      } catch (error) {
        this.logger.warn(
          'Error generating party URN for company %s; continuing Salesforce creation without a party URN',
          dtfsCustomerDto.companyRegistrationNumber,
        );

        partyUrn = null;
      }
    }

    const createdCustomer = await this.createCustomerByURNAndDUNS(dtfsCustomerDto, partyUrn, dunsNumber, isLegacyRecord);

    /**
     * The controller injects `res` with `@Res({ passthrough: true })`, so Nest still sends the response itself.
     * Only set the status code here and return the plain body — never call `res.json(...)` manually.
     * Returning the result of `res.json(...)` (or calling it directly) hands Nest's global interceptor the
     * Express response object instead of plain data, which crashes with "this.removeListener is not a function"
     * when it tries to serialise it.
     */
    res.status(HttpStatusCode.Created);

    return createdCustomer;
  }

  /**
   * Creates a customer record using the provided name, company registration number, URN, DUNS number, and legacy status.
   *
   * @param {DTFSCustomerDto} dtfsCustomerDto - The DTO containing customer details.
   * @param {string} partyUrn - The unique party URN for the customer.
   * @param {string} dunsNumber - The DUNS number for the customer.
   * @param {boolean} isLegacyRecord - Indicates if the record is a legacy record.
   * @returns {Promise<GetCustomersResponse>} A promise that resolves to the created customer response items.
   */
  private async createCustomerByURNAndDUNS(
    dtfsCustomerDto: DTFSCustomerDto,
    partyUrn: string,
    dunsNumber: string,
    isLegacyRecord: boolean,
  ): Promise<GetCustomersResponse> {
    const salesForceDate = salesforceFormattedCurrentDate();

    const createCustomerDto: CreateCustomerDto = {
      CCM_Assigned_Rating__c: EXAMPLES.CUSTOMER.RISK_ENTITY.CORPORATE,
      CCM_Citizenship_Class__c: dtfsCustomerDto.ukEntity,
      CCM_Credit_Risk_Rating__c: EXAMPLES.CUSTOMER.CREDIT_RISK_RATING,
      CCM_Credit_Risk_Rating_Date__c: salesForceDate,
      CCM_Industry__c: dtfsCustomerDto.ukefIndustryName,
      CCM_Industry_Group__c: dtfsCustomerDto.ukefSectorName,
      CCM_Loss_Given_Default__c: EXAMPLES.CUSTOMER.LOSS_GIVEN_DEFAULT,
      CCM_Primary_Industry__c: dtfsCustomerDto.ukefIndustryName,
      CCM_Primary_Industry_Group__c: dtfsCustomerDto.ukefSectorName,
      CCM_Probability_of_Default__c: dtfsCustomerDto.probabilityOfDefault,
      CCM_Watch_List__c: EXAMPLES.CUSTOMER.CREDIT_CLASSIFICATION_STATUS.GOOD,
      CCM_Watch_List_Date__c: salesForceDate,
      Company_Registration_Number__c: dtfsCustomerDto.companyRegistrationNumber,
      D_B_Number__c: dunsNumber,
      Name: dtfsCustomerDto.companyName,
      Party_URN__c: partyUrn,
    };

    if (dtfsCustomerDto.customerType) {
      createCustomerDto.CCM_Customer_Type__c = dtfsCustomerDto.customerType;
    }

    let salesforceCreateCustomerResponse: CreateCustomerSalesforceResponseDto;

    try {
      this.logger.info('Sending customer creation request to Salesforce for company %s', dtfsCustomerDto.companyRegistrationNumber);

      salesforceCreateCustomerResponse = await this.salesforceService.createCustomer(createCustomerDto);
    } catch (error) {
      this.logger.error('Error creating customer in Salesforce for company %s', dtfsCustomerDto.companyRegistrationNumber);

      throw error;
    }

    if (salesforceCreateCustomerResponse?.success) {
      this.logger.info('Created customer in Salesforce for company %s', dtfsCustomerDto.companyRegistrationNumber);
    } else {
      this.logger.warn('Salesforce did not confirm customer creation for company %s', dtfsCustomerDto.companyRegistrationNumber);
    }

    return [
      {
        companyRegNo: dtfsCustomerDto.companyRegistrationNumber,
        creditClassificationDate: salesForceDate,
        creditClassificationStatus: EXAMPLES.CUSTOMER.CREDIT_CLASSIFICATION_STATUS.GOOD,
        customerType: dtfsCustomerDto.customerType,
        isLegacyRecord,
        name: dtfsCustomerDto.companyName,
        partyUrn,
        probabilityOfDefault: dtfsCustomerDto.probabilityOfDefault,
        riskEntity: EXAMPLES.CUSTOMER.RISK_ENTITY.CORPORATE,
        sfId: salesforceCreateCustomerResponse?.success ? salesforceCreateCustomerResponse.id : null,
        subtype: null,
        type: null,
        ukefIndustryName: dtfsCustomerDto.ukefIndustryName,
        ukefSectorName: dtfsCustomerDto.ukefSectorName,
        ukEntity: dtfsCustomerDto.ukEntity,
      },
    ];
  }
}
