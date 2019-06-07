import * as http from "http";
import * as request from "request-promise";

import {FlowdockConfiguration} from "../domain/FlowdockConfiguration";

class FlowdockService {
  public flowdockConfiguration: FlowdockConfiguration;

  constructor(flowdockConfiguration: FlowdockConfiguration) {
    this.flowdockConfiguration = flowdockConfiguration;
  }

  public sendMessage(message: string) {
    const url = `https://${this.flowdockConfiguration.token}@api.flowdock.com/flows/` +
        `${this.flowdockConfiguration.organization}/${this.flowdockConfiguration.flow}/messages`;
    console.log("Send to flowdock " + message + ", url " + url);
    
    if (this.flowdockConfiguration.dryRun) {
      return Promise.resolve(message);
    } else {
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
