import { NowRequest, NowResponse } from '@now/node'

import TelegramBot from 'node-telegram-bot-api';

// replace the value below with the Telegram token you receive from @BotFather
const token = process.env.TOKEN || "";

const webHookForTelegram = process.env.WEBHOOK || "";

if( token === "" ) {
    console.error( "You must provide a token to use Telegram API. Please, provide it via TOKEN environment variable." );
    process.exit( -1 );
}

if( webHookForTelegram === "" ) {
    console.error( "You must provide a webHook to use with Telegram API. Please, provide it via WERBHOOK environment variable." );
    process.exit( -1 );
}

const options = {
  webHook: {
    // Just use 443 directly
    port: 443
  }
}

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot( token, options );

// This informs the Telegram servers of the new webhook.
// Note: we do not need to pass in the cert, as it already provided
bot.setWebHook( `${webHookForTelegram}/bot${token}` );

// Listen for any kind of message. There are different kinds of
// messages.
bot.on( 'message', ( msg ) => {
    const chatId = msg.chat.id;

    // send a message to the chat acknowledging receipt of their message
    bot.sendMessage( chatId, 'Received your message' );
} );

export default async ( req: NowRequest, res: NowResponse ) => {
  console.info( token, webHookForTelegram )
  res.json({ name: 'John', email: 'john@example.com', token: token, webHookForTelegram: webHookForTelegram })
}