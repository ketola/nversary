import * as http from "http";
import * as request from "request-promise";

import {FlowdockConfiguration} from "../domain/FlowdockConfiguration";

class FlowdockService {
  public flowdockConfiguration: FlowdockConfiguration;

  constructor(flowdockConfiguration: FlowdockConfiguration) {
    this.flowdockConfiguration = flowdockConfiguration;
  }

  public sendMessage(message: string) {
    console.log("Send to flowdock " + message);

    if (this.flowdockConfiguration.dryRun) {
      return Promise.resolve(message);
    } else {
      const url = "https://api.flowdock.com/flows/"
        + this.flowdockConfiguration.organization + "/"
        + this.flowdockConfiguration.flow + "/messages?flow_token=" + this.flowdockConfiguration.token;
      console.log("url: " + url);
      return request.post(
          url,
          {
            json: {
              content: message,
              event: "message",
              },
          },
      );
    }
  }
}

export {FlowdockService};
