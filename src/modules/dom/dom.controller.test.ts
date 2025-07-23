import { MOCK_PRODUCT_CONFIGURATIONS } from '@ukef/constants';
import { PinoLogger } from 'nestjs-pino';

import { DomController } from './dom.controller';
import { DomService } from './dom.service';

const mockError = new Error('An error occurred');

describe('DomController', () => {
  const mockLogger = new PinoLogger({});

  const domService = new DomService(mockLogger);
  let domServiceGetProductConfigurations: jest.Mock;

  let controller: DomController;

  beforeEach(() => {
    domServiceGetProductConfigurations = jest.fn();
    domService.getProductConfigurations = domServiceGetProductConfigurations;

    controller = new DomController(domService);
  });

  describe('getProductConfigurations', () => {
    it('should call domService.getProductConfigurations', async () => {
      // Act
      await controller.getProductConfigurations();

      // Assert
      expect(domServiceGetProductConfigurations).toHaveBeenCalledTimes(1);
    });

    it('should return product configurations', async () => {
      // Arrange
      domService.getProductConfigurations = jest.fn().mockResolvedValueOnce(MOCK_PRODUCT_CONFIGURATIONS);

      controller = new DomController(domService);

      // Act
      const result = await controller.getProductConfigurations();

      // Assert
      expect(result).toEqual(MOCK_PRODUCT_CONFIGURATIONS);
    });

    describe('when domService.getProductConfigurations throws an error', () => {
      it('should throw an error', async () => {
        // Arrange
        const domService = new DomService(mockLogger);

        domService.getProductConfigurations = jest.fn().mockRejectedValueOnce(mockError);

        controller = new DomController(domService);

        // Act & Assert
        const promise = controller.getProductConfigurations();

        await expect(promise).rejects.toThrow(mockError);
      });
    });
  });
});
