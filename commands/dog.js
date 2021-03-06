const randomDogJs = require("random.dog.js");
const Discord = require("discord.js");
exports.run = async (client, message, args, level) => {
	const dogPic = randomDogJs.api();
	const dog = await dogPic.getDog();
	if(!dog) return message.channel.send("Uh oh, it seems that something broke \:("); // eslint-disable-line no-useless-escape

	if(dog.url.endsWith(".mp4")) return message.channel.send(dog.url);

	if(message.channel.memberPermissions(message.guild.me).has("EMBED_LINKS")){
		const embed = new Discord.RichEmbed()
			.setImage(dog.url);

		return message.channel.send({ embed });
	}
	return message.channel.send(dog.url);
};

exports.conf = {
	enabled: true,
	guildOnly: false,
	aliases: ["dogs", "doggo"],
	permLevel: 0,
};

exports.help = {
	name: "dog",
	category: "Misc",
	description: "Posts a random dog picture or gif.",
	usage: "dog](..)",
};
