class FlowdockConfiguration {
  public organization: string;
  public flow: string;
  public token: string;
  public dryRun: boolean;

  constructor(organization: string, flow: string, token: string, dryRun: boolean) {
    this.organization = organization;
    this.flow = flow;
    this.token = token;
    this.dryRun = dryRun;
  }
}

export {FlowdockConfiguration};
