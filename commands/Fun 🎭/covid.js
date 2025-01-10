const Discord = require('discord.js')
const api = require('novelcovid');
module.exports = {
    name: 'covid-19',
    aliases: ['co','c19'],
    category: 'Fun 🎭 | Minigame',
    usage: '',
  async execute(client, message, args) { 
                if(!args[0]) {
      return message.channel.send("Search for a country, state, or get information about every country by typing !corona all.")
    }

    if(args[0] === "all") {
      await api.all().then((data) => {
        let embed = new Discord.MessageEmbed()
          .setTitle("Global Cases")
          .setColor("RANDOM")
          .addField("Total Cases", data.cases, true)
          .addField("Total Deaths", data.deaths, true)
          .addField("Total Recovered", data.recovered, true)
          .addField("Today's Cases", data.todayCases, true)
          .addField("Today's Deaths", data.todayDeaths, true)
          .addField("Active Cases", data.active, true)
          .setFooter(`© ${message.guild.me.displayName}`, client.user.displayAvatarURL());
      
        return message.channel.send(embed)
      }).catch(err => console.log(err));
          } else if (args[0] === "state"){
      if(!args[1]){
          return message.channel.send("You have to enter a state to search for!")
      } else{
        let state = args.slice(1).join(' ');
        await api.states({state: state}).then((data) => {
          if(data.state === undefined) return message.channel.send("Are you sure that state exists?");
          let embed = new Discord.MessageEmbed()
            .setTitle(`${data.state}`)
            .setColor("RANDOM")
            .addField("Total Cases", data.cases, true)
            .addField("Total Deaths", data.deaths, true)
            .addField("Today's Cases", data.todayCases, true)
            .addField("Today's Deaths", data.todayDeaths, true)
            .addField("Active Cases", data.active, true)
            .setFooter(`© ${message.guild.me.displayName}`, client.user.displayAvatarURL());
          
          return message.channel.send(embed)
        }).catch(err => console.log(err));
      }
    } else{
      let country = args.slice(0).join(' ');

      await api.countries({country: country}).then((data) => {
        if(data.country === undefined) return message.channel.send("Are you sure that country exists?");
        let embed = new Discord.MessageEmbed()
          .setTitle(`${data.country}`)
          .setColor("RANDOM")
          .addField("Total Cases", data.cases, true)
          .addField("Total Deaths", data.deaths, true)
          .addField("Total Recovered", data.recovered, true)
          .addField("Today's Cases", data.todayCases, true)
          .addField("Today's Deaths", data.todayDeaths, true)
          .addField("Active Cases", data.active, true)
          .setFooter(`© ${message.guild.me.displayName}`, client.user.displayAvatarURL());
        message.channel.startTyping()
        return message.channel.send(embed)
        
      }).catch(err => console.log(err));
    }
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