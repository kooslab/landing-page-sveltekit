-- Create users table for authentication
CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    hashed_password TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create sessions table for Lucia auth
CREATE TABLE IF NOT EXISTS sessions (
    id TEXT PRIMARY KEY,
    user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    expires_at TIMESTAMP WITH TIME ZONE NOT NULL
);

-- Create index for email lookups
CREATE INDEX idx_users_email ON users(email);

-- Create index for session lookups
CREATE INDEX idx_sessions_user_id ON sessions(user_id);

-- Add author_id column to blog_posts if it doesn't exist
ALTER TABLE blog_posts 
ADD COLUMN IF NOT EXISTS author_id TEXT REFERENCES users(id) ON DELETE CASCADE;

-- Update existing posts to have a default author_id (optional)
-- UPDATE blog_posts SET author_id = 'default-user-id' WHERE author_id IS NULL;