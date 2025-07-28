// TODO:
// IQ_EBL	    Erbil             IrB   (Baghdad)
// BJ_PTN	    Porto-Novo        CzB (Cotonou)
// CA_REG	    Regina            MoB (Montreal)

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
] as const;

/**
 * Generate a dynamic object of ODS business centres.
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
