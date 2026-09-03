import { OdsStoredProcedureOutputBody } from '@ukef/modules/ods/dto/ods-payloads.dto';

/**
 * Checks if the result of an ODS stored procedure is empty.
 *
 * @param storedProcedureJson The JSON output from the ODS stored procedure
 * @returns {boolean} True if the stored procedure result is empty, false otherwise
 */
export const isStoredProcedureResultEmpty = (storedProcedureJson?: OdsStoredProcedureOutputBody): boolean => {
  return !storedProcedureJson || storedProcedureJson?.total_result_count === 0 || !storedProcedureJson?.results?.length;
};
