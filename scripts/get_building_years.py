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
SELECT building_id, construction_date
FROM "Building"
WHERE type = 'Asuinrakennus' AND NOT EXISTS(
    SELECT id
    FROM "Renovation"
    WHERE building_id = "Building".building_id
)
''')
construction_years = {
    building_id: construction_date.year
    for building_id, construction_date
    in cur.fetchall()
    if construction_date
}
print(len(construction_years))
with open('construction_years.json', 'w') as f:
    json.dump(construction_years, f)
    