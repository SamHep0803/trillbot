import { Command } from "discord-akairo";
import { Message, MessageEmbed } from "discord.js";
import SpotifyClient from "../SpotifyClient";

export default class SearchCommand extends Command {
	spotifyClient: SpotifyClient;
	constructor() {
		super("search", {
			aliases: ["search", "lookup", "query"],
			description: {
				content:
					"Gets the first result from the search endpoint of Spotify's API.",
				usage: "t![search|lookup|query] <song-name>",
			},
			args: [
				{
					id: "input",
					match: "text",
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

		const search = await this.spotifyClient.searchForSong(args.input);

		if (!search.tracks) {
			return message.channel.send("no results");
		}

		const song = search.tracks.items[0];

		if (!song) {
			return message.channel.send("no results");
		}

		const description =
			`${song.artists.length > 1 ? "Artists" : "Artist"}: ${getArtists(
				song.artists
			)}\n` +
			`Album: ${song.album.name}\n` +
			`Preview: ${
				song.preview_url
					? `[click here!](${song.preview_url})`
					: "not available"
			}\n` +
			`Duration: ${millisToMinutesAndSeconds(song.duration_ms)}`;

		const embed = new MessageEmbed()
			.setColor("#1DB954")
			.setTitle(song.name)
			.setURL(song.external_urls.spotify)
			.setDescription(description)
			.setThumbnail(song.album.images[1].url)
			.setFooter(`Song ID: ${song.id}`);

		return message.channel.send(embed);
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

function millisToMinutesAndSeconds(millis: number) {
	var minutes = Math.floor(millis / 60000);
	var seconds: number = Math.floor((millis % 60000) / 1000);
	return seconds == 60
		? minutes + 1 + ":00"
		: minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
}
