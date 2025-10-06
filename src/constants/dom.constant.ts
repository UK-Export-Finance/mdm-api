import { ODS_BUSINESS_CENTRES, ODSBusinessCentreCode } from './ods.constant';

export interface DomBusinessCentre {
  CODE: string;
  NAME: string;
}

export const DOM_BUSINESS_CENTRE_CODES = [
  'GH_ACC',
  'CI_ABJ',
  'ET_ADD',
  'JO_AMM',
  'NL_AMS',
  'IQ_BGW',
  'US_CHI',
  'LK_CMB',
  'SN_DKR',
  'QA_DOH',
  'AE_DXB',
  'IQ_EBL',
  'DE_FRA',
  'TR_IST',
  'ZA_JNB',
  'UG_KLA',
  'VC_KTN',
  'GA_LBV',
  'TG_LFW',
  'GB_LON',
  'AO_LAD',
  'ZM_LUN',
  'ES_MAD',
  'MZ_MPM',
  'CA_MTR',
  'DE_MUC',
  'OM_MCT',
  'US_NYC',
  'FR_PAR',
  'BJ_PTN',
  'CA_REG',
  'KR_SEL',
  'SG_SIN',
  'SE_STO',
  'TW_TPE',
  'TARGET',
  'JP_TYO',
  'CA_VAN',
  'AT_VIE',
  'PL_WAW',
  'CM_YAO',
  'UKEF01',
  'UKEF03',
] as const;

/**
 * Generate a union type of DOM business centre codes, e.g
 * 'GH_ACC' | 'CI_ABJ' | 'ET_ADD'
 */
export type DOMBusinessCentreCode = (typeof DOM_BUSINESS_CENTRE_CODES)[number];

/**
 * List of business centre codes to map ODS and DOM.
 * This allows consumers to send a DOM business centre code,
 * and obtain business centre data from ODS.
 * In the future, this will be replaced entirely by calling DOM.
 */
export const DOM_BUSINESS_CENTRES: Record<DOMBusinessCentreCode, DomBusinessCentre> = {
  GH_ACC: {
    CODE: 'GH_ACC',
    NAME: 'Accra',
  },
  CI_ABJ: {
    CODE: 'CI_ABJ',
    NAME: 'Abidjan',
  },
  ET_ADD: {
    CODE: 'ET_ADD',
    NAME: 'Addis Ababa',
  },
  JO_AMM: {
    CODE: 'JO_AMM',
    NAME: 'Amman',
  },
  NL_AMS: {
    CODE: 'NL_AMS',
    NAME: 'Amsterdam',
  },
  IQ_BGW: {
    CODE: 'IQ_BGW',
    NAME: 'Baghdad',
  },
  US_CHI: {
    CODE: 'US_CHI',
    NAME: 'Chicago',
  },
  LK_CMB: {
    CODE: 'LK_CMB',
    NAME: 'Colombo',
  },
  SN_DKR: {
    CODE: 'SN_DKR',
    NAME: 'Dakar',
  },
  QA_DOH: {
    CODE: 'QA_DOH',
    NAME: 'Doha',
  },
  AE_DXB: {
    CODE: 'AE_DXB',
    NAME: 'Dubai',
  },
  IQ_EBL: {
    CODE: 'IQ_EBL',
    NAME: 'Erbil',
  },
  DE_FRA: {
    CODE: 'DE_FRA',
    NAME: 'Frankfurt',
  },
  TR_IST: {
    CODE: 'TR_IST',
    NAME: 'Istanbul',
  },
  ZA_JNB: {
    CODE: 'ZA_JNB',
    NAME: 'Johannesburg',
  },
  UG_KLA: {
    CODE: 'UG_KLA',
    NAME: 'Kampala',
  },
  VC_KTN: {
    CODE: 'VC_KTN',
    NAME: 'Kingstown',
  },
  GA_LBV: {
    CODE: 'GA_LBV',
    NAME: 'Libreville',
  },
  TG_LFW: {
    CODE: 'TG_LFW',
    NAME: 'Lome',
  },
  GB_LON: {
    CODE: 'GB_LON',
    NAME: 'London',
  },
  AO_LAD: {
    CODE: 'AO_LAD',
    NAME: 'Luanda',
  },
  ZM_LUN: {
    CODE: 'ZM_LUN',
    NAME: 'Lusaka',
  },
  ES_MAD: {
    CODE: 'ES_MAD',
    NAME: 'Madrid',
  },
  MZ_MPM: {
    CODE: 'MZ_MPM',
    NAME: 'Maputo',
  },
  CA_MTR: {
    CODE: 'CA_MTR',
    NAME: 'Montreal',
  },
  DE_MUC: {
    CODE: 'DE_MUC',
    NAME: 'Munich',
  },
  OM_MCT: {
    CODE: 'OM_MCT',
    NAME: 'Muscat',
  },
  US_NYC: {
    CODE: 'US_NYC',
    NAME: 'New York',
  },
  FR_PAR: {
    CODE: 'FR_PAR',
    NAME: 'Paris',
  },
  BJ_PTN: {
    CODE: 'BJ_PTN',
    NAME: 'Porto-Novo',
  },
  CA_REG: {
    CODE: 'CA_REG',
    NAME: 'Regina',
  },
  KR_SEL: {
    CODE: 'KR_SEL',
    NAME: 'Seoul',
  },
  SG_SIN: {
    CODE: 'SG_SIN',
    NAME: 'Singapore',
  },
  SE_STO: {
    CODE: 'SE_STO',
    NAME: 'Stockholm',
  },
  TW_TPE: {
    CODE: 'TW_TPE',
    NAME: 'Taipei',
  },
  TARGET: {
    CODE: 'TARGET',
    NAME: 'Target',
  },
  JP_TYO: {
    CODE: 'JP_TYO',
    NAME: 'Tokyo',
  },
  CA_VAN: {
    CODE: 'CA_VAN',
    NAME: 'Vancouver',
  },
  AT_VIE: {
    CODE: 'AT_VIE',
    NAME: 'Vienna',
  },
  PL_WAW: {
    CODE: 'PL_WAW',
    NAME: 'Warsaw',
  },
  CM_YAO: {
    CODE: 'CM_YAO',
    NAME: 'Yaounde',
  },
  UKEF01: {
    CODE: 'UKEF01',
    NAME: 'Friday 1',
  },
  UKEF03: {
    CODE: 'UKEF03',
    NAME: 'Friday 3',
  },
};

