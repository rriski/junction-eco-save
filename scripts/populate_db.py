import os
import json
import psycopg2
import requests
from dotenv import load_dotenv
from pathlib import Path  # Python 3.6+ only
env_path = Path('.') / '.env.local'
load_dotenv(dotenv_path=env_path)

DB_URL = os.getenv('DATABASE_URL')
print(DB_URL)
conn = psycopg2.connect(DB_URL)
cur = conn.cursor()


cur.execute('''
SELECT *
FROM "Renovation";
''')
res = cur.fetchone()


JULKISIVU = {
 '1': "Betoni",
 '2': "Tiili",
 '3': "Metallilevy",
 '4': "Kivi",
 '5': "Puu",
 '6': "Lasi",
 '7': "Muu",
}
RA_KANTRAKAINE = {
'1': "Betoni tai kevytbetoni",
'2': "Tiili",
'3': "Teräs",
'4': "Puu",
'5': "Muu",
}
RA_LAMMITYSTAPA = {
'1': "Vesikeskuslämmitys",
'2': "Ilmakeskuslämmitys",
'3': "Suora sähkölämmitys",
'4': "Uunilämmitys",
'5': "Ei kiinteää lämmityslaitetta",
}
RA_LAMMONLAHDE = {
'1': "Kauko- tai aluelämpö",
'2': "Kevyt polttoöljy",
'3': "Raskas polttoöljy",
'4': "Sähkö",
'5': "Kaasu",
'6': "Kivihiili, koksi tms.",
'7': "Puu",
'8': "Turve",
'9': "Maalämpö tms.",
'10': "Muu",
}

flatten = lambda t: [item for sublist in t for item in sublist]

def fetch_buildings():
    cur.execute('''
        SELECT building_id
        FROM "Building";
    ''')
    existing_properties = {
        row[0] for row in cur.fetchall()
    }
    print(len(existing_properties))
    print(list(existing_properties)[0])
    print("091-029-0065-0005" in existing_properties)
    with open('buildings.json', 'r') as f:
        file_data = json.load(f)['features']
        print(file_data[0])
    buildings = list({
        building['properties'].get('c_kiinteistotunnus'): building
        for building
        in file_data
        if building['properties'].get('c_kiinteistotunnus') and building['properties']['c_kiinteistotunnus'] not in existing_properties
    }.values())
    print(len(buildings))
    for i in range(len(buildings) // 100 + 1):
        bs = buildings[i*100:(i+1)*100]
        print(len({building['properties']['c_kiinteistotunnus'] for building in bs}), len(bs))
        query = '''
            INSERT INTO "Building"
            (
                building_id,
                construction_date,
                heating_category,
                fuel_category,
                construction_material,
                area_living,
                area_floors,
                floors,
                location_street_address,
                location_street_number,
                location_post_number,
                type
            ) VALUES
        ''' + ("(%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s), " * len(bs))[:-2] + ";"
        try:
            print("executing")
            cur.execute(
                query,
                flatten([
                    [
                        building['properties'].get('c_kiinteistotunnus'),
                        building['properties'].get('c_valmpvm'),
                        RA_LAMMITYSTAPA.get(building['properties'].get('c_lammtapa'), "Muu"),
                        RA_LAMMONLAHDE.get(building['properties'].get('c_poltaine'), "Muu"),
                        RA_KANTRAKAINE.get(building['properties'].get('c_rakeaine'), "Muu"),
                        building['properties'].get('d_ashuoala'),
                        building['properties'].get('i_kerrala'),
                        building['properties'].get('i_kerrlkm'),
                        building['properties'].get('katunimi_suomi'),
                        building['properties'].get('osoitenumero'),
                        building['properties'].get('postinumero'),
                        building['properties'].get('tyyppi'),
                    ] for building in bs
                ])
            )
            print("added 100")
        except psycopg2.errors.UniqueViolation as e:
            print("uniqueViolation")
            print(e)
            conn.rollback()
            continue
        conn.commit()

fetch_buildings()