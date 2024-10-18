# Northcoders News API

To add environment variables and access the database please use the following:

PGDATABASE=nc_news
PGDATABASE=nc_news_test

---

To find the hosted version of this page, please follow this link https://nc-news-j09w.onrender.com

This project uses a database seeded through PSQL to create a website where data from a forum style database can be manipulated and accessed.
Through creating and testing various endpoints, the user can access the information held within this database easily.
There are 5 tables in total, articles, comments, index, topics and users.
For access to the endpoints created, all endpoint examples can be found in endpoints.json.
Adding /api/endpointname at the end of the hosted link will allow access to the database through a webpage.
An example of the data which can be accessed is https://nc-news-j09w.onrender.com/api/articles?sort_by=created_at&order=asc
For an array of article objects ordered by the created_at date in ascending order.

To clone this database use the following GitHub link: https://github.com/lindsaybrose/NC-news
The dependencies which will need installing are as follows:
node "version": "1.0.0" or higher - npm install 

TDD is ran with jest and jest-sorted
"jest": "^27.5.1" - npm install -D jest
npm install --save-dev jest-sorted

The package.json will need the following in the "jest" object:
"jest": {
"setupFilesAfterEnv": [
"jest-extended/all",
"jest-sorted"
]}

Other dependencies include:
"pg-format": "^1.0.4" - npm install -D pg-format
"dotenv": "^16.0.0" - npm install dotenv
"express": "^4.21.1" - npm install express
"pg": "^8.7.3" - npm install pg

To seed the database enter the following in the terminal:
npm run setup-dbs
npm run seed

To run tests - npm run test

Create two .env files, one called .env.test and one called .env.development
To .env.development, add:
PGDATABASE=nc_news
To .env.test, add:
PGDATABASE=nc_news_test



This portfolio project was created as part of a Digital Skills Bootcamp in Software Engineering provided by [Northcoders](https://northcoders.com/)
