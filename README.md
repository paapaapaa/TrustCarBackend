# Trust Car Backend

### Running Dev Mode
- In project repo first install the dependencies `npm install` and then run `npm run dev` for development mode (By default App is live on `localhost:8080`)

### Running Test

- In project repo first install the dependencies `npm install` if not done before and then run `npm run test`.

### Branch Naming Rules

A git branch should start with a category. Pick one of these: `feature`, `bugfix`, `hotfix`, or `test`.

eg. `git branch <category>/<short-description>-<ticket no. on borad>`

* If you need to add a feature: `git branch feature/add-event-listner-42`.
* If you need to fix a bug: `git branch bugfix/button-not-displaying-342`
* If you need to fix a bug really fast (possibly with a temporary solution): `git branch hotfix/registration-form-not-working-232`
* If you need to experiment outside of an issue/ticket: `git branch test/http-client`


### Database setup

## Setting Up the Database

Before you start the application, make sure you set up the database by following these steps:

1. Create .env file like : "DATABASE_URL="postgres://trustcar:password@postgres:5432/postgres".
Switch the username 'trustcar' and password 'password' with your own.

2. Start the containers with "docker-compose -f docker-compose.dev.yml up"

3. Switch the password for the database.
Log in to database with: "docker-compose -f docker-compose.dev.yml exec postgres psql -U trustcar"
Add Sql: "
   ALTER USER trustcar WITH PASSWORD 'my_password';
   ALTER USER trustcar RENAME TO my_username;
"

4. Run migrations when the docker is running with:
docker-compose -f docker-compose.dev.yml exec backend npx prisma migrate deploy