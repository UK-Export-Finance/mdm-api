export class GetCompanyResponse {
  companiesHouseRegistrationNumber: string;
  companyName: string;
  registeredAddress: {
    organisationName: string | undefined;
    addressLine1: string;
    addressLine2: string | undefined;
    addressLine3: string | undefined;
    locality: string;
    postalCode: string;
    country: string;
  };
  sicCodes: string[];
}
