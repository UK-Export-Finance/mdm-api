import { ApiProperty } from '@nestjs/swagger';

export class SalesforceAccountAttributesDto {
  @ApiProperty({ example: 'Account' })
  type: string;

  @ApiProperty({ example: '/services/data/v53.0/sobjects/Account/0013L00000QRvWJQA1' })
  url: string;
}

export class SalesforceAccountAddressDto {
  @ApiProperty({ nullable: true, example: 'Shenzhen' })
  city: string | null;

  @ApiProperty({ nullable: true, example: 'China' })
  country: string | null;

  @ApiProperty({ nullable: true, example: 'CN' })
  countryCode: string | null;

  @ApiProperty({ nullable: true, example: null })
  geocodeAccuracy: string | null;

  @ApiProperty({ nullable: true, example: null })
  latitude: number | null;

  @ApiProperty({ nullable: true, example: null })
  longitude: number | null;

  @ApiProperty({ nullable: true, example: '518101' })
  postalCode: string | null;

  @ApiProperty({ nullable: true, example: 'Guangdong' })
  state: string | null;

  @ApiProperty({ nullable: true, example: '44' })
  stateCode: string | null;

  @ApiProperty({ nullable: true, example: 'Huace Jiance Building' })
  street: string | null;
}

export class GetSalesforceAccountResponseDto {
  @ApiProperty({ type: SalesforceAccountAttributesDto })
  attributes: SalesforceAccountAttributesDto;

  @ApiProperty({ example: '0013L00000QRvWJQA1' })
  Id: string;

  @ApiProperty({ nullable: true, example: 'Non Corporate UK' })
  Account_Type__c: string | null;

  @ApiProperty({ nullable: true, example: 'Sole Trader' })
  Account_Sub_Type__c: string | null;

  @ApiProperty({ example: false })
  IsDeleted: boolean;

  @ApiProperty({ nullable: true, example: null })
  MasterRecordId: string | null;

  @ApiProperty({ example: 'Centre Testing International Group Co., Ltd.' })
  Name: string;

  @ApiProperty({ nullable: true, example: 'Huace Jiance Building' })
  BillingStreet: string | null;

  @ApiProperty({ nullable: true, example: 'Shenzhen' })
  BillingCity: string | null;

  @ApiProperty({ nullable: true, example: 'Guangdong' })
  BillingState: string | null;

  @ApiProperty({ nullable: true, example: '518101' })
  BillingPostalCode: string | null;

  @ApiProperty({ nullable: true, example: 'China' })
  BillingCountry: string | null;

  @ApiProperty({ nullable: true, example: '44' })
  BillingStateCode: string | null;

  @ApiProperty({ nullable: true, example: 'CN' })
  BillingCountryCode: string | null;

  @ApiProperty({ nullable: true, example: null })
  BillingLatitude: number | null;

  @ApiProperty({ nullable: true, example: null })
  BillingLongitude: number | null;

  @ApiProperty({ nullable: true, example: null })
  BillingGeocodeAccuracy: string | null;

  @ApiProperty({ type: SalesforceAccountAddressDto, nullable: true })
  BillingAddress: SalesforceAccountAddressDto | null;

  @ApiProperty({ nullable: true, example: '/services/images/photo/0013L00000QRvWJQA1' })
  PhotoUrl: string | null;

  @ApiProperty({ nullable: true, example: 'GBP' })
  CurrencyIsoCode: string | null;

  @ApiProperty({ nullable: true, example: '0054K000004ruN8QAI' })
  OwnerId: string | null;

  @ApiProperty({ nullable: true, example: '2022-11-07T11:52:41.000+0000' })
  CreatedDate: string | null;

  @ApiProperty({ nullable: true, example: '0054K000004ruN8QAI' })
  CreatedById: string | null;

  @ApiProperty({ nullable: true, example: '2026-08-27T15:00:34.000+0000' })
  LastModifiedDate: string | null;

  @ApiProperty({ nullable: true, example: '0053L000004brHJQAY' })
  LastModifiedById: string | null;

  @ApiProperty({ nullable: true, example: '2026-08-27T15:00:34.000+0000' })
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

  @ApiProperty({ nullable: true, example: '91440300757618160G' })
  Company_Registration_Number__c: string | null;

  @ApiProperty({ nullable: true, example: '528182484' })
  D_B_Number__c: string | null;

  @ApiProperty({ nullable: true, example: 'ECGD RISK STATUS' })
  CCM_Risk_Entity__c: string | null;

  @ApiProperty({ nullable: true, example: 'BBB+' })
  CCM_Credit_Risk_Rating__c: string | null;

  @ApiProperty({ nullable: true, example: null })
  CCM_Customer_Type__c: string | null;

  @ApiProperty({ nullable: true, example: 'N/A' })
  CCM_Citizenship_Class__c: string | null;

  @ApiProperty({ nullable: true, example: '00325188' })
  Party_URN__c: string | null;

  @ApiProperty({ nullable: true, example: null })
  CCM_Watch_List_Date__c: string | null;

  @ApiProperty({ nullable: true, example: null })
  CCM_Primary_Industry_Group__c: string | null;

  @ApiProperty({ nullable: true, example: null })
  CCM_Assigned_Rating__c: string | null;

  @ApiProperty({ nullable: true, example: null })
  CCM_Loss_Given_Default__c: number | null;

  @ApiProperty({ nullable: true, example: '2026-08-27' })
  CCM_Credit_Risk_Rating_Date__c: string | null;

  @ApiProperty({ nullable: true, example: 'CIVIL: CONSTRUCTION' })
  CCM_Industry_Group__c: string | null;

  @ApiProperty({ nullable: true, example: 'BRIDGES' })
  CCM_Industry__c: string | null;

  @ApiProperty({ nullable: true, example: 'CIVIL: TRANSPORT MISCELLANOUS' })
  CCM_Primary_Industry__c: string | null;

  @ApiProperty({ nullable: true, example: null })
  CCM_Watch_List__c: string | null;

  @ApiProperty({ nullable: true, example: null })
  CCM_Probability_of_Default__c: number | null;
}
