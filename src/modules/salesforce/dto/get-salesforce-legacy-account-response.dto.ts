import { ApiProperty } from '@nestjs/swagger';
import { EXAMPLES } from '@ukef/constants';

export class SalesforceLegacyAccountAttributesDto {
  @ApiProperty({ example: EXAMPLES.SALESFORCE_LEGACY_ACCOUNT.ATTRIBUTES.TYPE })
  type: string;

  @ApiProperty({ example: EXAMPLES.SALESFORCE_LEGACY_ACCOUNT.ATTRIBUTES.URL })
  url: string;
}

export class GetSalesforceLegacyAccountResponseDto {
  @ApiProperty({ type: SalesforceLegacyAccountAttributesDto })
  attributes: SalesforceLegacyAccountAttributesDto;

  @ApiProperty({ example: EXAMPLES.CUSTOMER.SALESFORCE_ID })
  Id: string;

  @ApiProperty({ example: EXAMPLES.SALESFORCE_LEGACY_ACCOUNT.OWNER_ID })
  OwnerId: string;

  @ApiProperty({ example: EXAMPLES.SALESFORCE_LEGACY_ACCOUNT.IS_DELETED })
  IsDeleted: boolean;

  @ApiProperty({ example: EXAMPLES.SALESFORCE_LEGACY_ACCOUNT.NAME })
  Name: string;

  @ApiProperty({ example: EXAMPLES.SALESFORCE_LEGACY_ACCOUNT.CURRENCY_ISO_CODE })
  CurrencyIsoCode: string;

  @ApiProperty({ example: EXAMPLES.SALESFORCE_LEGACY_ACCOUNT.CREATED_DATE })
  CreatedDate: string;

  @ApiProperty({ example: EXAMPLES.SALESFORCE_LEGACY_ACCOUNT.CREATED_BY_ID })
  CreatedById: string;

  @ApiProperty({ example: EXAMPLES.SALESFORCE_LEGACY_ACCOUNT.LAST_MODIFIED_DATE })
  LastModifiedDate: string;

  @ApiProperty({ example: EXAMPLES.SALESFORCE_LEGACY_ACCOUNT.LAST_MODIFIED_BY_ID })
  LastModifiedById: string;

  @ApiProperty({ example: EXAMPLES.SALESFORCE_LEGACY_ACCOUNT.SYSTEM_MODSTAMP })
  SystemModstamp: string;

  @ApiProperty({ nullable: true, example: null })
  LastActivityDate: string | null;

  @ApiProperty({ nullable: true, example: null })
  LastViewedDate: string | null;

  @ApiProperty({ nullable: true, example: null })
  LastReferencedDate: string | null;

  @ApiProperty({ nullable: true, example: null })
  Account__c: string | null;

  @ApiProperty({ nullable: true, example: EXAMPLES.SALESFORCE_LEGACY_ACCOUNT.ACCOUNT_ID })
  M2_1_MCD_Account_ID__c: string | null;

  @ApiProperty({ nullable: true, example: null })
  M2_1_MCD_CH_SIC_Code_1__c: string | null;

  @ApiProperty({ nullable: true, example: null })
  M2_1_MCD_CH_SIC_Code_2__c: string | null;

  @ApiProperty({ nullable: true, example: null })
  M2_1_MCD_Charity_Address_Line_1__c: string | null;

  @ApiProperty({ nullable: true, example: null })
  M2_1_MCD_Charity_Address_Line_2__c: string | null;

  @ApiProperty({ nullable: true, example: null })
  M2_1_MCD_Charity_Address_Line_3__c: string | null;

  @ApiProperty({ nullable: true, example: null })
  M2_1_MCD_Charity_City__c: string | null;

  @ApiProperty({ nullable: true, example: null })
  M2_1_MCD_Charity_Country__c: string | null;

  @ApiProperty({ nullable: true, example: null })
  M2_1_MCD_Charity_County__c: string | null;

  @ApiProperty({ nullable: true, example: null })
  M2_1_MCD_Charity_Postcode__c: string | null;

