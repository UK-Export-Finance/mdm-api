import { DOM_BUSINESS_CENTRES } from '../dom.constant';
import { ODS_BUSINESS_CENTRES } from '../ods.constant';

export const EXAMPLES = {
  DOM: {
    BUSINESS_CENTRES: [
      {
        code: DOM_BUSINESS_CENTRES.AE_DXB.CODE,
        name: DOM_BUSINESS_CENTRES.AE_DXB.NAME,
      },
      {
        code: DOM_BUSINESS_CENTRES.JO_AMM.CODE,
        name: DOM_BUSINESS_CENTRES.JO_AMM.NAME,
      },
      {
        code: DOM_BUSINESS_CENTRES.SE_STO.CODE,
        name: DOM_BUSINESS_CENTRES.SE_STO.NAME,
      },
    ],
    PRODUCT_CONFIG: {
      mockProduct: true,
    },
    PRODUCT_CONFIGURATIONS: [{ mockProduct: true }, { mockProduct: true }],
  },
  ODS: {
    BUSINESS_CENTRES: [
      {
        business_centre_code: ODS_BUSINESS_CENTRES.AaB,
        business_centre_name: 'Mock name AaB',
      },
      {
        business_centre_code: ODS_BUSINESS_CENTRES.JoB,
        business_centre_name: 'Mock name JoB',
      },
      {
        business_centre_code: ODS_BUSINESS_CENTRES.StB,
        business_centre_name: 'Mock name StB',
      },
    ],
  },
};
