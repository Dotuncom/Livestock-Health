-- Migration: 20240101_initial.sql
-- Description: Creates initial tables for the livestock health app (livestock, appointments, alerts, devices, and users).

-- Create livestock table (for animal data)
CREATE TABLE livestock (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  status TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create appointments table (for booking appointments)
CREATE TABLE appointments (
  id SERIAL PRIMARY KEY,
  livestock_id INTEGER REFERENCES livestock(id) ON DELETE CASCADE,
  vet_id INTEGER NOT NULL, -- (in a real app, you might reference a users table)
  appointment_date TIMESTAMP WITH TIME ZONE NOT NULL,
  status TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create alerts table (for alert notifications)
CREATE TABLE alerts (
  id SERIAL PRIMARY KEY,
  livestock_id INTEGER REFERENCES livestock(id) ON DELETE CASCADE,
  message TEXT NOT NULL,
  severity TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create devices table (for device status)
CREATE TABLE devices (
  id SERIAL PRIMARY KEY,
  livestock_id INTEGER REFERENCES livestock(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  status TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create users table (for farmer and vet user data)
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  role TEXT NOT NULL, -- (e.g. 'farmer' or 'vet')
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- (Optional) Insert a few sample rows (for testing) into livestock
INSERT INTO livestock (name, status) VALUES ('Cow 1', 'healthy'), ('Cow 2', 'sick'), ('Sheep 1', 'healthy');

-- (Optional) Insert a sample appointment (for testing)
INSERT INTO appointments (livestock_id, vet_id, appointment_date, status) VALUES (1, 1, NOW() + INTERVAL '1 day', 'pending');

-- (Optional) Insert a sample alert (for testing)
INSERT INTO alerts (livestock_id, message, severity) VALUES (2, 'Animal 002 needs attention', 'high');

-- (Optional) Insert a sample device (for testing)
INSERT INTO devices (livestock_id, name, status) VALUES (1, 'Sensor 1', 'active');

-- (Optional) Insert a sample user (for testing)
INSERT INTO users (email, role) VALUES ('farmer@example.com', 'farmer'), ('vet@example.com', 'vet');