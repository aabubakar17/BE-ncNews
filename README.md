# Northcoders News API

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


