# ♻️ Recyclo

Recyclo is a full-stack web app that helps users classify and track recyclable waste using machine learning.  
Users can upload images, get predictions, and compete on a global leaderboard.

## 🛠 Built With

[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![FastAPI](https://img.shields.io/badge/FastAPI-005571?style=for-the-badge&logo=fastapi)](https://fastapi.tiangolo.com/)
[![SQLAlchemy](https://img.shields.io/badge/SQLAlchemy-8B0000?style=for-the-badge&logo=databricks&logoColor=white)](https://www.sqlalchemy.org/)
[![Alembic](https://img.shields.io/badge/Alembic-5A5A5A?style=for-the-badge)](https://alembic.sqlalchemy.org/)
[![PyTorch](https://img.shields.io/badge/PyTorch-EE4C2C?style=for-the-badge&logo=pytorch&logoColor=white)](https://pytorch.org/)
[![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)](https://www.docker.com/)
[![Render](https://img.shields.io/badge/Render-46E3B7?style=for-the-badge&logo=render&logoColor=black)](https://render.com/)
[![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://vercel.com/)
[![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white)](https://jwt.io/)

## 🔗 Live Demo

[https://recyclo-ai.vercel.app](https://recyclo-ai.vercel.app)

## 🚀 Getting Started

This section explains how to run Recyclo locally.

### 🧰 Prerequisites

- Node.js + npm  
- Python 3.10+  
- Git  

### 🛠️ Installation

1. Clone the repo  
```bash
git clone https://github.com/Jiwei-Cao/Recyclo
```

2. Frontend Setup  
```bash
cd frontend
npm install
npm run dev
```

3. Backend Setup  
```bash
cd backend
python3 -m venv venv
source venv/bin/activate  # venv\Scripts\activate on Windows
pip install -r requirements.txt
alembic upgrade head
uvicorn app.main:app --reload
```

4. Configure allowed origins (CORS)  
Make sure `localhost:3000` is allowed in your FastAPI backend:
```python
origins = [
    "http://localhost:3000",
    "http://127.0.0.1:3000"
]
```

5. (Optional) Change git remote if you forked this repo  
```bash
git remote set-url origin https://github.com/Jiwei-Cao/Recyclo
git remote -v
```

## 📁 Environment Variables

Create a `.env` file in `backend/` with:
```env
DATABASE_URL=sqlite:///./app.db
SECRET_KEY=your-secret-key
```

## 🧪 Features

- Image-based waste classification using a PyTorch model  
- Track personal recycling history  
- View the global leaderboard  
- JWT authentication system  
- Clean UI with dark mode support  
- Docker support for backend deployment  
- Deployed via Render (API) and Vercel (Frontend)

## 🗂️ Project Structure

```
recyclo/
├── backend/
│   ├── app/
│   ├── data/
│   ├── migrations/
│   └── Dockerfile
├── frontend/
│   └── components/, assets/, index.html
├── README.md
```