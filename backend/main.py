type_cache = {}
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

def parse_evolution_chain(chain):
    evolutions = []

    current = chain

    while current:
        evo_details = current["evolution_details"]

        trigger = None

        if evo_details:
            details = evo_details[0]

            if details["min_level"]:
                trigger = f"Level {details['min_level']}"

            elif details["item"]:
                trigger = f"Use {details['item']['name']}"

            elif details["trigger"]:
                trigger = details["trigger"]["name"]

        pokemon_name = current["species"]["name"]
        species_url = current["species"]["url"]
        pokemon_id = species_url.rstrip("/").split("/")[-1]
       
        #pokemon_res = requests.get(f"https://pokeapi.co/api/v2/pokemon/{pokemon_name}")
        #pokemon_data = pokemon_res.json()
        #sprite = pokemon_data["sprites"]["other"]["official-artwork"]["front_default"]
        #shiny_sprite = pokemon_data["sprites"]["other"]["official-artwork"]["front_shiny"] 

        sprite = f"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/{pokemon_id}.png"
        shiny_sprite = f"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/{pokemon_id}.png"

        evolutions.append({
            "name": pokemon_name.capitalize(),
            "sprite": sprite,
            "shiny_sprite":shiny_sprite,
            "trigger": trigger
        })

    
        if current["evolves_to"]:
            current = current["evolves_to"][0]
        else:
            current = None

    return evolutions


@app.get("/pokemon/{name}")
def get_pokemon(name: str):

    url = f"https://pokeapi.co/api/v2/pokemon/{name.lower()}"
    res = requests.get(url)

    if res.status_code != 200:
        return {"error": "Pokemon not found"}

    data = res.json()

    # SPECIES (for description)
    species_url = data["species"]["url"]
    species_res = requests.get(species_url)
    species_data = species_res.json()

    evolution_url = species_data["evolution_chain"]["url"]
    evolution_res = requests.get(evolution_url)
    evolution_data = evolution_res.json()
    evolutions = parse_evolution_chain(evolution_data["chain"])

    flavor_text = next(
        (entry["flavor_text"] for entry in species_data["flavor_text_entries"]
         if entry["language"]["name"] == "en"),
        "No description available."
    )

    flavor_text = flavor_text.replace("\n", " ").replace("\f", " ")

    # TYPE EFFECTIVENESS
    all_types = [
        "normal","fire","water","electric","grass","ice",
        "fighting","poison","ground","flying","psychic","bug",
        "rock","ghost","dragon","dark","steel","fairy"
    ]

    type_multipliers = {t: 1 for t in all_types}


    for t in data["types"]:
        type_name = t["type"]["name"]

        if type_name in type_cache:
            damage = type_cache[type_name]

        else:
            type_url = t["type"]["url"]
            type_res = requests.get(type_url)
            damage = type_res.json()["damage_relations"]
            type_cache[type_name] = damage

        for d in damage["double_damage_from"]:
            type_multipliers[d["name"]] *= 2

        for h in damage["half_damage_from"]:
            type_multipliers[h["name"]] *= 0.5

        for n in damage["no_damage_from"]:
            type_multipliers[n["name"]] *= 0

    # GROUP RESULTS
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

    # FINAL RESPONSE
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
        "shiny_sprite": data["sprites"]["other"]["official-artwork"]["front_shiny"],
        "description": flavor_text,
        "type_effectiveness": type_effectiveness,  
        "evolutions": evolutions,
        "cry": data["cries"]["latest"]
    }

    return pokemon

@app.get("/pokemon-list")
def get_pokemon_list():
    res = requests.get("https://pokeapi.co/api/v2/pokemon?limit=1025")
    data = res.json()

    return [
        pokemon["name"].capitalize()
        for pokemon in data["results"]
    ]