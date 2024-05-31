export type GetCompanyCompaniesHouseResponse = {
  links: {
    filing_history: string;
    self: string;
    persons_with_significant_control: string;
    officers: string;
  };
  accounts: {
    last_accounts: {
      period_end_on: string;
      type: string;
      made_up_to: string;
      period_start_on: string;
    };
    accounting_reference_date: {
      month: string;
      day: string;
    };
    overdue: boolean;
    next_made_up_to: string;
    next_due: string;
    next_accounts: {
      period_start_on: string;
      due_on: string;
      period_end_on: string;
      overdue: boolean;
    };
  };
  company_name: string;
  company_number: string;
  company_status: string;
  confirmation_statement: {
    next_made_up_to: string;
    next_due: string;
    overdue: boolean;
    last_made_up_to: string;
  };
  date_of_creation: string;
  etag: string;
  has_charges: boolean;
  has_insolvency_history: boolean;
  jurisdiction: string;
  registered_office_address: {
    organisation_name?: string;
    address_line_1: string;
    address_line_2?: string;
    address_line_3?: string;
    locality: string;
    postal_code: string;
    country: string;
  };
  registered_office_is_in_dispute: boolean;
  sic_codes: string[];
  type: string;
  undeliverable_registered_office_address: boolean;
  has_super_secure_pscs: boolean;
  can_file: boolean;
};
