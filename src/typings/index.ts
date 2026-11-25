import { OdsEntity, OdsStoredProcedureQueryParams } from '@ukef/modules/ods/dto';

export type CreateOdsStoredProcedureInputParams = {
  entityToQuery: OdsEntity;
  queryPageSize?: number;
  queryParameters?: OdsStoredProcedureQueryParams;
};
