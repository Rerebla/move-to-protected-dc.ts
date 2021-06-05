import { Client, DMChannel } from 'discord.js';
import { commandHandler } from './commandHandlers/commandHandler';
import { CONFIG } from './config'; //TODO: Rename config file from sampleConfig to config

export const client = new Client;
const botPrefix = [""]; //TODO: add prefix

client.on("ready", () => {
    console.log(`Logged in as ${client.user.tag}`);
});

client.on("message", (msg) => {
    if (msg.author.bot) return;
    let isBotCommand = false;
    if (msg.channel instanceof DMChannel && msg.author.id !== CONFIG.ownerID) {
        client.users.fetch(CONFIG.ownerID).then((user) => {
            user.send(`${msg.author.username} sent:
${msg.content}`);
        });
    }

    if (!botPrefix.some((prefix) => {
        msg.content.startsWith(prefix);
    })) return;
    const command = msg.content.split(" ")[1];

    //TODO: Add commands
    switch (command) {
        case "newCommand":
            commandHandler(msg);
            break;

        default:
            msg.reply(("Thats not a command known to this bot"));
            break;
    }
});
client.login(CONFIG.token);