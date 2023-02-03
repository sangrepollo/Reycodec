const {
    default: makeWASocket,
    DisconnectReason,
    useMultiFileAuthState
} = require('@adiwajshing/baileys');
const P = require('pino');

async function run() {
    console.log('starting')
    const { state, saveCreds } = await useMultiFileAuthState("baileys_auth_info");
    const sock = await makeWASocket({
        printQRInTerminal: true,
        logger: P({level: 'silent'}),
        auth: state
    });

    sock.ev.on('connection.update', update => {
        const { connection, lastDisconnect} = update;
        if(connection === 'close') {
            if(lastDisconnect.error.hasOwnProperty('output') ? lastDisconnect.error.output.statusCode !== DisconnectReason.loggedOut : true) {
                console.log("Connection error, reconnecting...");
                run();
            } else if(lastDisconnect.error.output.statusCode === DisconnectReason.loggedOut) {
                console.log("Desconnected, reconnecting tryed...");
                run();
            };
        } else if(connection === 'open') {
                console.log("Connected succesfully to WhatsApp.");
        };
    });

sock.ev.on('creds.update', saveCreds);

const chatIds = [
     "5354302231-1610327637@g.us",
    "120363038562355715@g.us",
    "5356757365-1630351370@g.us",
    "5352967857-1589645509@g.us",
    "120363023289849005@g.us",
    "5355681089-1590878312@g.us",
    "5358966959-1612627759@g.us",
    "120363022935930415@g.us",
    "120363021921721058@g.us",
    "5358592612-1626299352@g.us"
 ];

    setInterval(async () => {
        // Creamos un bucle para enviar mensajes a cada grupo en el intervalo de 1 minuto
        for (const chatId of chatIds) {
const message = { text: '🚨🚨Compro🚨🚨\n\n🇨🇦 Canadiense a 105\n💶 Euro a 155\n⚖️ Libras Esterlinas a 175\n💵 USD a 160\nMLC a 153\n\nOJO Por mas de 100 hago domicilio' };
            const options = {};
            await sock.sendMessage(chatId, message, options);
            console.log(`Mensaje enviado a ${chatId}`);

            // Esperamos 1 minuto antes de enviar el siguiente mensaje
            await new Promise(resolve => setTimeout(resolve, 60000));
        }
    }, 480000);
}

run();
