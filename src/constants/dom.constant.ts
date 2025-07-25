import { GetOdsBusinessCentreResponse } from '@ukef/modules/ods/dto';

// IQ_EBL	    Erbil             IrB   (Baghdad)
// BJ_PTN	    Porto-Novo        CzB (Cotonou)
// CA_REG	    Regina            MoB (Montreal)

// TODO: type safety

export const ODS_BUSINESS_CENTRES = {
  AcB: 'AcB',
  IvB: 'IvB',
  AqB: 'AqB',
  AaB: 'AaB',
  AmB: 'AmB',
  CGG: 'CGG',
  CmB: 'CmB',
  DxB: 'DxB',
  DoB: 'DoB',
  DbB: 'DbB',
  FrB: 'FrB',
  IsB: 'IsB',
  JoB: 'JoB',
  KpB: 'KpB',
  KwB: 'KwB',
  LeB: 'LeB',
  LoB: 'LoB',
  LnB: 'LnB',
  LdB: 'LdB',
  LkB: 'LkB',
  MdB: 'MdB',
  MpB: 'MpB',
  MuB: 'MuB',
  McB: 'McB',
  NYB: 'NYB',
  PaB: 'PaB',
  CzB: 'CzB',
  SeB: 'SeB',
  SiB: 'SiB',
  StB: 'StB',
  TpB: 'TpB',
  Tgt: 'Tgt',
  TkB: 'TkB',
  VaB: 'VaB',
  ViB: 'ViB',
  WaB: 'WaB',
  YnB: 'YnB',
};

/**
 * List of business centre codes to map ODS and DOM.
 * This allows consumers to send a DOM business centre code,
 * and obtain business centre data from ODS.
 * In the future, this will be replaced entirely by calling DOM.
 */
