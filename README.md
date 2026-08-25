# University Research Knowledge Graph Builder

This is a full-stack microservice application that ingests PDFs, Markdown, and code repositories to build a real-time, queryable knowledge graph. It extracts entities and relationships using Vertex AI and the Google Cloud Natural Language API, storing them in PostgreSQL with `pgvector` for semantic search.

## Tech Stack
- **Frontend**: React, Vite, Tailwind CSS, Zustand, Recharts, `react-force-graph-2d`
- **Backend**: Node.js, Express, Prisma (ORM), Socket.IO
- **AI Service**: Python, FastAPI, Vertex AI, Google Cloud Language
- **Database**: PostgreSQL with `pgvector` (Local) -> AlloyDB (GCP Production)
- **Cache**: Redis

## Prerequisites
- Docker and Docker Compose
- Google Cloud Account with Vertex AI and Cloud Natural Language API enabled
- Node.js (for local dev without Docker)
- Python 3.10+ (for local dev without Docker)

## Local Development (Docker Compose)

1. **Set up Google Cloud Credentials**:
   Export your Service Account JSON key or use Application Default Credentials.
   Ensure the `ai-service` in `docker-compose.yml` mounts this correctly.

2. **Start the stack**:
   ```bash
   docker-compose up --build
   ```

3. **Access the services**:
   - Frontend: `http://localhost:3000`
   - Backend API: `http://localhost:4000`
   - AI Service Docs: `http://localhost:8000/docs`
   - Database: `localhost:5432`

## Deployment to GCP
Run the provided deployment script to deploy the backend and AI service to Cloud Run.

```bash
chmod +x deploy-gcp.sh
./deploy-gcp.sh
```
