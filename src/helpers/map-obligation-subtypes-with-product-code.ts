import { GetObligationSubtypeResponseDto, GetProductConfigOdsResponse } from '@ukef/modules/ods/dto';

type MapObligationSubtypesWithProductCodeParams = {
  productConfigs: GetProductConfigOdsResponse[];
  obligationSubtypes: GetObligationSubtypeResponseDto[];
};

/**
 * Map obligation subtypes with product type code, by matching the obligation subtype codes in the product configs, with the obligation subtypes from ODS.
 * @param {GetProductConfigOdsResponse[]} Product configurations from ODS, which contain the obligation subtype codes and product type code
 * @param {GetObligationSubtypeResponseDto[]} Populated obligation subtypes from ODS
 * @returns {ObligationSubtypeWithProductTypeDto[]} Obligation subtypes with product type
 */
export const mapObligationSubtypesWithProductCode = ({ productConfigs, obligationSubtypes }: MapObligationSubtypesWithProductCodeParams) => {
  const obligationSubtypesWithProductType = productConfigs.flatMap((config: GetProductConfigOdsResponse) => {
    const { obligationSubtypes: productObligationSubtypes, productType } = config;

    return productObligationSubtypes.map((subtypeCode: string) => {
      const populatedSubtype = obligationSubtypes.find((obligationSubtype: GetObligationSubtypeResponseDto) => obligationSubtype.code === subtypeCode);

      return {
        ...populatedSubtype,
        productTypeCode: productType,
      };
    });
  });

  return obligationSubtypesWithProductType;
};
