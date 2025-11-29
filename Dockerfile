# Stage 1: Build React frontend
FROM node:20 AS frontend-build
WORKDIR /app
COPY app/frontend/package*.json ./
RUN npm install
COPY app/frontend/ ./
RUN npm run build

# Stage 2: Build backend
FROM python:3.11-slim
WORKDIR /app
COPY app/backend/requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt
COPY app/backend/ ./

# Copy frontend build into backend static folder
COPY --from=frontend-build /app/build ./frontend_build


EXPOSE 8000

CMD ["gunicorn", "api:app", "-w", "4", "-k", "uvicorn.workers.UvicornWorker", "-b", "0.0.0.0:10000"]

