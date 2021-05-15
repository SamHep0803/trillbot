import { Command } from "discord-akairo";
import { Message } from "discord.js";
import SpotifyClient from "../SpotifyClient";

export default class SearchCommand extends Command {
  spotifyClient: SpotifyClient;
  constructor() {
    super("search", {
      aliases: ["search"],
      args: [
        {
          id: "searchValue",
          match: "text",
        },
      ],
    });

    this.spotifyClient = new SpotifyClient();
  }

  async exec(message: Message, args: any) {
    const searchResults = await this.spotifyClient.searchForSong(
      args.searchValue
    );

    if (!searchResults.tracks?.items[0]) {
      return message.channel.send("no results");
    }

    return message.channel.send(
      `\`\`\`\n${JSON.stringify(searchResults.tracks.items[0].id)}\n\`\`\``
    );
  }
}
