import { Command } from "discord-akairo";

export default class RecommendCommand extends Command {
  constructor() {
    super("recommend", {
      aliases: ["recommend"],
    });
  }
}
