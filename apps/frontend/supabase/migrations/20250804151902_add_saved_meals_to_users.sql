ALTER TABLE users
ADD COLUMN saved_meals jsonb DEFAULT '[]'::jsonb NOT NULL;