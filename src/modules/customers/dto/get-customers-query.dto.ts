import { ApiProperty } from '@nestjs/swagger';
import { EXAMPLES, UKEF_ID } from '@ukef/constants';
import { ENUMS } from '@ukef/constants/enums';
import { FallbackToLegacyDataEnum } from '@ukef/constants/enums/fallbackToLegacyData';
import { regexToString } from '@ukef/helpers/regex.helper';
import { IsEnum, IsOptional, Length, Matches, MaxLength, MinLength } from 'class-validator';
export class GetCustomersQueryDto {
  @IsOptional()
  @ApiProperty({
    required: false,
    example: EXAMPLES.CUSTOMER.COMPANYREG,
    description: 'The company registration number (in the country where the customer is registered) of the customer to search for.',
  })
  @MinLength(8)
  @MaxLength(10)
  public companyReg?: string;

  @IsOptional()
  @ApiProperty({
    required: false,
    example: EXAMPLES.CUSTOMER.PARTYURN,
    description: 'The unique UKEF ID of the customer to search for.',
    pattern: regexToString(UKEF_ID.PARTY_ID.REGEX),
  })
  @Length(8)
  @Matches(UKEF_ID.PARTY_ID.REGEX)
  public partyUrn?: string;

  @IsOptional()
  @ApiProperty({
    required: false,
    example: EXAMPLES.CUSTOMER.NAME,
    description: 'The name of the customer to search for, allows partial matches, not case sensitive.',
  })
  @MinLength(2)
  @MaxLength(255)
  public name?: string;

  @IsOptional()
  @ApiProperty({
    required: false,
    example: 'legacy-only',
    default: ENUMS.FALLBACK_TO_LEGACY_DATA.YES,
    enum: ENUMS.FALLBACK_TO_LEGACY_DATA,
    description:
      "Determines if the search results will include legacy records. If this value is 'yes' then we search for a Salesforce Account first and if there are no results then we search in legacy data (from the Party DB).",
  })
  @IsEnum(ENUMS.FALLBACK_TO_LEGACY_DATA)
  public fallbackToLegacyData?: FallbackToLegacyDataEnum = ENUMS.FALLBACK_TO_LEGACY_DATA.YES;
}
