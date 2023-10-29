const { spawn } = require('child_process');
const { default: makeWASocket, useMultiFileAuthState, DisconnectReason } = require('@whiskeysockets/baileys');
const P = require('pino');
const fs = require('fs');
const { mensajes } = require('./mensaje');

const usersMlc = {};

function clearConsole() {
    if (process.platform === 'win32') {
        const clearCmd = spawn('cmd', ['/c', 'cls'], { windowsHide: true, shell: true });
        clearCmd.stdout.on('data', (data) => {
            console.log(data.toString());
        });
    } else {
        const clearCmd = spawn('clear');
        clearCmd.stdout.on('data', (data) => {
            console.log(data.toString());
        });
    }
}

clearConsole();

setInterval(clearConsole, 600000);

async function run() {
    try {
        console.log('starting');
        const { state, saveCreds } = await useMultiFileAuthState("baileys_auth_info");
        const sock = await makeWASocket({
            printQRInTerminal: true,
            logger: P({ level: 'silent' }),
            auth: state
        });

        sock.ev.on('connection.update', update => {
            const { connection, lastDisconnect } = update;
            if (connection === 'close') {
                if (lastDisconnect.error.hasOwnProperty('output')) {
                    console.log("Connection error, reconnecting...");
                    run();
                } else if (lastDisconnect.error.output.statusCode === DisconnectReason.unknown) {
                    console.log("Disconnected, reconnecting...");
                    run();
                }
            } else if (connection === 'open') {
                console.log("Connected successfully to WhatsApp.");
            }
        });

        sock.ev.on('creds.update', saveCreds);

        sock.ev.on('messages.upsert', async ({ messages }) => {
            for (const message of messages) {
                console.log('Message Received:');
                console.log('Sender:', message.key.remoteJid);
                console.log('Content:', message.message);
                console.log('-------------------');

                try {
                    if (message.key.remoteJid.includes('@g.us')) {
                        const text = message.message.conversation ||
                            (message.message.imageMessage && message.message.imageMessage.caption) ||
                            (message.message.extendedTextMessage && message.message.extendedTextMessage.text);

                        // Agrega los filtros adicionales aquí
                        if (text) {
                            const chatJid = message.key.remoteJid;
                            let reply = false;

                            if (text.toLowerCase().includes('mlc')) {
                                // Verificar "mlc"
                                reply = true;
                            } else if (text.toLowerCase().includes('usd')) {
                                // Verificar "usd"
                                reply = true;
                            } else if (text.toLowerCase().includes('pepel')) {
                                // Verificar "pepel"
                                reply = true;
                            }

                            if (reply && (!usersMlc[chatJid] || (Date.now() - usersMlc[chatJid] >= 120000))) {
                                const randomMessage = mensajes[Math.floor(Math.random() * mensajes.length)];
                                const imagePath = './img/combo.jpg';

                                const imageOptions = {
                                    mimetype: 'image/jpeg',
                                    filename: 'combo.jpg',
                                    caption: randomMessage
                                };

                                const imageBuffer = fs.readFileSync(imagePath);

                                setTimeout(async () => {
                                    await sock.sendMessage(chatJid, { image: imageBuffer, ...imageOptions });
                                    usersMlc[chatJid] = Date.now();
                                }, 15000);
                            }
                        }
                    }
                } catch (error) {
                    console.error('Error al procesar el mensaje:', error);
                }
            }
        });

    } catch (error) {
        console.error('An error occurred:', error);
    }
}

run();
