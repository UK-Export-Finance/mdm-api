import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';

@Injectable()
export class DbResponseHelper {
  /**
   * Get field name map. Map is generated from repository metadata.
   */
  static getDbNameToApiNameMap(repository: Repository<any>): object {
    return repository.metadata.ownColumns.reduce((acc, column) => {
      acc[column.databaseName] = column.propertyName;
      return acc;
    }, {});
  }

  /**
   * Get field name map. Map is generated from repository metadata.
   */
  static getApiNameToDbNameMap(repository: Repository<any>): object {
    return repository.metadata.ownColumns.reduce((acc, column) => {
      acc[column.propertyName] = column.databaseName;
      return acc;
    }, {});
  }

  /**
   * Rename field in array with database results.
   *
   * Store procedure calls will have results that use Database field naming convention.
   */
  static renameDbResultFields(repository: Repository<any>, fieldNameMap: object, dbResults: object[]): any[] {
    const { propertiesMap } = repository.metadata;
    return dbResults.map((dbEntry) => {
      const renamedObject = {};
      Object.keys(propertiesMap).forEach((key) => {
        // key is safe because it is commint from NestJs entity class, not user input.
        if (fieldNameMap[`${key}`]) {
          renamedObject[`${key}`] = dbEntry[fieldNameMap[`${key}`]];
        }
      });
      return renamedObject;
    });
  }
}
