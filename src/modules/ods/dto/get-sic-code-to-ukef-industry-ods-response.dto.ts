import { ApiProperty } from '@nestjs/swagger';
import { EXAMPLES } from '@ukef/constants';

export class GetSicCodeToUkefIndustryOdsResponseDto {
  @ApiProperty({
    description: 'SIC section code',
    example: EXAMPLES.ODS.SIC_CODE_TO_UKEF_INDUSTRY.sic_section_code,
  })
  readonly sic_section_code: string;

  @ApiProperty({
    description: 'SIC section legacy code',
    example: EXAMPLES.ODS.SIC_CODE_TO_UKEF_INDUSTRY.sic_section_legacy_code,
  })
  readonly sic_section_legacy_code: string;

  @ApiProperty({
    description: 'SIC section legacy name',
    example: EXAMPLES.ODS.SIC_CODE_TO_UKEF_INDUSTRY.sic_section_name,
  })
  readonly sic_section_name: string;

  @ApiProperty({
    description: 'SIC industry code',
    example: EXAMPLES.ODS.SIC_CODE_TO_UKEF_INDUSTRY.sic_industry_code,
  })
  readonly sic_industry_code: string;

  @ApiProperty({
    description: 'SIC industry description',
    example: EXAMPLES.ODS.SIC_CODE_TO_UKEF_INDUSTRY.sic_industry_description,
  })
  readonly sic_industry_description: string;

  @ApiProperty({
    description: 'SIC industry level',
    example: EXAMPLES.ODS.SIC_CODE_TO_UKEF_INDUSTRY.sic_industry_level,
  })
  readonly sic_industry_level: string;

  @ApiProperty({
    description: 'SIC code active',
    example: EXAMPLES.ODS.SIC_CODE_TO_UKEF_INDUSTRY.sic_code_active_flag,
  })
  readonly sic_code_active_flag: boolean;

  @ApiProperty({
    description: 'UKEF industry code',
    example: EXAMPLES.ODS.SIC_CODE_TO_UKEF_INDUSTRY.ukef_industry_code,
  })
  readonly ukef_industry_code: string;

  @ApiProperty({
    description: 'UKEF industry description',
    example: EXAMPLES.ODS.SIC_CODE_TO_UKEF_INDUSTRY.ukef_industry_description,
  })
  readonly ukef_industry_description: string;

  @ApiProperty({
    description: 'UKEF sector code',
    example: EXAMPLES.ODS.SIC_CODE_TO_UKEF_INDUSTRY.ukef_sector_code,
  })
  readonly ukef_sector_code: string;

  @ApiProperty({
    description: 'UKEF sector description',
    example: EXAMPLES.ODS.SIC_CODE_TO_UKEF_INDUSTRY.ukef_sector_description,
  })
  readonly ukef_sector_description: string;
}
