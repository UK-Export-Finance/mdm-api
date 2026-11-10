import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { HttpStatusCode } from 'axios';
import { Response } from 'express';
import { PinoLogger } from 'nestjs-pino';
import { EXAMPLES } from '@ukef/constants';
import { FallbackToLegacyDataEnum } from '@ukef/constants/enums/fallbackToLegacyData';
import { DunAndBradstreetService } from '@ukef/helper-modules/dun-and-bradstreet/dun-and-bradstreet.service';
import { salesforceFormattedCurrentDate } from '@ukef/helpers/date-formatter.helper';
import { GetCustomersInformaticaQueryDto } from '@ukef/modules/informatica/dto/get-customers-informatica-query.dto';
import { InformaticaService } from '@ukef/modules/informatica/informatica.service';
import { SalesforceService } from '@ukef/modules/salesforce/salesforce.service';

import { CreateUkefIdDto } from '@ukef/modules/numbers/dto/create-ukef-id.dto';
import { UkefId } from '@ukef/modules/numbers/entities/ukef-id.entity';
import { NumbersService } from '@ukef/modules/numbers/numbers.service';
import { CreateCustomerSalesforceResponseDto } from '@ukef/modules/salesforce/dto/create-customer-salesforce-response.dto';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { DTFSCustomerDto } from './dto/dtfs-customer.dto';
import { GetCustomersQueryDto } from './dto/get-customers-query.dto';
import { GetCustomersResponse, GetCustomersResponseItem } from './dto/get-customers-response.dto';

