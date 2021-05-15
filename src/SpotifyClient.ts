require("dotenv").config();
import SpotifyWebApi from "spotify-web-api-node";

export default class SpotifyClient {
  spotifyApi: SpotifyWebApi;
  constructor() {
    this.spotifyApi = new SpotifyWebApi({
      clientId: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
    });

    this.spotifyApi
      .clientCredentialsGrant()
      .then((data) => {
        this.spotifyApi.setAccessToken(data.body["access_token"]);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  getRecommendations() {
    this.spotifyApi.getRecommendations({
      seed_tracks: [],
    });
  }

  async searchForSong(value: string) {
    return await this.spotifyApi.searchTracks(value).then((data) => {
      console.log(data.statusCode);
      return data.body;
    });
  }
}
