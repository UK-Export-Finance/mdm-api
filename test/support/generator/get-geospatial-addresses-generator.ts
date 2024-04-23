import { ENUMS, GEOSPATIAL } from '@ukef/constants';
import { GetAddressOrdnanceSurveyResponse } from '@ukef/helper-modules/ordnance-survey/dto/get-addresses-ordnance-survey-response.dto';
import { OrdnanceSurveyAuthErrorResponse } from '@ukef/helper-modules/ordnance-survey/dto/ordnance-survey-auth-error-response.dto';
import { GetAddressByPostcodeQueryDto } from '@ukef/modules/geospatial/dto/get-address-by-postcode-query.dto';
import { GetAddressesResponse } from '@ukef/modules/geospatial/dto/get-addresses-response.dto';

import { AbstractGenerator } from './abstract-generator';
import { RandomValueGenerator } from './random-value-generator';

export class GetGeospatialAddressesGenerator extends AbstractGenerator<AddressValues, GenerateResult, GenerateOptions> {
  constructor(protected readonly valueGenerator: RandomValueGenerator) {
    super(valueGenerator);
  }

  protected generateValues(): AddressValues {
    return {
      ORGANISATION_NAME: this.valueGenerator.sentence({ words: 2 }),
      BUILDING_NAME: this.valueGenerator.word(),
      BUILDING_NUMBER: this.valueGenerator.nonnegativeInteger().toString(),
      THOROUGHFARE_NAME: this.valueGenerator.sentence({ words: 5 }),
      DEPENDENT_LOCALITY: this.valueGenerator.word(),
      POST_TOWN: this.valueGenerator.word(),
      POSTCODE: this.valueGenerator.postcode(),
      COUNTRY_CODE: this.valueGenerator.enumKey(ENUMS.GEOSPATIAL_COUNTRIES),
    };
  }

  protected transformRawValuesToGeneratedValues(values: AddressValues[], { postcode, key }: GenerateOptions): GenerateResult {
    const useKey = key || 'test';

    const request: GetAddressByPostcodeQueryDto[] = values.map((v) => ({ postcode: postcode || v.POSTCODE }) as GetAddressByPostcodeQueryDto);

    const ordnanceSurveyPath: string[] = values.map((v) => {
      const usePostcode = postcode || v.POSTCODE;
      return `/search/places/v1/postcode?postcode=${encodeURIComponent(usePostcode)}&lr=${GEOSPATIAL.DEFAULT.RESULT_LANGUAGE}&key=${encodeURIComponent(useKey)}`;
    });

    const mdmPath: string[] = values.map((v) => {
      const usePostcode = postcode || v.POSTCODE;
      return `/api/v1/geospatial/addresses/postcode?postcode=${usePostcode}`;
    });

    const getAddressByPostcodeResponse: GetAddressesResponse[] = values.map((v) => [
      {
        organisationName: v.ORGANISATION_NAME,
        addressLine1: `${v.BUILDING_NAME} ${v.BUILDING_NUMBER} ${v.THOROUGHFARE_NAME}`,
        addressLine2: v.DEPENDENT_LOCALITY,
        addressLine3: null,
        locality: v.POST_TOWN || null,
        postalCode: v.POSTCODE || null,
        country: ENUMS.GEOSPATIAL_COUNTRIES[v.COUNTRY_CODE],
      },
    ]);

    const getAddressByPostcodeMultipleResponse = getAddressByPostcodeResponse.map((response) => response[0]);

    const getAddressOrdnanceSurveyResponse: GetAddressOrdnanceSurveyResponse[] = values.map((v) => ({
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
            BUILDING_NAME: v.BUILDING_NAME,
            BUILDING_NUMBER: v.BUILDING_NUMBER,
            ORGANISATION_NAME: v.ORGANISATION_NAME,
            DEPENDENT_LOCALITY: v.DEPENDENT_LOCALITY,
            THOROUGHFARE_NAME: v.THOROUGHFARE_NAME,
            POST_TOWN: v.POST_TOWN,
            POSTCODE: v.POSTCODE,
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

    const getAddressOrdnanceSurveyMultipleResponse: GetAddressOrdnanceSurveyResponse = {
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
      results: values.map((v) => ({
        DPA: {
          UPRN: 'test',
          UDPRN: 'test',
          ADDRESS: 'test',
          BUILDING_NAME: v.BUILDING_NAME,
          BUILDING_NUMBER: v.BUILDING_NUMBER,
          ORGANISATION_NAME: v.ORGANISATION_NAME,
          DEPENDENT_LOCALITY: v.DEPENDENT_LOCALITY,
          THOROUGHFARE_NAME: v.THOROUGHFARE_NAME,
          POST_TOWN: v.POST_TOWN,
          POSTCODE: v.POSTCODE,
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
      })),
    };

    const getAddressOrdnanceSurveyEmptyResponse: GetAddressOrdnanceSurveyResponse[] = values.map(() => ({
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
    }));

    const ordnanceSurveyAuthErrorResponse = {
      fault: {
        faultstring: 'Invalid ApiKey',
        detail: {
          errorcode: 'oauth.v2.InvalidApiKey',
        },
      },
    };

    return {
      request,
      ordnanceSurveyPath,
      mdmPath,
      getAddressByPostcodeResponse,
      getAddressByPostcodeMultipleResponse,
      getAddressOrdnanceSurveyResponse,
      getAddressOrdnanceSurveyEmptyResponse,
      getAddressOrdnanceSurveyMultipleResponse,
      ordnanceSurveyAuthErrorResponse,
    };
  }
}

interface AddressValues {
  ORGANISATION_NAME: string;
  BUILDING_NAME: string;
  BUILDING_NUMBER: string;
  THOROUGHFARE_NAME: string;
  DEPENDENT_LOCALITY: string;
  POST_TOWN: string;
  POSTCODE: string;
  COUNTRY_CODE: string;
}

interface GenerateOptions {
  postcode?: string;
  key?: string;
}

interface GenerateResult {
  request: GetAddressByPostcodeQueryDto[];
  ordnanceSurveyPath: string[];
  mdmPath: string[];
  getAddressByPostcodeResponse: GetAddressesResponse[];
  getAddressByPostcodeMultipleResponse: GetAddressesResponse;
  getAddressOrdnanceSurveyResponse: GetAddressOrdnanceSurveyResponse[];
  getAddressOrdnanceSurveyMultipleResponse: GetAddressOrdnanceSurveyResponse;
  getAddressOrdnanceSurveyEmptyResponse: GetAddressOrdnanceSurveyResponse[];
  ordnanceSurveyAuthErrorResponse: OrdnanceSurveyAuthErrorResponse;
}
