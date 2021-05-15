require("dotenv").config();
import TrillClient from "./TrillClient";

const trillClient = new TrillClient();
trillClient.login(process.env.TOKEN);
