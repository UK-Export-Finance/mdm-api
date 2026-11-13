import { ApiProperty } from '@nestjs/swagger';
import { EXAMPLES } from '@ukef/constants';

export class SalesforceAccountAttributesDto {
  @ApiProperty({ example: EXAMPLES.SALESFORCE_ACCOUNT.ATTRIBUTES_TYPE })
  type: string;

  @ApiProperty({ example: EXAMPLES.SALESFORCE_ACCOUNT.ATTRIBUTES_URL })
  url: string;
}

export class SalesforceAccountAddressDto {
  @ApiProperty({ nullable: true, example: EXAMPLES.SALESFORCE_ACCOUNT.BILLING_ADDRESS.CITY })
  city: string | null;

  @ApiProperty({ nullable: true, example: EXAMPLES.SALESFORCE_ACCOUNT.BILLING_ADDRESS.COUNTRY })
  country: string | null;

  @ApiProperty({ nullable: true, example: EXAMPLES.SALESFORCE_ACCOUNT.BILLING_ADDRESS.COUNTRY_CODE })
  countryCode: string | null;

  @ApiProperty({ nullable: true, example: null })
  geocodeAccuracy: string | null;

  @ApiProperty({ nullable: true, example: null })
  latitude: number | null;

  @ApiProperty({ nullable: true, example: null })
  longitude: number | null;

  @ApiProperty({ nullable: true, example: EXAMPLES.SALESFORCE_ACCOUNT.BILLING_ADDRESS.POSTAL_CODE })
  postalCode: string | null;

  @ApiProperty({ nullable: true, example: EXAMPLES.SALESFORCE_ACCOUNT.BILLING_ADDRESS.STATE })
  state: string | null;

  @ApiProperty({ nullable: true, example: EXAMPLES.SALESFORCE_ACCOUNT.BILLING_ADDRESS.STATE_CODE })
  stateCode: string | null;

  @ApiProperty({ nullable: true, example: EXAMPLES.SALESFORCE_ACCOUNT.BILLING_ADDRESS.STREET })
  street: string | null;
}

export class GetSalesforceAccountResponseDto {
  @ApiProperty({ type: SalesforceAccountAttributesDto })
  attributes: SalesforceAccountAttributesDto;

  @ApiProperty({ example: EXAMPLES.CUSTOMER.SALESFORCE_ID })
  Id: string;

  @ApiProperty({ nullable: true, example: EXAMPLES.CUSTOMER.SALESFORCE_TYPE })
  Account_Type__c: string | null;

  @ApiProperty({ nullable: true, example: EXAMPLES.CUSTOMER.SALESFORCE_SUBTYPE })
  Account_Sub_Type__c: string | null;

  @ApiProperty({ example: false })
  IsDeleted: boolean;

  @ApiProperty({ nullable: true, example: null })
  MasterRecordId: string | null;

  @ApiProperty({ example: EXAMPLES.CUSTOMER.NAME })
  Name: string;

  @ApiProperty({ nullable: true, example: EXAMPLES.SALESFORCE_ACCOUNT.BILLING_ADDRESS.STREET })
  BillingStreet: string | null;

  @ApiProperty({ nullable: true, example: EXAMPLES.SALESFORCE_ACCOUNT.BILLING_ADDRESS.CITY })
  BillingCity: string | null;

  @ApiProperty({ nullable: true, example: EXAMPLES.SALESFORCE_ACCOUNT.BILLING_ADDRESS.STATE })
  BillingState: string | null;

  @ApiProperty({ nullable: true, example: EXAMPLES.SALESFORCE_ACCOUNT.BILLING_ADDRESS.POSTAL_CODE })
  BillingPostalCode: string | null;

  @ApiProperty({ nullable: true, example: EXAMPLES.SALESFORCE_ACCOUNT.BILLING_ADDRESS.COUNTRY })
  BillingCountry: string | null;

  @ApiProperty({ nullable: true, example: EXAMPLES.SALESFORCE_ACCOUNT.BILLING_ADDRESS.STATE_CODE })
  BillingStateCode: string | null;

  @ApiProperty({ nullable: true, example: EXAMPLES.SALESFORCE_ACCOUNT.BILLING_ADDRESS.COUNTRY_CODE })
  BillingCountryCode: string | null;

  @ApiProperty({ nullable: true, example: null })
  BillingLatitude: number | null;

  @ApiProperty({ nullable: true, example: null })
  BillingLongitude: number | null;

