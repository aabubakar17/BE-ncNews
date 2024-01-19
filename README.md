# Worldy Whispers News API

## Overview

Worldy Whispers is a Node.js-based backend project designed to manage articles, comments, topics, and users for a news app. This application provides a set of API endpoints for interacting with the various components of the app. These endpoints include but are not limited to:

- Retrieving information on avaialable endpoints.
- Getting a list of topics.
- Fetching individual articles by ID.
- Listing and updating articles.
- Accessing comments for a specific article.
- Adding and deleting comments.
- Retrieving user information.
- Applying filters and sorting to article queries

Additionally, the API provides a comment count feature when retrieving individual articles, enhancing the user experience

For a more detailed and comprehensive understanding of each endpoint and its features, refer to the [`endpoints.json`](./endpoints.json) file in the project directory.

This README will guide you through the process of setting up the project locally and accessing its features.

# Hosted Version

Explore the hosted version of Wordly Whisper at:

[https://worldywhisper.onrender.com].

use [`endpoints.json`](./endpoints.json) to make a request to existing endpoints.

## Getting Started

Follow the steps below to clone, install dependencies, seed the local database, and run tests.

### Prerequisites

Before you begin, ensure you have the following minimum versions installed:

- Node.js (version 17.9.1)
- PostgreSQL (version 10.23)

### Clone the Repository

```bash
git clone https://github.com/aabubakar17/BE-ncNews.git
cd be-nc-news
```

### Install Dependencies

```
npm install
```

### Set Up Local Database and Seed Data

```
npm run setup-dbs
npm run seed
```

### Run Tests

```
npm run test
```

## Setting up Enviroment

To run this project locally, you'll need to set up environment variables. Follow these steps to create the necessary .env files

**Create .env.test and .env.development files:**

Create two separate .env files for the test and development environments

```

touch .env.test
touch .env.development

```

**Edit .env.test and .env.development:**

Open each file in a text editor and add the following line,
replacing <your_database_name> with the correct database name for each environment (refer to /db/setup.sql for the database names):

```

PGDATABASE=<your_database_name>

```

**Ensure .gitignore includes .env.test and .env.development:**

Confirm that your .gitignore file includes the following lines to prevent the sensitive .env files from being committed to the repository:

```
.env.test
.env.development
```

## Start the Server

```
npm start
```

The server will be running at http://localhost:9090
