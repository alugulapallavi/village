-- ===================== VILLAGE PORTAL DATABASE SCHEMA (MySQL) =====================
CREATE DATABASE IF NOT EXISTS village_portal;
USE village_portal;

-- USERS
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(120) NOT NULL,
  email VARCHAR(150) UNIQUE NOT NULL,
  phone VARCHAR(15),
  password_hash VARCHAR(255) NOT NULL,
  role ENUM('citizen','admin') DEFAULT 'citizen',
  language_pref ENUM('en','te') DEFAULT 'en',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- SCHEMES
CREATE TABLE schemes (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(200) NOT NULL,
  name_te VARCHAR(200),
  category ENUM('central','state') NOT NULL,
  eligibility TEXT,
  documents TEXT,
  benefits TEXT,
  last_date DATE,
  apply_link VARCHAR(255),
  created_by INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (created_by) REFERENCES users(id)
);

-- ANNOUNCEMENTS
CREATE TABLE announcements (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255),
  title_te VARCHAR(255),
  description TEXT,
  posted_by INT,
  posted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (posted_by) REFERENCES users(id)
);

-- BUSINESS DIRECTORY
CREATE TABLE businesses (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(200),
  category VARCHAR(100),
  owner_name VARCHAR(150),
  phone VARCHAR(15),
  address TEXT,
  latitude DECIMAL(10,7),
  longitude DECIMAL(10,7),
  image_url VARCHAR(255),
  approved BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- JOBS
CREATE TABLE jobs (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(200),
  type ENUM('government','private','mgnregs','apprenticeship') NOT NULL,
  description TEXT,
  qualification VARCHAR(255),
  last_date DATE,
  apply_link VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- LAND SERVICE REQUESTS
CREATE TABLE land_requests (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT,
  service_type ENUM('pattadar','mutation','registration','survey','encumbrance','land_conversion'),
  survey_number VARCHAR(50),
  status ENUM('submitted','in_review','approved','rejected') DEFAULT 'submitted',
  document_url VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

-- CERTIFICATE / MEESEVA REQUESTS
CREATE TABLE certificate_requests (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT,
  cert_type ENUM('income','caste','birth','death','residence','voter_id') NOT NULL,
  status ENUM('submitted','processing','ready','rejected') DEFAULT 'submitted',
  document_url VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

-- MARKETPLACE LISTINGS
CREATE TABLE marketplace_listings (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT,
  category ENUM('equipment','livestock','vehicle','other'),
  title VARCHAR(200),
  description TEXT,
  price DECIMAL(10,2),
  image_url VARCHAR(255),
  status ENUM('active','sold','removed') DEFAULT 'active',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

-- COMPLAINTS
CREATE TABLE complaints (
  id INT AUTO_INCREMENT PRIMARY KEY,
  complaint_code VARCHAR(20) UNIQUE,
  user_id INT,
  category ENUM('water','roads','electricity','drainage','street_lights','other'),
  description TEXT,
  attachment_url VARCHAR(255),
  status ENUM('submitted','in_progress','resolved','rejected') DEFAULT 'submitted',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  resolved_at TIMESTAMP NULL,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

-- HEALTH FACILITIES
CREATE TABLE health_facilities (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(200),
  type ENUM('hospital','phc','blood_bank','health_camp'),
  phone VARCHAR(15),
  address TEXT,
  latitude DECIMAL(10,7),
  longitude DECIMAL(10,7)
);

-- EDUCATION FACILITIES
CREATE TABLE education_facilities (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(200),
  type ENUM('school','college','library','hostel'),
  address TEXT,
  contact VARCHAR(15)
);

-- NOTIFICATIONS
CREATE TABLE notifications (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT,
  message TEXT,
  is_read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

-- AI ASSISTANT QUERY LOG (for analytics / improving responses)
CREATE TABLE assistant_logs (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT,
  query TEXT,
  response TEXT,
  language ENUM('en','te','hi'),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
);
