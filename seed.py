import sys
import time
import urllib.request
import json

BACKEND_URL = "http://localhost:8001/api"

SEED_PAPERS = [
    {
        "title": "Attention Is All You Need",
        "abstract": "The dominant sequence transduction models are based on complex recurrent or convolutional neural networks. We propose a new simple network architecture, the Transformer, based solely on attention mechanisms, dispensing with recurrence and convolutions entirely. Experiments show these models to be superior in quality while being more parallelizable.",
        "doi": "10.48550/arXiv.1706.03762",
        "arxiv_id": "1706.03762",
        "year": 2017,
        "venue": "NeurIPS 2017",
        "pdf_url": "https://arxiv.org/pdf/1706.03762.pdf",
        "authors": ["Ashish Vaswani", "Noam Shazeer", "Niki Parmar", "Jakob Uszkoreit", "Aidan Gomez"],
        "properties": [
            {"key": "Method", "value": "Multi-Head Self-Attention Transformer"},
            {"key": "Dataset", "value": "WMT 2014 English-to-German"},
            {"key": "Primary Metric", "value": "28.4 BLEU Score"},
            {"key": "Hardware", "value": "8 x NVIDIA P100 GPUs"},
            {"key": "Parameters", "value": "213M (Transformer-Big)"}
        ]
    },
    {
        "title": "BERT: Pre-training of Deep Bidirectional Transformers for Language Understanding",
        "abstract": "We introduce a new language representation model called BERT, which stands for Bidirectional Encoder Representations from Transformers. BERT is designed to pre-train deep bidirectional representations from unlabeled text by jointly conditioning on both left and right context in all layers.",
        "doi": "10.48550/arXiv.1810.04805",
        "arxiv_id": "1810.04805",
        "year": 2018,
        "venue": "NAACL 2019",
        "pdf_url": "https://arxiv.org/pdf/1810.04805.pdf",
        "authors": ["Jacob Devlin", "Ming-Wei Chang", "Kenton Lee", "Kristina Toutanova"],
        "properties": [
            {"key": "Method", "value": "Masked Language Modeling (MLM)"},
            {"key": "Dataset", "value": "SQuAD v2.0 Question Answering"},
            {"key": "Primary Metric", "value": "93.2% F1 Score"},
            {"key": "Hardware", "value": "16 x Cloud TPUs"},
            {"key": "Parameters", "value": "340M (BERT-Large)"}
        ]
    },
    {
        "title": "LLaMA: Open and Efficient Foundation Language Models",
        "abstract": "We introduce LLaMA, a collection of foundation language models ranging from 7B to 65B parameters. We train our models on trillions of tokens using publicly available datasets exclusively. LLaMA-13B outperforms GPT-3 (175B) on most benchmarks, despite being 10x smaller.",
        "doi": "10.48550/arXiv.2302.13971",
        "arxiv_id": "2302.13971",
        "year": 2023,
        "venue": "arXiv 2023",
        "pdf_url": "https://arxiv.org/pdf/2302.13971.pdf",
        "authors": ["Hugo Touvron", "Thibaut Lavril", "Gautier Izacard", "Armand Joulin"],
        "properties": [
            {"key": "Method", "value": "RoPE & SwiGLU Decoder Transformer"},
            {"key": "Dataset", "value": "1.4 Trillion Public Tokens"},
            {"key": "Primary Metric", "value": "68.9% MMLU Benchmark"},
            {"key": "Hardware", "value-[#58a6ff]": "2048 x A100 80GB GPUs"},
            {"key": "Parameters", "value": "65B Parameters"}
        ]
    },
    {
        "title": "Deep Residual Learning for Image Recognition",
        "abstract": "Deeper neural networks are more difficult to train. We present a residual learning framework to ease the training of networks that are substantially deeper than those used previously. We explicitly reformulate the layers as learning residual functions with reference to the layer inputs.",
        "doi": "10.48550/arXiv.1512.03385",
        "arxiv_id": "1512.03385",
        "year": 2015,
        "venue": "CVPR 2016",
        "pdf_url": "https://arxiv.org/pdf/1512.03385.pdf",
        "authors": ["Kaiming He", "Xiangyu Zhang", "Shaoqing Ren", "Jian Sun"],
        "properties": [
            {"key": "Method", "value": "Residual Shortcut Mapping"},
            {"key": "Dataset", "value": "ImageNet 1k Classification"},
            {"key": "Primary Metric", "value": "3.57% Top-5 Error Rate"},
            {"key": "Parameters", "value": "60.2M (ResNet-152)"}
        ]
    },
    {
        "title": "Highly accurate protein structure prediction with AlphaFold",
        "abstract": "Proteins are essential to life, and understanding their structure can facilitate a mechanistic understanding of function. Here we present AlphaFold 2, a computational approach that predicts 3D protein structures with atomic accuracy even when no homologous structure is known.",
        "doi": "10.1038/s41586-021-03819-2",
        "arxiv_id": "2107.03819",
        "year": 2021,
        "venue": "Nature 2021",
        "pdf_url": "https://www.nature.com/articles/s41586-021-03819-2.pdf",
        "authors": ["John Jumper", "Richard Evans", "Alexander Pritzel", "Demis Hassabis"],
        "properties": [
            {"key": "Method", "value": "Evoformer & Structure Module"},
            {"key": "Dataset", "value": "CASP14 Assessment"},
            {"key": "Primary Metric", "value": "92.4 GDT (Global Distance Test)"},
            {"key": "Domain", "value": "Structural Bioinformatics"}
        ]
    },
    {
        "title": "A Programmable Dual-RNA-Guided DNA Endonuclease in Adaptive Bacterial Immunity (CRISPR-Cas9)",
        "abstract": "Clustered regularly interspaced short palindromic repeats (CRISPR)/CRISPR-associated (Cas) systems provide bacteria and archaea with adaptive immunity against viruses and plasmids. We demonstrate that Cas9 can be programmed with single guide RNAs for targeted DNA cleavage.",
        "doi": "10.1126/science.1225829",
        "arxiv_id": "science.1225829",
        "year": 2012,
        "venue": "Science",
        "pdf_url": "https://www.science.org/doi/10.1126/science.1225829",
        "authors": ["Jennifer Doudna", "Emmanuelle Charpentier", "Martin Jinek"],
        "properties": [
            {"key": "Method", "value": "CRISPR-Cas9 Gene Editing"},
            {"key": "Target", "value": "Dual-RNA Targeted DNA Cleavage"},
            {"key": "Domain", "value": "Molecular Biology & Genetics"}
        ]
    },
    {
        "title": "Quantum Supremacy Using a Programmable Superconducting Processor",
        "abstract": "The promise of quantum computers is that certain computational tasks might be executed exponentially faster on a quantum processor than on a classical processor. We demonstrate quantum supremacy using a 53-qubit processor named Sycamore.",
        "doi": "10.1038/s41586-019-1666-5",
        "arxiv_id": "1910.11333",
        "year": 2019,
        "venue": "Nature 2019",
        "pdf_url": "https://arxiv.org/pdf/1910.11333.pdf",
        "authors": ["Frank Arute", "Kunal Arya", "Demis Hassabis", "John Martinis"],
        "properties": [
            {"key": "Method", "value": "53-Qubit Superconducting Processor (Sycamore)"},
            {"key": "Dataset", "value": "Random Circuit Sampling"},
            {"key": "Primary Metric", "value": "200 Seconds vs 10,000 Years Supercomputer"},
            {"key": "Domain", "value": "Quantum Computing"}
        ]
    },
    {
        "title": "Generative Adversarial Nets (GANs)",
        "abstract": "We propose a new framework for estimating generative models via an adversarial process, in which we simultaneously train two models: a generative model G that captures the data distribution, and a discriminative model D that estimates the probability that a sample came from the training data.",
        "doi": "10.48550/arXiv.1406.2661",
        "arxiv_id": "1406.2661",
        "year": 2014,
        "venue": "NeurIPS 2014",
        "pdf_url": "https://arxiv.org/pdf/1406.2661.pdf",
        "authors": ["Ian Goodfellow", "Jean Pouget-Abadie", "Yoshua Bengio"],
        "properties": [
            {"key": "Method", "value": "Generative Adversarial Networks (GAN)"},
            {"key": "Dataset", "value": "MNIST & CIFAR-10"},
            {"key": "Objective", "value": "Minimax Game Optimization"}
        ]
    },
    {
        "title": "Mastering the Game of Go with Deep Neural Networks and Tree Search (AlphaGo)",
        "abstract": "The game of Go has long been viewed as the most challenging of artificial intelligence tasks. Here we introduce a system, AlphaGo, that combines deep neural networks with advanced tree search to defeat the human European Go champion.",
        "doi": "10.1038/nature16961",
        "arxiv_id": "nature16961",
        "year": 2016,
        "venue": "Nature 2016",
        "pdf_url": "https://www.nature.com/articles/nature16961.pdf",
        "authors": ["David Silver", "Aja Huang", "Demis Hassabis"],
        "properties": [
            {"key": "Method", "value": "Monte Carlo Tree Search + Policy Networks"},
            {"key": "Dataset", "value": "KGS Go Server & Self-Play"},
            {"key": "Primary Metric", "value": "5-0 Defeat of European Champion"}
        ]
    },
    {
        "title": "An Image is Worth 16x16 Words: Transformers for Image Recognition at Scale (ViT)",
        "abstract": "While the Transformer architecture has become the de facto standard for natural language processing, its applications to computer vision remain limited. We show that a pure transformer applied directly to sequences of image patches can perform very well on image classification tasks.",
        "doi": "10.48550/arXiv.2010.11929",
        "arxiv_id": "2010.11929",
        "year": 2020,
        "venue": "ICLR 2021",
        "pdf_url": "https://arxiv.org/pdf/2010.11929.pdf",
        "authors": ["Alexey Dosovitskiy", "Lucas Beyer", "Neil Houlsby"],
        "properties": [
            {"key": "Method", "value": "Vision Transformer (ViT)"},
            {"key": "Dataset", "value": "JFT-300M & ImageNet-21k"},
            {"key": "Primary Metric", "value": "88.55% Top-1 Accuracy"}
        ]
    }
]

