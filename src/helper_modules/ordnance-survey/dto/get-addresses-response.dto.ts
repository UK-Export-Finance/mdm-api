export type GetAddressResponse = {
  header: {
      uri: string,
      query: string,
      offset: number,
      totalresults: number,
      format: string,
      dataset: string,
      lr: string,
      maxresults: number,
      epoch: string,
      lastupdate: string,
      output_srs: string
  },
  results?: GetAddressResponseItem[],
};

interface GetAddressResponseItem {
  DPA: {
    UPRN: string,
    UDPRN: string,
    ADDRESS: string,
    BUILDING_NAME?: string,
    BUILDING_NUMBER?: string,
    ORGANISATION_NAME?: string;
    DEPENDENT_LOCALITY?: string;
    THOROUGHFARE_NAME: string,
    POST_TOWN: string,
    POSTCODE: string,
    RPC: string,
    X_COORDINATE: number,
    Y_COORDINATE: number,
    STATUS: string,
    LOGICAL_STATUS_CODE: string,
    CLASSIFICATION_CODE: string,
    CLASSIFICATION_CODE_DESCRIPTION: string,
    LOCAL_CUSTODIAN_CODE: number,
    LOCAL_CUSTODIAN_CODE_DESCRIPTION: string,
    COUNTRY_CODE: string,
    COUNTRY_CODE_DESCRIPTION: string,
    POSTAL_ADDRESS_CODE: string,
    POSTAL_ADDRESS_CODE_DESCRIPTION: string,
    BLPU_STATE_CODE: string,
    BLPU_STATE_CODE_DESCRIPTION: string,
    TOPOGRAPHY_LAYER_TOID: string,
    LAST_UPDATE_DATE: string,
    ENTRY_DATE: string,
    BLPU_STATE_DATE: string,
    LANGUAGE: string,
    MATCH: number,
    MATCH_DESCRIPTION: string,
    DELIVERY_POINT_SUFFIX: string
  }
}

// interface GetAddressResponseAddress {
//   UPRN: string,
//   UDPRN: string,
//   ADDRESS: string,
//   BUILDING_NAME?: string,
//   BUILDING_NUMBER?: string,
//   ORGANISATION_NAME?: string;
//   DEPENDENT_LOCALITY?: string;
//   THOROUGHFARE_NAME: string,
//   POST_TOWN: string,
//   POSTCODE: string,
//   RPC: string,
//   X_COORDINATE: number,
//   Y_COORDINATE: number,
//   STATUS: string,
//   LOGICAL_STATUS_CODE: string,
//   CLASSIFICATION_CODE: string,
//   CLASSIFICATION_CODE_DESCRIPTION: string,
//   LOCAL_CUSTODIAN_CODE: number,
//   LOCAL_CUSTODIAN_CODE_DESCRIPTION: string,
//   COUNTRY_CODE: string,
//   COUNTRY_CODE_DESCRIPTION: string,
//   POSTAL_ADDRESS_CODE: string,
//   POSTAL_ADDRESS_CODE_DESCRIPTION: string,
//   BLPU_STATE_CODE: string,
//   BLPU_STATE_CODE_DESCRIPTION: string,
//   TOPOGRAPHY_LAYER_TOID: string,
//   LAST_UPDATE_DATE: string,
//   ENTRY_DATE: string,
//   BLPU_STATE_DATE: string,
//   LANGUAGE: string,
//   MATCH: number,
//   MATCH_DESCRIPTION: string,
//   DELIVERY_POINT_SUFFIX: string
// }
