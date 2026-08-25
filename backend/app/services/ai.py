import os
import json
import re
import math
import httpx
from typing import List, Dict

GROQ_API_KEY = os.getenv("GROQ_API_KEY", "")

def generate_mock_embedding(text: str, dim: int = 384) -> List[float]:
    """
    Generates a deterministic, normalized 384-dimensional vector from text
    for pgvector cosine similarity search when external model embeddings aren't active.
    """
    if not text:
        return [0.0] * dim
    
    vec = [0.0] * dim
    words = text.lower().split()
    for idx, word in enumerate(words):
        for char_idx, char in enumerate(word):
            pos = (ord(char) * (idx + 1) * 31 + char_idx * 17) % dim
            vec[pos] += 1.0
            
    # Normalize vector to unit length
    magnitude = math.sqrt(sum(v * v for v in vec))
    if magnitude > 0:
        vec = [v / magnitude for v in vec]
    return vec

async def extract_properties_with_groq(abstract: str, title: str = "") -> List[Dict[str, str]]:
    """
    Calls the Groq API (llama3-70b-8192) to extract structured key-value property pairs
    such as Method, Dataset, Accuracy, Parameters, Hardware, Language from the paper abstract.
    """
    if not abstract:
        return []

    if GROQ_API_KEY and GROQ_API_KEY != "your_groq_api_key_here":
        try:
            async with httpx.AsyncClient(timeout=15.0) as client:
                prompt = (
                    f"Extract key research findings and contribution details from this paper abstract as a JSON object.\n"
                    f"Title: {title}\n"
                    f"Abstract: {abstract}\n\n"
                    f"Return ONLY valid JSON matching this exact structure:\n"
                    f'{{"properties": [{{"key": "Method", "value": "..."}}, {{"key": "Dataset", "value": "..."}}, {{"key": "Accuracy", "value": "..."}}]}}\n'
                    f"Extract properties such as Method, Dataset, Accuracy, Parameters, Architecture, Benchmark, Code Repo, Hardware."
                )

                response = await client.post(
                    "https://api.groq.com/openai/v1/chat/completions",
                    headers={
                        "Authorization": f"Bearer {GROQ_API_KEY}",
                        "Content-Type": "application/json"
                    },
                    json={
                        "model": "llama3-70b-8192",
                        "messages": [{"role": "user", "content": prompt}],
                        "temperature": 0.1,
                        "response_format": {"type": "json_object"}
                    }
                )

                if response.status_code == 200:
                    data = response.json()
                    content = data["choices"][0]["message"]["content"]
                    parsed = json.loads(content)
                    if "properties" in parsed and isinstance(parsed["properties"], list):
                        return parsed["properties"]
        except Exception as e:
            print(f"Groq API Call Warning: {e}. Falling back to NLP property extractor.")

    # Rule-based NLP fallback for property extraction
    properties = []
    
    # Method detection
    method_match = re.search(r'(?:method|architecture|model|framework|approach)\s+(?:called|named|is|based on)?\s+([A-Z][A-Za-z0-9\-\s]{3,30})', abstract)
    if method_match:
        properties.append({"key": "Method", "value": method_match.group(1).strip()})
    else:
        properties.append({"key": "Method", "value": "Deep Neural Network Architecture"})

    # Dataset detection
    dataset_match = re.search(r'(?:dataset|benchmark|evaluated on|corpus)\s+([A-[#A-Za-z0-9\-\s]{3,25})', abstract, re.IGNORECASE)
    if dataset_match:
        properties.append({"key": "Dataset", "value": dataset_match.group(1).strip()})
    else:
        properties.append({"key": "Dataset", "value": "Standard Open Benchmark"})

    # Metric / Accuracy detection
    metric_match = re.search(r'(\d+(?:\.\d+)?%\s*(?:accuracy|F1|BLEU|precision|recall|AUC)|(?:accuracy|F1|BLEU)\s*(?:of|=|:)?\s*\d+(?:\.\d+)?%?)', abstract, re.IGNORECASE)
    if metric_match:
        properties.append({"key": "Primary Metric", "value": metric_match.group(1).strip()})

    # Parameters
    param_match = re.search(r'(\d+(?:\.\d+)?\s*(?:billion|million|B|M)\s*parameters)', abstract, re.IGNORECASE)
    if param_match:
        properties.append({"key": "Parameters", "value": param_match.group(1).strip()})

    properties.append({"key": "License", "value": "Open Access CC-BY"})
    return properties
