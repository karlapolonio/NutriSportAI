import requests
import json
from supabase import create_client, Client

import os
from dotenv import load_dotenv

load_dotenv()

NUTRITIONIX_APP_ID = os.getenv("NUTRITIONIX_APP_ID")
NUTRITIONIX_APP_KEY = os.getenv("NUTRITIONIX_APP_KEY")
SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")

supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

food_list = [
    "Whole Chicken", "Chicken Breast", "Chicken Wings", "Chicken Leg", "Chicken Thigh",
    "Egg", "Tofu", "Lean Pork", "Lean Beef", "Sweet Potato",
    "Potatoes", "Rice", "Whole Wheat Bread", "White Bread", "Broccoli"
]

def get_food_data(app_id, app_key, foods):
    url = "https://trackapi.nutritionix.com/v2/natural/nutrients"
    headers = {
        "Content-Type": "application/json",
        "x-app-id": app_id,
        "x-app-key": app_key
    }

    food_data = []

    for food in foods:
        try:
            body = {"query": food}
            response = requests.post(url, headers=headers, data=json.dumps(body))
            response.raise_for_status()
            data = response.json()

            if data.get("foods"):
                f = data["foods"][0]
                food_data.append({
                    "food_name": f['food_name'].title(),
                    "calories": f.get('nf_calories', 'N/A'), #Calories in (kcal)
                    "protein": f.get('nf_protein', 'N/A'),   #Protein, Carb and Fat in (g)
                    "carbs": f.get('nf_total_carbohydrate', 'N/A'),
                    "fat": f.get('nf_total_fat', 'N/A')
                })
            else:
                food_data.append({
                    "food_name": food,
                    "calories": "N/A",
                    "protein": "N/A",
                    "carbs": "N/A",
                    "fat ": "N/A"
                })

        except Exception as e:
            print(f"Error fetching data for {food}: {e}")

    return food_data

def send_data_to_supabase(food_df):
    if food_df:
        response = supabase.table("food_nutrition_data").insert(food_df).execute()
    else:
        response = None

    return response

food_df = get_food_data(NUTRITIONIX_APP_ID, NUTRITIONIX_APP_KEY, food_list)
response = send_data_to_supabase(food_df)

print(response)
