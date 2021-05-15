import { AkairoClient, CommandHandler, ListenerHandler } from "discord-akairo";

export default class TrillClient extends AkairoClient {
  commandHandler: CommandHandler;
  listenerHandler: ListenerHandler;

  constructor() {
    super(
      {
        ownerID: "99819835273252864",
      },
      {
        disableMentions: "everyone",
        fetchAllMembers: false,
      }
    );

    this.commandHandler = new CommandHandler(this, {
      directory: "./src/commands/",
      prefix: "t!",
      blockBots: true,
    });
    this.commandHandler.loadAll();

    this.listenerHandler = new ListenerHandler(this, {
      directory: "./src/listeners",
    });
    this.commandHandler.useListenerHandler(this.listenerHandler);
    this.listenerHandler.loadAll();
  }
}
