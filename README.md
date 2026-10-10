# Pulse — API Monitoring & Incident Management

Pulse is a developer tool in development that aims to help developers monitor their APIs, track uptime and response times, and detect incidents automatically.

Add an API endpoint, configure its expected status code and monitoring interval, and let Pulse track its health over time.

## Features

### Implemented
- User registration and login
- Password hashing using bcrypt
- JWT-based authentication using HTTP cookies
- Protected backend routes and user-specific resource authorization
- Monitor creation and storage in MongoDB
- React dashboard with dynamically rendered monitors
- Monitor-specific detail routes
- Basic HTTP health checks with response status, latency, success/failure, and timestamp measurement

### In Progress
- Automated scheduling of health checks
- Persistent check-history storage
- Incident creation after 3 consecutive failures
- Incident resolution after 2 consecutive successful checks
- Uptime and response-time analytics
- Monitor history and visualization
- Security hardening and automated tests

## Tech Stack

**Frontend:** React, Vite, JavaScript  
**Backend:** Node.js, Express.js  
**Database:** MongoDB, Mongoose  
**Authentication:** bcrypt, JWT, HTTP cookies

## Architecture

```text
React Frontend
      |
      | HTTP requests
      v
Express REST API
      |
      | Authentication and authorization
      v
MongoDB
      |
      v
Monitoring Engine (in development)
      |
      v
Monitored API Endpoints
```

## Getting Started

### Prerequisites
- Node.js and npm
- MongoDB running locally or a MongoDB connection URI

### 1. Clone the repository

```bash
git clone https://github.com/manthan-labels/pulse.git
cd pulse
```

### 2. Set up the backend

Install dependencies from the project root:

```bash
npm install
```

Configure your environment variables as required by the backend, then start the server using the start script defined in `package.json`.

### 3. Set up the frontend

Open a separate terminal:

```bash
cd pulse-ui
npm install
npm run dev
```

Open the local URL printed by Vite in your terminal.

## Project Status

Pulse is an actively developed personal project. Authentication, monitor storage, dashboard rendering, and basic health-check logic have been implemented. Automated monitoring, incident management, analytics, testing, and deployment are planned or in progress.

## Roadmap

- [ ] Automated health-check scheduling
- [ ] Check-history persistence
- [ ] Automatic incident detection and resolution
- [ ] Uptime and latency analytics
- [ ] Monitor detail charts and incident timeline
- [ ] SSRF protection and input validation
- [ ] Automated tests
- [ ] Production deployment

## Motivation

I am building Pulse to deepen my understanding of full-stack development, backend architecture, authentication, databases, HTTP, and monitoring systems by building a practical developer tool.

## License

No license has been selected yet.
