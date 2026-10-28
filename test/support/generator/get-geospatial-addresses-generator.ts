import { ENUMS, GEOSPATIAL } from '@ukef/constants';
import { GetAddressesOrdnanceSurveyResponse } from '@ukef/helper-modules/ordnance-survey/dto/get-addresses-ordnance-survey-response.dto';
import { OrdnanceSurveyAuthErrorResponse } from '@ukef/helper-modules/ordnance-survey/dto/ordnance-survey-auth-error-response.dto';
import { GetAddressesByPostcodeQueryDto } from '@ukef/modules/geospatial/dto/get-addresses-by-postcode-query.dto';
import { GetAddressesResponse } from '@ukef/modules/geospatial/dto/get-addresses-response.dto';

import { AbstractGenerator } from './abstract-generator';
import { RandomValueGenerator } from './random-value-generator';

export class GetGeospatialAddressesGenerator extends AbstractGenerator<AddressValues, GenerateResult, GenerateOptions> {
  constructor(protected readonly valueGenerator: RandomValueGenerator) {
    super(valueGenerator);
  }

  protected generateValues(): AddressValues {
    return {
      ORGANISATION_NAME: this.valueGenerator.sentence({ words: 5 }),
      BUILDING_NAME: this.valueGenerator.word(),
      BUILDING_NUMBER: this.valueGenerator.nonnegativeInteger().toString(),
      THOROUGHFARE_NAME: this.valueGenerator.sentence({ words: 2 }),
      DEPENDENT_LOCALITY: this.valueGenerator.word(),
      POST_TOWN: this.valueGenerator.word(),
      POSTCODE: this.valueGenerator.postcode(),
      COUNTRY_CODE: this.valueGenerator.enumKey(ENUMS.GEOSPATIAL_COUNTRIES),
    };
  }

