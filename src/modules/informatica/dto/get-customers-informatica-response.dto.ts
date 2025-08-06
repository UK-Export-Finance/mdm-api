export type GetCustomersInformaticaResponse = GetCustomersInformaticaResponseItem[];

export interface GetCustomersInformaticaResponseItem {
  partyUrn: string;
  name: string;
  sfId: string;
  companyRegNo: string;
  probabilityOfDefault: number;
  ukEntity: string;
  ukefIndustryName: string;
  ukefSectorName: string;
  type: string;
  subtype: string;
  isLegacyRecord: boolean;
}
