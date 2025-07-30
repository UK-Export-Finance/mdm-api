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
] as const;

/**
 * Generate a union type of DOM business centre codes, e.g
 * 'GH_ACC' | 'CI_ABJ' | 'ET_ADD'
 */
type DOMBusinessCentreCode = (typeof DOM_BUSINESS_CENTRE_CODES)[number];

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
};
