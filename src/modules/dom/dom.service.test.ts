import { MOCK_PRODUCT_CONFIGURATIONS } from '@ukef/constants';
import { PinoLogger } from 'nestjs-pino';

import { DomService } from './dom.service';

describe('DomService', () => {
  const logger = new PinoLogger({});

  let service: DomService;

  beforeEach(() => {
    service = new DomService(logger);
  });

  afterAll(() => {
    jest.resetAllMocks();
  });

  describe('getAll', () => {
    it('should return the response of giftHttpService.get', () => {
      // Act
      const response = service.getProductConfigurations();

      // Assert
      expect(response).toEqual(MOCK_PRODUCT_CONFIGURATIONS);
    });
  });
});
