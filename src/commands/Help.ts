import { Command } from "discord-akairo";
import { Message } from "discord.js";

export default class HelpCommand extends Command {
	constructor() {
		super("help", {
			aliases: ["help"],
			description: {
				content: "Displays information about all available commands.",
				usage: "t!help [command]",
			},
			args: [
				{
					id: "command",
					type: "commandAlias",
				},
			],
		});
	}

	exec(message: Message, { command }: { command: Command }) {
		return message.channel.send(command.id);
	}
}
