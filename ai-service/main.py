from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from google.cloud import aiplatform, language_v2
from typing import List, Optional
import os

app = FastAPI(title="Knowledge Graph AI Service")

PROJECT_ID = os.getenv("GOOGLE_CLOUD_PROJECT", "your-gcp-project-id")
LOCATION = os.getenv("GOOGLE_CLOUD_LOCATION", "us-central1")

try:
    aiplatform.init(project=PROJECT_ID, location=LOCATION)
except Exception as e:
    print(f"Warning: Could not initialize Vertex AI automatically: {e}")

class TextPayload(BaseModel):
    text: str

@app.post("/embed")
def embed_text(payload: TextPayload):
    try:
        from vertexai.language_models import TextEmbeddingModel
        
        # We use the recommended 004 model for text embeddings
        model = TextEmbeddingModel.from_pretrained("text-embedding-004")
        embeddings = model.get_embeddings([payload.text])
        
        return {"embedding": embeddings[0].values}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/extract-entities")
def extract_entities(payload: TextPayload):
    try:
        client = language_v2.LanguageServiceClient()
        document = {
            "content": payload.text,
            "type_": language_v2.Document.Type.PLAIN_TEXT,
            "language_code": "en"
        }
        
        response = client.analyze_entities(document=document)
        
        entities = []
        for entity in response.entities:
            # Map Google NLP Types to our Types roughly
            type_name = language_v2.Entity.Type(entity.type_).name
            mapped_type = "concept"
            if type_name == "PERSON":
                mapped_type = "author"
            elif type_name == "ORGANIZATION":
                mapped_type = "organization"
            elif type_name == "LOCATION":
                mapped_type = "location"
                
            entities.append({
                "name": entity.name,
                "type": mapped_type,
                "salience": entity.salience
            })
            
        return {"entities": entities}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
