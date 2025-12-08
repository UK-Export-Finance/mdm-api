import { EXAMPLES } from '@ukef/constants';
import { PinoLogger } from 'nestjs-pino';

import { CreditRiskRatingsController } from './credit-risk-ratings.controller';
import { CreditRiskRatingsService } from './credit-risk-ratings.service';

const mockError = new Error('An error occurred');

describe('CreditRiskRatingsController', () => {
  const mockLogger = new PinoLogger({});

  const creditRiskRatingsService = new CreditRiskRatingsService(null, mockLogger);
  let creditRiskRatingsServiceFindAll: jest.Mock;

  let controller: CreditRiskRatingsController;

  beforeEach(() => {
    creditRiskRatingsServiceFindAll = jest.fn();
    creditRiskRatingsService.findAll = creditRiskRatingsServiceFindAll;

    controller = new CreditRiskRatingsController(creditRiskRatingsService);
  });

  describe('findAll', () => {
    it('should call creditRiskRatingsService.findCustomer', async () => {
      // Act
      await controller.findAll();

      // Assert
      expect(creditRiskRatingsServiceFindAll).toHaveBeenCalledTimes(1);
    });

    it('should return all credit risk ratings', async () => {
      // Arrange
      creditRiskRatingsService.findAll = jest.fn().mockResolvedValueOnce(EXAMPLES.CREDIT_RISK_RATINGS);

      // Act
      const result = await controller.findAll();

      // Assert
      expect(result).toEqual(EXAMPLES.CREDIT_RISK_RATINGS);
    });

    describe('when creditRiskRatingsService.findCustomer throws an error', () => {
      it('should throw an error', async () => {
        // Arrange
        const creditRiskRatingsService = new CreditRiskRatingsService(null, mockLogger);

        creditRiskRatingsService.findAll = jest.fn().mockRejectedValueOnce(mockError);

        controller = new CreditRiskRatingsController(creditRiskRatingsService);

        // Act & Assert
        const promise = controller.findAll();

        await expect(promise).rejects.toThrow(mockError);
      });
    });
  });
});
