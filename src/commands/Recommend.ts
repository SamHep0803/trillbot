import { Command } from "discord-akairo";
import { Message, MessageEmbed } from "discord.js";
import SpotifyClient from "../SpotifyClient";

export default class RecommendCommand extends Command {
	spotifyClient: SpotifyClient;
	constructor() {
		super("recommend", {
			aliases: ["recommend", "suggest"],
			description: {
				content:
					"Uses Spotify's recommend songs endpoint to generate recommended songs based on user-inputted songs.",
				usage: "t![recommend|suggest] <songs...>",
			},
			separator: ",",
			args: [
				{
					id: "input",
					match: "separate",
				},
			],
		});

		this.spotifyClient = new SpotifyClient();
	}

	async exec(message: Message, args: any) {
		if (!args.input) {
			return message.channel.send(
				`:x: No songs provided! \`${this.description.usage}\``
			);
		}

		let ids: string[] = [];
		for (const input of args.input) {
			const search = await this.spotifyClient.searchForSong(input);
			if (!search.tracks) {
				return;
			}

			const song = search.tracks.items[0];
			if (!song) {
				return;
			}

			ids.push(song.id);
		}

		const recommendationsResponse = await this.spotifyClient.getRecommendations(
			ids
		);
		let recommendations: object[] = [];
		for (const recommendation of recommendationsResponse.tracks) {
			recommendations.push({
				name: `${recommendation.name} - ${getArtists(recommendation.artists)}`,
				url: recommendation.external_urls.spotify,
			});
		}

		const embed = new MessageEmbed()
			.setColor("#1DB954")
			.setTitle("Recommended Songs")
			.setDescription(turnArrayIntoList(recommendations));

		return message.channel.send(embed);
		// return console.log(recommendations);
	}
}

function getArtists(input: any[]) {
	let artists: any[] = [];
	input.forEach((artist) => {
		artists.push(artist.name);
	});
	if (artists.length >= 2) {
		return artists.join(", ");
	}
	return artists;
}

function turnArrayIntoList(input: any[]) {
	let list: string = "";
	for (let i = 0; i < 15; i++) {
		list += `\`${i + 1}.\` [${input[i].name}](${input[i].url})\n`;
	}

	return list;
}
