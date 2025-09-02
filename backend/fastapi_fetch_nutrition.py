from fastapi import FastAPI, HTTPException
from supabase import create_client, Client

import os
from dotenv import load_dotenv

app = FastAPI()

SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")

supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

@app.get("/food/{food_name}/nutrients")
def get_food_nutrients(food_name: str):
    response = supabase.table("food_nutrition_data").select("*").eq("food_name", food_name.title()).execute()
    
    if not response.data:
        raise HTTPException(status_code=404, detail="Food not found")
    
    return response.data[0] 