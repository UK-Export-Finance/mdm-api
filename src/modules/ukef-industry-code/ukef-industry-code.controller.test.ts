import { EXAMPLES } from '@ukef/constants';
import { PinoLogger } from 'nestjs-pino';

import { UkefIndustryCodeController } from './ukef-industry-code.controller';
import { UkefIndustryCodeService } from './ukef-industry-code.service';

const mockError = new Error('An error occurred');

describe('UkefIndustryCodeController', () => {
  const mockLogger = new PinoLogger({});

  const ukefIndustryCodeService = new UkefIndustryCodeService(null, mockLogger);
  let ukefIndustryCodeServiceFind: jest.Mock;

  let controller: UkefIndustryCodeController;

  beforeEach(() => {
    ukefIndustryCodeServiceFind = jest.fn().mockResolvedValueOnce(EXAMPLES.COMPANIES_HOUSE_INDUSTRY_CODE);
    ukefIndustryCodeService.find = ukefIndustryCodeServiceFind;

    controller = new UkefIndustryCodeController(ukefIndustryCodeService);
  });

  describe('find', () => {
    it.each([{ value: EXAMPLES.COMPANIES_HOUSE_INDUSTRY_CODE }, { value: '' }, { value: 'invalid' }])(
      `should call ukefIndustryCodeService.find with $value`,
      async ({ value }) => {
        // Act
        await controller.findUkefIndustryCode({ industryCode: value });

        // Assert
        expect(ukefIndustryCodeServiceFind).toHaveBeenCalledTimes(1);
        expect(ukefIndustryCodeServiceFind).toHaveBeenCalledWith(Number(value));
      },
    );

    it('should return a UKEF industry code when a valid industry code is provided', async () => {
      // Act
      const result = await controller.findUkefIndustryCode({ industryCode: EXAMPLES.UKEF_INDUSTRY_CODE });

      // Assert
      expect(result).toEqual(EXAMPLES.COMPANIES_HOUSE_INDUSTRY_CODE);
    });

    describe('when ukefIndustryCodeService.find throws an error', () => {
      it('should throw an error', async () => {
        // Arrange
        const ukefIndustryCodeService = new UkefIndustryCodeService(null, mockLogger);

        ukefIndustryCodeService.find = jest.fn().mockRejectedValueOnce(mockError);

        controller = new UkefIndustryCodeController(ukefIndustryCodeService);

        // Act & Assert
        const promise = controller.findUkefIndustryCode({ industryCode: EXAMPLES.UKEF_INDUSTRY_CODE });

        await expect(promise).rejects.toThrow(mockError);
      });
    });
  });
});
