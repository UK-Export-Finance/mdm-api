class AccountsReferenceDate {
  day: string;
  month: string;
}

class AccountsLastAccounts {
  madeUpTo: string;
  periodEndOn: string;
  periodStartOn: string;
  type: string;
}

class AccountsNextAccounts {
  dueOn?: string;
  overdue?: boolean;
  periodEndOn?: string;
  periodStartOn?: string;
}

class Accounts {
  accountingReferenceDate?: AccountsReferenceDate;
  lastAccounts?: AccountsLastAccounts;
  nextAccounts?: AccountsNextAccounts;
  nextDue?: string;
  nextMadeUpTo?: string;
  overdue?: boolean;
}

class RegisteredAddress {
  organisationName?: string;
  addressLine1?: string;
  addressLine2?: string;
  addressLine3?: string;
  careOf?: string;
  country?: string;
  locality?: string;
  postalCode?: string;
  premises?: string;
  region?: string;
}

export class GetCompanyResponse {
  accounts: Accounts;
  companiesHouseRegistrationNumber: string;
  companyName: string;
  dateOfCreation: string;
  registeredAddress: RegisteredAddress;
  industries: Industry[];
  isActive: boolean;
}

export class Industry {
  code: string;
  name: string;
  class: {
    code: string;
    name: string;
  };
}