/**
 * List of all DOM business centre codes, mapped to ODS.
 * This allows us to retrieve an ODS business centre, from a DOM business centre code.
 */
export const DOM_TO_ODS_BUSINESS_CENTRES_MAPPING: Record<DOMBusinessCentreCode, ODSBusinessCentreCode> = {
  GH_ACC: ODS_BUSINESS_CENTRES.AcB,
  CI_ABJ: ODS_BUSINESS_CENTRES.IvB,
  ET_ADD: ODS_BUSINESS_CENTRES.AqB,
  JO_AMM: ODS_BUSINESS_CENTRES.AaB,
  NL_AMS: ODS_BUSINESS_CENTRES.AmB,
  IQ_BGW: ODS_BUSINESS_CENTRES.IrB,
  US_CHI: ODS_BUSINESS_CENTRES.CGG,
  LK_CMB: ODS_BUSINESS_CENTRES.CmB,
  SN_DKR: ODS_BUSINESS_CENTRES.DxB,
  QA_DOH: ODS_BUSINESS_CENTRES.DoB,
  AE_DXB: ODS_BUSINESS_CENTRES.DbB,
  IQ_EBL: ODS_BUSINESS_CENTRES.IrB,
  DE_FRA: ODS_BUSINESS_CENTRES.FrB,
  TR_IST: ODS_BUSINESS_CENTRES.IsB,
  ZA_JNB: ODS_BUSINESS_CENTRES.JoB,
  UG_KLA: ODS_BUSINESS_CENTRES.KpB,
  VC_KTN: ODS_BUSINESS_CENTRES.KwB,
  GA_LBV: ODS_BUSINESS_CENTRES.LeB,
  TG_LFW: ODS_BUSINESS_CENTRES.LoB,
  GB_LON: ODS_BUSINESS_CENTRES.LnB,
  AO_LAD: ODS_BUSINESS_CENTRES.LdB,
  ZM_LUN: ODS_BUSINESS_CENTRES.LkB,
  ES_MAD: ODS_BUSINESS_CENTRES.MdB,
  MZ_MPM: ODS_BUSINESS_CENTRES.MpB,
  CA_MTR: ODS_BUSINESS_CENTRES.MoB,
  DE_MUC: ODS_BUSINESS_CENTRES.MuB,
  OM_MCT: ODS_BUSINESS_CENTRES.McB,
  US_NYC: ODS_BUSINESS_CENTRES.NYB,
  FR_PAR: ODS_BUSINESS_CENTRES.PaB,
  BJ_PTN: ODS_BUSINESS_CENTRES.CzB,
  CA_REG: ODS_BUSINESS_CENTRES.MoB,
  KR_SEL: ODS_BUSINESS_CENTRES.SeB,
  SG_SIN: ODS_BUSINESS_CENTRES.SiB,
  SE_STO: ODS_BUSINESS_CENTRES.StB,
  TW_TPE: ODS_BUSINESS_CENTRES.TpB,
  TARGET: ODS_BUSINESS_CENTRES.Tgt,
  JP_TYO: ODS_BUSINESS_CENTRES.TkB,
  CA_VAN: ODS_BUSINESS_CENTRES.VaB,
  AT_VIE: ODS_BUSINESS_CENTRES.ViB,
  PL_WAW: ODS_BUSINESS_CENTRES.WaB,
  CM_YAO: ODS_BUSINESS_CENTRES.YnB,
  UKEF01: ODS_BUSINESS_CENTRES.UKEF01,
  UKEF03: ODS_BUSINESS_CENTRES.UKEF03,
};
