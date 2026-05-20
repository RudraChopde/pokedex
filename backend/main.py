from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import requests

MODERN_EVOLUTION_ADDITIONS = {
    "vikavolt": "Modern: Using Thunder Stone",
    "magnezone": "Modern: Using Thunder Stone",
    "probopass": "Modern: Using Thunder Stone",
    "leafeon": "Modern: Using Leaf Stone",
    "glaceon": "Modern: Using Ice Stone",
}

type_cache = {}
pokemon_cache = {}
pokemon_list_cache = []

ROMAN_TO_INT = {
    "i": 1, "ii": 2, "iii": 3, "iv": 4, "v": 5,
    "vi": 6, "vii": 7, "viii": 8, "ix": 9
}

def parse_generation(gen_str):
    roman = gen_str.split("-")[-1]
    return ROMAN_TO_INT.get(roman, 1)

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

def parse_evolution_chain(node):
    evo_details = node["evolution_details"]

    pokemon_name = node["species"]["name"]

    trigger = None

    conditions = []

    if evo_details:
        details = evo_details[0]
    
        if details["min_level"]:
            conditions.append(f"Level {details['min_level']}")

        if details["item"]:
            conditions.append(
                f"Using {details['item']['name'].replace('-', ' ').title()}"
            )

        if details["held_item"]:
            conditions.append(
                f"Holding {details['held_item']['name'].replace('-', ' ').title()}"
            )

        if details["min_happiness"]:
            conditions.append("Via High Friendship")

        if details["time_of_day"]:
            conditions.append( f" During {details["time_of_day"].capitalize()} time")

        if details["known_move"]:
            conditions.append(
                f"Learn {details['known_move']['name'].replace('-', ' ').title()}"
            )
        
        if details["known_move_type"]:
            conditions.append(
                f"After Learning {details['known_move_type']['name'].title()} Type Move"
            )

        if details["min_affection"]:
            conditions.append("High Affection")  
        
        if details["location"]:
            location_name = details["location"]["name"]

            SPECIAL_LOCATIONS = {
            "eterna-forest": "Near Moss Rock",
            "sinnoh-route-217": "Near Ice Rock",
            "mt-coronet": "Near Magnetic Field",
            "chargestone-cave": "Near Magnetic Field",
            "vast-poni-canyon": "Near Magnetic Field",
            "blush-mountain": "Near Magnetic Field",
            }

            if location_name in SPECIAL_LOCATIONS:
                conditions.append(
                    SPECIAL_LOCATIONS[location_name]
                )

            else:
                conditions.append(
                    f"Near {location_name.replace('-', ' ').title()}"
                )
  

        if details["trigger"]:
            trigger_name = details["trigger"]["name"]

            if trigger_name == "trade":
                conditions.append("Trade")
        
        if pokemon_name in MODERN_EVOLUTION_ADDITIONS:
            conditions.append(
                MODERN_EVOLUTION_ADDITIONS[pokemon_name]
            )

    if evo_details:
        details = evo_details[0]

        if (
            details["trigger"]
            and details["trigger"]["name"] == "trade"
            and details["held_item"]
        ):

            held_item_name = (
                details["held_item"]["name"]
                .replace("-", " ")
                .title()
            )

            trigger = (
                f"Trade while holding {held_item_name}"
            )

        elif (
            details["trigger"]
            and details["trigger"]["name"] == "trade"
        ):

            trigger = "Trade"

        else:
            trigger = " + ".join(conditions) if conditions else None

    else:
        trigger = " + ".join(conditions) if conditions else None

    
    species_url = node["species"]["url"]
    pokemon_id = species_url.rstrip("/").split("/")[-1]

    sprite = (
        f"https://raw.githubusercontent.com/PokeAPI/sprites/master/"
        f"sprites/pokemon/other/official-artwork/{pokemon_id}.png"
    )

    shiny_sprite = (
        f"https://raw.githubusercontent.com/PokeAPI/sprites/master/"
        f"sprites/pokemon/other/official-artwork/shiny/{pokemon_id}.png"
    )

    return {
        "name": pokemon_name.capitalize(),
        "sprite": sprite,
        "shiny_sprite": shiny_sprite,
        "trigger": trigger,

        "children": [
            parse_evolution_chain(child)
            for child in node["evolves_to"]
        ]
    }

