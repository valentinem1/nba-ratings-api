# ExpressAPI

## [Frontend repo](https://github.com/valentinem1/players-collection)
<br />

## [Trello Board](https://trello.com/b/aQsIulBZ/nba-rating)
<br />

This project focuses on practicing using Express/Mongoose/MongoDB.

## Prerequisites
Before you begin, ensure you have installed the latest version of:
- React
- Node
- Express
- MongoDB

## Technologies
<br/>

Backend:
- Node [13.1.0]
- Express [~4.16.1]
- Mongoose [^5.9.19]
- CORS [^2.8.5]
- Nodemon [^2.0.4]
- Morgan [~1.9.1]
- Request [^2.88.2]
- Pug [^3.0.0]
- Dotenv [^8.2.0]
<br />

Frontend:
- React [^16.13.1]
- Redux [^4.0.5]
- React Redux [^7.2.0]
- React Router [^5.2.0]
- React Router DOM [^5.2.0]
- Semantic UI React [^0.88.2]
<br />

## Installing
<br/>

Backend setup:
- Clone the repo and `cd` into it
- Run `npm install` to install all dependencies
- Run `npm start` to run the server
- Ensure is is running locally on http://localhost:3000 to view in the browser

Frontend setup:
- Clone this following repo here: [Frontend Repo](https://github.com/valentinem1/players-collection) and `cd` into it.
- Run `npm install` to install all dependencies
- Run `npm start` to run the server
- Ensure it is running locally on http://localhost:3001 to view it in the browser
<br/>


## Routes
## GET
- /players => will show all players
- /players/:id => will show a specific player
<br />

### Response
- `200` OK/Successful
- `304` Not modified
- `404` Not Found/Failed
<br />

## POST
- /players => will create a player
    - Body required
    - Headers required => application/json
<br />

### Response
- `201` Fullfilled/Created
- `404` Not Found/Failed
<br />

## PUT
- /players/:id => will update a specific player
    - Body required
    - Headers required => application/json
<br />

### Response
- `200` OK/Successful
- `404` Not Found/Failed
<br />

## DELETE
- /players/:id => will delete a specific player
- /players//delete/deleteAll => will delete all players
<br />

### Response
- `200` OK/Successful
- `404` Not Found/Failed
<br />

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3001](http://localhost:3001) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.# nba-ratings-api
