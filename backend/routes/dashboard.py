from fastapi import APIRouter
from services import dashboard_service

router = APIRouter()


@router.get("/dashboard")
def get_dashboard():
    return dashboard_service.get_dashboard_data()


@router.get("/crowd")
def get_crowd():
    return dashboard_service.get_crowd_data()


@router.get("/emergency")
def get_emergency():
    return dashboard_service.get_emergency_data()


@router.get("/weather")
def get_weather():
    return dashboard_service.get_weather_data()


@router.get("/match")
def get_match():
    return dashboard_service.get_match_data()


@router.get("/report")
def get_report():
    return dashboard_service.get_full_report()