@app.get("/pokemon/{name}")
def get_pokemon(name: str):
    key = name.lower()
    if key in pokemon_cache:
        return pokemon_cache[key]
    
    url = f"https://pokeapi.co/api/v2/pokemon/{name.lower()}"
    res = requests.get(url)

    # Fallback to species search
    if res.status_code != 200:
        species_res = requests.get(
           f"https://pokeapi.co/api/v2/pokemon-species/{name.lower()}"
        )

        if species_res.status_code != 200:
            return {"error": "Pokemon not found"}
        
        species_data = species_res.json()

        default_url = next( variety["pokemon"]["url"]
                           for variety in species_data["varieties"]
                            if variety["is_default"]
                           )
        res = requests.get(default_url)

    data = res.json()

    # SPECIES (for description)
    species_url = data["species"]["url"]
    species_res = requests.get(species_url)
    species_data = species_res.json()
    #print(species_data["varieties"])
    forms = []
    for variety in species_data["varieties"]:
        pokemon_url = variety["pokemon"]["url"]
        res_form = requests.get(pokemon_url)
        form_data = res_form.json()

        #TYPE EFFECTIVENESS
        all_types = [
            "normal","fire","water","electric","grass","ice",
            "fighting","poison","ground","flying","psychic","bug",
            "rock","ghost","dragon","dark","steel","fairy"
        ]

        type_multipliers = {type_name: 1 for type_name in all_types}

        for pokemon_type in form_data["types"]:
            type_name = pokemon_type["type"]["name"]

            if type_name in type_cache:
                damage = type_cache[type_name]

            else:
                type_url = pokemon_type["type"]["url"]
                type_res = requests.get(type_url)
                damage = type_res.json()["damage_relations"]
                type_cache[type_name] = damage

            for d in damage["double_damage_from"]:
                type_multipliers[d["name"]] *= 2

            for h in damage["half_damage_from"]:
                type_multipliers[h["name"]] *= 0.5

            for n in damage["no_damage_from"]:
                type_multipliers[n["name"]] *= 0

        #Group Results

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


        forms.append({
            "name": form_data["name"],
            "sprite": form_data["sprites"]["other"]["official-artwork"]["front_default"],
            "shiny_sprite": form_data["sprites"]["other"]["official-artwork"]["front_shiny"],

            "types": [
                t["type"]["name"]
                for t in form_data["types"]
              ],

            "stats": {
               "hp": form_data["stats"][0]["base_stat"],
               "attack": form_data["stats"][1]["base_stat"],
               "defense": form_data["stats"][2]["base_stat"],
               "sp_atk": form_data["stats"][3]["base_stat"],
               "sp_def": form_data["stats"][4]["base_stat"],
               "speed": form_data["stats"][5]["base_stat"],
                    },

            "cry": form_data["cries"]["latest"],
            "type_effectiveness": type_effectiveness
        })

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



    # FINAL RESPONSE
    pokemon = {
        "name": data["name"].capitalize(),
        "generation": parse_generation(species_data["generation"]["name"]),
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
        "evolutions": evolutions,
        "cry": data["cries"]["latest"],
        "forms": forms
    }

    pokemon_cache[key] = pokemon
    return pokemon

@app.get("/pokemon-list")
def get_pokemon_list():
    global pokemon_list_cache
    if pokemon_list_cache:
        return pokemon_list_cache

    res = requests.get("https://pokeapi.co/api/v2/pokemon?limit=1025")
    data = res.json()
    pokemon_list_cache = [p["name"].capitalize() for p in data["results"]]
    return pokemon_list_cache