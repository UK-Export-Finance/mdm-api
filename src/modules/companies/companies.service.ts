import { Injectable } from '@nestjs/common';
import { CompaniesHouseService } from '@ukef/helper-modules/companies-house/companies-house.service';

import { SectorIndustriesService } from '../sector-industries/sector-industries.service';
import { GetCompanyResponse } from './dto/get-company-response.dto';

@Injectable()
export class CompaniesService {
  constructor(
    private readonly companiesHouseService: CompaniesHouseService,
    private readonly sectorIndustriesService: SectorIndustriesService,
  ) {}

  // eslint-disable-next-line unused-imports/no-unused-vars, require-await
  async getCompanyByRegistrationNumber(registrationNumber: string): Promise<GetCompanyResponse> {
    // make requests via companiesHouseService and sectorIndustriesService and do mapping
    return null;
  }
}
