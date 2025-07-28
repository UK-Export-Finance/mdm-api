import { DOM_BUSINESS_CENTRES } from '../dom.constant';
import { ODS_BUSINESS_CENTRES } from '../ods.constant';

export const EXAMPLES = {
  DOM: {
    BUSINESS_CENTRES: [
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
    ],
  },
};
