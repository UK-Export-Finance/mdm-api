export type GetCustomersInformaticaResponse = GetCustomersInformaticaResponseItem[];

export interface GetCustomersInformaticaResponseItem {
  partyUrn: string;
  name: string;
  sfId: string;
  companyRegNo: string;
  probabilityOfDefault: number;
  ukEntity: number;
  ukefIndustryId: string;
  ukefSectorId: string;
  type: string;
  subtype: string;
  isLegacyRecord: boolean;
}
