export class GetCompanyResponse {
  companiesHouseRegistrationNumber: string;
  companyName: string;
  registeredAddress: {
    organisationName?: string;
    addressLine1: string;
    addressLine2?: string;
    addressLine3?: string;
    locality: string;
    postalCode: string;
    country: string;
  };
  industries: Industry[];
}

export class Industry {
  sector: {
    code: string;
    name: string;
  };
  class: {
    code: string;
    name: string;
  };
}
