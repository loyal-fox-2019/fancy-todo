# fancy-todo

# Usage
## Server side
Go to folder `server` and do all steps below :
1. Type command in terminal
```
npm i
```
2. Make a new file `.env` and add this lines
```
CLIENT_ID=YOUR-CLIENT-ID-FROM-GOOGLE-OAUTH-FOR-localhost:5500
CLIENT_SECRET=YOUR-CLIENT-SECRET-FROM-GOOGLE-OAUTH-FOR-localhost:5500
```
3. You are ready to go, type command in terminal
```
npm run dev
```

## Client side
1. Run the following command when you are on `client` folder
```
live-server --host=localhost --post=5500
```

# OCR API link to register and get free API key
```
https://ocr.space/OCRAPI
```