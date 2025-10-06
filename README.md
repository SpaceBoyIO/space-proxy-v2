# Remote Browser Project (Render-ready)

This project hosts a **server-side headless browser** that streams to users in a webpage.

## Features

- Node.js backend using Express + WebSocket
- Playwright headless Chromium
- Simple frontend showing browser screenshots
- Navigate pages via URL input

## Deployment to Render (Free Plan)

1. **Push to GitHub**  
   Upload this project as a repository.

2. **Sign up at [Render.com](https://render.com)**  
   Connect your GitHub account.

3. **Create a new Web Service**  
   - Repository: select your repo  
   - Branch: main  
   - Build Command: `npm install`  
   - Start Command: `node server/index.js`  

4. **Deploy**  
   Render will give you a public HTTPS URL. Open it in your browser.

5. **Usage**  
   - Enter a URL in the input box → click Go  
   - The server will load the page in headless Chromium and stream screenshots to the canvas.

### Notes

- **Free plan sleep**: The app will sleep after ~15 min inactivity. Reloading wakes it up.
- **Custom domain**: Optional in Render settings.
- **Scaling**: For more users, paid plans are required.
