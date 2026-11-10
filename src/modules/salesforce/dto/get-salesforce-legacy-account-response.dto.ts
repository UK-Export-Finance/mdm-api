import { ApiProperty } from '@nestjs/swagger';

export class SalesforceLegacyAccountAttributesDto {
  @ApiProperty({ example: 'M2_1_MCD_Legacy_Data_Party__c' })
  type: string;

  @ApiProperty({ example: '/services/data/v53.0/sobjects/M2_1_MCD_Legacy_Data_Party__c/a0J3L000001qmOuUAI' })
  url: string;
}

export class GetSalesforceLegacyAccountResponseDto {
  @ApiProperty({ type: SalesforceLegacyAccountAttributesDto })
  attributes: SalesforceLegacyAccountAttributesDto;

  @ApiProperty({ example: 'a0J3L000001qmOuUAI' })
  Id: string;

  @ApiProperty({ example: '0056700000Ax3PUAAZ' })
  OwnerId: string;

  @ApiProperty({ example: false })
  IsDeleted: boolean;

  @ApiProperty({ example: 'LD-25202' })
  Name: string;

  @ApiProperty({ example: 'GBP' })
  CurrencyIsoCode: string;

  @ApiProperty({ example: '2023-11-11T12:14:58.000+0000' })
  CreatedDate: string;

  @ApiProperty({ example: '0056700000Ax3PUAAZ' })
  CreatedById: string;

  @ApiProperty({ example: '2023-11-11T12:14:59.000+0000' })
  LastModifiedDate: string;

  @ApiProperty({ example: '0056700000Ax3PUAAZ' })
  LastModifiedById: string;

  @ApiProperty({ example: '2023-11-11T12:15:01.000+0000' })
  SystemModstamp: string;

  @ApiProperty({ nullable: true, example: null })
  LastActivityDate: string | null;

  @ApiProperty({ nullable: true, example: null })
  LastViewedDate: string | null;

  @ApiProperty({ nullable: true, example: null })
  LastReferencedDate: string | null;

  @ApiProperty({ nullable: true, example: null })
  Account__c: string | null;

  @ApiProperty({ nullable: true, example: '0013L00000LZiAtQAL' })
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

  @ApiProperty({ nullable: true, example: null })
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

  @ApiProperty({ nullable: true, example: 'Turkey' })
  M2_1_MCD_HQ_Country__c: string | null;

  @ApiProperty({ nullable: true, example: null })
  M2_1_MCD_HQ_County__c: string | null;

  @ApiProperty({ nullable: true, example: null })
  M2_1_MCD_HQ_Postcode__c: string | null;

  @ApiProperty({ nullable: true, example: null })
  M2_1_MCD_HQ_State__c: string | null;

  @ApiProperty({ nullable: true, example: null })
  M2_1_MCD_Oseas_Company_Reg_Number__c: string | null;

  @ApiProperty({ nullable: true, example: 'test_stp_4' })
  M2_1_MCD_Party_Name__c: string | null;

  @ApiProperty({ nullable: true, example: null })
  M2_1_MCD_Party_SME__c: string | null;

  @ApiProperty({ nullable: true, example: 'Duplicate' })
  M2_1_MCD_Party_Status__c: string | null;

  @ApiProperty({ nullable: true, example: null })
  M2_1_MCD_Party_Sub_Type__c: string | null;

  @ApiProperty({ nullable: true, example: null })
  M2_1_MCD_Party_Type__c: string | null;

  @ApiProperty({ nullable: true, example: '00325130' })
  M2_1_MCD_Party_URN__c: string | null;

  @ApiProperty({ nullable: true, example: null })
  M2_1_MCD_UK_or_Overseas__c: string | null;

  @ApiProperty({ nullable: true, example: null })
  M2_1_MCD_Website__c: string | null;

  @ApiProperty({ nullable: true, example: null })
  LDP_Case_Safe_Id__c: string | null;
}
