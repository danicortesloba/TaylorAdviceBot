# Taylor Advice Bot - Deployment Guide for Render

An AI-powered chatbot that provides advice using Taylor Swift song lyrics, powered by OpenAI's API.

## 🚀 Deploy to Render (Single Service)

This project is configured to deploy as a **single service** that serves both the frontend and backend API.

### Quick Deploy

1. **Push your code to GitHub**
   ```bash
   git add .
   git commit -m "Prepare for Render deployment"
   git push -u origin main
   ```

2. **Create a Render account**
   - Go to [render.com](https://render.com) and sign up
   - Connect your GitHub account

3. **Deploy from Dashboard**
   - Click "New +" → "Blueprint"
   - Connect your repository: `danicortesloba/TaylorAdviceBot`
   - Render will automatically detect `render.yaml`

4. **Set Environment Variables**
   - After deployment, go to your service settings
   - Add environment variable:
     - Key: `OPENAI_API_KEY`
     - Value: Your OpenAI API key (get one at platform.openai.com)

5. **Access Your App**
   - Your app will be live at: `https://taylor-advice-bot.onrender.com`
   - Both frontend and API are served from the same URL

### Option 2: Manual Deployment

1. Go to Render Dashboard → New + → Web Service
2. Connect your GitHub repository
3. Configure:
   - **Name**: `taylor-advice-bot`
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`
   - **Environment Variables**:
     - `OPENAI_API_KEY`: Your OpenAI API key
     - `NODE_ENV`: production
4. Click "Create Web Service"

That's it! The service will serve both the React frontend and Express API.

## 🔧 Local Development

### Prerequisites
- Node.js 22+ (use `nvm use 22`)
- OpenAI API key

### Setup
```bash
# Install dependencies
npm install

# Copy environment file
cp .env.example .env

# Add your OpenAI API key to .env
# OPENAI_API_KEY=sk-...

# Start the backend API
npm run start:api

# In another terminal, start the frontend
npm run dev
```

Visit `http://localhost:5173` to see the app.

## 📝 Environment Variables

### Development (.env)
```env
OPENAI_API_KEY=sk-...
PORT=3000
NODE_ENV=development
CORS_ORIGIN=*
```

### Production (Render Dashboard)
Only set `OPENAI_API_KEY` - other variables are automatically set.

## 🏗️ How It Works

### Development
- Frontend runs on `http://localhost:5173` (Vite dev server)
- Backend API runs on `http://localhost:3000` (Express server)
- Vite proxies `/api` requests to the backend

### Production
- Single Express server serves both:
  - Static React files from `/dist`
  - API endpoints at `/api/responses`
- All routes handled by one service on Render

## 🏗️ Project Structure
```
askTaylor/
├── server.js           # Express API server
├── src/
│   ├── App.jsx         # Main React component
│   ├── App.css         # Styles
│   ├── components/
│   │   ├── form.jsx    # Question input form
│   │   └── results.jsx # Answer display
│   └── assets/
│       └── taylor.jpg  # Logo image
├── public/             # Static assets
├── package.json        # Dependencies
├── render.yaml         # Render deployment config
└── .env.example        # Environment template
```

## 🔐 Security
- API key is kept server-side only
- CORS configured for production
- `.env` excluded from git

## 📦 Technologies
- **Frontend**: React 19, Vite
- **Backend**: Express, Node.js
- **AI**: OpenAI GPT-4 API
- **Deployment**: Render

## 🐛 Troubleshooting

### "Incorrect API key" error
- Verify `OPENAI_API_KEY` is set correctly in Render dashboard
- Check the key has no extra spaces or quotes

### CORS errors
- Update `CORS_ORIGIN` in backend to match your frontend URL
- Or keep it as `*` for development

### Frontend can't connect to backend
- Update the fetch URL in `src/App.jsx` to your Render backend URL
- Make sure backend service is running

## 📄 License
MIT
