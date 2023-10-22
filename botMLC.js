const { spawn } = require('child_process');
const { default: makeWASocket, useMultiFileAuthState, DisconnectReason } = require('@whiskeysockets/baileys');
const P = require('pino');
const { mensajes } = require('./mensaje'); // Importa el archivo de mensajes

// Mantén un objeto para rastrear a los usuarios que enviaron "mlc" y el tiempo en que se les permitirá enviar otro mensaje
const usersMlc = {};

function clearConsole() {
    if (process.platform === 'win32') {
        // En Windows
        const clearCmd = spawn('cmd', ['/c', 'cls'], { windowsHide: true, shell: true });
        clearCmd.stdout.on('data', (data) => {
            console.log(data.toString());
        });
    } else {
        // En sistemas Unix (Linux, macOS)
        const clearCmd = spawn('clear');
        clearCmd.stdout.on('data', (data) => {
            console.log(data.toString());
        });
    }
}

// Limpia la consola al iniciar
clearConsole();

// Establece un temporizador para limpiar la consola cada 10 minutos (600,000 milisegundos)
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

        // Escuchar el evento 'messages.upsert'
        sock.ev.on('messages.upsert', ({ messages }) => {
            messages.forEach(message => {
                console.log('Message Received:');
                console.log('Sender:', message.key.remoteJid);
                console.log('Content:', message.message);
                console.log('-------------------');

                // Intenta manejar posibles errores aquí
                try {
                    // Verificar si el mensaje contiene "MLC" o "mlc" y es de un grupo
                    if (message.key.remoteJid.includes('@g.us')) {
                        const text = message.message.conversation ||
                                     (message.message.imageMessage && message.message.imageMessage.caption) ||
                                     (message.message.extendedTextMessage && message.message.extendedTextMessage.text);
                        if (text && text.toLowerCase().includes('mlc')) {
                            const chatJid = message.key.remoteJid;

                            // Verificar si este usuario ya envió "mlc"
                            if (!usersMlc[chatJid] || (Date.now() - usersMlc[chatJid] >= 60000)) {
                                // Seleccionar un mensaje aleatorio de la lista
                                const randomMessage = mensajes[Math.floor(Math.random() * mensajes.length)];
                                
                                // Esperar 5 segundos antes de enviar la respuesta
                                setTimeout(() => {
                                    const responseMessage = {
                                        text: randomMessage
                                    };
                                    sock.sendMessage(chatJid, responseMessage);
                                }, 5000);

                                // Marcar al usuario y registrar el tiempo en que se le permitirá enviar otro "mlc"
                                usersMlc[chatJid] = Date.now();
                            }
                        }
                    }
                } catch (error) {
                    console.error('Error al procesar el mensaje:', error);
                }
            });
        });

    } catch (error) {
        console.error('An error occurred:', error);
    }
}

run();
