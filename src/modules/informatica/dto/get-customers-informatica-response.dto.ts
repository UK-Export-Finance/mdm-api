export type GetCustomersInformaticaResponse = GetCustomersInformaticaResponseItem[];

export interface GetCustomersInformaticaResponseItem {
  companyRegNo: string;
  creditClassificationDate?: string;
  creditClassificationStatus?: string;
  customerType: string;
  isLegacyRecord: boolean;
  name: string;
  partyUrn: string;
  probabilityOfDefault?: number;
  riskEntity?: string;
  sfId: string;
  subtype: string;
  type: string;
  ukEntity?: string;
  ukefIndustryName?: string;
  ukefSectorName?: string;
}
