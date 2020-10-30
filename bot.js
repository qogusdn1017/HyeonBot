const Discord = require("discord.js");
const client = new Discord.Client();
const prefix = "q!"

client.on("ready", () => {
    console.log(`${client.user.tag} Bot Successfully Logged in!`);
});
client.on("message", msg => {
    if (!msg.guild) return; 
    if (msg.author.bot) return; 
    if (msg.content.indexOf(prefix) !== 0) return; 
    var args = msg.content.slice(prefix.length).trim().split(/ +/g); 
    var command = args.shift().toLowerCase(); 
    if (command === `ping`) { 
        msg.reply(`Pong! ${client.ws.ping}ms. :white_check_mark:`);
    }
    if (command === `botinfo`) {
        var embed = new Discord.MessageEmbed()
            .setTitle("HyeonBot") 
            .setDescription("Created by BaeHyeonWoo | qogusdn1017. Written in JS.")
            .setColor("#000000")
            .setFooter("https://baehyeonwoo.works/")
            .setThumbnail("imglink")
            .setImage("imglink")

            .setTimestamp()
            .addField("FieldMain", "FieldDesc")
        msg.reply(embed)
    }

    if (command === `kick`) {
        var user = msg.mentions.users.first();
        if (!user) {
            msg.reply("Please mention the user before use kick command.")
        } else {
            var member = msg.guild.member(user);
            if (member) {
                member.kick(`Kicked by ${msg.author.username}`).then(member => {
                    msg.reply(`:white_check_mark: Successfully kicked ${member.user.tag}`)
                })
            } else {
                msg.reply("This use does not exist in this server!")
            }
        }
    }

    if (command === `ban`) {
        var user = msg.mentions.users.first();
        if (!user) {
            msg.reply(":no_entry_sign: Please mention the user before use ban command.")
        } else {
            var member = msg.guild.member(user);
            if (member) {
                member.ban(`Kicked by ${msg.author.username}.`).then(member => {
                    msg.reply(`:white_check_mark: Successfully banned ${member.user.tag}.`)
                })
            } else {
                msg.reply(":no_entry_sign: This use does not exist in this server!")
            }
        }
    }

    if (command === `청소`) {
        if (!args[0]) return msg.reply("You have to write down the value the message to be cleaned as an integer. (1~100)")
        if (!Number(args[0])) return msg.reply("The value to clear the message must be a number. (1~100)")
        if (args[0] < 1) return msg.reply("The value to clear the message is less than 1.")
        if (args[0] > 100) return msg.reply("The value to clear the message is greater than 100.")
        msg.channel.bulkDelete(args[0])
        msg.reply(`Successfully deleted ${args[0]} messages!`).then(msg => {msg.delete({ timeout: 3000 })});
    }
});

client.login("") // Token