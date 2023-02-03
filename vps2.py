importar asyncio

de teletón import TelegramClient, errores

api_id = 29577035

api_hash = 'a1b79892e940a0033e36914534d01e70'

cliente = TelegramClient('nombre_sesión', api_id, api_hash)

definición asíncrona principal ():

    esperar cliente.start()

    

    group_entities = [esperar cliente.get_entity('@MLC_isladelajuventud'),

                      esperar cliente.get_entity('@compraisla'),

                      esperar cliente.get_entity('@isla_venta'),

                      esperar cliente.get_entity('@Isla_Ventas'),

                      aguardar cliente.get_entity('@ventasisladepinos'),

                      esperar cliente.get_entity('@geronabusiness'),

                      esperar cliente.get_entity('@mercadominoristameij'),

                      esperar cliente.get_entity('@comprasyventasenlaisla')]

    

    mientras que es cierto:

        para group_entity en group_entities:

            intentar:

                mensaje = '📯 BUSCO 📯\n\nMLC 150 💳‼️\nEURO 155 💶‼️\nUSD 150 💵‼️\n\n📫 DISPONIBLES https://wa.me/+5355806085 las 24 hrs, no dude escribir o llamar será bien atendido 📌\n\n🛎️ REMESAS 🛎️\n100 🇺🇸14500cup 🇨🇺\n112 🇺🇸 x 100mlc 🇨🇺\n110 🇺🇸x 100usd 🇨🇺\n\n🛡️. 🛡️\n🛡️ Le brindamos a nuestros clientes la mejor atención para su comodidad y confianza. 🛡️\n🛡️ Todo grupo presencial https://chat.whatsapp.com/L1frnLZTSykG2JTqZnnVk9. 🛡️\n'

                esperar cliente. enviar_mensaje (entidad_grupo, mensaje)

                await asyncio.sleep(60) # agrega una pausa de 60 segundos

            excepto errores.UsernameNotOccupiedError:

                # Si el usuario o grupo no existe, simplemente ignore y continúe

                aprobar

        esperar asyncio.sleep(9488) # espera 2:48 horas

con el cliente:

    cliente.bucle.ejecutar_hasta_completo(principal())

