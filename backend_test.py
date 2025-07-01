import requests
import json
import unittest
import os
import sys
from dotenv import load_dotenv
import random
import string

# Load environment variables from frontend/.env
load_dotenv("frontend/.env")

# Get the backend URL from environment variables
BACKEND_URL = os.environ.get("REACT_APP_BACKEND_URL")
if not BACKEND_URL:
    print("Error: REACT_APP_BACKEND_URL not found in environment variables")
    sys.exit(1)

# Ensure the URL ends with /api
API_URL = f"{BACKEND_URL}/api"
print(f"Testing API at: {API_URL}")

class PortfolioAPITest(unittest.TestCase):
    """Test suite for the Portfolio API endpoints"""
    
    def test_01_api_health_check(self):
        """Test the API health check endpoint"""
        response = requests.get(f"{API_URL}/")
        self.assertEqual(response.status_code, 200)
        data = response.json()
        self.assertEqual(data["message"], "Mano Chandran Portfolio API")
        print("✅ API health check passed")
    
    def test_02_contact_form_valid_submission(self):
        """Test contact form submission with valid data"""
        # Generate random data for testing
        random_suffix = ''.join(random.choices(string.ascii_lowercase, k=5))
        payload = {
            "name": f"Test User {random_suffix}",
            "email": f"test.{random_suffix}@example.com",
            "subject": f"Test Subject {random_suffix}",
            "message": f"This is a test message from the automated test suite. Random ID: {random_suffix}"
        }
        
        response = requests.post(f"{API_URL}/contact", json=payload)
        self.assertEqual(response.status_code, 200)
        data = response.json()
        
        # Verify the response contains the expected fields
        self.assertIn("id", data)
        self.assertEqual(data["name"], payload["name"])
        self.assertEqual(data["email"], payload["email"])
        self.assertEqual(data["subject"], payload["subject"])
        self.assertEqual(data["message"], payload["message"])
        self.assertIn("timestamp", data)
        self.assertFalse(data["is_read"])
        
        # Store the message ID for later tests
        self.message_id = data["id"]
        print(f"✅ Contact form valid submission passed (Message ID: {self.message_id})")
    
    def test_03_contact_form_invalid_email(self):
        """Test contact form submission with invalid email format"""
        payload = {
            "name": "Test User",
            "email": "invalid-email",  # Invalid email format
            "subject": "Test Subject",
            "message": "This is a test message with an invalid email."
        }
        
        response = requests.post(f"{API_URL}/contact", json=payload)
        # Should return a validation error
        self.assertNotEqual(response.status_code, 200)
        print("✅ Contact form invalid email validation passed")
    
    def test_04_get_contact_messages(self):
        """Test fetching contact messages"""
        response = requests.get(f"{API_URL}/contact")
        self.assertEqual(response.status_code, 200)
        data = response.json()
        
        # Verify we got a list of messages
        self.assertIsInstance(data, list)
        
        # Verify our test message is in the list
        if hasattr(self, 'message_id'):
            message_found = False
            for message in data:
                if message["id"] == self.message_id:
                    message_found = True
                    break
            self.assertTrue(message_found, "Test message not found in the list of messages")
        
        print("✅ Get contact messages passed")
    
    def test_05_mark_message_as_read(self):
        """Test marking a message as read"""
        if not hasattr(self, 'message_id'):
            self.skipTest("No message ID available from previous test")
        
        response = requests.patch(f"{API_URL}/contact/{self.message_id}/read")
        self.assertEqual(response.status_code, 200)
        data = response.json()
        self.assertEqual(data["message"], "Message marked as read")
        
        # Verify the message is marked as read
        response = requests.get(f"{API_URL}/contact")
        messages = response.json()
        message_found = False
        for message in messages:
            if message["id"] == self.message_id:
                message_found = True
                self.assertTrue(message["is_read"], "Message not marked as read")
                break
        self.assertTrue(message_found, "Test message not found in the list of messages")
        
        print("✅ Mark message as read passed")
    
    def test_06_mark_nonexistent_message(self):
        """Test marking a non-existent message as read"""
        fake_id = "nonexistent-id-12345"
        response = requests.patch(f"{API_URL}/contact/{fake_id}/read")
        self.assertEqual(response.status_code, 404)
        print("✅ Mark non-existent message test passed")
    
    def test_07_get_projects(self):
        """Test fetching projects data"""
        response = requests.get(f"{API_URL}/portfolio/projects")
        self.assertEqual(response.status_code, 200)
        data = response.json()
        
        # Verify the response structure
        self.assertIn("projects", data)
        self.assertIsInstance(data["projects"], list)
        
        # Verify we have at least one project
        self.assertGreater(len(data["projects"]), 0)
        
        # Verify project structure
        project = data["projects"][0]
        required_fields = ["id", "title", "description", "tech_stack", "features", "role"]
        for field in required_fields:
            self.assertIn(field, project)
        
        print("✅ Get projects passed")
    
    def test_08_get_skills(self):
        """Test fetching skills data"""
        response = requests.get(f"{API_URL}/portfolio/skills")
        self.assertEqual(response.status_code, 200)
        data = response.json()
        
        # Verify the response structure
        self.assertIn("categories", data)
        self.assertIsInstance(data["categories"], list)
        
        # Verify we have at least one category
        self.assertGreater(len(data["categories"]), 0)
        
        # Verify category structure
        category = data["categories"][0]
        required_fields = ["title", "skills", "color"]
        for field in required_fields:
            self.assertIn(field, category)
        
        print("✅ Get skills passed")
    
    def test_09_get_education(self):
        """Test fetching education data"""
        response = requests.get(f"{API_URL}/portfolio/education")
        self.assertEqual(response.status_code, 200)
        data = response.json()
        
        # Verify the response structure
        self.assertIn("education", data)
        self.assertIsInstance(data["education"], list)
        
        # Verify we have at least one education entry
        self.assertGreater(len(data["education"]), 0)
        
        # Verify education entry structure
        education = data["education"][0]
        required_fields = ["id", "degree", "institution", "year", "cgpa", "type"]
        for field in required_fields:
            self.assertIn(field, education)
        
        print("✅ Get education passed")
    
    def test_10_invalid_endpoint(self):
        """Test accessing an invalid endpoint"""
        response = requests.get(f"{API_URL}/nonexistent-endpoint")
        self.assertEqual(response.status_code, 404)
        print("✅ Invalid endpoint test passed")
    
    def test_11_malformed_request(self):
        """Test sending a malformed request"""
        # Send an incomplete payload to the contact endpoint
        payload = {
            "name": "Test User",
            # Missing email, subject, and message
        }
        
        response = requests.post(f"{API_URL}/contact", json=payload)
        # Should return a validation error
        self.assertNotEqual(response.status_code, 200)
        print("✅ Malformed request test passed")

if __name__ == "__main__":
    # Run the tests
    unittest.main(argv=['first-arg-is-ignored'], exit=False)