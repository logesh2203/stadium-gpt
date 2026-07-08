export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

export interface CrowdData {
  gate: string;
  current_crowd: number;
  status: string;
  waiting_time_mins: number;
  estimated_entry_time?: string;
  ai_recommendation: string;
  color: string;
}

export interface EmergencyData {
  id: string;
  type: string;
  status: string;
  priority: string;
  time: string;
  location: string;
}

export interface MatchData {
  match: string;
  attendance: string;
  score: string;
  time_remaining: string;
  fan_sentiment: string;
}

export interface WeatherData {
  condition: string;
  temperature: string;
  humidity: string;
  wind: string;
  forecast: string;
}

export interface DashboardStats {
  total_visitors: number;
  current_visitors: number;
  crowd_status: string;
  emergency_alerts: number;
  medical_requests: number;
  parking_availability: string;
  ai_recommendation: string;
}

export interface DashboardState {
  dashboard: DashboardStats;
  crowd: CrowdData[];
  emergency: EmergencyData[];
  match: MatchData;
  weather: WeatherData;
}