export const DOM_BUSINESS_CENTRES = {
  [ODS_BUSINESS_CENTRES.AcB]: {
    CODE: 'GH_ACC',
    NAME: 'Accra',
  },
  [ODS_BUSINESS_CENTRES.IvB]: {
    CODE: 'CI_ABJ',
    NAME: 'Abidjan',
  },
  [ODS_BUSINESS_CENTRES.AqB]: {
    CODE: 'ET_ADD',
    NAME: 'Addis Ababa',
  },
  [ODS_BUSINESS_CENTRES.AaB]: {
    CODE: 'JO_AMM',
    NAME: 'Amman',
  },
  [ODS_BUSINESS_CENTRES.AmB]: {
    CODE: 'NL_AMS',
    NAME: 'Amsterdam',
  },
  // IrB: 'IQ_BGW',
  [ODS_BUSINESS_CENTRES.CGG]: {
    CODE: 'US_CHI',
    NAME: 'Chicago',
  },
  [ODS_BUSINESS_CENTRES.CmB]: {
    CODE: 'LK_CMB',
    NAME: 'Colombo',
  },
  [ODS_BUSINESS_CENTRES.DxB]: {
    CODE: 'SN_DKR',
    NAME: 'Dakar',
  },
  [ODS_BUSINESS_CENTRES.DoB]: {
    CODE: 'QA_DOH',
    NAME: 'Doha',
  },
  [ODS_BUSINESS_CENTRES.DbB]: {
    CODE: 'AE_DXB',
    NAME: 'Dubai',
  },
  // IrB: 'IQ_EBL',
  [ODS_BUSINESS_CENTRES.FrB]: {
    CODE: 'DE_FRA',
    NAME: 'Frankfurt',
  },
  [ODS_BUSINESS_CENTRES.IsB]: {
    CODE: 'TR_IST',
    NAME: 'Istanbul',
  },
  [ODS_BUSINESS_CENTRES.JoB]: {
    CODE: 'ZA_JNB',
    NAME: 'Johannesburg',
  },
  [ODS_BUSINESS_CENTRES.KpB]: {
    CODE: 'UG_KLA',
    NAME: 'Kampala',
  },
  [ODS_BUSINESS_CENTRES.KwB]: {
    CODE: 'VC_KTN',
    NAME: 'Kingstown',
  },
  [ODS_BUSINESS_CENTRES.LeB]: {
    CODE: 'GA_LBV',
    NAME: 'Libreville',
  },
  [ODS_BUSINESS_CENTRES.LoB]: {
    CODE: 'TG_LFW',
    NAME: 'Lome',
  },
  [ODS_BUSINESS_CENTRES.LnB]: {
    CODE: 'GB_LON',
    NAME: 'London',
  },
  [ODS_BUSINESS_CENTRES.LdB]: {
    CODE: 'AO_LAD',
    NAME: 'Luanda',
  },
  [ODS_BUSINESS_CENTRES.LkB]: {
    CODE: 'ZM_LUN',
    NAME: 'Lusaka',
  },
  [ODS_BUSINESS_CENTRES.MdB]: {
    CODE: 'ES_MAD',
    NAME: 'Madrid',
  },
  [ODS_BUSINESS_CENTRES.MpB]: {
    CODE: 'MZ_MPM',
    NAME: 'Maputo',
  },
  // MoB: 'CA_MTR',
  [ODS_BUSINESS_CENTRES.MuB]: {
    CODE: 'DE_MUC',
    NAME: 'Munich',
  },
  [ODS_BUSINESS_CENTRES.McB]: {
    CODE: 'OM_MCT',
    NAME: 'Muscat',
  },
  [ODS_BUSINESS_CENTRES.NYB]: {
    CODE: 'US_NYC',
    NAME: 'New York',
  },
  [ODS_BUSINESS_CENTRES.PaB]: {
    CODE: 'FR_PAR',
    NAME: 'Paris',
  },
  [ODS_BUSINESS_CENTRES.CzB]: {
    CODE: 'BJ_PTN',
    NAME: 'Porto-Novo',
  },
  // MoB: 'CA_REG',
  [ODS_BUSINESS_CENTRES.SeB]: {
    CODE: 'KR_SEL',
    NAME: 'Seoul',
  },
  [ODS_BUSINESS_CENTRES.SiB]: {
    CODE: 'SG_SIN',
    NAME: 'Singapore',
  },
  [ODS_BUSINESS_CENTRES.StB]: {
    CODE: 'SE_STO',
    NAME: 'Stockholm',
  },
  [ODS_BUSINESS_CENTRES.TpB]: {
    CODE: 'TW_TPE',
    NAME: 'Taipei',
  },
  [ODS_BUSINESS_CENTRES.Tgt]: {
    CODE: 'TARGET',
    NAME: 'Target',
  },
  [ODS_BUSINESS_CENTRES.TkB]: {
    CODE: 'JP_TYO',
    NAME: 'Tokyo',
  },
  [ODS_BUSINESS_CENTRES.VaB]: {
    CODE: 'CA_VAN',
    NAME: 'Vancouver',
  },
  [ODS_BUSINESS_CENTRES.ViB]: {
    CODE: 'AT_VIE',
    NAME: 'Vienna',
  },
  [ODS_BUSINESS_CENTRES.WaB]: {
    CODE: 'PL_WAW',
    NAME: 'Warsaw',
  },
  [ODS_BUSINESS_CENTRES.YnB]: {
    CODE: 'CM_YAO',
    NAME: 'Yaounde',
  },
};

// TODO: move to examples constant
export const MOCK_DOM_BUSINESS_CENTRES = [
  {
    code: DOM_BUSINESS_CENTRES.AaB.CODE,
    name: DOM_BUSINESS_CENTRES.AaB.NAME,
  },
  {
    code: DOM_BUSINESS_CENTRES.JoB.CODE,
    name: DOM_BUSINESS_CENTRES.JoB.NAME,
  },
  {
    code: DOM_BUSINESS_CENTRES.StB.CODE,
    name: DOM_BUSINESS_CENTRES.StB.NAME,
  },
];

export const MOCK_ODS_BUSINESS_CENTRES: GetOdsBusinessCentreResponse[] = [
  {
    business_centre_code: ODS_BUSINESS_CENTRES.AaB,
    business_centre_name: 'Mock name A',
  },
  {
    business_centre_code: ODS_BUSINESS_CENTRES.JoB,
    business_centre_name: 'Mock name B',
  },
  {
    business_centre_code: ODS_BUSINESS_CENTRES.StB,
    business_centre_name: 'Mock name C',
  },
];

export const MOCK_PRODUCT_CONFIG = {
  mockProduct: true,
};

export const MOCK_PRODUCT_CONFIGURATIONS = [MOCK_PRODUCT_CONFIG, MOCK_PRODUCT_CONFIG];
