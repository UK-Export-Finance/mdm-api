/**
 *         "id": 13,
        "name": "Hong Kong Dollars",
        "isoCode": "HKD",
        "created": "2017-03-06T16:20:16",
        "updated": "2017-03-06T16:20:16",
        "effectiveFrom": "2017-03-07T10:44:47",
        "effectiveTo": "9999-12-31T00:00:00",
        "acbsCode": "C"
 */

// import { IsDateString, IsISO4217CurrencyCode, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';
import { format } from 'date-fns';

export class GetCurrencyExchangeDto {
  readonly id: number;
  readonly name: string;
  readonly isoCode: string;

  @Transform(({ value }) => format(value, "yyyy-MM-dd'T'HH:mm:ss"))
  readonly created: string;
  readonly exchangeRateDate: string;
}
