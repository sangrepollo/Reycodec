import asyncio
from telethon import TelegramClient, errors

api_id = 29577035
api_hash = 'a1b79892e940a0033e36914534d01e70'

client = TelegramClient('session_name', api_id, api_hash)

async def main():
    await client.start()
    group_entities = [await client.get_entity('@MLC_isladelajuventud'),
                      await client.get_entity('@compraisla'),
                      await client.get_entity('@isla_venta'),
                      await client.get_entity('@Isla_Ventas'),
                      await client.get_entity('@ventasisladepinos'),
                      await client.get_entity('@lacompraventaisladelajuventudvendes'),
                      await client.get_entity('@geronabusiness'),
                      await client.get_entity('@mercadominoristameij'),
                      await client.get_entity('@comprasyventasenlaisla')]
    while True:
        for group_entity in group_entities:
            try:
                await client.send_message(group_entity, 'ð¯ BUSCO ð¯\n\nMLC 150 ð³â¼ï¸\nEURO 155 ð¶â¼ï¸\nUSD 150 ðµâ¼ï¸\n\nð« DISPONIBLES https://wa.me/+5355806085 las 24 hrs, no dude escribir o llamar serÃ¡ bien atendido ð\n\nðï¸ REMESAS ðï¸\n100 ðºð¸14500cup ð¨ðº\n112 ðºð¸ x 100mlc ð¨ðº\n110 ðºð¸x 100usd ð¨ðº\n\nð¡ï¸ Nuestro servicio es de alta seguridad. ð¡ï¸\nð¡ï¸ Le brindamos a nuestros clientes la mejor atenciÃ³n para su comodidad y confianza. ð¡ï¸\nð¡ï¸ Todo presencial grupo https://chat.whatsapp.com/L1frnLZTSykG2JTqZnnVk9. ð¡ï¸')
                await asyncio.sleep(60) # agrega una pausa de 60 segundos
            except errors.UsernameNotOccupiedError:
                # Si el usuario o grupo no existe, simplemente ignorar y continuar
                pass
        await asyncio.sleep(9488) # espera 2:48 horas

with client:
    client.loop.run_until_complete(main())

      
