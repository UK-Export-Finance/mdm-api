import { HttpStatus } from '@nestjs/common';
import AppConfig from '@ukef/config/app.config';
import { Api } from '@ukef-test/support/api';

const {
  domOdsVersioning: { prefixAndVersion },
} = AppConfig();

describe('/dom - compounding index', () => {
  let api: Api;

  beforeAll(async () => {
    api = await Api.create();
  });

  afterAll(async () => {
    await api.destroy();
  });

  const baseUrl = `/api/${prefixAndVersion}/dom/compounding-index`;
  const rateCode = 'EUR001';
  const startDate = '2026-02-09';
  const endDate = '2026-02-20';

  it(`should return ${HttpStatus.OK} with compounding index values when rateCode and endDate are provided`, async () => {
    // Arrange
    const url = `${baseUrl}?rateCode=${rateCode}&endDate=${endDate}`;

    // Act
    const { status, body } = await api.get(url);

    // Assert
    expect(status).toBe(HttpStatus.OK);
    expect(body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          code: expect.any(String),
          startDate: expect.any(String),
          endDate: expect.any(String),
          daysActive: expect.any(Number),
          rate: expect.any(Number),
          compoundingIndexValue: expect.any(Number),
        }),
      ]),
    );
  });

  it(`should return ${HttpStatus.OK} with compounding index values when rateCode, startDate and endDate are provided`, async () => {
    // Arrange
    const url = `${baseUrl}?rateCode=${rateCode}&startDate=${startDate}&endDate=${endDate}`;

    // Act
    const { status, body } = await api.get(url);

    // Assert
    expect(status).toBe(HttpStatus.OK);
    expect(body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          code: rateCode,
          startDate: expect.any(String),
          endDate: expect.any(String),
          daysActive: expect.any(Number),
          rate: expect.any(Number),
          compoundingIndexValue: expect.any(Number),
        }),
      ]),
    );
  });

  it(`should return ${HttpStatus.BAD_REQUEST} when rateCode is missing`, async () => {
    const { status } = await api.get(`${baseUrl}?endDate=${endDate}`);

    expect(status).toBe(HttpStatus.BAD_REQUEST);
  });

  it(`should return ${HttpStatus.BAD_REQUEST} when endDate is missing`, async () => {
    const { status } = await api.get(`${baseUrl}?rateCode=${rateCode}`);

    expect(status).toBe(HttpStatus.BAD_REQUEST);
  });

  it(`should return ${HttpStatus.BAD_REQUEST} when startDate is not in YYYY-MM-DD format`, async () => {
    const { status } = await api.get(`${baseUrl}?rateCode=${rateCode}&startDate=2026-02-09T00:00:00&endDate=${endDate}`);

    expect(status).toBe(HttpStatus.BAD_REQUEST);
  });

  it(`should return ${HttpStatus.BAD_REQUEST} when startDate is after endDate`, async () => {
    const { status } = await api.get(`${baseUrl}?rateCode=${rateCode}&startDate=${endDate}&endDate=${startDate}`);

    expect(status).toBe(HttpStatus.BAD_REQUEST);
  });
});
