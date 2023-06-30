export type GetCustomersInformaticaResponse = GetCustomersInformaticaResponseItem[];

export interface GetCustomersInformaticaResponseItem {
  partyUrn: string;
  name: string;
  sfId: string;
  companyRegNo: string;
  type: string;
  subtype: string;
  isLegacyRecord: string;
}
