/**
 * Customer, Deal, Business centre, Counterparty roles, Industry, Accrual schedule classifications, Accrual frequencies, Facility classifications.
 * Stored Procedure query params can be found here:
 * https://github.com/UK-Export-Finance/database-ods-datateam/blob/dev/t_apim/Stored%20Procedures/sp_ODS_get_customer.sql
 * https://github.com/UK-Export-Finance/database-ods-datateam/blob/dev/t_apim/Stored%20Procedures/sp_ODS_get_deal.sql
 * https://github.com/UK-Export-Finance/database-ods-datateam/blob/dev/t_apim/Stored%20Procedures/sp_ODS_get_business_centre.sql
 * https://github.com/UK-Export-Finance/database-ods-datateam/blob/dev/t_apim/Stored%20Procedures/sp_ODS_get_business_centre_non_working_day.sql
 * https://github.com/UK-Export-Finance/database-ods-datateam/blob/dev/t_apim/Stored%20Procedures/sp_ODS_get_industry.sql
 * https://github.com/UK-Export-Finance/database-ods-datateam/blob/dev/t_apim/Stored%20Procedures/sp_ODS_get_accrual_schedule_classification.sql
 * https://github.com/UK-Export-Finance/database-ods-datateam/blob/dev/t_apim/Stored%20Procedures/sp_ODS_get_facility_classification.sql
 * https://github.com/UK-Export-Finance/database-ods-datateam/blob/dev/t_apim/Stored%20Procedures/sp_ODS_get_configuration_frequency.sql
 * https://github.com/UK-Export-Finance/database-ods-datateam/blob/dev/t_apim/Stored%20Procedures/sp_ODS_get_configuration_counterparty_role.sql
 */
export type OdsStoredProcedureQueryParams = {
  business_centre_code?: string;
  classification_code?: string;
  classification_type_code?: string;
  counterpartyRoleType?: string;
  customer_party_unique_reference_number?: string;
  deal_code?: string;
  frequencyCode?: string;
  industry_category?: string;
  industry_code?: string;
  code?: string;
};

/**
 * Stored Procedure input definition can be found here:
 * https://github.com/UK-Export-Finance/database-ods-datateam/blob/dev/t_apim/Stored%20Procedures/sp_ODS_query.sql#L10-L14
 */
export type OdsStoredProcedureInput = {
  query_method: string;
  query_object: OdsEntity;
  query_page_size?: number;
  query_page_index: number;
  query_parameters: OdsStoredProcedureQueryParams;
};

/**
 * Stored Procedure output definition can be found here:
 * https://github.com/UK-Export-Finance/database-ods-datateam/blob/dev/t_apim/Stored%20Procedures/sp_ODS_query.sql#L279-L286
 */
export type OdsStoredProcedureOutputBody = {
  query_request_id: string;
  message: string;
  status: 'SUCCESS' | 'ERROR';
  total_result_count: number;
  results: Record<string, any>[];
};

export const ODS_ENTITIES = {
  ACCRUAL_SCHEDULE_CLASSIFICATION: 'accrual_schedule_classification',
  CONFIGURATION_FREQUENCY: 'configuration_frequency',
  CONFIGURATION_ACCRUAL_SCHEDULE: 'configuration_accrual_schedule',
  BUSINESS_CENTRE: 'business_centre',
  BUSINESS_CENTRE_NON_WORKING_DAY: 'business_centre_non_working_day',
  CONFIGURATION_COUNTERPARTY_ROLE: 'configuration_counterparty_role',
  CONFIGURATION_PRODUCT: 'configuration_product',
  CUSTOMER: 'customer',
  DEAL: 'deal',
  FACILITY_CLASSIFICATION: 'facility_classification',
  OBLIGATION_CLASSIFICATION: 'obligation_classification',
  INDUSTRY: 'industry',
} as const;

export type OdsEntity = (typeof ODS_ENTITIES)[keyof typeof ODS_ENTITIES];

export const ODS_QUERY_PARAM_VALUES = {
  OBLIGATION_SUBTYPE: 'obligationSubtype',
  FACILITY_CATEGORY: 'facilityCategory',
  COUNTERPARTY_ROLE_TYPE: 'counterpartyRoleType',
  UKEF: 'UKEF',
} as const;

export type OdsQueryParamValues = (typeof ODS_QUERY_PARAM_VALUES)[keyof typeof ODS_QUERY_PARAM_VALUES];
