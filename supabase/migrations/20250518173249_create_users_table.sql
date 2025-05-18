CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMP DEFAULT NOW(),
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  avatar_url TEXT,
  meal_count INT DEFAULT 0,
  favorite_cuisine TEXT NOT NULL,
  dietary_preferences TEXT[] NOT NULL
);
