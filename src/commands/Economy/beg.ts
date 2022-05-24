import MessageHandler from "../../Handlers/MessageHandler";
import BaseCommand from "../../lib/BaseCommand";
import WAClient from "../../lib/WAClient";
import { IParsedArgs, ISimplifiedMessage } from "../../typings";
import { MessageType, Mimetype } from "@adiwajshing/baileys";

export default class Command extends BaseCommand {
  constructor(client: WAClient, handler: MessageHandler) {
    super(client, handler, {
  command: "beg",
  category: "economy",
  description: "Beg for money",
  usage: "`${client.config.prefix}beg",
  accessableby: "everyone",
  run: async (bot, message, args) => {
    let user = message.author;

    let timeout = 120000;
    let amount = 20;

    let beg = await db.fetch(`beg_${user.id}`);

    if (beg !== null && timeout - (Date.now() - beg) > 0) {
      let time = ms(timeout - (Date.now() - beg));

      let timeEmbed = new MessageEmbed()
        .setColor("GREEN")
        .setDescription(
          `❌ You've already begged recently\n\nBeg again in ${time.minutes}m ${time.seconds}s `
        );
      message.channel.send(timeEmbed);
    } else {
      let moneyEmbed = new MessageEmbed()
        .setColor("GREEN")
        .setDescription(`✅ You've begged and received ${amount} coins`);
      message.channel.send(moneyEmbed);
      db.add(`money_${user.id}`, amount);
      db.add(`begs_${user.id}`, 1);
      db.set(`beg_${user.id}`, Date.now());
    }
  },
};
