-- schema.sql
CREATE DATABASE IF NOT EXISTS campus_crud;
USE campus_crud;

CREATE TABLE IF NOT EXISTS clinic (
    id INT PRIMARY KEY AUTO_INCREMENT,
    clinic_name VARCHAR(150) NOT NULL,
    doctor_name VARCHAR(150),
    specialization VARCHAR(100),
    location VARCHAR(200),
    contact_number VARCHAR(20),
    hours_of_operation VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Sample data
INSERT INTO clinic (clinic_name, doctor_name, specialization, location, contact_number, hours_of_operation) VALUES
('City Health Center', 'Dr. Sarah Johnson', 'General Practice', '123 Main St, Cityville', '(555) 123-4567', 'Mon-Fri: 8AM-6PM'),
('Downtown Medical', 'Dr. Michael Chen', 'Cardiology', '456 Oak Ave, Downtown', '(555) 234-5678', 'Mon-Sat: 9AM-5PM'),
('Westside Clinic', 'Dr. Emily Davis', 'Pediatrics', '789 Pine Rd, Westside', '(555) 345-6789', 'Mon-Fri: 7AM-7PM'),
('Northwood Health', 'Dr. Robert Brown', 'Dermatology', '321 Elm St, Northwood', '(555) 456-7890', 'Tue-Sat: 8AM-4PM'),
('Central Hospital', 'Dr. Lisa Wang', 'Orthopedics', '654 Maple Dr, Central', '(555) 567-8901', '24/7 Emergency'),
('Sunrise Medical', 'Dr. James Wilson', 'Internal Medicine', '987 Birch Ln, Sunrise', '(555) 678-9012', 'Mon-Fri: 8AM-5PM'),
('Green Valley Clinic', 'Dr. Maria Garcia', 'Family Medicine', '147 Cedar St, Green Valley', '(555) 789-0123', 'Mon-Sun: 7AM-9PM'),
('Hillside Health', 'Dr. David Lee', 'Neurology', '258 Spruce Ave, Hillside', '(555) 890-1234', 'Mon-Fri: 9AM-6PM'),
('Riverside Medical', 'Dr. Jennifer Kim', 'Oncology', '369 Willow Rd, Riverside', '(555) 901-2345', 'Mon-Fri: 8AM-4PM'),
('Lakeview Clinic', 'Dr. Thomas Anderson', 'Psychiatry', '741 Palm Blvd, Lakeview', '(555) 012-3456', 'Mon-Thu: 10AM-7PM');