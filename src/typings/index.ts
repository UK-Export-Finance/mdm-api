import { OdsEntity, OdsStoredProcedureQueryParams } from '@ukef/modules/ods/dto';

export interface CreateOdsStoredProcedureInputParams {
  entityToQuery: OdsEntity;
  queryPageSize?: number;
  queryParameters?: OdsStoredProcedureQueryParams;
}
