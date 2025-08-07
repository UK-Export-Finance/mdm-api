export type GetCustomersInformaticaResponse = GetCustomersInformaticaResponseItem[];

export interface GetCustomersInformaticaResponseItem {
  partyUrn: string;
  name: string;
  sfId: string;
  companyRegNo: string;
  type: string;
  subtype: string;
  isLegacyRecord: boolean;
  probabilityOfDefault?: number;
  ukEntity?: string;
  ukefIndustryName?: string;
  ukefSectorName?: string;
}
