import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class ValidateUkefId implements PipeTransform<string> {
  transform(value: string, metadata: ArgumentMetadata): string {
    if (typeof value === 'undefined') {
      throw new BadRequestException(`Field ${metadata.data} is missing`);
    }
    if (value === '') {
      throw new BadRequestException(`Field ${metadata.data} is empty`);
    }
    if (typeof value !== 'string' || /^[\d]{10}$/.test(value) === false) {
      throw new BadRequestException(`Field ${metadata.data} is not valid UKEF ID`);
    }
    return value;
  }
}
