import { ClassificationDto, ClassificationOdsDto } from '@ukef/modules/ods/dto';

/**
 * Map an ODS classification, into a more suitable format for consumers.
 * @param {ClassificationOdsDto} ODS classification
 * @returns {ClassificationDto} Mapped classification
 */
export const mapOdsClassification = (classification: ClassificationOdsDto): ClassificationDto => ({
  type: classification.classification_type,
  typeCode: classification.classification_type_code,
  code: classification.classification_code,
  description: classification.classification_description,
  isActive: classification.classification_active_flag,
});
