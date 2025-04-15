# Getting Started

# Prerequisites
    Node.js - v23.10.0
    npm - v10.9.2

# Installation

# 1. Clone the repository:

git clone https://github.com/sangpetch-dev/music-playlist-backend.git

cd music-playlist-backend

# 2. Install dependencies

npm install

# 3. Set up environment variables
cp .env.example .env

# 4. Run database migrations
npm run db:migrate

yarn db:migrate

# 5. Seed the database with initial data
npm run db:seed

# Running the Application

# Development mode
npm run start:dev
# or
yarn start:dev

# Production mode
npm run build
npm run start:prod
# or
yarn build
yarn start:prod

# The API will be available at http://localhost:3001/api

# Run Prisma Studio for visual database management
npm run db:studio
