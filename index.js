const TelegramApi = require('node-telegram-bot-api')

const token = '1874352341:AAHeUH5279z1WS2_nIYPiycSgzY82KAU7zg'

const bot = new TelegramApi(token, {polling: true})

const options = {
    reply_markup: JSON.stringify( {
        inline_keyboard: [
            [{text: 'RUB ➡ KZT', callback_data: 'rubtotg'}, {text: 'RUB ➡ UAH', callback_data: 'rubtogr'} ],
            [{text: 'KZT ➡ UAH', callback_data: 'tgtogr'}, {text: 'KZT ➡ RUB', callback_data: 'tgtorub'} ],
            [{text: 'UAH ➡ RUB', callback_data: 'grtorub'}, {text: 'UAH ➡ KZT', callback_data: 'grtotg'} ],
        ]
    })
}
const start = () => {
    bot.setMyCommands( [
        {command: '/start', description: 'Старт'},
        {command: '/info', description: 'Информация'},
        {command: '/money', description: 'Обменник валют'},

    ])

    bot.on('message', async msg => {
        const text = msg.text;
        const chatId = msg.chat.id;

        if (text == '/start') {
            await bot.sendMessage(chatId, 'Здравствуйте, ' +msg.from.first_name);
            return bot.sendSticker(chatId, 'https://tlgrm.ru/_/stickers/251/c65/251c658b-ca78-3b8b-9b23-11029f4a7109/9.webp')
        }
        if (text == '/info') {
            return bot.sendMessage(chatId, 'Ну я крч создал этого бота это крч обменник валют')
        }
        if (text == '/money') {
            return bot.sendMessage(chatId, 'Выбери нужные валюты', options);
        }
        return bot.sendMessage(chatId, 'Такой команды не существует');

    })

    bot.on('callback_query', msg => {
        const data = msg.data;
        const chatId = msg.message.chat.id;

        bot.sendMessage(chatId, 'Напиши сумму')
        console.log(msg)
    })
}

start()

