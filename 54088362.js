import asyncio

from telethon import TelegramClient, errors

api_id = 23619458

api_hash = '4012da61402431069fc727c4efdafa42'

client = TelegramClient('session_name', api_id, api_hash)

async def main():

    await client.start()

    group_entities = [await client.get_entity('@MLC_isladelajuventud'),

                      await client.get_entity('@compraisla'),

                     # await client.get_entity('@El_Bahia_Compra_y_Vende'),

                      await client.get_entity('@isla_venta'),

                      await client.get_entity('@Isla_Ventas'),

                      await client.get_entity('@ventasisladepinos'),

                      await client.get_entity('@CompraVentaHabana'),

                      await client.get_entity('@Ofertas_Ciego_de_Avila'),

                      await client.get_entity('@CompraVentaCiegodeAvila'),

                      await client.get_entity('@VentasSantaMarta'),

                      await client.get_entity('@MovilesHabana'),

                      await client.get_entity('@wificuba'),

                      await client.get_entity('@Ofertas_Pinar_del_Rio'),

                      await client.get_entity('@Ofertas_Santi_Spiritus'),

                      await client.get_entity('@Ofertas_Camaguey'),

                      await client.get_entity('@oferta_habana'),

                     # await client.get_entity('@Pinar_en_venta'),

                      await client.get_entity('@promo_ventas_bauta'),

                      await client.get_entity('@Ventasenguanabocoa'),

                      await client.get_entity('@sspvende'),

                      await client.get_entity('@cienfuegos_revolico'),

                      await client.get_entity('@MercadoLibreHolguin'),

                      await client.get_entity('@Gtmocompraventa'),

                      await client.get_entity('@VentaSantiago'),

                      await client.get_entity('@UltimaHoraChat'),

                      await client.get_entity('@dondehay'),

                      await client.get_entity('@DondeHayCiegoDeAvila'),

                      await client.get_entity('@clasificados_cav'),

                      await client.get_entity('@vdjdkskjzb'),

                      await client.get_entity('@PorLaLibre_Cuba'),

                      await client.get_entity('@Habana_Vieja_Compra_Vende'),

                      await client.get_entity('@cojimar2'),

                      await client.get_entity('@Compras_Ventas_Cuba'),

                     # await client.get_entity('@Pinar_en_venta'),

                      await client.get_entity('@promo_ventas_bauta'),

                      await client.get_entity('@Ventasenguanabocoa'),

                      await client.get_entity('@sspvende'),

                      await client.get_entity('@cienfuegos_revolico'),

                      await client.get_entity('@MercadoLibreHolguin'),

                      await client.get_entity('@Gtmocompraventa'),

                      await client.get_entity('@VentaSantiago'),

                      await client.get_entity('@UltimaHoraChat'),

                      await client.get_entity('@dondehay'),

                      await client.get_entity('@DondeHayCiegoDeAvila'),

                      await client.get_entity('@clasificados_cav'),

                      await client.get_entity('@vdjdkskjzb'),

                      await client.get_entity('@PorLaLibre_Cuba'),

                      await client.get_entity('@Habana_Vieja_Compra_Vende'),

                      await client.get_entity('@cojimar2'),

                      await client.get_entity('@Compras_Ventas_Cuba'),

                      #await client.get_entity('@El_Bahia_Compra_y_Vende'),

                      await client.get_entity('@ventas_encargos_muebles'),

                      await client.get_entity('@CompraVentas_Cuba'),

                      await client.get_entity('@todo_spam_grupo'),

                      await client.get_entity('@canalesygruposcuba'),

                      await client.get_entity('@Ganar_Dinero_referidos_Grupo'),

                      await client.get_entity('@onlinestg'),

                      await client.get_entity('@spamthemall'),

                      await client.get_entity('@spam_droup'),

                      await client.get_entity('@clasificados_cuba'),

                      await client.get_entity('@Revolico_CU'),

                      await client.get_entity('@CentroCasas'),

                      await client.get_entity('@movilescubavarios_cu'),

                      await client.get_entity('@android_vs_apple'),

                      await client.get_entity('@HABANA_PC'),

                      await client.get_entity('@divisa_cu'),

                      await client.get_entity('@geronabusiness'),

                      await client.get_entity('@mercadominoristameij'),

                      await client.get_entity('@comprasyventasenlaisla')]
                      
                     

     while True:

        for group_entity in group_entities:

            try:

                await client.send_message(group_entity, '⭕ ❌ ⭕ ❌ ⭕ ❌ ⭕ ❌ ⭕ ❌ ⭕

 \n 📯 ⚠  Atencion ⚠ \n  se vende numeros Virtuales +1 🇺🇸 Precio 250 CUP\n est

e numero es para Whatsapp Mantente tu Anonimato interesado contactar mi privado

de telegram o  Mi  whatsapp 59133385   🛡 ⚠  Atencion ⚠ Se vende también VPN pre

mium ✅   con acceso a 3200 Servidores Mundial Ⓜ️ "ojo" es la mejor  ☎contactar

51474701 WhatsApp ')

                await asyncio.sleep(60) # agrega una pausa de 60 segundos

            except errors.FloodWaitError as e:

                await asyncio.sleep(e.seconds + 10)

            except errors.ChatAdminRequiredError:

                continue

            except Exception as e:

                print(f"Se produjo un error: {type(e).__name__} - {str(e)}")

        await asyncio.sleep(9488) # espera 2:48 horas

with client:

    client.loop.run_until_complete(main())
