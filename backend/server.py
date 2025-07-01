from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, EmailStr
from typing import List, Optional
import uuid
from datetime import datetime


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")


# Define Models
class StatusCheck(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=datetime.utcnow)

class StatusCheckCreate(BaseModel):
    client_name: str

# Portfolio Models
class ContactMessage(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: EmailStr
    subject: str
    message: str
    timestamp: datetime = Field(default_factory=datetime.utcnow)
    is_read: bool = False

class ContactMessageCreate(BaseModel):
    name: str
    email: EmailStr
    subject: str
    message: str

class Project(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    title: str
    description: str
    tech_stack: List[str]
    features: List[str]
    role: str
    demo_url: Optional[str] = None
    github_url: Optional[str] = None
    image_url: Optional[str] = None
    is_featured: bool = False
    order: int = 0

class Skill(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    category: str
    level: int = Field(ge=1, le=5)  # 1-5 skill level
    order: int = 0

class Education(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    degree: str
    institution: str
    year: str
    cgpa: str
    type: str
    order: int = 0

# Add your routes to the router instead of directly to app
@api_router.get("/")
async def root():
    return {"message": "Mano Chandran Portfolio API"}

@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_dict = input.dict()
    status_obj = StatusCheck(**status_dict)
    _ = await db.status_checks.insert_one(status_obj.dict())
    return status_obj

@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    status_checks = await db.status_checks.find().to_list(1000)
    return [StatusCheck(**status_check) for status_check in status_checks]

# Portfolio API Routes

# Contact Messages
@api_router.post("/contact", response_model=ContactMessage)
async def create_contact_message(contact_data: ContactMessageCreate):
    try:
        contact_dict = contact_data.dict()
        contact_obj = ContactMessage(**contact_dict)
        
        # Save to database
        result = await db.contact_messages.insert_one(contact_obj.dict())
        
        if result.inserted_id:
            return contact_obj
        else:
            raise HTTPException(status_code=500, detail="Failed to save contact message")
            
    except Exception as e:
        logger.error(f"Error creating contact message: {str(e)}")
        raise HTTPException(status_code=500, detail="Internal server error")

@api_router.get("/contact", response_model=List[ContactMessage])
async def get_contact_messages():
    try:
        messages = await db.contact_messages.find().sort("timestamp", -1).to_list(100)
        return [ContactMessage(**message) for message in messages]
    except Exception as e:
        logger.error(f"Error fetching contact messages: {str(e)}")
        raise HTTPException(status_code=500, detail="Internal server error")

@api_router.patch("/contact/{message_id}/read")
async def mark_message_as_read(message_id: str):
    try:
        result = await db.contact_messages.update_one(
            {"id": message_id},
            {"$set": {"is_read": True}}
        )
        
        if result.modified_count == 0:
            raise HTTPException(status_code=404, detail="Message not found")
            
        return {"message": "Message marked as read"}
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error marking message as read: {str(e)}")
        raise HTTPException(status_code=500, detail="Internal server error")

# Projects
@api_router.get("/portfolio/projects")
async def get_projects():
    try:
        # For now, return static data. Later can be made dynamic from database
        projects = [
            {
                "id": "medication-tracker",
                "title": "Medication Tracker Web App",
                "description": "Built a multi-role (Patient and Caretaker) medication tracking application with real-time monitoring and email reminders.",
                "tech_stack": ["React", "JavaScript", "Supabase", "Day.js", "SendGrid", "Vercel"],
                "features": [
                    "User authentication with role-based redirection",
                    "Patients can log daily medication intake with photo proof",
                    "Caretakers can view adherence calendars, streaks, and logs in real time",
                    "Integrated Supabase for CRUD operations and real-time updates",
                    "Used SendGrid with Supabase Edge Functions for email reminders"
                ],
                "role": "Full-Stack Developer",
                "demo_url": None,
                "github_url": "https://github.com/manochandran12",
                "is_featured": True,
                "order": 1
            },
            {
                "id": "ecommerce-website",
                "title": "E-Commerce Website",
                "description": "Developed a multi-page e-commerce website with product listings, cart functionality, and Django REST API integration.",
                "tech_stack": ["React", "JavaScript", "React Router", "Django", "CSS"],
                "features": [
                    "Product listings by category with image-based navigation",
                    "Add-to-cart functionality with persistent cart state",
                    "Contact form, newsletter signup, and dark mode toggle",
                    "Integrated with Django REST API for product data",
                    "Focused on clean UI, smooth routing, and reusable components"
                ],
                "role": "Frontend Developer",
                "demo_url": None,
                "github_url": "https://github.com/manochandran12",
                "is_featured": True,
                "order": 2
            }
        ]
        return {"projects": projects}
    except Exception as e:
        logger.error(f"Error fetching projects: {str(e)}")
        raise HTTPException(status_code=500, detail="Internal server error")

# Skills
@api_router.get("/portfolio/skills")
async def get_skills():
    try:
        skills_data = {
            "categories": [
                {
                    "title": "Frontend Development",
                    "skills": ["HTML", "CSS", "JavaScript", "React JS"],
                    "color": "from-blue-400 to-cyan-400"
                },
                {
                    "title": "Backend Development", 
                    "skills": ["Python", "Django", "SQL"],
                    "color": "from-green-400 to-emerald-400"
                },
                {
                    "title": "Tools & Technologies",
                    "skills": ["VS Code", "Git", "GitHub", "MySQL Workbench"],
                    "color": "from-purple-400 to-violet-400"
                },
                {
                    "title": "Vibecoding Tools",
                    "skills": ["Emergent"],
                    "color": "from-pink-400 to-rose-400"
                },
                {
                    "title": "AI Tools",
                    "skills": ["ChatGPT", "n8n Workflows"],
                    "color": "from-orange-400 to-amber-400"
                }
            ],
            "certifications": [
                {
                    "title": "Fullstack Python Developer Course",
                    "duration": "6 months",
                    "provider": "Career Ladder",
                    "year": "2025"
                }
            ]
        }
        return skills_data
    except Exception as e:
        logger.error(f"Error fetching skills: {str(e)}")
        raise HTTPException(status_code=500, detail="Internal server error")

# Education  
@api_router.get("/portfolio/education")
async def get_education():
    try:
        education_data = {
            "education": [
                {
                    "id": "bca",
                    "degree": "Bachelor of Computer Applications (BCA)",
                    "institution": "KG College of Arts and Science",
                    "year": "2021-2024",
                    "cgpa": "7.3",
                    "type": "Graduation",
                    "order": 1
                },
                {
                    "id": "hsc",
                    "degree": "Higher Secondary Certificate (HSC)",
                    "institution": "Government Higher Secondary School", 
                    "year": "2020-2021",
                    "cgpa": "8.2",
                    "type": "12th Grade",
                    "order": 2
                },
                {
                    "id": "sslc",
                    "degree": "Secondary School Leaving Certificate (SSLC)",
                    "institution": "Government Higher Secondary School",
                    "year": "2018-2019", 
                    "cgpa": "7.4",
                    "type": "10th Grade",
                    "order": 3
                }
            ]
        }
        return education_data
    except Exception as e:
        logger.error(f"Error fetching education: {str(e)}")
        raise HTTPException(status_code=500, detail="Internal server error")

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
