import { HttpStatus } from '@nestjs/common';
import AppConfig from '@ukef/config/app.config';
import { EXAMPLES } from '@ukef/constants';
import { Api } from '@ukef-test/support/api';

const {
  domOdsVersioning: { prefixAndVersion },
} = AppConfig();

describe('/ods - Counterparty roles', () => {
  let api: Api;

  beforeAll(async () => {
    api = await Api.create();
  });

  afterAll(async () => {
    await api.destroy();
  });

  describe('/counterparty-roles', () => {
    it(`should return ${HttpStatus.OK} with mapped counterparty roles`, async () => {
      // Arrange
      const url = `/api/${prefixAndVersion}/ods/counterparty-roles`;

      // Act
      const { status, body } = await api.get(url);

      // Assert
      expect(status).toBe(HttpStatus.OK);

      const expected = expect.arrayContaining([
        expect.objectContaining({
          roleType: expect.any(String),
          name: expect.any(String),
          hasSharePercentage: expect.any(Boolean),
          isActive: expect.any(Boolean),
        }),
      ]);

      expect(body).toEqual(expected);
    });
  });

  describe('/counterparty-role/:roleType', () => {
    it(`should return ${HttpStatus.OK} with a mapped counterparty roles`, async () => {
      // Arrange
      const url = `/api/${prefixAndVersion}/ods/counterparty-role/${EXAMPLES.COUNTERPARTY_ROLE.roleType}`;

      // Act
      const { status, body } = await api.get(url);

      // Assert
      expect(status).toBe(HttpStatus.OK);

      const expected = expect.objectContaining({
        counterpartyRoleType: expect.any(String),
        name: expect.any(String),
        hasSharePercentage: expect.any(Boolean),
        isActive: expect.any(Boolean),
      });

      expect(body).toEqual(expected);
    });

    describe('when a single counterparty role is NOT found', () => {
      it(`should return ${HttpStatus.NOT_FOUND}`, async () => {
        // Arrange
        const url = `/api/${prefixAndVersion}/ods/counterparty-role/INVALID_TYPE_CODE`;

        // Act
        const { status } = await api.get(url);

        // Assert
        expect(status).toBe(HttpStatus.NOT_FOUND);
      });
    });
  });
});
