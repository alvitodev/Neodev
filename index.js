const Discord = require('discord.js')
const client = new Discord.Client()

const config = require('./config.json')
const command = require('./command')

client.on('ready', () => {
    console.log('The client is ready!')

    command(client, ['ping', 'test'], message => {
        message.channel.send('Pong!')
    })

    command(client, 'servers', message => {
        client.guilds.cache.forEach(guild => {
            message.channel.send(`${guild.name} punya member sebanyak ${guild.memberCount}`)
        })
    })

    command(client, ['cc', 'clearchannel'], message => {
        if (message.member.hasPermission('ADMINISTRATOR')) {
            message.channel.messages.fetch().then((results) => {
                message.channel.bulkDelete(results) 
            })
        }
    })

    command(client, 'status', (message) => {
        const content = message.content.replace('neostatus', '')

        client.user.setPresence({
            activity: {
                name: content,
                type: 0,
            },
        })
    })
})

client.login(process.env.DJS_TOKEN)