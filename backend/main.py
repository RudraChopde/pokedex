from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import requests

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def home():
    return {"message": "Pokemon API Running!"}


@app.get("/pokemon/{name}")
def get_pokemon(name: str):

    url = f"https://pokeapi.co/api/v2/pokemon/{name.lower()}"
    res = requests.get(url)

    if res.status_code != 200:
        return {"error": "Pokemon not found"}

    data = res.json()

    # 🔥 SPECIES (for description)
    species_url = data["species"]["url"]
    species_res = requests.get(species_url)
    species_data = species_res.json()

    flavor_text = next(
        (entry["flavor_text"] for entry in species_data["flavor_text_entries"]
         if entry["language"]["name"] == "en"),
        "No description available."
    )

    flavor_text = flavor_text.replace("\n", " ").replace("\f", " ")

    # 🔥 TYPE EFFECTIVENESS
    all_types = [
        "normal","fire","water","electric","grass","ice",
        "fighting","poison","ground","flying","psychic","bug",
        "rock","ghost","dragon","dark","steel","fairy"
    ]

    type_multipliers = {t: 1 for t in all_types}


    for t in data["types"]:
        type_url = t["type"]["url"]
        type_res = requests.get(type_url)
        damage = type_res.json()["damage_relations"]

        for d in damage["double_damage_from"]:
            type_multipliers[d["name"]] *= 2

        for h in damage["half_damage_from"]:
            type_multipliers[h["name"]] *= 0.5

        for n in damage["no_damage_from"]:
            type_multipliers[n["name"]] *= 0

    # 🔥 GROUP RESULTS
    type_effectiveness = {
        "x4": [],
        "x2": [],
        "x0_5": [],
        "x0_25": [],
        "x0": []
    }

    for t, val in type_multipliers.items():
        if val == 4:
            type_effectiveness["x4"].append(t)
        elif val == 2:
            type_effectiveness["x2"].append(t)
        elif val == 0.5:
            type_effectiveness["x0_5"].append(t)
        elif val == 0.25:
            type_effectiveness["x0_25"].append(t)
        elif val == 0:
            type_effectiveness["x0"].append(t)

    # 🔥 FINAL RESPONSE
    pokemon = {
        "name": data["name"].capitalize(),
        "height": data["height"],
        "weight": data["weight"],
        "types": [t["type"]["name"] for t in data["types"]],
        "stats": {
            "hp": data["stats"][0]["base_stat"],
            "attack": data["stats"][1]["base_stat"],
            "defense": data["stats"][2]["base_stat"],
            "sp_atk": data["stats"][3]["base_stat"],
            "sp_def": data["stats"][4]["base_stat"],
            "speed": data["stats"][5]["base_stat"]
        },
        "sprite": data["sprites"]["other"]["official-artwork"]["front_default"],
        "description": flavor_text,
        "type_effectiveness": type_effectiveness  # ✅ FIXED
    }

    return pokemon