#!/bin/bash
set -e

# Configuration
PROJECT_ID="your-gcp-project-id"
REGION="us-central1"
ARTIFACT_REPO="kg-builder-repo"
DB_CONNECTION_NAME="your-gcp-project-id:us-central1:alloydb-cluster"

echo "Setting up GCP Deployment for Knowledge Graph Builder..."

# 1. Enable required APIs
gcloud services enable run.googleapis.com \
    artifactregistry.googleapis.com \
    alloydb.googleapis.com \
    aiplatform.googleapis.com \
    language.googleapis.com \
    --project $PROJECT_ID

# 2. Create Artifact Registry
gcloud artifacts repositories create $ARTIFACT_REPO \
    --repository-format=docker \
    --location=$REGION \
    --project $PROJECT_ID || true

# 3. Build & Deploy AI Service
echo "Building AI Service..."
gcloud builds submit --tag $REGION-docker.pkg.dev/$PROJECT_ID/$ARTIFACT_REPO/ai-service ./ai-service --project $PROJECT_ID

echo "Deploying AI Service to Cloud Run..."
gcloud run deploy ai-service \
    --image $REGION-docker.pkg.dev/$PROJECT_ID/$ARTIFACT_REPO/ai-service \
    --region $REGION \
    --allow-unauthenticated \
    --project $PROJECT_ID

AI_SERVICE_URL=$(gcloud run services describe ai-service --region $REGION --project $PROJECT_ID --format 'value(status.url)')

# 4. Build & Deploy Backend
echo "Building Backend Service..."
gcloud builds submit --tag $REGION-docker.pkg.dev/$PROJECT_ID/$ARTIFACT_REPO/backend ./backend --project $PROJECT_ID

echo "Deploying Backend to Cloud Run..."
gcloud run deploy backend \
    --image $REGION-docker.pkg.dev/$PROJECT_ID/$ARTIFACT_REPO/backend \
    --region $REGION \
    --allow-unauthenticated \
    --set-env-vars AI_SERVICE_URL=$AI_SERVICE_URL \
    --set-secrets DATABASE_URL=database_url:latest,JWT_SECRET=jwt_secret:latest \
    --project $PROJECT_ID

echo "Deployment Complete!"
echo "Backend URL: $(gcloud run services describe backend --region $REGION --project $PROJECT_ID --format 'value(status.url)')"
