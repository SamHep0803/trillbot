require("dotenv").config();
import SpotifyWebApi from "spotify-web-api-node";

export default class SpotifyClient {
	spotifyApi: SpotifyWebApi;
	constructor() {
		this.spotifyApi = new SpotifyWebApi({
			clientId: process.env.CLIENT_ID,
			clientSecret: process.env.CLIENT_SECRET,
		});

		let expireTime: number = 3600;
		this.spotifyApi
			.clientCredentialsGrant()
			.then((data) => {
				this.spotifyApi.setAccessToken(data.body["access_token"]);
				expireTime = data.body["expires_in"];
			})
			.catch((err) => {
				console.log(err);
			});

		setInterval(() => {
			this.spotifyApi
				.clientCredentialsGrant()
				.then((data) => {
					this.spotifyApi.setAccessToken(data.body["access_token"]);
				})
				.catch((err) => {
					console.log(err);
				});
		}, expireTime * 1000);
	}

	async getRecommendations(value: any[]) {
		return await this.spotifyApi
			.getRecommendations({
				min_danceability: 0.3,
				seed_tracks: value,
				min_popularity: 50,
			})
			.then((data) => {
				return data.body;
			});
	}

	async searchForSong(value: string) {
		return await this.spotifyApi.searchTracks(value).then((data) => {
			return data.body;
		});
	}
}