  @ApiProperty({ nullable: true, example: null })
  BillingGeocodeAccuracy: string | null;

  @ApiProperty({ type: SalesforceAccountAddressDto, nullable: true })
  BillingAddress: SalesforceAccountAddressDto | null;

  @ApiProperty({ nullable: true, example: EXAMPLES.SALESFORCE_ACCOUNT.PHOTO_URL })
  PhotoUrl: string | null;

  @ApiProperty({ nullable: true, example: EXAMPLES.SALESFORCE_ACCOUNT.CURRENCY_ISO_CODE })
  CurrencyIsoCode: string | null;

  @ApiProperty({ nullable: true, example: EXAMPLES.SALESFORCE_ACCOUNT.OWNER_ID })
  OwnerId: string | null;

  @ApiProperty({ nullable: true, example: EXAMPLES.SALESFORCE_ACCOUNT.CREATED_DATE })
  CreatedDate: string | null;

  @ApiProperty({ nullable: true, example: EXAMPLES.SALESFORCE_ACCOUNT.CREATED_BY_ID })
  CreatedById: string | null;

  @ApiProperty({ nullable: true, example: EXAMPLES.SALESFORCE_ACCOUNT.LAST_MODIFIED_DATE })
  LastModifiedDate: string | null;

  @ApiProperty({ nullable: true, example: EXAMPLES.SALESFORCE_ACCOUNT.LAST_MODIFIED_BY_ID })
  LastModifiedById: string | null;

  @ApiProperty({ nullable: true, example: EXAMPLES.SALESFORCE_ACCOUNT.SYSTEM_MODSTAMP })
  SystemModstamp: string | null;

  @ApiProperty({ nullable: true, example: null })
  LastActivityDate: string | null;

  @ApiProperty({ nullable: true, example: null })
  LastViewedDate: string | null;

  @ApiProperty({ nullable: true, example: null })
  LastReferencedDate: string | null;

  @ApiProperty({ nullable: true, example: null })
  SourceSystemIdentifier: string | null;

  @ApiProperty({ nullable: true, example: null })
  JigsawCompanyId: string | null;

  @ApiProperty({ nullable: true, example: EXAMPLES.CUSTOMER.COMPANYREG })
  Company_Registration_Number__c: string | null;

  @ApiProperty({ nullable: true, example: EXAMPLES.CUSTOMER.DNB_NUMBER })
  D_B_Number__c: string | null;

  @ApiProperty({ nullable: true, example: EXAMPLES.CUSTOMER.RISK_ENTITY.CORPORATE })
  CCM_Risk_Entity__c: string | null;

  @ApiProperty({ nullable: true, example: EXAMPLES.CUSTOMER.CREDIT_RISK_RATING })
  CCM_Credit_Risk_Rating__c: string | null;

  @ApiProperty({ nullable: true, example: null })
  CCM_Customer_Type__c: string | null;

  @ApiProperty({ nullable: true, example: EXAMPLES.CUSTOMER.UK_ENTITY })
  CCM_Citizenship_Class__c: string | null;

  @ApiProperty({ nullable: true, example: EXAMPLES.CUSTOMER.PARTYURN })
  Party_URN__c: string | null;

  @ApiProperty({ nullable: true, example: null })
  CCM_Watch_List_Date__c: string | null;

  @ApiProperty({ nullable: true, example: null })
  CCM_Primary_Industry_Group__c: string | null;

  @ApiProperty({ nullable: true, example: null })
  CCM_Assigned_Rating__c: string | null;

  @ApiProperty({ nullable: true, example: null })
  CCM_Loss_Given_Default__c: number | null;

  @ApiProperty({ nullable: true, example: EXAMPLES.CUSTOMER.CREDIT_RISK_RATING_DATE })
  CCM_Credit_Risk_Rating_Date__c: string | null;

  @ApiProperty({ nullable: true, example: EXAMPLES.CUSTOMER.UK_INDUSTRY_SECTOR_NAME })
  CCM_Industry_Group__c: string | null;

  @ApiProperty({ nullable: true, example: null })
  CCM_Industry__c: string | null;

  @ApiProperty({ nullable: true, example: EXAMPLES.CUSTOMER.UK_INDUSTRY_NAME })
  CCM_Primary_Industry__c: string | null;

  @ApiProperty({ nullable: true, example: null })
  CCM_Watch_List__c: string | null;

  @ApiProperty({ nullable: true, example: null })
  CCM_Probability_of_Default__c: number | null;
}
