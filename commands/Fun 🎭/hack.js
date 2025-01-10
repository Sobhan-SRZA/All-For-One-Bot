module.exports = {
  name: "hack",
  aliases: ['hac','ha'],
  category: 'Fun 🎭 | Minigame',
  description: "hacking users and there information(it's fake).",
  usage: "[name | nickname | mention | ID]",

  async execute(client, message, args) { 
        const taggedUser = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    try{
        if (!args[0]){
          return message.reply("⚠️ | Yekio Mention Konid Ta Babasho Darbiaram <a:pishi_pofila:939919927278702723>")
        }else
        function wait(ms){
            let start = new Date().getTime();
            let end = start;
            while(end < start + ms) {
              end = new Date().getTime();
           }
         }
        if (taggedUser.user.bot) {
            return message.reply('⛔️ | Faghat Mitavanid Ensan Haro Mention Konid Ta Man Hackesh Konam <a:pepe_hacker:939919832936239114>')
        }else
        message.channel.send(`<a:pepe_hacker:939919832936239114> | Hacking  ${taggedUser} ...`)
const Discord = require("discord.js")

function epoch(date) {
  return Date.parse(date)
}
var createdAtDate = epoch(taggedUser.user.createdAt) / 1000;
var joinedAtDate = epoch(taggedUser.joinedAt) / 1000;

   let dmEmbed = new Discord.MessageEmbed()
    .setColor("RANDOM")
    .setAuthor(`Hacke Ishon ${taggedUser.user.tag} Tamom Shod`,taggedUser.user.displayAvatarURL())
    .setFooter(`Dar Khast Shode Tavasote ${message.author.tag} `,message.author.displayAvatarURL())
    .setTitle('Etealat Shakhs Hack Shode')
    .setDescription(`Hack Kamel Shod :)

📁| ID Taraf: **${taggedUser.user.id}**
📁| Tag E Taraf: **${taggedUser.user.tag}** 
📁| Tarikhe Sakhte Account: **<t:${createdAtDate}:R>** 
📁| Tarikhe Join Shodan Be Server: **<t:${joinedAtDate}:R>** 
📁| Balatarin Role Taraf To Server: ** <@&${taggedUser.roles.highest.id}>** 
📁| Range Profile: ** ${taggedUser.displayHexColor || '`Bi Rang`'}**
📁| Status E Taraf: **${taggedUser.presence.status}**`)
    .setImage(taggedUser.user.displayAvatarURL( { size:4096 , dynamic: true } ))




    
let zEmbed = new Discord.MessageEmbed()
    .setColor("RANDOM")
    .setAuthor(`Darhal Hack Kardane ${taggedUser.user.tag}`,taggedUser.user.displayAvatarURL())
    .setFooter(`Dar Khast Shode Tavasote ${message.author.tag} `,message.author.displayAvatarURL())
    .setDescription("Darhal Shoro e Hack Kardan...")
    .setTitle('<a:loading_message:939869115143819265> Status: 0%')


    
let oEmbed = new Discord.MessageEmbed()
    .setColor("RANDOM")
    .setAuthor(`Darhal Hack Kardane ${taggedUser.user.tag}`,taggedUser.user.displayAvatarURL())
    .setFooter(`Dar Khast Shode Tavasote ${message.author.tag} `,message.author.displayAvatarURL())
    .setDescription("Darhal Shoro e Hack Kardan...")
    .setTitle('<a:loading_message:939869115143819265> Status: 7%')
    
let tEmbed = new Discord.MessageEmbed()
    .setColor("RANDOM")
    .setAuthor(`Darhal Hack Kardane ${taggedUser.user.tag} `,taggedUser.user.displayAvatarURL())
    .setFooter(`Dar Khast Shode Tavasote ${message.author.tag} `,message.author.displayAvatarURL())
    .setDescription("Darhal Shoro e Hack Kardan...")
    .setTitle('<a:loading_message:939869115143819265> Status: 8%')

let hEmbed = new Discord.MessageEmbed()
    .setColor("RANDOM")
    .setAuthor(`Darhal Hack Kardane ${taggedUser.user.tag} `,taggedUser.user.displayAvatarURL())
    .setFooter(`Dar Khast Shode Tavasote ${message.author.tag} `,message.author.displayAvatarURL())
    .setDescription("Darhal Shoro e Hack Kardan...")
    .setTitle('<a:loading_message:939869115143819265> Status: 9%')

  let fEmbed = new Discord.MessageEmbed()
    .setColor("RANDOM")
    .setAuthor(`Darhal Hack Kardane ${taggedUser.user.tag} `,taggedUser.user.displayAvatarURL())
    .setFooter(`Dar Khast Shode Tavasote ${message.author.tag} `,message.author.displayAvatarURL())
    .setDescription("Darhal Shoro e Hack Kardan...")
    .setTitle('<a:loading_message:939869115143819265> Status: 12%')

    let sEmbed = new Discord.MessageEmbed()
    .setColor("RANDOM")
    .setAuthor(`Darhal Hack Kardane ${taggedUser.user.tag} `,taggedUser.user.displayAvatarURL())
    .setFooter(`Dar Khast Shode Tavasote ${message.author.tag} `,message.author.displayAvatarURL())
    .setDescription("Darhal Shoro e Hack Kardan...")
    .setTitle('<a:loading_message:939869115143819265> Status: 14%')

    let vEmbed = new Discord.MessageEmbed()
    .setColor("RANDOM")
    .setAuthor(`Darhal Hack Kardane ${taggedUser.user.tag} `,taggedUser.user.displayAvatarURL())
    .setFooter(`Dar Khast Shode Tavasote ${message.author.tag} `,message.author.displayAvatarURL())
    .setDescription("Darhal Shoro e Hack Kardan...")
    .setTitle('<a:loading_message:939869115143819265> Status: 17%')

        let eEmbed = new Discord.MessageEmbed()
    .setColor("RANDOM")
    .setAuthor(`Darhal Hack Kardane ${taggedUser.user.tag} `,taggedUser.user.displayAvatarURL())
    .setFooter(`Dar Khast Shode Tavasote ${message.author.tag} `,message.author.displayAvatarURL())
    .setDescription("Darhal Shoro e Hack Kardan...")
    .setTitle('<a:loading_message:939869115143819265> Status: 20%')

        let nEmbed = new Discord.MessageEmbed()
    .setColor("RANDOM")
    .setAuthor(`Darhal Hack Kardane ${taggedUser.user.tag} `,taggedUser.user.displayAvatarURL())
    .setFooter(`Dar Khast Shode Tavasote ${message.author.tag} `,message.author.displayAvatarURL())
    .setDescription("Darhal Shoro e Hack Kardan...")
    .setTitle('<a:loading_message:939869115143819265> Status: 21%')

             let teEmbed = new Discord.MessageEmbed()
    .setColor("RANDOM")
    .setAuthor(`Darhal Hack Kardane ${taggedUser.user.tag} `,taggedUser.user.displayAvatarURL())
    .setFooter(`Dar Khast Shode Tavasote ${message.author.tag} `,message.author.displayAvatarURL())
    .setDescription("Darhal Shoro e Hack Kardan...")
    .setTitle('<a:loading_message:939869115143819265> Status: 22%')

             let lEmbed = new Discord.MessageEmbed()
    .setColor("RANDOM")
    .setAuthor(`Darhal Hack Kardane ${taggedUser.user.tag} `,taggedUser.user.displayAvatarURL())
    .setFooter(`Dar Khast Shode Tavasote ${message.author.tag} `,message.author.displayAvatarURL())
    .setDescription("Darhal Shoro e Hack Kardan...")
    .setTitle('<a:loading_message:939869115143819265> Status: 24%')       

        let tlEmbed = new Discord.MessageEmbed()
    .setColor("RANDOM")
    .setAuthor(`Darhal Hack Kardane ${taggedUser.user.tag} `,taggedUser.user.displayAvatarURL())
    .setFooter(`Dar Khast Shode Tavasote ${message.author.tag} `,message.author.displayAvatarURL())
    .setDescription("Darhal Shoro e Hack Kardan...")
    .setTitle('<a:loading_message:939869115143819265> Status: 29%')

        let thEmbed = new Discord.MessageEmbed()
    .setColor("RANDOM")
    .setAuthor(`Darhal Hack Kardane ${taggedUser.user.tag} `,taggedUser.user.displayAvatarURL())
    .setFooter(`Dar Khast Shode Tavasote ${message.author.tag} `,message.author.displayAvatarURL())
    .setDescription("Darhal Shoro e Hack Kardan...")
    .setTitle('<a:loading_message:939869115143819265> Status: 31%')

        let dEmbed = new Discord.MessageEmbed()
    .setColor("RANDOM")
    .setAuthor(`Darhal Hack Kardane ${taggedUser.user.tag} `,taggedUser.user.displayAvatarURL())
    .setFooter(`Dar Khast Shode Tavasote ${message.author.tag} `,message.author.displayAvatarURL())
    .setDescription("Darhal Shoro e Hack Kardan...")
    .setTitle('<a:loading_message:939869115143819265> Status: 32%')

        let lvEmbed = new Discord.MessageEmbed()
    .setColor("RANDOM")
    .setAuthor(`Darhal Hack Kardane ${taggedUser.user.tag} `,taggedUser.user.displayAvatarURL())
    .setFooter(`Dar Khast Shode Tavasote ${message.author.tag} `,message.author.displayAvatarURL())
    .setDescription("Darhal Shoro e Hack Kardan...")
    .setTitle('<a:loading_message:939869115143819265> Status: 34%')

        let pEmbed = new Discord.MessageEmbed()
    .setColor("RANDOM")
    .setAuthor(`Darhal Hack Kardane ${taggedUser.user.tag} `,taggedUser.user.displayAvatarURL())
    .setFooter(`Dar Khast Shode Tavasote ${message.author.tag} `,message.author.displayAvatarURL())
    .setDescription("Darhal Shoro e Hack Kardan...")
    .setTitle('<a:loading_message:939869115143819265> Status: 36%')

        let bEmbed = new Discord.MessageEmbed()
    .setColor("RANDOM")
    .setAuthor(`Darhal Hack Kardane ${taggedUser.user.tag} `,taggedUser.user.displayAvatarURL())
    .setFooter(`Dar Khast Shode Tavasote ${message.author.tag} `,message.author.displayAvatarURL())
    .setDescription("Darhal Shoro e Hack Kardan...")
    .setTitle('<a:loading_message:939869115143819265> Status: 41%')

        let bbEmbed = new Discord.MessageEmbed()
    .setColor("RANDOM")
    .setAuthor(`Darhal Hack Kardane ${taggedUser.user.tag} `,taggedUser.user.displayAvatarURL())
    .setFooter(`Dar Khast Shode Tavasote ${message.author.tag} `,message.author.displayAvatarURL())
    .setDescription("Darhal Shoro e Hack Kardan...")
    .setTitle('<a:loading_message:939869115143819265> Status: 42%')

        let dddEmbed = new Discord.MessageEmbed()
    .setColor("RANDOM")
    .setAuthor(`Darhal Hack Kardane ${taggedUser.user.tag} `,taggedUser.user.displayAvatarURL())
    .setFooter(`Dar Khast Shode Tavasote ${message.author.tag} `,message.author.displayAvatarURL())
    .setDescription("Darhal Shoro e Hack Kardan...")
    .setTitle('<a:loading_message:939869115143819265> Status: 45%')

        let rEmbed = new Discord.MessageEmbed()
    .setColor("RANDOM")
    .setAuthor(`Darhal Hack Kardane ${taggedUser.user.tag} `,taggedUser.user.displayAvatarURL())
    .setFooter(`Dar Khast Shode Tavasote ${message.author.tag} `,message.author.displayAvatarURL())
    .setDescription("Darhal Shoro e Hack Kardan...")
    .setTitle('<a:loading_message:939869115143819265> Status: 47%')

        let nrEmbed = new Discord.MessageEmbed()
    .setColor("RANDOM")
    .setAuthor(`Darhal Hack Kardane ${taggedUser.user.tag} `,taggedUser.user.displayAvatarURL())
    .setFooter(`Dar Khast Shode Tavasote ${message.author.tag} `,message.author.displayAvatarURL())
    .setDescription("Darhal Shoro e Hack Kardan...")
    .setTitle('<a:loading_message:939869115143819265> Status: 50%')

        let ntEmbed = new Discord.MessageEmbed()
    .setColor("RANDOM")
    .setAuthor(`Darhal Hack Kardane ${taggedUser.user.tag} `,taggedUser.user.displayAvatarURL())
    .setFooter(`Dar Khast Shode Tavasote ${message.author.tag} `,message.author.displayAvatarURL())
    .setDescription("Darhal Shoro e Hack Kardan...")
    .setTitle('<a:loading_message:939869115143819265> Status: 53%')

        let nyEmbed = new Discord.MessageEmbed()
    .setColor("RANDOM")
    .setAuthor(`Darhal Hack Kardane ${taggedUser.user.tag} `,taggedUser.user.displayAvatarURL())
    .setFooter(`Dar Khast Shode Tavasote ${message.author.tag} `,message.author.displayAvatarURL())
    .setDescription("Darhal Shoro e Hack Kardan...")
    .setTitle('<a:loading_message:939869115143819265> Status: 58%')

        let naEmbed = new Discord.MessageEmbed()
    .setColor("RANDOM")
    .setAuthor(`Darhal Hack Kardane ${taggedUser.user.tag} `,taggedUser.user.displayAvatarURL())
    .setFooter(`Dar Khast Shode Tavasote ${message.author.tag} `,message.author.displayAvatarURL())
    .setDescription("Darhal Shoro e Hack Kardan...")
    .setTitle('<a:loading_message:939869115143819265> Status: 60%')

        let nxEmbed = new Discord.MessageEmbed()
    .setColor("RANDOM")
    .setAuthor(`Darhal Hack Kardane ${taggedUser.user.tag} `,taggedUser.user.displayAvatarURL())
    .setFooter(`Dar Khast Shode Tavasote ${message.author.tag} `,message.author.displayAvatarURL())
    .setDescription("Darhal Shoro e Hack Kardan...")
    .setTitle('<a:loading_message:939869115143819265> Status: 61%')

        let xxEmbed = new Discord.MessageEmbed()
    .setColor("RANDOM")
    .setAuthor(`Darhal Hack Kardane ${taggedUser.user.tag} `,taggedUser.user.displayAvatarURL())
    .setFooter(`Dar Khast Shode Tavasote ${message.author.tag} `,message.author.displayAvatarURL())
    .setDescription("Darhal Shoro e Hack Kardan...")
    .setTitle('<a:loading_message:939869115143819265> Status: 62%')

        let nvEmbed = new Discord.MessageEmbed()
    .setColor("RANDOM")
    .setAuthor(`Darhal Hack Kardane ${taggedUser.user.tag} `,taggedUser.user.displayAvatarURL())
    .setFooter(`Dar Khast Shode Tavasote ${message.author.tag} `,message.author.displayAvatarURL())
    .setDescription("Darhal Shoro e Hack Kardan...")
    .setTitle('<a:loading_message:939869115143819265> Status: 64%')

        let nmEmbed = new Discord.MessageEmbed()
    .setColor("RANDOM")
    .setAuthor(`Darhal Hack Kardane ${taggedUser.user.tag} `,taggedUser.user.displayAvatarURL())
    .setFooter(`Dar Khast Shode Tavasote ${message.author.tag} `,message.author.displayAvatarURL())
    .setDescription("Darhal Shoro e Hack Kardan...")
    .setTitle('<a:loading_message:939869115143819265> Status: 66%')

        let njEmbed = new Discord.MessageEmbed()
    .setColor("RANDOM")
    .setAuthor(`Darhal Hack Kardane ${taggedUser.user.tag} `,taggedUser.user.displayAvatarURL())
    .setFooter(`Dar Khast Shode Tavasote ${message.author.tag} `,message.author.displayAvatarURL())
    .setDescription("Darhal Shoro e Hack Kardan...")
    .setTitle('<a:loading_message:939869115143819265> Status: 69%')

        let nkEmbed = new Discord.MessageEmbed()
    .setColor("RANDOM")
    .setAuthor(`Darhal Hack Kardane ${taggedUser.user.tag} `,taggedUser.user.displayAvatarURL())
    .setFooter(`Dar Khast Shode Tavasote ${message.author.tag} `,message.author.displayAvatarURL())
    .setDescription("Darhal Shoro e Hack Kardan...")
    .setTitle('<a:loading_message:939869115143819265> Status: 72%')

        let nlhEmbed = new Discord.MessageEmbed()
    .setColor("RANDOM")
    .setAuthor(`Darhal Hack Kardane ${taggedUser.user.tag} `,taggedUser.user.displayAvatarURL())
    .setFooter(`Dar Khast Shode Tavasote ${message.author.tag} `,message.author.displayAvatarURL())
    .setDescription("Darhal Shoro e Hack Kardan...")
    .setTitle('<a:loading_message:939869115143819265> Status: 74%')

        let nhEmbed = new Discord.MessageEmbed()
    .setColor("RANDOM")
    .setAuthor(`Darhal Hack Kardane ${taggedUser.user.tag} `,taggedUser.user.displayAvatarURL())
    .setFooter(`Dar Khast Shode Tavasote ${message.author.tag} `,message.author.displayAvatarURL())
    .setDescription("Darhal Shoro e Hack Kardan...")
    .setTitle('<a:loading_message:939869115143819265> Status: 76%')

        let nffEmbed = new Discord.MessageEmbed()
    .setColor("RANDOM")
    .setAuthor(`Darhal Hack Kardane ${taggedUser.user.tag} `,taggedUser.user.displayAvatarURL())
    .setFooter(`Dar Khast Shode Tavasote ${message.author.tag} `,message.author.displayAvatarURL())
    .setDescription("Darhal Shoro e Hack Kardan...")
    .setTitle('<a:loading_message:939869115143819265> Status: 79%')

        let fjkjEmbed = new Discord.MessageEmbed()
    .setColor("RANDOM")
    .setAuthor(`Darhal Hack Kardane ${taggedUser.user.tag} `,taggedUser.user.displayAvatarURL())
    .setFooter(`Dar Khast Shode Tavasote ${message.author.tag} `,message.author.displayAvatarURL())
    .setDescription("Darhal Shoro e Hack Kardan...")
    .setTitle('<a:loading_message:939869115143819265> Status: 80%')

        let fdEmbed = new Discord.MessageEmbed()
    .setColor("RANDOM")
    .setAuthor(`Darhal Hack Kardane ${taggedUser.user.tag} `,taggedUser.user.displayAvatarURL())
    .setFooter(`Dar Khast Shode Tavasote ${message.author.tag} `,message.author.displayAvatarURL())
    .setDescription("Darhal Shoro e Hack Kardan...")
    .setTitle('<a:loading_message:939869115143819265> Status: 81%')

        let ffEmbed = new Discord.MessageEmbed()
    .setColor("RANDOM")
    .setAuthor(`Darhal Hack Kardane ${taggedUser.user.tag} `,taggedUser.user.displayAvatarURL())
    .setFooter(`Dar Khast Shode Tavasote ${message.author.tag} `,message.author.displayAvatarURL())
    .setDescription("Darhal Shoro e Hack Kardan...")
    .setTitle('<a:loading_message:939869115143819265> Status: 83%')

        let fsEmbed = new Discord.MessageEmbed()
    .setColor("RANDOM")
    .setAuthor(`Darhal Hack Kardane ${taggedUser.user.tag} `,taggedUser.user.displayAvatarURL())
    .setFooter(`Dar Khast Shode Tavasote ${message.author.tag} `,message.author.displayAvatarURL())
    .setDescription("Darhal Shoro e Hack Kardan...")
    .setTitle('<a:loading_message:939869115143819265> Status: 84%')

        let ddEmbed = new Discord.MessageEmbed()
    .setColor("RANDOM")
    .setAuthor(`Darhal Hack Kardane ${taggedUser.user.tag} `,taggedUser.user.displayAvatarURL())
    .setFooter(`Dar Khast Shode Tavasote ${message.author.tag} `,message.author.displayAvatarURL())
    .setDescription("Darhal Shoro e Hack Kardan...")
    .setTitle('<a:loading_message:939869115143819265> Status: 85%')

        let dddddEmbed = new Discord.MessageEmbed()
    .setColor("RANDOM")
    .setAuthor(`Darhal Hack Kardane ${taggedUser.user.tag} `,taggedUser.user.displayAvatarURL())
    .setFooter(`Dar Khast Shode Tavasote ${message.author.tag} `,message.author.displayAvatarURL())
    .setDescription("Darhal Shoro e Hack Kardan...")
    .setTitle('<a:loading_message:939869115143819265> Status: 88%')

        let sxEmbed = new Discord.MessageEmbed()
    .setColor("RANDOM")
    .setAuthor(`Darhal Hack Kardane ${taggedUser.user.tag} `,taggedUser.user.displayAvatarURL())
    .setFooter(`Dar Khast Shode Tavasote ${message.author.tag} `,message.author.displayAvatarURL())
    .setDescription("Darhal Shoro e Hack Kardan...")
    .setTitle('<a:loading_message:939869115143819265> Status: 89%')

        let sjkjkEmbed = new Discord.MessageEmbed()
    .setColor("RANDOM")
    .setAuthor(`Darhal Hack Kardane ${taggedUser.user.tag} `,taggedUser.user.displayAvatarURL())
    .setFooter(`Dar Khast Shode Tavasote ${message.author.tag} `,message.author.displayAvatarURL())
    .setDescription("Darhal Shoro e Hack Kardan...")
    .setTitle('<a:loading_message:939869115143819265> Status: 90%')

        let vcEmbed = new Discord.MessageEmbed()
    .setColor("RANDOM")
    .setAuthor(`Darhal Hack Kardane ${taggedUser.user.tag} `,taggedUser.user.displayAvatarURL())
    .setFooter(`Dar Khast Shode Tavasote ${message.author.tag} `,message.author.displayAvatarURL())
    .setDescription("Darhal Shoro e Hack Kardan...")
    .setTitle('<a:loading_message:939869115143819265> Status: 93%')

        let vvEmbed = new Discord.MessageEmbed()
    .setColor("RANDOM")
    .setAuthor(`Darhal Hack Kardane ${taggedUser.user.tag} `,taggedUser.user.displayAvatarURL())
    .setFooter(`Dar Khast Shode Tavasote ${message.author.tag} `,message.author.displayAvatarURL())
    .setDescription("Darhal Shoro e Hack Kardan...")
    .setTitle('<a:loading_message:939869115143819265> Status: 95%')

        let veEmbed = new Discord.MessageEmbed()
    .setColor("RANDOM")
    .setAuthor(`Darhal Hack Kardane ${taggedUser.user.tag} `,taggedUser.user.displayAvatarURL())
    .setFooter(`Dar Khast Shode Tavasote ${message.author.tag} `,message.author.displayAvatarURL())
    .setDescription("Darhal Shoro e Hack Kardan...")
    .setTitle('<a:loading_message:939869115143819265> Status: 97%')

        let vxEmbed = new Discord.MessageEmbed()
    .setColor("RANDOM")
    .setAuthor(`Darhal Hack Kardane ${taggedUser.user.tag} `,taggedUser.user.displayAvatarURL())
    .setFooter(`Dar Khast Shode Tavasote ${message.author.tag} `,message.author.displayAvatarURL())
    .setDescription("Darhal Shoro e Hack Kardan...")
    .setTitle('<a:loading_message:939869115143819265> Status: 99%')

        let vxxEmbed = new Discord.MessageEmbed()
    .setColor("RANDOM")
    .setAuthor(`Darhal Hack Kardane ${taggedUser.user.tag} `,taggedUser.user.displayAvatarURL())
    .setFooter(`Dar Khast Shode Tavasote ${message.author.tag} `,message.author.displayAvatarURL())
    .setDescription("Darhal Shoro e Hack Kardan...")
    .setTitle('<a:loading_message:939869115143819265> Status: 100%')

        message.channel.send(zEmbed).then(msg => {
            wait(93);
            msg.edit(oEmbed);
            wait(100);
            msg.edit(tEmbed);
            wait(20)
            msg.edit(hEmbed);
            wait(90);
            msg.edit(fEmbed);
            wait(60);
            msg.edit(sEmbed);
            wait(40);
            msg.edit(vEmbed);
            wait(40);
            msg.edit(eEmbed);
            wait(10);
            msg.edit(nEmbed);
            wait(60);
            msg.edit(teEmbed);
            wait(13);
            msg.edit(lEmbed);
            wait(80);
            msg.edit(tlEmbed);
            wait(80);
            msg.edit(thEmbed);
            wait(60);
            msg.edit(dEmbed);
            wait(80);
            msg.edit(lvEmbed);
            wait(80);
            msg.edit(pEmbed);
            wait(80);
            msg.edit(bEmbed);
            wait(40);
            msg.edit(bbEmbed);
            wait(40);
            msg.edit(dddEmbed);
            wait(40);
            msg.edit(rEmbed);
            wait(60);
            msg.edit(nrEmbed);
            wait(50); 
            msg.edit(ntEmbed);
            wait(35);
            msg.edit(nyEmbed);
            wait(60);
            msg.edit(naEmbed);
            wait(80);
            msg.edit(nxEmbed);
            wait(40);
            msg.edit(xxEmbed);
            wait(40);
            msg.edit(nvEmbed);
            wait(40);
            msg.edit(nmEmbed);
            wait(60);
            msg.edit(njEmbed);
            wait(20);
            msg.edit(nkEmbed);
            wait(60);
            msg.edit(nlhEmbed);
            wait(20);
            msg.edit(nhEmbed);
            wait(20);
            msg.edit(nffEmbed);
            wait(83);
            msg.edit(fjkjEmbed);
            wait(60);
            msg.edit(fdEmbed);
            wait(81);
            msg.edit(ffEmbed);
            wait(50);
            msg.edit(fsEmbed);
            wait(50);
            msg.edit(ddEmbed);
            wait(60);
            msg.edit(dddddEmbed);
            wait(60);
            msg.edit(sxEmbed);
            wait(20);
            msg.edit(sjkjkEmbed);
            wait(60);
            msg.edit(vcEmbed);
            wait(83);
            msg.edit(vvEmbed);
            wait(50);
            msg.edit(veEmbed);
            wait(60);
            msg.edit(vxEmbed);
            wait(60);
            msg.edit(vxxEmbed);
            wait(60);
            msg.edit(`Ishon ${taggedUser}.\n**Betor Kamel Hack Shod Va Alan Etealatesh Ro To Dm Behet Miferestam 🧑🏻‍🚀**`).then(() => {
  return message.author.send(dmEmbed)
 
            });
            
        })
                }catch(e) {
			console.log(e)
		      }
  }
}