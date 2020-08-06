# Midtrans Example Template
Simple example template for implementing Midtrans SNAP. Using only Javascript, with Preact on frontend and Express on backend.

## Running server
```
cd server
npm install .
export MIDTRANS_SERVER_KEY=insertkey
export GOOGLE_SHEET_ID=insertid
node server.js
```

## Running frontend
Edit `data-client-key` on `src/template.html` and insert the `MIDTRANS_CLIENT_KEY` with your key.
```
npm install .
npm run dev
```

## Usage
Fill all form, on `localhost:8080` and click submit, then click pay button and SNAP will appear.
