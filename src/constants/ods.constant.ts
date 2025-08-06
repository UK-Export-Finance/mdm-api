const ODS_BUSINESS_CENTRE_CODES = [
  'AcB',
  'IvB',
  'AqB',
  'AaB',
  'AmB',
  'CGG',
  'CmB',
  'DxB',
  'DoB',
  'DbB',
  'FrB',
  'IrB',
  'IsB',
  'JoB',
  'KpB',
  'KwB',
  'LeB',
  'LoB',
  'LnB',
  'LdB',
  'LkB',
  'MdB',
  'MoB',
  'MpB',
  'MuB',
  'McB',
  'NYB',
  'PaB',
  'CzB',
  'SeB',
  'SiB',
  'StB',
  'TpB',
  'Tgt',
  'TkB',
  'VaB',
  'ViB',
  'WaB',
  'YnB',
  'UKEF01',
  'UKEF03',
] as const;

/**
 * Generate a dynamic object of ODS business centres.
 * @returns {object}
 * @example
 * ```ts
 * {
 *   'A': 'A',
 *   'B': 'B',
 *   'C': 'C',
 * }
 * ```
 */
export const ODS_BUSINESS_CENTRES = Object.fromEntries(ODS_BUSINESS_CENTRE_CODES.map((name) => [name, name])) as {
  [CentreName in (typeof ODS_BUSINESS_CENTRE_CODES)[number]]: CentreName;
};

/**
 * Generate a union type of ODS business centre codes, e.g
 * 'AcB' | 'IvB' | 'AqB'
 */
export type ODSBusinessCentreCode = (typeof ODS_BUSINESS_CENTRE_CODES)[number];