  @ApiProperty({ nullable: true, example: null })
  M2_1_MCD_Charity_Reg_Name__c: string | null;

  @ApiProperty({ nullable: true, example: null })
  M2_1_MCD_Charity_Reg_Number__c: string | null;

  @ApiProperty({ nullable: true, example: null })
  M2_1_MCD_Charity_State__c: string | null;

  @ApiProperty({ nullable: true, example: null })
  M2_1_MCD_Company_Reg_Name__c: string | null;

  @ApiProperty({ nullable: true, example: EXAMPLES.CUSTOMER.COMPANYREG })
  M2_1_MCD_Company_Reg_Number__c: string | null;

  @ApiProperty({ nullable: true, example: null })
  M2_1_MCD_Country_Established__c: string | null;

  @ApiProperty({ nullable: true, example: null })
  M2_1_MCD_Country_Incorporated__c: string | null;

  @ApiProperty({ nullable: true, example: null })
  M2_1_MCD_Created_By__c: string | null;

  @ApiProperty({ nullable: true, example: null })
  M2_1_MCD_Date_Established__c: string | null;

  @ApiProperty({ nullable: true, example: null })
  M2_1_MCD_Date_Incorporated__c: string | null;

  @ApiProperty({ nullable: true, example: null })
  M2_1_MCD_Duns_No__c: string | null;

  @ApiProperty({ nullable: true, example: null })
  M2_1_MCD_HQ_Address_Line_1__c: string | null;

  @ApiProperty({ nullable: true, example: null })
  M2_1_MCD_HQ_Address_Line_2__c: string | null;

  @ApiProperty({ nullable: true, example: null })
  M2_1_MCD_HQ_Address_Line_3__c: string | null;

  @ApiProperty({ nullable: true, example: null })
  M2_1_MCD_HQ_City__c: string | null;

  @ApiProperty({ nullable: true, example: EXAMPLES.SALESFORCE_LEGACY_ACCOUNT.HQ_COUNTRY })
  M2_1_MCD_HQ_Country__c: string | null;

  @ApiProperty({ nullable: true, example: null })
  M2_1_MCD_HQ_County__c: string | null;

  @ApiProperty({ nullable: true, example: null })
  M2_1_MCD_HQ_Postcode__c: string | null;

  @ApiProperty({ nullable: true, example: null })
  M2_1_MCD_HQ_State__c: string | null;

  @ApiProperty({ nullable: true, example: null })
  M2_1_MCD_Oseas_Company_Reg_Number__c: string | null;

  @ApiProperty({ nullable: true, example: EXAMPLES.CUSTOMER.NAME })
  M2_1_MCD_Party_Name__c: string | null;

  @ApiProperty({ nullable: true, example: null })
  M2_1_MCD_Party_SME__c: string | null;

  @ApiProperty({ nullable: true, example: EXAMPLES.SALESFORCE_LEGACY_ACCOUNT.PARTY_STATUS })
  M2_1_MCD_Party_Status__c: string | null;

  @ApiProperty({ nullable: true, example: EXAMPLES.CUSTOMER.SALESFORCE_SUBTYPE })
  M2_1_MCD_Party_Sub_Type__c: string | null;

  @ApiProperty({ nullable: true, example: EXAMPLES.CUSTOMER.SALESFORCE_TYPE })
  M2_1_MCD_Party_Type__c: string | null;

  @ApiProperty({ nullable: true, example: EXAMPLES.CUSTOMER.PARTYURN })
  M2_1_MCD_Party_URN__c: string | null;

  @ApiProperty({ nullable: true, example: EXAMPLES.CUSTOMER.UK_ENTITY })
  M2_1_MCD_UK_or_Overseas__c: string | null;

  @ApiProperty({ nullable: true, example: null })
  M2_1_MCD_Website__c: string | null;

  @ApiProperty({ nullable: true, example: null })
  LDP_Case_Safe_Id__c: string | null;
}
