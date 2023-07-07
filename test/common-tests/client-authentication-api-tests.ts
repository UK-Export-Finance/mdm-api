import { AUTH } from '@ukef/constants';
import { ENVIRONMENT_VARIABLES } from '@ukef-test/support/environment-variables';
import { RandomValueGenerator } from '@ukef-test/support/generator/random-value-generator';
import supertest from 'supertest';

export type IncorrectAuthArg = { headerName: string; headerValue: string };

interface ClientAuthenticationTestsOptions {
  givenTheRequestWouldOtherwiseSucceed: () => void;
  makeRequestWithoutAuth: (incorrectAuth?: IncorrectAuthArg) => supertest.Test;
}

export const withClientAuthenticationTests = ({ givenTheRequestWouldOtherwiseSucceed, makeRequestWithoutAuth }: ClientAuthenticationTestsOptions): void => {
  const valueGenerator = new RandomValueGenerator();

  it('returns a 401 response when the API key header is missing', async () => {
    givenTheRequestWouldOtherwiseSucceed();

    const { status, body } = await makeRequestWithoutAuth();

    expect(status).toBe(401);
    expect(body).toStrictEqual({ message: 'Unauthorized', statusCode: 401 });
  });

  it('returns a 401 response when the API key header name is incorrect', async () => {
    givenTheRequestWouldOtherwiseSucceed();
    const apiKey = ENVIRONMENT_VARIABLES.API_KEY;
    const randomisedApiStrategy = valueGenerator.word();

    const { status, body } = await makeRequestWithoutAuth({ headerName: randomisedApiStrategy, headerValue: apiKey });

    expect(status).toBe(401);
    expect(body).toStrictEqual({ message: 'Unauthorized', statusCode: 401 });
  });

  it('returns a 401 response when the API key header value is incorrect', async () => {
    givenTheRequestWouldOtherwiseSucceed();
    const strategy = AUTH.STRATEGY;
    const randomisedApiKey = valueGenerator.string();

    const { status, body } = await makeRequestWithoutAuth({ headerName: strategy, headerValue: randomisedApiKey });

    expect(status).toBe(401);
    expect(body).toStrictEqual({ message: 'Unauthorized', statusCode: 401 });
  });

  it('returns a 401 response when the API key header value is empty', async () => {
    givenTheRequestWouldOtherwiseSucceed();
    const strategy = AUTH.STRATEGY;

    const { status, body } = await makeRequestWithoutAuth({ headerName: strategy, headerValue: '' });

    expect(status).toBe(401);
    expect(body).toStrictEqual({ message: 'Unauthorized', statusCode: 401 });
  });
};