def seed_database():
    print(f"Seeding ORKG Database via API endpoint: {BACKEND_URL}/papers/...")
    created_paper_ids = []

    for paper in SEED_PAPERS:
        try:
            req = urllib.request.Request(
                f"{BACKEND_URL}/papers/",
                data=json.dumps(paper).encode('utf-8'),
                headers={'Content-Type': 'application/json'}
            )
            with urllib.request.urlopen(req) as response:
                res_data = json.loads(response.read().decode('utf-8'))
                created_paper_ids.append(res_data['id'])
                print(f"✓ Seeded Paper: {paper['title']} (ID: {res_data['id']})")
        except Exception as e:
            print(f"✗ Failed to seed paper '{paper['title']}': {e}")

    # Seed an example Comparison Matrix
    if len(created_paper_ids) >= 3:
        try:
            comp_payload = {
                "title": "State-of-the-Art Neural Language Models Benchmark",
                "description": "Side-by-side ORKG matrix evaluation of Transformer, BERT, and LLaMA across datasets, parameters, and metrics.",
                "property_keys": ["Method", "Dataset", "Primary Metric", "Parameters"],
                "paper_ids": created_paper_ids[:3]
            }
            req = urllib.request.Request(
                f"{BACKEND_URL}/comparisons/",
                data=json.dumps(comp_payload).encode('utf-8'),
                headers={'Content-Type': 'application/json'}
            )
            with urllib.request.urlopen(req) as response:
                res_data = json.loads(response.read().decode('utf-8'))
                print(f"✓ Seeded Comparison Matrix: {comp_payload['title']} (ID: {res_data['id']})")
        except Exception as e:
            print(f"✗ Failed to seed comparison: {e}")

    print("\nDatabase seeding completed successfully!")

if __name__ == "__main__":
    seed_database()
