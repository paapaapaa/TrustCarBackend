# Trust Car Backend

### Environment

`.env` file with


```
DATABASE_URL="postgresql://trustcar:password@localhost:5432/trust_car_dev_db?schema=public"

JWT_SECRET="mysecret"
```

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


### Database setup.

#### Using Docker

1. In project repo run `docker compose -f .\docker-compose.dev.yml up`.
2. Stop the backend container if its running.
3. Run `npm run migrate`.

