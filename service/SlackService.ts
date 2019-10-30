import * as http from "http";
import * as request from "request-promise";

import {SlackConfiguration} from "../domain/SlackConfiguration";
import {SlackUser} from "../domain/SlackUser";

class SlackService {
  public slackConfiguration: SlackConfiguration;

  constructor(slackConfiguration: SlackConfiguration) {
    this.slackConfiguration = slackConfiguration;
  }

  public sendMessage(message: string) {
    const url = this.slackConfiguration.webhookUrl;
    console.log("Send to slack " + message + ", url " + url);

    if (this.slackConfiguration.dryRun) {
      return Promise.resolve(message);
    } else {
      return request.post(
          url,
          {
            json: {
              text: message,
            },
          },
      );
    }
  }

  public getChannelUsers(): Promise<ReadonlyArray<SlackUser>> {
    return Promise.resolve([]);
  }
}

export {SlackService};
