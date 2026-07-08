import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()


class Config:
    GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
    # Base absolute path for data files to prevent FileNotFoundError
    BASE_DIR = os.path.dirname(os.path.abspath(__file__))
    DATA_DIR = os.path.abspath(os.path.join(BASE_DIR, '../data'))


settings = Config()
