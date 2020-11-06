# Acme-Corporation

## Run instructions
### Database
Start the postgres database using docker-compose:
```bash
docker-compose up
```
If another way is preferred the database has to have the following connection string: `Server=localhost;Port=5432;Database=root;Username=root;Password=root;`

### Start the system
The backend is separated from the frontend, meaning they have to be started separately. Start them using the following commands:
```bash
# api
dotnet run -p api/api 
# or in Visual Studio (I have not tested in VS) or Visual Studio Code

# frontend
# If it is the first time running the frontend install the node modules
cd frontend/ && npm i

# and start the frontend
cd frontend/ && npm run start
```
The first time the api connects to the database the database is automaticaly seeded with 100 Serial numbers and a admin user, email: `admin@mail.com` and password: `12345678`. The admin panel in found at [localhost:3000/admin](http://localhost:3000/admin) and the form at [localhost:3000](http://localhost:3000).