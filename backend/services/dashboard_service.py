import json
import os
from fastapi import HTTPException
from config import settings


def load_json(filename: str):
    filepath = os.path.join(settings.DATA_DIR, filename)
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            return json.load(f)
    except FileNotFoundError:
        raise HTTPException(
            status_code=404, detail=f"{filename} not found"
        )
    except json.JSONDecodeError:
        raise HTTPException(
            status_code=500, detail=f"Error decoding {filename}"
        )


def get_dashboard_data():
    return load_json('dashboard.json')


def get_crowd_data():
    return load_json('crowd.json')


def get_emergency_data():
    return load_json('emergency.json')


def get_weather_data():
    return load_json('weather.json')


def get_match_data():
    return load_json('match.json')


def get_full_report():
    return {
        "dashboard": get_dashboard_data(),
        "crowd": get_crowd_data(),
        "emergency": get_emergency_data(),
        "weather": get_weather_data(),
        "match": get_match_data(),
    }
