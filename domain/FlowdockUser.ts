class FlowdockUser {
  public nick: string;
  public email: string;

  constructor(nick: string, email: string) {
    this.nick = nick;
    this.email =  email;
  }
}

export {FlowdockUser};
