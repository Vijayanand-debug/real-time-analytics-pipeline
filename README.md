Here’s how all the parts connect:

![Architecture Diagram](./arch_v1.png)

# What it Does:
 - When you use the app, your actions are turned into events.
 - These events are sent through a Kafka message queue.
 - A worker picks them up, saves them to a PostgreSQL database, and sends updates back.
 - Everyone connected sees the live data update right away through WebSockets.

![Application Flow](./demogif.gif)

# Basic Workflow:
Here’s the basic flow:
1. React Client
 - Includes buttons and a search box to simulate user activity and every click or search sends an event to the Node.js API.

2. Node.js API
 - Publishes the event to Kafka right away.
 - Sends a quick response back to keep the app fast.

3. Kafka
 - Acts as the middle layer, it holds the events so they can be processed.

4. Worker Service
 - Listens to Kafka.
 - Saves data to Postgres for analytics.

5. WebSockets
 - The API pushes real-time updates back to all connected clients.
 - So, everyone sees live analytics with almost no delay.

# Tech Stack:
 - Frontend: React, Tailwind CSS
 - Backend: Node.js, WebSockets
 - Messaging: Kafka
 - Database: PostgreSQL
 - Containerization: Docker
 - Cloud: AWS ECR, AWS ECS

# Getting Started
1. Clone the repo
  - git clone https://github.com/Vijayanand-debug/real-time-analytics-pipeline.git
  - cd real-time-analytics-pipeline

2. Install the packages
  - cd into api directory end enter npm install
  - Repeat the same for react-dashboard directory

3. To start the service
  - docker-compose up

4. To view the app
  - Go to https://localhost:5173

5. Viewing the database
  - Use DBeaver (or any SQL client) to connect to the database with the following connection url
    - postgres://myuser:mypassword@localhost:5432/analytics_data
  - If a table is not created during the docker compose up process, you can manually create the necessary tables by running the schema from the init.sql file.
    - The init.sql file is located in api/src/db/init.sql

