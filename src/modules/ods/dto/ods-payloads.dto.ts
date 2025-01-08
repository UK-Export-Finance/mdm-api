export class odsCustomerStoredProcedureQueryParams {
  public customer_party_unique_reference_number: string;
}

export type odsStoredProcedureQueryParams = odsCustomerStoredProcedureQueryParams;

export class odsStoredProcedureInput {
  query_method: string;
  query_object: OdsEntity;
  query_page_size: number;
  query_page_index: number;
  query_parameters: odsStoredProcedureQueryParams;
}

export const ODS_ENTITIES = {
  CUSTOMER: 'customer',
} as const;

export type OdsEntity = (typeof ODS_ENTITIES)[keyof typeof ODS_ENTITIES];
