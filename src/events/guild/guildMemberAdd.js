const {
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  AttachmentBuilder
} = require('discord.js');
const fs = require("fs/promises");
const welcome = require("./../../functions/generators/generateWelcomeImage");
const error = require('../../functions/error');

/**
 * 
 * @param {import("discord.js").Client} client 
 * @param {import("discord.js").GuildMember} member 
 * @returns 
 */
module.exports = async (client, member) => {
  try {
    if (member.guild.id === client.config.serverId && !member.user.bot) {
      try {
        // Send welcome message to dm.
        const embed = new EmbedBuilder()
          .setColor("Green")
          .setTitle(`Welcome To Your Guild`)
          .addFields([{
            name: `Language: PER🇮🇷`,
            value: `سلام به ${member.guild.name} خوش اومدید، اینجا یک جامعه کوچک ایرانی هستش که سعی میکنیم محیطی سالم و به دور از هرگونه حاشیه برای ممبر هایمان فراهم بکنیم از این رو از شما انتظار میرود که قوانین سر رو مطالعه و در پیروی از آنها بکوشید لطفا جهت کمک به سایر کاربران در استفاده از ضمایر صحیح و همچنین دونستن سن شما، شخصی سازی کردن پروفایلتون در سرور و گرفتن رول های منشن برای جلوگیری از منشن های آزار دهنده رول های خودتون رو دریافت کنید شما میتوانید در چنل <#1181764926147133544> قوانین ما، توضیحات چنل ها، سوالات پر تکرار را مشاهده کنید، رول های خودتون رو دریافت کنید، از ما حمایت کنید، یک تیکت برای ارتباط با تیم ادمینی بسازید، و یا بازخورد خودتون از سرور رو برای ما ارسال کنید! از حضورتون در سرور لذت ببرید ما مشتاقانه منتظر دیدن شما توی چت هستیم. امیدواریم در سرور لحظات خوشی رو سپری کنید.`
          }, {
            name: `Language: EN🇺🇸`,
            value: `Hello, welcome to ${member.guild.name}, this is a small Iranian community where we try to provide a healthy environment for our members, away from any sidelines, so you are expected to read and follow the rules. Please try them in order to help other users to use the correct pronouns and also to know your age, to personalize your profile on the server and to get mention rolls to avoid annoying mentions. You can get your rolls in the channel <#1181764926147133544> Our rules, View channel descriptions, frequently asked questions, get your rolls, support us, create a ticket to communicate with the admin team, or send us your server feedback! Enjoy your presence on the server, we look forward to seeing you in the chat. We hope you have a good time on the server.`
          }])
          .setURL("https://dsc.gg/pc-club")
          .setFooter({ text: `Thanks for read • ${member.guild.name}`, iconURL: client.user.displayAvatarURL({ dynamic: true }) })
          .setThumbnail(member.guild.iconURL({ dynamic: true }));

        await member.user.send({
          content: `**Hello my dear friend 👋🏻${member.user}👋🏻, welcome to  🥰🤩\`${member.guild.name}\`🤩🥰\n<a:w1:993076245870936094><a:e1:993076185913372712><a:l1:993076359297507329><a:c1:993075790214340639><a:o1:993075784631734273><a:m1:993075773269360640><a:e1:993076185913372712>**`,
          embeds: [embed],
          components: [new ActionRowBuilder().addComponents([new ButtonBuilder().setStyle(ButtonStyle.Link).setLabel('Rules and Information').setEmoji(`📖`).setURL(`https://discord.com/channels/1181764925874507836/1181764926147133544`)], [new ButtonBuilder().setStyle(ButtonStyle.Link).setLabel('Lets Chat').setEmoji(`💬`).setURL(`https://discord.com/channels/1181764925874507836/1181764926545596444`)])]
        });
      } catch {
      }
    }

    // Send welcome message to channel.
    const hasWelcome = await client.db.has(`welcome.${member.guild.id}`);
    if (hasWelcome) {
      const database = await client.db.get(`welcome.${member.guild.id}`);
      const channel = member.guild.channels.cache.get(database.channel);
      if (!channel) return;
      const image = new welcome()
        .setUserAvatar(member.user.displayAvatarURL({ size: 4096, extension: "png" }))
        .setAvatarToCircle(true)
        .setUserName(member.user.tag)
        .setMemberCount(member.guild.memberCount)
        .setBackGround(await fs.readFile("./src/storage/images/welcomeImage.png"));

      await channel.send({
        content: database.message.replaceAll("{member}", member.user).replaceAll("{memberName}", member.user.tag).replaceAll("{guild}", member.guild.name).replaceAll("{next}", "\n").replaceAll("{count}", member.guild.memberCount),
        files: [new AttachmentBuilder(await image.generate(), { name: `${member.guild.name} Welcome Image.png`, description: `Guild: ${member.guild.name} | ${member.guild.id} | ${member.guild.memberCount} Members\nUser: ${member.user.tag} | ${member.user.id}` })]
      });
    }

  } catch (e) {
    error(e)
  }
}
/**
 * @copyright
 * Coded by Sobhan-SRZA (mr.sinre) | https://github.com/Sobhan-SRZA
 * @copyright
 * Work for Persian Caesar | https://dsc.gg/persian-caesar
 * @copyright
 * Please Mention Us "Persian Caesar", When Have Problem With Using This Code!
 * @copyright
*/