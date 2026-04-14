# Share Pad

A small notepad app where you pick a name for a pad at `/any-name` and can open it from any device. Inspired by [ZumPad](https://zumpad.zum.de/).

Built for SE_19 Web Technologies Basics / SE_01.

## Stack

- Node.js + Express
- EJS templates
- MongoDB via Mongoose

## Run locally

```bash
npm install
cp .env.example .env   # then fill in MONGO_URI
npm start
```

Open http://localhost:3000.

## Deploy

- **Database:** MongoDB Atlas (M0 free tier is enough).
- **Host:** Render web service. Build command `npm install`, start command `npm start`.
- Set `MONGO_URI` in the Render environment — include the database name (`/sharepad`) in the connection string.

## Pages

- `/` — pick a pad name
- `/about` — short explanation
- `/:padName` — view or edit a pad