@Injectable()
export class CustomersService {
  constructor(
    private readonly informaticaService: InformaticaService,
    private readonly salesforceService: SalesforceService,
    private readonly numbersService: NumbersService,
    private readonly dunAndBradstreetService: DunAndBradstreetService,
    private readonly logger: PinoLogger,
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
        customerType: customerInInformatica.customerType || null,
        probabilityOfDefault: customerInInformatica.probabilityOfDefault,
        riskEntity: customerInInformatica.riskEntity,
        subtype: customerInInformatica.subtype,
        type: customerInInformatica.type,
        ukEntity: customerInInformatica.ukEntity,
        ukefIndustryName: customerInInformatica.ukefIndustryName,
        ukefSectorName: customerInInformatica.ukefSectorName,
        creditClassificationStatus: customerInInformatica.creditClassificationStatus,
        creditClassificationDate: customerInInformatica.creditClassificationDate,
        isLegacyRecord: customerInInformatica.isLegacyRecord,
      }),
    );
  }

  /**
   * Retrieves a list of customers from Salesforce based on the provided query.
   *
   * @param {GetCustomersQueryDto} query - The query parameters for fetching customers from Salesforce.
   * @returns {Promise<GetCustomersResponse>} A promise that resolves to a list of customer response items.
   */
  async getCustomersDirect(query: GetCustomersQueryDto): Promise<GetCustomersResponse> {
    switch (query.fallbackToLegacyData) {
      case 'yes':
        const accounts = await this.getSalesforceAccounts(query);
        return accounts.length ? accounts : this.getSalesforceLegacyAccounts(query);
      case 'no':
        return this.getSalesforceAccounts(query);
      case 'legacy-only':
        return this.getSalesforceLegacyAccounts(query);
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

    return salesforceGetCustomersResponse.map((customerInSalesforce) => ({
      partyUrn: customerInSalesforce.Party_URN__c,
      name: customerInSalesforce.Name,
      sfId: customerInSalesforce.Id,
      companyRegNo: customerInSalesforce.Company_Registration_Number__c,
      probabilityOfDefault: customerInSalesforce.CCM_Probability_of_Default__c,
      ukEntity: customerInSalesforce.CCM_Citizenship_Class__c,
      ukefIndustryName: customerInSalesforce.CCM_Industry__c,
      ukefSectorName: customerInSalesforce.CCM_Industry_Group__c,
      type: customerInSalesforce.Account_Type__c,
      subtype: customerInSalesforce.Account_Sub_Type__c,
      isLegacyRecord: false,
      riskEntity: customerInSalesforce.CCM_Risk_Entity__c,
      creditClassificationStatus: customerInSalesforce.CCM_Credit_Risk_Rating__c,
      creditClassificationDate: customerInSalesforce.CCM_Credit_Risk_Rating_Date__c,
    }));
  }

  /**
   * Retrieves a list of Salesforce accounts based on the provided query.
   *
   * @param {GetCustomersQueryDto} query - The query parameters for fetching a list of Salesforce accounts.
   * @returns {Promise<GetCustomersResponse>} A promise that resolves to a list of account response items.
   */
  private async getSalesforceLegacyAccounts(query: GetCustomersQueryDto): Promise<GetCustomersResponse> {
    const salesforceGetCustomersResponse = await this.salesforceService.getLegacyCustomers(query);

    return salesforceGetCustomersResponse.map((customerInSalesforce) => ({
      partyUrn: customerInSalesforce.M2_1_MCD_Party_URN__c,
      name: customerInSalesforce.M2_1_MCD_Party_Name__c,
      sfId: customerInSalesforce.Id,
      companyRegNo: customerInSalesforce.M2_1_MCD_Company_Reg_Number__c,
      probabilityOfDefault: null,
      ukEntity: customerInSalesforce.M2_1_MCD_UK_or_Overseas__c,
      ukefIndustryName: null,
      ukefSectorName: null,
      type: customerInSalesforce.M2_1_MCD_Party_Type__c,
      subtype: customerInSalesforce.M2_1_MCD_Party_Sub_Type__c,
      isLegacyRecord: true,
      riskEntity: null,
      creditClassificationStatus: null,
      creditClassificationDate: null,
    }));
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
  async getOrCreateCustomer(res: Response, DTFSCustomerDto: DTFSCustomerDto): Promise<GetCustomersResponse> {
    const query: GetCustomersQueryDto = {
      companyReg: DTFSCustomerDto.companyRegistrationNumber,
      fallbackToLegacyData: FallbackToLegacyDataEnum.YES,
    };

    try {
      const existingCustomers = await this.salesforceService.getCustomers(query);

      // If the customer does exist in Informatica
      if (existingCustomers?.[0]) {
        // TODO 707: rename handleInformaticaResponse to handleExistingCustomerSalesforceResponse
        return await this.handleInformaticaResponse(res, DTFSCustomerDto, existingCustomers);
      } else {
        throw new InternalServerErrorException();
      }

      this.logger.error('Informatica returned no customers for company %s without a not-found response', dtfsCustomerDto.companyRegistrationNumber);

      throw new InternalServerErrorException();
    } catch (error) {
      // If the customer does not exist in Informatica
      if (error instanceof NotFoundException) {
        this.logger.info('Customer for company %s not found in Informatica; creating in Salesforce', dtfsCustomerDto.companyRegistrationNumber);

        return await this.handleInformaticaCustomerNotFound(res, dtfsCustomerDto);
      }

      this.logger.error('Error getting or creating customer for company %s', dtfsCustomerDto.companyRegistrationNumber);

      throw error;
    }
  }

  /**
   * Handles the response when a customer is found in Informatica.
   *
   * @param {Response} res - The HTTP response object to send as the response.
   * @param {DTFSCustomerDto} dtfsCustomerDto - The DTO containing customer details.
   * @param {any[]} existingCustomersInInformatica - List of existing customers found in Informatica.
   * @returns {Promise<GetCustomersResponse>} A promise that resolves to the customer response items.
   */
  private async handleInformaticaResponse(res, dtfsCustomerDto, existingCustomersInInformatica): Promise<GetCustomersResponse> {
    if (existingCustomersInInformatica[0]?.isLegacyRecord === false) {
      this.logger.info('Returning existing non-legacy Salesforce customer for company %s', dtfsCustomerDto.companyRegistrationNumber);

      // If the customer exists as a non-legacy record in Salesforce (via Informatica)
      const responseBody: GetCustomersResponse = existingCustomersInInformatica.map((customerInInformatica): GetCustomersResponseItem => ({
        customerType: customerInInformatica.customerType,
        partyUrn: customerInInformatica?.partyUrn,
        name: customerInInformatica?.name,
        sfId: customerInInformatica?.sfId,
        companyRegNo: customerInInformatica?.companyRegNo,
        type: customerInInformatica?.type,
        subtype: customerInInformatica?.subtype,
        isLegacyRecord: customerInInformatica?.isLegacyRecord,

        /**
         * TODO APIM-616:
         * If the fields are added above (returned from Informatica), and do not return successfully,
         * fallback to using the values from the DTO.
         */
        // probabilityOfDefault: dtfsCustomerDto?.probabilityOfDefault,
        // ukEntity: dtfsCustomerDto?.ukEntity,
        // ukefIndustryName: dtfsCustomerDto?.ukefIndustryName,
        // ukefSectorName: dtfsCustomerDto?.ukefSectorName,
        // riskEntity: dtfsCustomerDto?.riskEntity,
        // classificationStatus: dtfsCustomerDto?.classificationStatus,
        // classificationStatusDate: dtfsCustomerDto?.classificationStatusDate,
      }));

      /**
       * The controller injects `res` with `@Res({ passthrough: true })`, so Nest still sends the response itself.
       * Only set the status code here and return the plain body — never call `res.json(...)` manually.
       * Returning the result of `res.json(...)` (or calling it directly) hands Nest's global interceptor the
       * Express response object instead of plain data, which crashes with "this.removeListener is not a function"
       * when it tries to serialise it.
       */
      res.status(HttpStatusCode.Ok);
      return responseBody;
    }

    if (existingCustomersInInformatica[0]?.isLegacyRecord === true) {
      if (existingCustomersInInformatica[0]?.partyUrn) {
        this.logger.info('Creating Salesforce customer for company %s using legacy party URN', dtfsCustomerDto.companyRegistrationNumber);

        // If the customer only exists as a legacy record in Salesforce (fetched via Informatica) and has a URN
        return await this.createCustomerWithLegacyURN(res, dtfsCustomerDto, existingCustomersInInformatica);
      }

      this.logger.info('Legacy customer for company %s has no party URN; generating one before Salesforce creation', dtfsCustomerDto.companyRegistrationNumber);

      // If the customer only exists as a legacy record in Salesforce (fetched via Informatica) but has no URN
      return await this.createCustomerByURN(res, dtfsCustomerDto);
    }

    this.logger.warn('Informatica returned an unrecognised legacy status for company %s', dtfsCustomerDto.companyRegistrationNumber);

    return undefined;
  }

  /**
   * Creates a customer record using the legacy URN from Informatica.
   *
   * @param {Response} res - The HTTP response object to send as the response.
   * @param {DTFSCustomerDto} dtfsCustomerDto - The DTO containing customer details.
   * @param {any[]} existingCustomersInInformatica - List of existing customers found in Informatica.
   * @returns {Promise<void>}
   */
  private async createCustomerWithLegacyURN(res, dtfsCustomerDto, existingCustomersInInformatica) {
    return await this.createCustomerByURN(res, dtfsCustomerDto, existingCustomersInInformatica);
  }

  /**
   * Creates a customer record, creating a new URN as it does so.
   *
   * @param {Response} res - The HTTP response object to send as the response.
   * @param {DTFSCustomerDto} dtfsCustomerDto - The DTO containing customer details.
   * @returns {Promise<void>}
   */
  private async handleInformaticaCustomerNotFound(res, dtfsCustomerDto) {
    return await this.createCustomerByURN(res, dtfsCustomerDto);
  }

  /**
   * Creates a customer record using a generated or existing URN.
   *
   * @param {Response} res - The HTTP response object to send as the response.
   * @param {DTFSCustomerDto} dtfsCustomerDto - The DTO containing customer details.
   * @param {any[] | null} existingCustomersInInformatica - List of existing customers found in Informatica or null.
   * @returns {Promise<void>}
   */
  private async createCustomerByURN(res, dtfsCustomerDto, existingCustomersInInformatica = null) {
    let partyUrn: string;
    let isLegacyRecord: boolean;

    // TODO: replace this with a call to Salesforce's NUMGEN table once that's in place
    const dunsNumber = await this.getDunAndBradstreetNumber(dtfsCustomerDto.companyRegistrationNumber);

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
