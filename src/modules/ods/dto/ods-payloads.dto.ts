// Customer Stored Procedure query params can be found here https://github.com/UK-Export-Finance/database-ods-datateam/blob/dev/t_apim/Stored%20Procedures/sp_ODS_get_customer.sql#L12
export type OdsCustomerStoredProcedureQueryParams = {
  customer_party_unique_reference_number: string;
};

export type OdsStoredProcedureQueryParams = OdsCustomerStoredProcedureQueryParams;

// Stored Procedure input definition can be found here https://github.com/UK-Export-Finance/database-ods-datateam/blob/dev/t_apim/Stored%20Procedures/sp_ODS_query.sql#L10-L14
export type OdsStoredProcedureInput = {
  query_method: string;
  query_object: OdsEntity;
  query_page_size: number;
  query_page_index: number;
  query_parameters: OdsStoredProcedureQueryParams;
};

// Stored Procedure output definition can be found here https://github.com/UK-Export-Finance/database-ods-datateam/blob/dev/t_apim/Stored%20Procedures/sp_ODS_query.sql#L279-L286
export type OdsStoredProcedureOutputBody = {
  query_request_id: string;
  message: string;
  status: 'SUCCESS' | 'ERROR';
  total_result_count: number;
  results: Record<string, any>[];
};

export const ODS_ENTITIES = {
  CUSTOMER: 'customer',
} as const;

export type OdsEntity = (typeof ODS_ENTITIES)[keyof typeof ODS_ENTITIES];
