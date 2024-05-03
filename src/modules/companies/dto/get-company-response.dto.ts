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
  sicCodes: string[];
}
