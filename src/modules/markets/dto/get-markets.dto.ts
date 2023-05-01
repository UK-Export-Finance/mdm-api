export class GetMarketsDto {
  public marketId?: number;
  public oecdRiskCategory: number;
  public marketName: string;
  public isoCode: string;
  public createdDatetime: Date;
  public lastUpdatedDatetime: Date;
  public effectiveFromDatetime: Date;
  public effectiveToDatetime: Date;
  public marketRiskAppetitePublicDesc: string;
  public geographicalRegionId: number;
  public geographicalRegionDesc: string;
  public sovereignRiskProvision: number;
  public ESRAClassificationId: number;
  public ESRAClassificationDesc: string;
  public shortTermCoverAvailabilityId: number;
  public shortTermCoverAvailabilityDesc: string;
  public NBIIssue: string;
  public active: string;
}
