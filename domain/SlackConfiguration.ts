class SlackConfiguration {
  public webhookUrl: string;
  public dryRun: boolean;

  constructor(webhookUrl: string, dryRun: boolean) {
    this.webhookUrl = webhookUrl;
    this.dryRun = dryRun;
  }
}

export {SlackConfiguration};
