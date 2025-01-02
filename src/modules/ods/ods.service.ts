import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { GetOdsCustomerResponse } from './dto/get-ods-customer-response.dto';
import { InjectDataSource } from '@nestjs/typeorm';
import { DATABASE } from '@ukef/constants';
import { DataSource } from 'typeorm';
import { PinoLogger } from 'nestjs-pino';

@Injectable()
export class OdsService {
  constructor(
    @InjectDataSource(DATABASE.ODS)
    private readonly odsDataSource: DataSource,
    private readonly logger: PinoLogger,
  ) {}

  async getCustomer(partyUrn: string): Promise<GetOdsCustomerResponse> {
    const queryRunner = this.odsDataSource.createQueryRunner();
    try {
      const spInput = JSON.stringify({
        query_method: 'get',
        query_object: 'customer',
        query_page_size: 1,
        query_page_index: 1,
        query_parameters: {
          customer_party_unique_reference_number: partyUrn,
        },
      });
      let outputBody;

      // Use the query runner to call a stored procedure
      const result = await queryRunner.query(
        `
        DECLARE @output_body NVARCHAR(MAX);
        EXEC t_apim.sp_ODS_query @input_body=@0, @output_body=@output_body OUTPUT;
        SELECT @output_body as output_body
      `,
        [spInput, outputBody],
      );

      console.log(result);
      const resultJson = JSON.parse(result[0].output_body);
      console.log(resultJson);

      if (resultJson.status != 'SUCCESS') {
        throw new InternalServerErrorException('Error trying to find a customer');
      }

      if (resultJson.total_result_count == 0) {
        throw new NotFoundException('No matching customer found');
      }

      return { partyUrn: resultJson.results[0].customer_party_unique_reference_number, name: resultJson.results[0].customer_name };
    } catch (err) {
      if (err instanceof NotFoundException) {
        this.logger.warn(err);
        throw err;
      } else {
        this.logger.error(err);
        throw new InternalServerErrorException();
      }
    } finally {
      queryRunner.release();
    }
  }
}
