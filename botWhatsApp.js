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
"5356232334-1633898220@g.us",
"5355098331-1623611499@g.us",
"5356960902-1565443973@g.us",
"5354439769-1619263585@g.us",
"5355805255-1621218494@g.us",
"5358885713-1581255063@g.us",
"5354439769-1621947682@g.us",
"5354323985-1632773150@g.us",
"5353431981-1616292182@g.us",
"5353831951-1616888351@g.us",
"120363023090745405@g.us",
"5356962889-1611279396@g.us",
"5359319772-1631296693@g.us",
"5353161290-1634782533@g.us",
"120363038764433357@g.us",
"120363038155511051@g.us",
"5351588872-1635997686@g.us",
"5353161290-1634514093@g.us",
"5353161290-1634513885@g.us",
"120363039333366256@g.us",
"120363023826166991@g.us",
"120363040889828860@g.us",
"120363041204816335@g.us",
"120363046406325801@g.us",
"120363047574715216@g.us",
"120363042701288186@g.us",
"120363029055442402@g.us",
"120363028880578639@g.us",
"120363041617058079@g.us",
"120363023725673079@g.us",
"120363038207067544@g.us",
"120363025927478058@g.us",
"5354743209-1635812551@g.us",
"5351559011-1622515553@g.us",
"120363046157708445@g.us",
"120363047574715216@g.us",
"120363042676043376@g.us",
"120363045630451781@g.us",
"120363027569296589@g.us",
"120363041178168817@g.us",
"120363038950506536@g.us",
"5356757365-1623897673@g.us",
"120363050019543734@g.us",
"120363023289849005@g.us",
"5352967857-1589645509@g.us",
"120363022038616009@g.us",
"5356757365-1630351370@g.us",
"5356757365-1630351370@g.us",
"5353557467-1600039370@g.us",
"120363023408178465@g.us",
"120363027085045164@g.us",
"120363038501427649@g.us",
"120363031354330509@g.us",
"5356815652-1618668404@g.us",
"5351419890-1608819728@g.us",
"5355681089-1590878312@g.us",
"120363021921721058@g.us",
"120363022935930415@g.us",
"5358966959-1612627759@g.us",
"120363024155668177@g.us",
"120363048259439295@g.us",
"120363030093166515@g.us",
"120363028962379574@g.us"

];

    setInterval(async () => {
        // Creamos un bucle para enviar mensajes a cada grupo en el intervalo de 1 minuto
        for (const chatId of chatIds) {
const message = {
text: '🇺🇸🇨🇺 OFERTAS\n\n❌❌❌❌❌❌❌❌❌\nSe vende Números ☎️ virtuales este número sirve para Tener un WhatsApp con el número +1 de 🇺🇲 Estados Unidos obtenga WhatsApp Si ustede quiere Ser vendedor anónimo esrcibame lo espero en mi privado no sé arrepentirá y cuida su trabajo y la identidad 😃👌👌'
};
            const options = {};
            await sock.sendMessage(chatId, message, options);
            console.log(`Mensaje enviado a ${chatId}`);

            // Esperamos 1 minuto antes de enviar el siguiente mensaje
            await new Promise(resolve => setTimeout(resolve, 60000));
        }
    }, 10800000);
}

run();
