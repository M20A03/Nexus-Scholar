from fastapi import FastAPI, HTTPException, UploadFile, File
from pydantic import BaseModel
from google.cloud import aiplatform, language_v2
from typing import List, Optional
import os
import io
import PyPDF2

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

@app.post("/parse")
async def parse_document(file: UploadFile = File(...)):
    try:
        content = await file.read()
        text = ""
        
        if file.filename.endswith('.pdf'):
            pdf_reader = PyPDF2.PdfReader(io.BytesIO(content))
            for page in pdf_reader.pages:
                text += page.extract_text() + "\n"
        else:
            text = content.decode('utf-8', errors='ignore')
            
        return {"text": text, "metadata": {"filename": file.filename}}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/ingest")
async def ingest_pipeline(file: UploadFile = File(...)):
    try:
        # 1. Parse
        parse_res = await parse_document(file)
        text = parse_res["text"]
        
        # 2. Extract Entities
        entities_res = extract_entities(TextPayload(text=text[:10000])) # Limit to avoid quota issues on mock
        
        # 3. Embed
        embed_res = embed_text(TextPayload(text=text[:10000])) # Limit for embedding length limits
        
        return {
            "text": text,
            "entities": entities_res["entities"],
            "embedding": embed_res["embedding"]
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