  protected transformRawValuesToGeneratedValues(values: AddressValues[], { postcode, key }: GenerateOptions): GenerateResult {
    const useKey = key || this.valueGenerator.string();

    const requests: GetAddressesByPostcodeQueryDto[] = values.map((address) => ({ postcode: postcode || address.POSTCODE }));

    const ordnanceSurveyPaths: string[] = values.map((value) => {
      const usePostcode = postcode || value.POSTCODE;
      return `/search/places/v1/postcode?postcode=${encodeURIComponent(usePostcode)}&lr=${GEOSPATIAL.DEFAULT.RESULT_LANGUAGE}&key=${encodeURIComponent(useKey)}`;
    });

    const mdmPaths: string[] = values.map((value) => {
      const usePostcode = postcode || value.POSTCODE;
      return `/api/v1/geospatial/addresses/postcode?postcode=${usePostcode}`;
    });

    const getAddressesByPostcodeResponse: GetAddressesResponse[] = values.map((address) => [
      {
        organisationName: address.ORGANISATION_NAME,
        addressLine1: `${address.BUILDING_NAME} ${address.BUILDING_NUMBER} ${address.THOROUGHFARE_NAME}`,
        addressLine2: address.DEPENDENT_LOCALITY,
        addressLine3: null,
        locality: address.POST_TOWN || null,
        postalCode: address.POSTCODE || null,
        country: ENUMS.GEOSPATIAL_COUNTRIES[address.COUNTRY_CODE],
      },
    ]);

    const getAddressesByPostcodeMultipleResponse = getAddressesByPostcodeResponse.map((response) => response[0]);

    const getAddressesOrdnanceSurveyResponse: GetAddressesOrdnanceSurveyResponse[] = values.map((address) => ({
      header: {
        uri: 'test',
        query: 'test',
        offset: 0,
        totalresults: 1,
        format: 'test',
        dataset: 'test',
        lr: 'test',
        maxresults: 100,
        epoch: 'test',
        lastupdate: 'test',
        output_srs: 'test',
      },
      results: [
        {
          DPA: {
            UPRN: 'test',
            UDPRN: 'test',
            ADDRESS: 'test',
            BUILDING_NAME: address.BUILDING_NAME,
            BUILDING_NUMBER: address.BUILDING_NUMBER,
            ORGANISATION_NAME: address.ORGANISATION_NAME,
            DEPENDENT_LOCALITY: address.DEPENDENT_LOCALITY,
            THOROUGHFARE_NAME: address.THOROUGHFARE_NAME,
            POST_TOWN: address.POST_TOWN,
            POSTCODE: address.POSTCODE,
            RPC: 'test',
            X_COORDINATE: 12345,
            Y_COORDINATE: 12345,
            STATUS: 'test',
            LOGICAL_STATUS_CODE: 'test',
            CLASSIFICATION_CODE: 'test',
            CLASSIFICATION_CODE_DESCRIPTION: 'test',
            LOCAL_CUSTODIAN_CODE: 12345,
            LOCAL_CUSTODIAN_CODE_DESCRIPTION: 'test',
            COUNTRY_CODE: v.COUNTRY_CODE,
            COUNTRY_CODE_DESCRIPTION: 'test',
            POSTAL_ADDRESS_CODE: 'test',
            POSTAL_ADDRESS_CODE_DESCRIPTION: 'test',
            BLPU_STATE_CODE: 'test',
            BLPU_STATE_CODE_DESCRIPTION: 'test',
            TOPOGRAPHY_LAYER_TOID: 'test',
            LAST_UPDATE_DATE: 'test',
            ENTRY_DATE: 'test',
            BLPU_STATE_DATE: 'test',
            LANGUAGE: 'test',
            MATCH: 12345,
            MATCH_DESCRIPTION: 'test',
            DELIVERY_POINT_SUFFIX: 'test',
          },
        },
      ],
    }));

    const getAddressesOrdnanceSurveyMultipleMatchingAddressesResponse: GetAddressesOrdnanceSurveyResponse = {
      header: {
        uri: 'test',
        query: 'test',
        offset: 0,
        totalresults: 0,
        format: 'test',
        dataset: 'test',
        lr: 'test',
        maxresults: 100,
        epoch: 'test',
        lastupdate: 'test',
        output_srs: 'test',
      },
      results: values.map((address) => ({
        DPA: {
          UPRN: 'test',
          UDPRN: 'test',
          ADDRESS: 'test',
          BUILDING_NAME: address.BUILDING_NAME,
          BUILDING_NUMBER: address.BUILDING_NUMBER,
          ORGANISATION_NAME: address.ORGANISATION_NAME,
          DEPENDENT_LOCALITY: address.DEPENDENT_LOCALITY,
          THOROUGHFARE_NAME: address.THOROUGHFARE_NAME,
          POST_TOWN: address.POST_TOWN,
          POSTCODE: address.POSTCODE,
          RPC: 'test',
          X_COORDINATE: 12345,
          Y_COORDINATE: 12345,
          STATUS: 'test',
          LOGICAL_STATUS_CODE: 'test',
          CLASSIFICATION_CODE: 'test',
          CLASSIFICATION_CODE_DESCRIPTION: 'test',
          LOCAL_CUSTODIAN_CODE: 12345,
          LOCAL_CUSTODIAN_CODE_DESCRIPTION: 'test',
          COUNTRY_CODE: address.COUNTRY_CODE,
          COUNTRY_CODE_DESCRIPTION: 'test',
          POSTAL_ADDRESS_CODE: 'test',
          POSTAL_ADDRESS_CODE_DESCRIPTION: 'test',
          BLPU_STATE_CODE: 'test',
          BLPU_STATE_CODE_DESCRIPTION: 'test',
          TOPOGRAPHY_LAYER_TOID: 'test',
          LAST_UPDATE_DATE: 'test',
          ENTRY_DATE: 'test',
          BLPU_STATE_DATE: 'test',
          LANGUAGE: 'test',
          MATCH: 12345,
          MATCH_DESCRIPTION: 'test',
          DELIVERY_POINT_SUFFIX: 'test',
        },
      })),
    };

    const getAddressesOrdnanceSurveyEmptyResponse: GetAddressesOrdnanceSurveyResponse = {
      header: {
        uri: 'test',
        query: 'test',
        offset: 0,
        totalresults: 0,
        format: 'test',
        dataset: 'test',
        lr: 'test',
        maxresults: 100,
        epoch: 'test',
        lastupdate: 'test',
        output_srs: 'test',
      },
    };

    const ordnanceSurveyAuthErrorResponse: OrdnanceSurveyAuthErrorResponse = {
      fault: {
        faultstring: 'Invalid ApiKey',
        detail: {
          errorcode: 'oauth.v2.InvalidApiKey',
        },
      },
    };

    return {
      requests,
      ordnanceSurveyPaths,
      mdmPaths,
      ordnanceSurveyKey: useKey,
      getAddressesByPostcodeResponse,
      getAddressesByPostcodeMultipleResponse,
      getAddressesOrdnanceSurveyResponse,
      getAddressesOrdnanceSurveyEmptyResponse,
      getAddressesOrdnanceSurveyMultipleMatchingAddressesResponse,
      ordnanceSurveyAuthErrorResponse,
    };
  }
}

type AddressValues = {
  ORGANISATION_NAME: string;
  BUILDING_NAME: string;
  BUILDING_NUMBER: string;
  THOROUGHFARE_NAME: string;
  DEPENDENT_LOCALITY: string;
  POST_TOWN: string;
  POSTCODE: string;
  COUNTRY_CODE: string;
};

type GenerateOptions = {
  postcode?: string;
  key?: string;
};

type GenerateResult = {
  requests: GetAddressesByPostcodeQueryDto[];
  ordnanceSurveyPaths: string[];
  mdmPaths: string[];
  ordnanceSurveyKey: string;
  getAddressesByPostcodeResponse: GetAddressesResponse[];
  getAddressesByPostcodeMultipleResponse: GetAddressesResponse;
  getAddressesOrdnanceSurveyResponse: GetAddressesOrdnanceSurveyResponse[];
  getAddressesOrdnanceSurveyMultipleMatchingAddressesResponse: GetAddressesOrdnanceSurveyResponse;
  getAddressesOrdnanceSurveyEmptyResponse: GetAddressesOrdnanceSurveyResponse;
  ordnanceSurveyAuthErrorResponse: OrdnanceSurveyAuthErrorResponse;
};
