const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors({ origin: '*', methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], allowedHeaders: ['Content-Type', 'Authorization'] }));
app.use(express.json());

app.use((req, res, next) => {
  if (req.url.startsWith('/api/')) {
    req.url = req.url.replace(/^\/api/, '');
  } else if (req.url === '/api') {
    req.url = '/';
  }
  next();
});
export const MOCK_RESEARCH_PROBLEMS: ORKGProblem[] = [
  {
    id: 'prob-1',
    name: 'Sequence-to-Sequence Modeling & Neural Machine Translation',
    field: 'Computer Science / Natural Language Processing',
    description: 'Developing architecture that maps arbitrary input sequences to output sequences without recurrent bottlenecks.',
    paperCount: 12
  },
  {
    id: 'prob-2',
    name: 'Contextual Language Representation & Masked Pre-training',
    field: 'Computer Science / Natural Language Processing',
    description: 'Learning bidirectional contextual representations from unlabelled text corpora for downstream NLP tasks.',
    paperCount: 1
  },
  {
    id: 'prob-3',
    name: 'Efficient Foundation Language Models & Scaling Laws',
    field: 'Computer Science / Artificial Intelligence',
    description: 'Training high-capacity autoregressive language models with open access weights and efficient inference.',
    paperCount: 15
  },
  {
    id: 'prob-4',
    name: 'Deep Residual Learning & Image Classification',
    field: 'Computer Science / Computer Vision',
    description: 'Overcoming the vanishing gradient problem in ultra-deep convolutional networks using identity shortcut connections.',
    paperCount: 7
  },
  {
    id: 'prob-5',
    name: '3D Protein Structure Prediction from Amino Acid Sequences',
    field: 'Life Sciences / Computational Biology',
    description: 'Predicting atomic 3D protein structures directly from primary amino acid sequences with experimental accuracy.',
    paperCount: 2
  }
];

const MOCK_PAPERS = [
  {
    "id": "paper-1706-03762",
    "title": "Attention Is All You Need",
    "abstract": "The dominant sequence transduction models are based on complex recurrent or convolutional neural networks in an encoder-decoder configuration. The best performing models also connect the encoder and decoder through an attention mechanism. We propose a new simple network architecture, the Transformer, based solely on attention mechanisms, dispensing with recurrence and convolutions entirely. Experiments on two machine translation tasks show these models to be superior in quality while being more parallelizable and requiring significantly less time to train. Our model achieves 28.4 BLEU on the WMT 2014 English-to-German translation task, improving over the existing best results, including ensembles by over 2 BLEU. On the WMT 2014 English-to-French translation task, our model establishes a new single-model state-of-the-art BLEU score of 41.8 after training for 3.5 days on eight GPUs, a small fraction of the training costs of the best models from the literature. We show that the Transformer generalizes well to other tasks by applying it successfully to English constituency parsing both with large and limited training data.",
    "doi": "10.48550/arXiv.1706.03762",
    "year": 2017,
    "venue": "arXiv 2017",
    "pdfUrl": "https://arxiv.org/pdf/1706.03762.pdf",
    "openAccess": true,
    "authors": [
      {
        "id": "auth-1706-03762-1",
        "name": "Ashish Vaswani",
        "department": "AI Research Lab"
      },
      {
        "id": "auth-1706-03762-2",
        "name": "Noam Shazeer",
        "department": "AI Research Lab"
      },
      {
        "id": "auth-1706-03762-3",
        "name": "Niki Parmar",
        "department": "AI Research Lab"
      },
      {
        "id": "auth-1706-03762-4",
        "name": "Jakob Uszkoreit",
        "department": "AI Research Lab"
      },
      {
        "id": "auth-1706-03762-5",
        "name": "Llion Jones",
        "department": "AI Research Lab"
      },
      {
        "id": "auth-1706-03762-6",
        "name": "Aidan N. Gomez",
        "department": "AI Research Lab"
      }
    ],
    "researchProblemId": "prob-1",
    "researchProblemName": "Sequence-to-Sequence Modeling & Neural Machine Translation",
    "statements": [
      {
        "id": "st-1706-03762-1",
        "paperId": "paper-1706-03762",
        "subject": "Attention Is All You Need",
        "predicate": "proposed_by",
        "object": "Ashish Vaswani et al. (2017)"
      },
      {
        "id": "st-1706-03762-2",
        "paperId": "paper-1706-03762",
        "subject": "Attention Is All You Need",
        "predicate": "addresses_problem",
        "object": "Sequence-to-Sequence Modeling & Neural Machine Translation"
      },
      {
        "id": "st-1706-03762-3",
        "paperId": "paper-1706-03762",
        "subject": "Attention Is All You Need",
        "predicate": "source_archive",
        "object": "arXiv Preprint (1706.03762)"
      }
    ]
  },
  {
    "id": "paper-1810-04805",
    "title": "BERT: Pre-training of Deep Bidirectional Transformers for Language Understanding",
    "abstract": "We introduce a new language representation model called BERT, which stands for Bidirectional Encoder Representations from Transformers. Unlike recent language representation models, BERT is designed to pre-train deep bidirectional representations from unlabeled text by jointly conditioning on both left and right context in all layers. As a result, the pre-trained BERT model can be fine-tuned with just one additional output layer to create state-of-the-art models for a wide range of tasks, such as question answering and language inference, without substantial task-specific architecture modifications. BERT is conceptually simple and empirically powerful. It obtains new state-of-the-art results on eleven natural language processing tasks, including pushing the GLUE score to 80.5% (7.7% point absolute improvement), MultiNLI accuracy to 86.7% (4.6% absolute improvement), SQuAD v1.1 question answering Test F1 to 93.2 (1.5 point absolute improvement) and SQuAD v2.0 Test F1 to 83.1 (5.1 point absolute improvement).",
    "doi": "10.48550/arXiv.1810.04805",
    "year": 2018,
    "venue": "arXiv 2018",
    "pdfUrl": "https://arxiv.org/pdf/1810.04805.pdf",
    "openAccess": true,
    "authors": [
      {
        "id": "auth-1810-04805-1",
        "name": "Jacob Devlin",
        "department": "AI Research Lab"
      },
      {
        "id": "auth-1810-04805-2",
        "name": "Ming-Wei Chang",
        "department": "AI Research Lab"
      },
      {
        "id": "auth-1810-04805-3",
        "name": "Kenton Lee",
        "department": "AI Research Lab"
      },
      {
        "id": "auth-1810-04805-4",
        "name": "Kristina Toutanova",
        "department": "AI Research Lab"
      }
    ],
    "researchProblemId": "prob-2",
    "researchProblemName": "Contextual Language Representation & Masked Pre-training",
    "statements": [
      {
        "id": "st-1810-04805-1",
        "paperId": "paper-1810-04805",
        "subject": "BERT: Pre-training of Deep Bidirectional",
        "predicate": "proposed_by",
        "object": "Jacob Devlin et al. (2018)"
      },
      {
        "id": "st-1810-04805-2",
        "paperId": "paper-1810-04805",
        "subject": "BERT: Pre-training of Deep Bidirectional",
        "predicate": "addresses_problem",
        "object": "Contextual Language Representation & Masked Pre-training"
      },
      {
        "id": "st-1810-04805-3",
        "paperId": "paper-1810-04805",
        "subject": "BERT: Pre-training of Deep Bidirectional",
        "predicate": "source_archive",
        "object": "arXiv Preprint (1810.04805)"
      }
    ]
  },
  {
    "id": "paper-2005-14165",
    "title": "Language Models are Few-Shot Learners",
    "abstract": "Recent work has demonstrated substantial gains on many NLP tasks and benchmarks by pre-training on a large corpus of text followed by fine-tuning on a specific task. While typically task-agnostic in architecture, this method still requires task-specific fine-tuning datasets of thousands or tens of thousands of examples. By contrast, humans can generally perform a new language task from only a few examples or from simple instructions - something which current NLP systems still largely struggle to do. Here we show that scaling up language models greatly improves task-agnostic, few-shot performance, sometimes even reaching competitiveness with prior state-of-the-art fine-tuning approaches. Specifically, we train GPT-3, an autoregressive language model with 175 billion parameters, 10x more than any previous non-sparse language model, and test its performance in the few-shot setting. For all tasks, GPT-3 is applied without any gradient updates or fine-tuning, with tasks and few-shot demonstrations specified purely via text interaction with the model. GPT-3 achieves strong performance on many NLP datasets, including translation, question-answering, and cloze tasks, as well as several tasks that require on-the-fly reasoning or domain adaptation, such as unscrambling words, using a novel word in a sentence, or performing 3-digit arithmetic. At the same time, we also identify some datasets where GPT-3's few-shot learning still struggles, as well as some datasets where GPT-3 faces methodological issues related to training on large web corpora. Finally, we find that GPT-3 can generate samples of news articles which human evaluators have difficulty distinguishing from articles written by humans. We discuss broader societal impacts of this finding and of GPT-3 in general.",
    "doi": "10.48550/arXiv.2005.14165",
    "year": 2020,
    "venue": "arXiv 2020",
    "pdfUrl": "https://arxiv.org/pdf/2005.14165.pdf",
    "openAccess": true,
    "authors": [
      {
        "id": "auth-2005-14165-1",
        "name": "Tom B. Brown",
        "department": "AI Research Lab"
      },
      {
        "id": "auth-2005-14165-2",
        "name": "Benjamin Mann",
        "department": "AI Research Lab"
      },
      {
        "id": "auth-2005-14165-3",
        "name": "Nick Ryder",
        "department": "AI Research Lab"
      },
      {
        "id": "auth-2005-14165-4",
        "name": "Melanie Subbiah",
        "department": "AI Research Lab"
      },
      {
        "id": "auth-2005-14165-5",
        "name": "Jared Kaplan",
        "department": "AI Research Lab"
      },
      {
        "id": "auth-2005-14165-6",
        "name": "Prafulla Dhariwal",
        "department": "AI Research Lab"
      }
    ],
    "researchProblemId": "prob-1",
    "researchProblemName": "Sequence-to-Sequence Modeling & Neural Machine Translation",
    "statements": [
      {
        "id": "st-2005-14165-1",
        "paperId": "paper-2005-14165",
        "subject": "Language Models are Few-Shot Learners",
        "predicate": "proposed_by",
        "object": "Tom B. Brown et al. (2020)"
      },
      {
        "id": "st-2005-14165-2",
        "paperId": "paper-2005-14165",
        "subject": "Language Models are Few-Shot Learners",
        "predicate": "addresses_problem",
        "object": "Sequence-to-Sequence Modeling & Neural Machine Translation"
      },
      {
        "id": "st-2005-14165-3",
        "paperId": "paper-2005-14165",
        "subject": "Language Models are Few-Shot Learners",
        "predicate": "source_archive",
        "object": "arXiv Preprint (2005.14165)"
      }
    ]
  },
  {
    "id": "paper-2302-13971",
    "title": "LLaMA: Open and Efficient Foundation Language Models",
    "abstract": "We introduce LLaMA, a collection of foundation language models ranging from 7B to 65B parameters. We train our models on trillions of tokens, and show that it is possible to train state-of-the-art models using publicly available datasets exclusively, without resorting to proprietary and inaccessible datasets. In particular, LLaMA-13B outperforms GPT-3 (175B) on most benchmarks, and LLaMA-65B is competitive with the best models, Chinchilla-70B and PaLM-540B. We release all our models to the research community.",
    "doi": "10.48550/arXiv.2302.13971",
    "year": 2023,
    "venue": "arXiv 2023",
    "pdfUrl": "https://arxiv.org/pdf/2302.13971.pdf",
    "openAccess": true,
    "authors": [
      {
        "id": "auth-2302-13971-1",
        "name": "Hugo Touvron",
        "department": "AI Research Lab"
      },
      {
        "id": "auth-2302-13971-2",
        "name": "Thibaut Lavril",
        "department": "AI Research Lab"
      },
      {
        "id": "auth-2302-13971-3",
        "name": "Gautier Izacard",
        "department": "AI Research Lab"
      },
      {
        "id": "auth-2302-13971-4",
        "name": "Xavier Martinet",
        "department": "AI Research Lab"
      },
      {
        "id": "auth-2302-13971-5",
        "name": "Marie-Anne Lachaux",
        "department": "AI Research Lab"
      },
      {
        "id": "auth-2302-13971-6",
        "name": "Timoth\u00e9e Lacroix",
        "department": "AI Research Lab"
      }
    ],
    "researchProblemId": "prob-3",
    "researchProblemName": "Efficient Foundation Language Models & Scaling Laws",
    "statements": [
      {
        "id": "st-2302-13971-1",
        "paperId": "paper-2302-13971",
        "subject": "LLaMA: Open and Efficient Foundation Lan",
        "predicate": "proposed_by",
        "object": "Hugo Touvron et al. (2023)"
      },
      {
        "id": "st-2302-13971-2",
        "paperId": "paper-2302-13971",
        "subject": "LLaMA: Open and Efficient Foundation Lan",
        "predicate": "addresses_problem",
        "object": "Efficient Foundation Language Models & Scaling Laws"
      },
      {
        "id": "st-2302-13971-3",
        "paperId": "paper-2302-13971",
        "subject": "LLaMA: Open and Efficient Foundation Lan",
        "predicate": "source_archive",
        "object": "arXiv Preprint (2302.13971)"
      }
    ]
  },
  {
    "id": "paper-1512-03385",
    "title": "Deep Residual Learning for Image Recognition",
    "abstract": "Deeper neural networks are more difficult to train. We present a residual learning framework to ease the training of networks that are substantially deeper than those used previously. We explicitly reformulate the layers as learning residual functions with reference to the layer inputs, instead of learning unreferenced functions. We provide comprehensive empirical evidence showing that these residual networks are easier to optimize, and can gain accuracy from considerably increased depth. On the ImageNet dataset we evaluate residual nets with a depth of up to 152 layers---8x deeper than VGG nets but still having lower complexity. An ensemble of these residual nets achieves 3.57% error on the ImageNet test set. This result won the 1st place on the ILSVRC 2015 classification task. We also present analysis on CIFAR-10 with 100 and 1000 layers. The depth of representations is of central importance for many visual recognition tasks. Solely due to our extremely deep representations, we obtain a 28% relative improvement on the COCO object detection dataset. Deep residual nets are foundations of our submissions to ILSVRC & COCO 2015 competitions, where we also won the 1st places on the tasks of ImageNet detection, ImageNet localization, COCO detection, and COCO segmentation.",
    "doi": "10.48550/arXiv.1512.03385",
    "year": 2015,
    "venue": "arXiv 2015",
    "pdfUrl": "https://arxiv.org/pdf/1512.03385.pdf",
    "openAccess": true,
    "authors": [
      {
        "id": "auth-1512-03385-1",
        "name": "Kaiming He",
        "department": "AI Research Lab"
      },
      {
        "id": "auth-1512-03385-2",
        "name": "Xiangyu Zhang",
        "department": "AI Research Lab"
      },
      {
        "id": "auth-1512-03385-3",
        "name": "Shaoqing Ren",
        "department": "AI Research Lab"
      },
      {
        "id": "auth-1512-03385-4",
        "name": "Jian Sun",
        "department": "AI Research Lab"
      }
    ],
    "researchProblemId": "prob-4",
    "researchProblemName": "Deep Residual Learning & Image Classification",
    "statements": [
      {
        "id": "st-1512-03385-1",
        "paperId": "paper-1512-03385",
        "subject": "Deep Residual Learning for Image Recogni",
        "predicate": "proposed_by",
        "object": "Kaiming He et al. (2015)"
      },
      {
        "id": "st-1512-03385-2",
        "paperId": "paper-1512-03385",
        "subject": "Deep Residual Learning for Image Recogni",
        "predicate": "addresses_problem",
        "object": "Deep Residual Learning & Image Classification"
      },
      {
        "id": "st-1512-03385-3",
        "paperId": "paper-1512-03385",
        "subject": "Deep Residual Learning for Image Recogni",
        "predicate": "source_archive",
        "object": "arXiv Preprint (1512.03385)"
      }
    ]
  },
  {
    "id": "paper-2103-00020",
    "title": "Learning Transferable Visual Models From Natural Language Supervision",
    "abstract": "State-of-the-art computer vision systems are trained to predict a fixed set of predetermined object categories. This restricted form of supervision limits their generality and usability since additional labeled data is needed to specify any other visual concept. Learning directly from raw text about images is a promising alternative which leverages a much broader source of supervision. We demonstrate that the simple pre-training task of predicting which caption goes with which image is an efficient and scalable way to learn SOTA image representations from scratch on a dataset of 400 million (image, text) pairs collected from the internet. After pre-training, natural language is used to reference learned visual concepts (or describe new ones) enabling zero-shot transfer of the model to downstream tasks. We study the performance of this approach by benchmarking on over 30 different existing computer vision datasets, spanning tasks such as OCR, action recognition in videos, geo-localization, and many types of fine-grained object classification. The model transfers non-trivially to most tasks and is often competitive with a fully supervised baseline without the need for any dataset specific training. For instance, we match the accuracy of the original ResNet-50 on ImageNet zero-shot without needing to use any of the 1.28 million training examples it was trained on. We release our code and pre-trained model weights at https://github.com/OpenAI/CLIP.",
    "doi": "10.48550/arXiv.2103.00020",
    "year": 2021,
    "venue": "arXiv 2021",
    "pdfUrl": "https://arxiv.org/pdf/2103.00020.pdf",
    "openAccess": true,
    "authors": [
      {
        "id": "auth-2103-00020-1",
        "name": "Alec Radford",
        "department": "AI Research Lab"
      },
      {
        "id": "auth-2103-00020-2",
        "name": "Jong Wook Kim",
        "department": "AI Research Lab"
      },
      {
        "id": "auth-2103-00020-3",
        "name": "Chris Hallacy",
        "department": "AI Research Lab"
      },
      {
        "id": "auth-2103-00020-4",
        "name": "Aditya Ramesh",
        "department": "AI Research Lab"
      },
      {
        "id": "auth-2103-00020-5",
        "name": "Gabriel Goh",
        "department": "AI Research Lab"
      },
      {
        "id": "auth-2103-00020-6",
        "name": "Sandhini Agarwal",
        "department": "AI Research Lab"
      }
    ],
    "researchProblemId": "prob-4",
    "researchProblemName": "Deep Residual Learning & Image Classification",
    "statements": [
      {
        "id": "st-2103-00020-1",
        "paperId": "paper-2103-00020",
        "subject": "Learning Transferable Visual Models From",
        "predicate": "proposed_by",
        "object": "Alec Radford et al. (2021)"
      },
      {
        "id": "st-2103-00020-2",
        "paperId": "paper-2103-00020",
        "subject": "Learning Transferable Visual Models From",
        "predicate": "addresses_problem",
        "object": "Deep Residual Learning & Image Classification"
      },
      {
        "id": "st-2103-00020-3",
        "paperId": "paper-2103-00020",
        "subject": "Learning Transferable Visual Models From",
        "predicate": "source_archive",
        "object": "arXiv Preprint (2103.00020)"
      }
    ]
  },
  {
    "id": "paper-2010-11929",
    "title": "An Image is Worth 16x16 Words: Transformers for Image Recognition at Scale",
    "abstract": "While the Transformer architecture has become the de-facto standard for natural language processing tasks, its applications to computer vision remain limited. In vision, attention is either applied in conjunction with convolutional networks, or used to replace certain components of convolutional networks while keeping their overall structure in place. We show that this reliance on CNNs is not necessary and a pure transformer applied directly to sequences of image patches can perform very well on image classification tasks. When pre-trained on large amounts of data and transferred to multiple mid-sized or small image recognition benchmarks (ImageNet, CIFAR-100, VTAB, etc.), Vision Transformer (ViT) attains excellent results compared to state-of-the-art convolutional networks while requiring substantially fewer computational resources to train.",
    "doi": "10.48550/arXiv.2010.11929",
    "year": 2020,
    "venue": "arXiv 2020",
    "pdfUrl": "https://arxiv.org/pdf/2010.11929.pdf",
    "openAccess": true,
    "authors": [
      {
        "id": "auth-2010-11929-1",
        "name": "Alexey Dosovitskiy",
        "department": "AI Research Lab"
      },
      {
        "id": "auth-2010-11929-2",
        "name": "Lucas Beyer",
        "department": "AI Research Lab"
      },
      {
        "id": "auth-2010-11929-3",
        "name": "Alexander Kolesnikov",
        "department": "AI Research Lab"
      },
      {
        "id": "auth-2010-11929-4",
        "name": "Dirk Weissenborn",
        "department": "AI Research Lab"
      },
      {
        "id": "auth-2010-11929-5",
        "name": "Xiaohua Zhai",
        "department": "AI Research Lab"
      },
      {
        "id": "auth-2010-11929-6",
        "name": "Thomas Unterthiner",
        "department": "AI Research Lab"
      }
    ],
    "researchProblemId": "prob-4",
    "researchProblemName": "Deep Residual Learning & Image Classification",
    "statements": [
      {
        "id": "st-2010-11929-1",
        "paperId": "paper-2010-11929",
        "subject": "An Image is Worth 16x16 Words: Transform",
        "predicate": "proposed_by",
        "object": "Alexey Dosovitskiy et al. (2020)"
      },
      {
        "id": "st-2010-11929-2",
        "paperId": "paper-2010-11929",
        "subject": "An Image is Worth 16x16 Words: Transform",
        "predicate": "addresses_problem",
        "object": "Deep Residual Learning & Image Classification"
      },
      {
        "id": "st-2010-11929-3",
        "paperId": "paper-2010-11929",
        "subject": "An Image is Worth 16x16 Words: Transform",
        "predicate": "source_archive",
        "object": "arXiv Preprint (2010.11929)"
      }
    ]
  },
  {
    "id": "paper-2112-10752",
    "title": "High-Resolution Image Synthesis with Latent Diffusion Models",
    "abstract": "By decomposing the image formation process into a sequential application of denoising autoencoders, diffusion models (DMs) achieve state-of-the-art synthesis results on image data and beyond. Additionally, their formulation allows for a guiding mechanism to control the image generation process without retraining. However, since these models typically operate directly in pixel space, optimization of powerful DMs often consumes hundreds of GPU days and inference is expensive due to sequential evaluations. To enable DM training on limited computational resources while retaining their quality and flexibility, we apply them in the latent space of powerful pretrained autoencoders. In contrast to previous work, training diffusion models on such a representation allows for the first time to reach a near-optimal point between complexity reduction and detail preservation, greatly boosting visual fidelity. By introducing cross-attention layers into the model architecture, we turn diffusion models into powerful and flexible generators for general conditioning inputs such as text or bounding boxes and high-resolution synthesis becomes possible in a convolutional manner. Our latent diffusion models (LDMs) achieve a new state of the art for image inpainting and highly competitive performance on various tasks, including unconditional image generation, semantic scene synthesis, and super-resolution, while significantly reducing computational requirements compared to pixel-based DMs. Code is available at https://github.com/CompVis/latent-diffusion .",
    "doi": "10.48550/arXiv.2112.10752",
    "year": 2021,
    "venue": "arXiv 2021",
    "pdfUrl": "https://arxiv.org/pdf/2112.10752.pdf",
    "openAccess": true,
    "authors": [
      {
        "id": "auth-2112-10752-1",
        "name": "Robin Rombach",
        "department": "AI Research Lab"
      },
      {
        "id": "auth-2112-10752-2",
        "name": "Andreas Blattmann",
        "department": "AI Research Lab"
      },
      {
        "id": "auth-2112-10752-3",
        "name": "Dominik Lorenz",
        "department": "AI Research Lab"
      },
      {
        "id": "auth-2112-10752-4",
        "name": "Patrick Esser",
        "department": "AI Research Lab"
      },
      {
        "id": "auth-2112-10752-5",
        "name": "Bj\u00f6rn Ommer",
        "department": "AI Research Lab"
      }
    ],
    "researchProblemId": "prob-4",
    "researchProblemName": "Deep Residual Learning & Image Classification",
    "statements": [
      {
        "id": "st-2112-10752-1",
        "paperId": "paper-2112-10752",
        "subject": "High-Resolution Image Synthesis with Lat",
        "predicate": "proposed_by",
        "object": "Robin Rombach et al. (2021)"
      },
      {
        "id": "st-2112-10752-2",
        "paperId": "paper-2112-10752",
        "subject": "High-Resolution Image Synthesis with Lat",
        "predicate": "addresses_problem",
        "object": "Deep Residual Learning & Image Classification"
      },
      {
        "id": "st-2112-10752-3",
        "paperId": "paper-2112-10752",
        "subject": "High-Resolution Image Synthesis with Lat",
        "predicate": "source_archive",
        "object": "arXiv Preprint (2112.10752)"
      }
    ]
  },
  {
    "id": "paper-2307-09288",
    "title": "Llama 2: Open Foundation and Fine-Tuned Chat Models",
    "abstract": "In this work, we develop and release Llama 2, a collection of pretrained and fine-tuned large language models (LLMs) ranging in scale from 7 billion to 70 billion parameters. Our fine-tuned LLMs, called Llama 2-Chat, are optimized for dialogue use cases. Our models outperform open-source chat models on most benchmarks we tested, and based on our human evaluations for helpfulness and safety, may be a suitable substitute for closed-source models. We provide a detailed description of our approach to fine-tuning and safety improvements of Llama 2-Chat in order to enable the community to build on our work and contribute to the responsible development of LLMs.",
    "doi": "10.48550/arXiv.2307.09288",
    "year": 2023,
    "venue": "arXiv 2023",
    "pdfUrl": "https://arxiv.org/pdf/2307.09288.pdf",
    "openAccess": true,
    "authors": [
      {
        "id": "auth-2307-09288-1",
        "name": "Hugo Touvron",
        "department": "AI Research Lab"
      },
      {
        "id": "auth-2307-09288-2",
        "name": "Louis Martin",
        "department": "AI Research Lab"
      },
      {
        "id": "auth-2307-09288-3",
        "name": "Kevin Stone",
        "department": "AI Research Lab"
      },
      {
        "id": "auth-2307-09288-4",
        "name": "Peter Albert",
        "department": "AI Research Lab"
      },
      {
        "id": "auth-2307-09288-5",
        "name": "Amjad Almahairi",
        "department": "AI Research Lab"
      },
      {
        "id": "auth-2307-09288-6",
        "name": "Yasmine Babaei",
        "department": "AI Research Lab"
      }
    ],
    "researchProblemId": "prob-3",
    "researchProblemName": "Efficient Foundation Language Models & Scaling Laws",
    "statements": [
      {
        "id": "st-2307-09288-1",
        "paperId": "paper-2307-09288",
        "subject": "Llama 2: Open Foundation and Fine-Tuned ",
        "predicate": "proposed_by",
        "object": "Hugo Touvron et al. (2023)"
      },
      {
        "id": "st-2307-09288-2",
        "paperId": "paper-2307-09288",
        "subject": "Llama 2: Open Foundation and Fine-Tuned ",
        "predicate": "addresses_problem",
        "object": "Efficient Foundation Language Models & Scaling Laws"
      },
      {
        "id": "st-2307-09288-3",
        "paperId": "paper-2307-09288",
        "subject": "Llama 2: Open Foundation and Fine-Tuned ",
        "predicate": "source_archive",
        "object": "arXiv Preprint (2307.09288)"
      }
    ]
  },
  {
    "id": "paper-2112-09332",
    "title": "WebGPT: Browser-assisted question-answering with human feedback",
    "abstract": "We fine-tune GPT-3 to answer long-form questions using a text-based web-browsing environment, which allows the model to search and navigate the web. By setting up the task so that it can be performed by humans, we are able to train models on the task using imitation learning, and then optimize answer quality with human feedback. To make human evaluation of factual accuracy easier, models must collect references while browsing in support of their answers. We train and evaluate our models on ELI5, a dataset of questions asked by Reddit users. Our best model is obtained by fine-tuning GPT-3 using behavior cloning, and then performing rejection sampling against a reward model trained to predict human preferences. This model's answers are preferred by humans 56% of the time to those of our human demonstrators, and 69% of the time to the highest-voted answer from Reddit.",
    "doi": "10.48550/arXiv.2112.09332",
    "year": 2021,
    "venue": "arXiv 2021",
    "pdfUrl": "https://arxiv.org/pdf/2112.09332.pdf",
    "openAccess": true,
    "authors": [
      {
        "id": "auth-2112-09332-1",
        "name": "Reiichiro Nakano",
        "department": "AI Research Lab"
      },
      {
        "id": "auth-2112-09332-2",
        "name": "Jacob Hilton",
        "department": "AI Research Lab"
      },
      {
        "id": "auth-2112-09332-3",
        "name": "Suchir Balaji",
        "department": "AI Research Lab"
      },
      {
        "id": "auth-2112-09332-4",
        "name": "Jeff Wu",
        "department": "AI Research Lab"
      },
      {
        "id": "auth-2112-09332-5",
        "name": "Long Ouyang",
        "department": "AI Research Lab"
      },
      {
        "id": "auth-2112-09332-6",
        "name": "Christina Kim",
        "department": "AI Research Lab"
      }
    ],
    "researchProblemId": "prob-3",
    "researchProblemName": "Efficient Foundation Language Models & Scaling Laws",
    "statements": [
      {
        "id": "st-2112-09332-1",
        "paperId": "paper-2112-09332",
        "subject": "WebGPT: Browser-assisted question-answer",
        "predicate": "proposed_by",
        "object": "Reiichiro Nakano et al. (2021)"
      },
      {
        "id": "st-2112-09332-2",
        "paperId": "paper-2112-09332",
        "subject": "WebGPT: Browser-assisted question-answer",
        "predicate": "addresses_problem",
        "object": "Efficient Foundation Language Models & Scaling Laws"
      },
      {
        "id": "st-2112-09332-3",
        "paperId": "paper-2112-09332",
        "subject": "WebGPT: Browser-assisted question-answer",
        "predicate": "source_archive",
        "object": "arXiv Preprint (2112.09332)"
      }
    ]
  },
  {
    "id": "paper-2305-18290",
    "title": "Direct Preference Optimization: Your Language Model is Secretly a Reward Model",
    "abstract": "While large-scale unsupervised language models (LMs) learn broad world knowledge and some reasoning skills, achieving precise control of their behavior is difficult due to the completely unsupervised nature of their training. Existing methods for gaining such steerability collect human labels of the relative quality of model generations and fine-tune the unsupervised LM to align with these preferences, often with reinforcement learning from human feedback (RLHF). However, RLHF is a complex and often unstable procedure, first fitting a reward model that reflects the human preferences, and then fine-tuning the large unsupervised LM using reinforcement learning to maximize this estimated reward without drifting too far from the original model. In this paper we introduce a new parameterization of the reward model in RLHF that enables extraction of the corresponding optimal policy in closed form, allowing us to solve the standard RLHF problem with only a simple classification loss. The resulting algorithm, which we call Direct Preference Optimization (DPO), is stable, performant, and computationally lightweight, eliminating the need for sampling from the LM during fine-tuning or performing significant hyperparameter tuning. Our experiments show that DPO can fine-tune LMs to align with human preferences as well as or better than existing methods. Notably, fine-tuning with DPO exceeds PPO-based RLHF in ability to control sentiment of generations, and matches or improves response quality in summarization and single-turn dialogue while being substantially simpler to implement and train.",
    "doi": "10.48550/arXiv.2305.18290",
    "year": 2023,
    "venue": "arXiv 2023",
    "pdfUrl": "https://arxiv.org/pdf/2305.18290.pdf",
    "openAccess": true,
    "authors": [
      {
        "id": "auth-2305-18290-1",
        "name": "Rafael Rafailov",
        "department": "AI Research Lab"
      },
      {
        "id": "auth-2305-18290-2",
        "name": "Archit Sharma",
        "department": "AI Research Lab"
      },
      {
        "id": "auth-2305-18290-3",
        "name": "Eric Mitchell",
        "department": "AI Research Lab"
      },
      {
        "id": "auth-2305-18290-4",
        "name": "Stefano Ermon",
        "department": "AI Research Lab"
      },
      {
        "id": "auth-2305-18290-5",
        "name": "Christopher D. Manning",
        "department": "AI Research Lab"
      },
      {
        "id": "auth-2305-18290-6",
        "name": "Chelsea Finn",
        "department": "AI Research Lab"
      }
    ],
    "researchProblemId": "prob-3",
    "researchProblemName": "Efficient Foundation Language Models & Scaling Laws",
    "statements": [
      {
        "id": "st-2305-18290-1",
        "paperId": "paper-2305-18290",
        "subject": "Direct Preference Optimization: Your Lan",
        "predicate": "proposed_by",
        "object": "Rafael Rafailov et al. (2023)"
      },
      {
        "id": "st-2305-18290-2",
        "paperId": "paper-2305-18290",
        "subject": "Direct Preference Optimization: Your Lan",
        "predicate": "addresses_problem",
        "object": "Efficient Foundation Language Models & Scaling Laws"
      },
      {
        "id": "st-2305-18290-3",
        "paperId": "paper-2305-18290",
        "subject": "Direct Preference Optimization: Your Lan",
        "predicate": "source_archive",
        "object": "arXiv Preprint (2305.18290)"
      }
    ]
  },
  {
    "id": "paper-1707-06347",
    "title": "Proximal Policy Optimization Algorithms",
    "abstract": "We propose a new family of policy gradient methods for reinforcement learning, which alternate between sampling data through interaction with the environment, and optimizing a \"surrogate\" objective function using stochastic gradient ascent. Whereas standard policy gradient methods perform one gradient update per data sample, we propose a novel objective function that enables multiple epochs of minibatch updates. The new methods, which we call proximal policy optimization (PPO), have some of the benefits of trust region policy optimization (TRPO), but they are much simpler to implement, more general, and have better sample complexity (empirically). Our experiments test PPO on a collection of benchmark tasks, including simulated robotic locomotion and Atari game playing, and we show that PPO outperforms other online policy gradient methods, and overall strikes a favorable balance between sample complexity, simplicity, and wall-time.",
    "doi": "10.48550/arXiv.1707.06347",
    "year": 2017,
    "venue": "arXiv 2017",
    "pdfUrl": "https://arxiv.org/pdf/1707.06347.pdf",
    "openAccess": true,
    "authors": [
      {
        "id": "auth-1707-06347-1",
        "name": "John Schulman",
        "department": "AI Research Lab"
      },
      {
        "id": "auth-1707-06347-2",
        "name": "Filip Wolski",
        "department": "AI Research Lab"
      },
      {
        "id": "auth-1707-06347-3",
        "name": "Prafulla Dhariwal",
        "department": "AI Research Lab"
      },
      {
        "id": "auth-1707-06347-4",
        "name": "Alec Radford",
        "department": "AI Research Lab"
      },
      {
        "id": "auth-1707-06347-5",
        "name": "Oleg Klimov",
        "department": "AI Research Lab"
      }
    ],
    "researchProblemId": "prob-3",
    "researchProblemName": "Efficient Foundation Language Models & Scaling Laws",
    "statements": [
      {
        "id": "st-1707-06347-1",
        "paperId": "paper-1707-06347",
        "subject": "Proximal Policy Optimization Algorithms",
        "predicate": "proposed_by",
        "object": "John Schulman et al. (2017)"
      },
      {
        "id": "st-1707-06347-2",
        "paperId": "paper-1707-06347",
        "subject": "Proximal Policy Optimization Algorithms",
        "predicate": "addresses_problem",
        "object": "Efficient Foundation Language Models & Scaling Laws"
      },
      {
        "id": "st-1707-06347-3",
        "paperId": "paper-1707-06347",
        "subject": "Proximal Policy Optimization Algorithms",
        "predicate": "source_archive",
        "object": "arXiv Preprint (1707.06347)"
      }
    ]
  },
  {
    "id": "paper-1406-2661",
    "title": "Generative Adversarial Networks",
    "abstract": "We propose a new framework for estimating generative models via an adversarial process, in which we simultaneously train two models: a generative model G that captures the data distribution, and a discriminative model D that estimates the probability that a sample came from the training data rather than G. The training procedure for G is to maximize the probability of D making a mistake. This framework corresponds to a minimax two-player game. In the space of arbitrary functions G and D, a unique solution exists, with G recovering the training data distribution and D equal to 1/2 everywhere. In the case where G and D are defined by multilayer perceptrons, the entire system can be trained with backpropagation. There is no need for any Markov chains or unrolled approximate inference networks during either training or generation of samples. Experiments demonstrate the potential of the framework through qualitative and quantitative evaluation of the generated samples.",
    "doi": "10.48550/arXiv.1406.2661",
    "year": 2014,
    "venue": "arXiv 2014",
    "pdfUrl": "https://arxiv.org/pdf/1406.2661.pdf",
    "openAccess": true,
    "authors": [
      {
        "id": "auth-1406-2661-1",
        "name": "Ian J. Goodfellow",
        "department": "AI Research Lab"
      },
      {
        "id": "auth-1406-2661-2",
        "name": "Jean Pouget-Abadie",
        "department": "AI Research Lab"
      },
      {
        "id": "auth-1406-2661-3",
        "name": "Mehdi Mirza",
        "department": "AI Research Lab"
      },
      {
        "id": "auth-1406-2661-4",
        "name": "Bing Xu",
        "department": "AI Research Lab"
      },
      {
        "id": "auth-1406-2661-5",
        "name": "David Warde-Farley",
        "department": "AI Research Lab"
      },
      {
        "id": "auth-1406-2661-6",
        "name": "Sherjil Ozair",
        "department": "AI Research Lab"
      }
    ],
    "researchProblemId": "prob-1",
    "researchProblemName": "Sequence-to-Sequence Modeling & Neural Machine Translation",
    "statements": [
      {
        "id": "st-1406-2661-1",
        "paperId": "paper-1406-2661",
        "subject": "Generative Adversarial Networks",
        "predicate": "proposed_by",
        "object": "Ian J. Goodfellow et al. (2014)"
      },
      {
        "id": "st-1406-2661-2",
        "paperId": "paper-1406-2661",
        "subject": "Generative Adversarial Networks",
        "predicate": "addresses_problem",
        "object": "Sequence-to-Sequence Modeling & Neural Machine Translation"
      },
      {
        "id": "st-1406-2661-3",
        "paperId": "paper-1406-2661",
        "subject": "Generative Adversarial Networks",
        "predicate": "source_archive",
        "object": "arXiv Preprint (1406.2661)"
      }
    ]
  },
  {
    "id": "paper-2003-08934",
    "title": "NeRF: Representing Scenes as Neural Radiance Fields for View Synthesis",
    "abstract": "We present a method that achieves state-of-the-art results for synthesizing novel views of complex scenes by optimizing an underlying continuous volumetric scene function using a sparse set of input views. Our algorithm represents a scene using a fully-connected (non-convolutional) deep network, whose input is a single continuous 5D coordinate (spatial location $(x,y,z)$ and viewing direction $(\u03b8, \u03c6)$) and whose output is the volume density and view-dependent emitted radiance at that spatial location. We synthesize views by querying 5D coordinates along camera rays and use classic volume rendering techniques to project the output colors and densities into an image. Because volume rendering is naturally differentiable, the only input required to optimize our representation is a set of images with known camera poses. We describe how to effectively optimize neural radiance fields to render photorealistic novel views of scenes with complicated geometry and appearance, and demonstrate results that outperform prior work on neural rendering and view synthesis. View synthesis results are best viewed as videos, so we urge readers to view our supplementary video for convincing comparisons.",
    "doi": "10.48550/arXiv.2003.08934",
    "year": 2020,
    "venue": "arXiv 2020",
    "pdfUrl": "https://arxiv.org/pdf/2003.08934.pdf",
    "openAccess": true,
    "authors": [
      {
        "id": "auth-2003-08934-1",
        "name": "Ben Mildenhall",
        "department": "AI Research Lab"
      },
      {
        "id": "auth-2003-08934-2",
        "name": "Pratul P. Srinivasan",
        "department": "AI Research Lab"
      },
      {
        "id": "auth-2003-08934-3",
        "name": "Matthew Tancik",
        "department": "AI Research Lab"
      },
      {
        "id": "auth-2003-08934-4",
        "name": "Jonathan T. Barron",
        "department": "AI Research Lab"
      },
      {
        "id": "auth-2003-08934-5",
        "name": "Ravi Ramamoorthi",
        "department": "AI Research Lab"
      },
      {
        "id": "auth-2003-08934-6",
        "name": "Ren Ng",
        "department": "AI Research Lab"
      }
    ],
    "researchProblemId": "prob-4",
    "researchProblemName": "Deep Residual Learning & Image Classification",
    "statements": [
      {
        "id": "st-2003-08934-1",
        "paperId": "paper-2003-08934",
        "subject": "NeRF: Representing Scenes as Neural Radi",
        "predicate": "proposed_by",
        "object": "Ben Mildenhall et al. (2020)"
      },
      {
        "id": "st-2003-08934-2",
        "paperId": "paper-2003-08934",
        "subject": "NeRF: Representing Scenes as Neural Radi",
        "predicate": "addresses_problem",
        "object": "Deep Residual Learning & Image Classification"
      },
      {
        "id": "st-2003-08934-3",
        "paperId": "paper-2003-08934",
        "subject": "NeRF: Representing Scenes as Neural Radi",
        "predicate": "source_archive",
        "object": "arXiv Preprint (2003.08934)"
      }
    ]
  },
  {
    "id": "paper-2304-02643",
    "title": "Segment Anything",
    "abstract": "We introduce the Segment Anything (SA) project: a new task, model, and dataset for image segmentation. Using our efficient model in a data collection loop, we built the largest segmentation dataset to date (by far), with over 1 billion masks on 11M licensed and privacy respecting images. The model is designed and trained to be promptable, so it can transfer zero-shot to new image distributions and tasks. We evaluate its capabilities on numerous tasks and find that its zero-shot performance is impressive -- often competitive with or even superior to prior fully supervised results. We are releasing the Segment Anything Model (SAM) and corresponding dataset (SA-1B) of 1B masks and 11M images at https://segment-anything.com to foster research into foundation models for computer vision.",
    "doi": "10.48550/arXiv.2304.02643",
    "year": 2023,
    "venue": "arXiv 2023",
    "pdfUrl": "https://arxiv.org/pdf/2304.02643.pdf",
    "openAccess": true,
    "authors": [
      {
        "id": "auth-2304-02643-1",
        "name": "Alexander Kirillov",
        "department": "AI Research Lab"
      },
      {
        "id": "auth-2304-02643-2",
        "name": "Eric Mintun",
        "department": "AI Research Lab"
      },
      {
        "id": "auth-2304-02643-3",
        "name": "Nikhila Ravi",
        "department": "AI Research Lab"
      },
      {
        "id": "auth-2304-02643-4",
        "name": "Hanzi Mao",
        "department": "AI Research Lab"
      },
      {
        "id": "auth-2304-02643-5",
        "name": "Chloe Rolland",
        "department": "AI Research Lab"
      },
      {
        "id": "auth-2304-02643-6",
        "name": "Laura Gustafson",
        "department": "AI Research Lab"
      }
    ],
    "researchProblemId": "prob-4",
    "researchProblemName": "Deep Residual Learning & Image Classification",
    "statements": [
      {
        "id": "st-2304-02643-1",
        "paperId": "paper-2304-02643",
        "subject": "Segment Anything",
        "predicate": "proposed_by",
        "object": "Alexander Kirillov et al. (2023)"
      },
      {
        "id": "st-2304-02643-2",
        "paperId": "paper-2304-02643",
        "subject": "Segment Anything",
        "predicate": "addresses_problem",
        "object": "Deep Residual Learning & Image Classification"
      },
      {
        "id": "st-2304-02643-3",
        "paperId": "paper-2304-02643",
        "subject": "Segment Anything",
        "predicate": "source_archive",
        "object": "arXiv Preprint (2304.02643)"
      }
    ]
  },
  {
    "id": "paper-2203-02155",
    "title": "Training language models to follow instructions with human feedback",
    "abstract": "Making language models bigger does not inherently make them better at following a user's intent. For example, large language models can generate outputs that are untruthful, toxic, or simply not helpful to the user. In other words, these models are not aligned with their users. In this paper, we show an avenue for aligning language models with user intent on a wide range of tasks by fine-tuning with human feedback. Starting with a set of labeler-written prompts and prompts submitted through the OpenAI API, we collect a dataset of labeler demonstrations of the desired model behavior, which we use to fine-tune GPT-3 using supervised learning. We then collect a dataset of rankings of model outputs, which we use to further fine-tune this supervised model using reinforcement learning from human feedback. We call the resulting models InstructGPT. In human evaluations on our prompt distribution, outputs from the 1.3B parameter InstructGPT model are preferred to outputs from the 175B GPT-3, despite having 100x fewer parameters. Moreover, InstructGPT models show improvements in truthfulness and reductions in toxic output generation while having minimal performance regressions on public NLP datasets. Even though InstructGPT still makes simple mistakes, our results show that fine-tuning with human feedback is a promising direction for aligning language models with human intent.",
    "doi": "10.48550/arXiv.2203.02155",
    "year": 2022,
    "venue": "arXiv 2022",
    "pdfUrl": "https://arxiv.org/pdf/2203.02155.pdf",
    "openAccess": true,
    "authors": [
      {
        "id": "auth-2203-02155-1",
        "name": "Long Ouyang",
        "department": "AI Research Lab"
      },
      {
        "id": "auth-2203-02155-2",
        "name": "Jeff Wu",
        "department": "AI Research Lab"
      },
      {
        "id": "auth-2203-02155-3",
        "name": "Xu Jiang",
        "department": "AI Research Lab"
      },
      {
        "id": "auth-2203-02155-4",
        "name": "Diogo Almeida",
        "department": "AI Research Lab"
      },
      {
        "id": "auth-2203-02155-5",
        "name": "Carroll L. Wainwright",
        "department": "AI Research Lab"
      },
      {
        "id": "auth-2203-02155-6",
        "name": "Pamela Mishkin",
        "department": "AI Research Lab"
      }
    ],
    "researchProblemId": "prob-3",
    "researchProblemName": "Efficient Foundation Language Models & Scaling Laws",
    "statements": [
      {
        "id": "st-2203-02155-1",
        "paperId": "paper-2203-02155",
        "subject": "Training language models to follow instr",
        "predicate": "proposed_by",
        "object": "Long Ouyang et al. (2022)"
      },
      {
        "id": "st-2203-02155-2",
        "paperId": "paper-2203-02155",
        "subject": "Training language models to follow instr",
        "predicate": "addresses_problem",
        "object": "Efficient Foundation Language Models & Scaling Laws"
      },
      {
        "id": "st-2203-02155-3",
        "paperId": "paper-2203-02155",
        "subject": "Training language models to follow instr",
        "predicate": "source_archive",
        "object": "arXiv Preprint (2203.02155)"
      }
    ]
  },
  {
    "id": "paper-2303-08774",
    "title": "GPT-4 Technical Report",
    "abstract": "We report the development of GPT-4, a large-scale, multimodal model which can accept image and text inputs and produce text outputs. While less capable than humans in many real-world scenarios, GPT-4 exhibits human-level performance on various professional and academic benchmarks, including passing a simulated bar exam with a score around the top 10% of test takers. GPT-4 is a Transformer-based model pre-trained to predict the next token in a document. The post-training alignment process results in improved performance on measures of factuality and adherence to desired behavior. A core component of this project was developing infrastructure and optimization methods that behave predictably across a wide range of scales. This allowed us to accurately predict some aspects of GPT-4's performance based on models trained with no more than 1/1,000th the compute of GPT-4.",
    "doi": "10.48550/arXiv.2303.08774",
    "year": 2023,
    "venue": "arXiv 2023",
    "pdfUrl": "https://arxiv.org/pdf/2303.08774.pdf",
    "openAccess": true,
    "authors": [
      {
        "id": "auth-2303-08774-1",
        "name": "OpenAI",
        "department": "AI Research Lab"
      },
      {
        "id": "auth-2303-08774-2",
        "name": "Josh Achiam",
        "department": "AI Research Lab"
      },
      {
        "id": "auth-2303-08774-3",
        "name": "Steven Adler",
        "department": "AI Research Lab"
      },
      {
        "id": "auth-2303-08774-4",
        "name": "Sandhini Agarwal",
        "department": "AI Research Lab"
      },
      {
        "id": "auth-2303-08774-5",
        "name": "Lama Ahmad",
        "department": "AI Research Lab"
      },
      {
        "id": "auth-2303-08774-6",
        "name": "Ilge Akkaya",
        "department": "AI Research Lab"
      }
    ],
    "researchProblemId": "prob-3",
    "researchProblemName": "Efficient Foundation Language Models & Scaling Laws",
    "statements": [
      {
        "id": "st-2303-08774-1",
        "paperId": "paper-2303-08774",
        "subject": "GPT-4 Technical Report",
        "predicate": "proposed_by",
        "object": "OpenAI et al. (2023)"
      },
      {
        "id": "st-2303-08774-2",
        "paperId": "paper-2303-08774",
        "subject": "GPT-4 Technical Report",
        "predicate": "addresses_problem",
        "object": "Efficient Foundation Language Models & Scaling Laws"
      },
      {
        "id": "st-2303-08774-3",
        "paperId": "paper-2303-08774",
        "subject": "GPT-4 Technical Report",
        "predicate": "source_archive",
        "object": "arXiv Preprint (2303.08774)"
      }
    ]
  },
  {
    "id": "paper-1909-08478",
    "title": "Simple, Scalable Adaptation for Neural Machine Translation",
    "abstract": "Fine-tuning pre-trained Neural Machine Translation (NMT) models is the dominant approach for adapting to new languages and domains. However, fine-tuning requires adapting and maintaining a separate model for each target task. We propose a simple yet efficient approach for adaptation in NMT. Our proposed approach consists of injecting tiny task specific adapter layers into a pre-trained model. These lightweight adapters, with just a small fraction of the original model size, adapt the model to multiple individual tasks simultaneously. We evaluate our approach on two tasks: (i) Domain Adaptation and (ii) Massively Multilingual NMT. Experiments on domain adaptation demonstrate that our proposed approach is on par with full fine-tuning on various domains, dataset sizes and model capacities. On a massively multilingual dataset of 103 languages, our adaptation approach bridges the gap between individual bilingual models and one massively multilingual model for most language pairs, paving the way towards universal machine translation.",
    "doi": "10.48550/arXiv.1909.08478",
    "year": 2019,
    "venue": "arXiv 2019",
    "pdfUrl": "https://arxiv.org/pdf/1909.08478.pdf",
    "openAccess": true,
    "authors": [
      {
        "id": "auth-1909-08478-1",
        "name": "Ankur Bapna",
        "department": "AI Research Lab"
      },
      {
        "id": "auth-1909-08478-2",
        "name": "Naveen Arivazhagan",
        "department": "AI Research Lab"
      },
      {
        "id": "auth-1909-08478-3",
        "name": "Orhan Firat",
        "department": "AI Research Lab"
      }
    ],
    "researchProblemId": "prob-1",
    "researchProblemName": "Sequence-to-Sequence Modeling & Neural Machine Translation",
    "statements": [
      {
        "id": "st-1909-08478-1",
        "paperId": "paper-1909-08478",
        "subject": "Simple, Scalable Adaptation for Neural M",
        "predicate": "proposed_by",
        "object": "Ankur Bapna et al. (2019)"
      },
      {
        "id": "st-1909-08478-2",
        "paperId": "paper-1909-08478",
        "subject": "Simple, Scalable Adaptation for Neural M",
        "predicate": "addresses_problem",
        "object": "Sequence-to-Sequence Modeling & Neural Machine Translation"
      },
      {
        "id": "st-1909-08478-3",
        "paperId": "paper-1909-08478",
        "subject": "Simple, Scalable Adaptation for Neural M",
        "predicate": "source_archive",
        "object": "arXiv Preprint (1909.08478)"
      }
    ]
  },
  {
    "id": "paper-1910-10683",
    "title": "Exploring the Limits of Transfer Learning with a Unified Text-to-Text Transformer",
    "abstract": "Transfer learning, where a model is first pre-trained on a data-rich task before being fine-tuned on a downstream task, has emerged as a powerful technique in natural language processing (NLP). The effectiveness of transfer learning has given rise to a diversity of approaches, methodology, and practice. In this paper, we explore the landscape of transfer learning techniques for NLP by introducing a unified framework that converts all text-based language problems into a text-to-text format. Our systematic study compares pre-training objectives, architectures, unlabeled data sets, transfer approaches, and other factors on dozens of language understanding tasks. By combining the insights from our exploration with scale and our new ``Colossal Clean Crawled Corpus'', we achieve state-of-the-art results on many benchmarks covering summarization, question answering, text classification, and more. To facilitate future work on transfer learning for NLP, we release our data set, pre-trained models, and code.",
    "doi": "10.48550/arXiv.1910.10683",
    "year": 2019,
    "venue": "arXiv 2019",
    "pdfUrl": "https://arxiv.org/pdf/1910.10683.pdf",
    "openAccess": true,
    "authors": [
      {
        "id": "auth-1910-10683-1",
        "name": "Colin Raffel",
        "department": "AI Research Lab"
      },
      {
        "id": "auth-1910-10683-2",
        "name": "Noam Shazeer",
        "department": "AI Research Lab"
      },
      {
        "id": "auth-1910-10683-3",
        "name": "Adam Roberts",
        "department": "AI Research Lab"
      },
      {
        "id": "auth-1910-10683-4",
        "name": "Katherine Lee",
        "department": "AI Research Lab"
      },
      {
        "id": "auth-1910-10683-5",
        "name": "Sharan Narang",
        "department": "AI Research Lab"
      },
      {
        "id": "auth-1910-10683-6",
        "name": "Michael Matena",
        "department": "AI Research Lab"
      }
    ],
    "researchProblemId": "prob-1",
    "researchProblemName": "Sequence-to-Sequence Modeling & Neural Machine Translation",
    "statements": [
      {
        "id": "st-1910-10683-1",
        "paperId": "paper-1910-10683",
        "subject": "Exploring the Limits of Transfer Learnin",
        "predicate": "proposed_by",
        "object": "Colin Raffel et al. (2019)"
      },
      {
        "id": "st-1910-10683-2",
        "paperId": "paper-1910-10683",
        "subject": "Exploring the Limits of Transfer Learnin",
        "predicate": "addresses_problem",
        "object": "Sequence-to-Sequence Modeling & Neural Machine Translation"
      },
      {
        "id": "st-1910-10683-3",
        "paperId": "paper-1910-10683",
        "subject": "Exploring the Limits of Transfer Learnin",
        "predicate": "source_archive",
        "object": "arXiv Preprint (1910.10683)"
      }
    ]
  },
  {
    "id": "paper-2001-08361",
    "title": "Scaling Laws for Neural Language Models",
    "abstract": "We study empirical scaling laws for language model performance on the cross-entropy loss. The loss scales as a power-law with model size, dataset size, and the amount of compute used for training, with some trends spanning more than seven orders of magnitude. Other architectural details such as network width or depth have minimal effects within a wide range. Simple equations govern the dependence of overfitting on model/dataset size and the dependence of training speed on model size. These relationships allow us to determine the optimal allocation of a fixed compute budget. Larger models are significantly more sample-efficient, such that optimally compute-efficient training involves training very large models on a relatively modest amount of data and stopping significantly before convergence.",
    "doi": "10.48550/arXiv.2001.08361",
    "year": 2020,
    "venue": "arXiv 2020",
    "pdfUrl": "https://arxiv.org/pdf/2001.08361.pdf",
    "openAccess": true,
    "authors": [
      {
        "id": "auth-2001-08361-1",
        "name": "Jared Kaplan",
        "department": "AI Research Lab"
      },
      {
        "id": "auth-2001-08361-2",
        "name": "Sam McCandlish",
        "department": "AI Research Lab"
      },
      {
        "id": "auth-2001-08361-3",
        "name": "Tom Henighan",
        "department": "AI Research Lab"
      },
      {
        "id": "auth-2001-08361-4",
        "name": "Tom B. Brown",
        "department": "AI Research Lab"
      },
      {
        "id": "auth-2001-08361-5",
        "name": "Benjamin Chess",
        "department": "AI Research Lab"
      },
      {
        "id": "auth-2001-08361-6",
        "name": "Rewon Child",
        "department": "AI Research Lab"
      }
    ],
    "researchProblemId": "prob-3",
    "researchProblemName": "Efficient Foundation Language Models & Scaling Laws",
    "statements": [
      {
        "id": "st-2001-08361-1",
        "paperId": "paper-2001-08361",
        "subject": "Scaling Laws for Neural Language Models",
        "predicate": "proposed_by",
        "object": "Jared Kaplan et al. (2020)"
      },
      {
        "id": "st-2001-08361-2",
        "paperId": "paper-2001-08361",
        "subject": "Scaling Laws for Neural Language Models",
        "predicate": "addresses_problem",
        "object": "Efficient Foundation Language Models & Scaling Laws"
      },
      {
        "id": "st-2001-08361-3",
        "paperId": "paper-2001-08361",
        "subject": "Scaling Laws for Neural Language Models",
        "predicate": "source_archive",
        "object": "arXiv Preprint (2001.08361)"
      }
    ]
  },
  {
    "id": "paper-2210-11416",
    "title": "Scaling Instruction-Finetuned Language Models",
    "abstract": "Finetuning language models on a collection of datasets phrased as instructions has been shown to improve model performance and generalization to unseen tasks. In this paper we explore instruction finetuning with a particular focus on (1) scaling the number of tasks, (2) scaling the model size, and (3) finetuning on chain-of-thought data. We find that instruction finetuning with the above aspects dramatically improves performance on a variety of model classes (PaLM, T5, U-PaLM), prompting setups (zero-shot, few-shot, CoT), and evaluation benchmarks (MMLU, BBH, TyDiQA, MGSM, open-ended generation). For instance, Flan-PaLM 540B instruction-finetuned on 1.8K tasks outperforms PALM 540B by a large margin (+9.4% on average). Flan-PaLM 540B achieves state-of-the-art performance on several benchmarks, such as 75.2% on five-shot MMLU. We also publicly release Flan-T5 checkpoints, which achieve strong few-shot performance even compared to much larger models, such as PaLM 62B. Overall, instruction finetuning is a general method for improving the performance and usability of pretrained language models.",
    "doi": "10.48550/arXiv.2210.11416",
    "year": 2022,
    "venue": "arXiv 2022",
    "pdfUrl": "https://arxiv.org/pdf/2210.11416.pdf",
    "openAccess": true,
    "authors": [
      {
        "id": "auth-2210-11416-1",
        "name": "Hyung Won Chung",
        "department": "AI Research Lab"
      },
      {
        "id": "auth-2210-11416-2",
        "name": "Le Hou",
        "department": "AI Research Lab"
      },
      {
        "id": "auth-2210-11416-3",
        "name": "Shayne Longpre",
        "department": "AI Research Lab"
      },
      {
        "id": "auth-2210-11416-4",
        "name": "Barret Zoph",
        "department": "AI Research Lab"
      },
      {
        "id": "auth-2210-11416-5",
        "name": "Yi Tay",
        "department": "AI Research Lab"
      },
      {
        "id": "auth-2210-11416-6",
        "name": "William Fedus",
        "department": "AI Research Lab"
      }
    ],
    "researchProblemId": "prob-3",
    "researchProblemName": "Efficient Foundation Language Models & Scaling Laws",
    "statements": [
      {
        "id": "st-2210-11416-1",
        "paperId": "paper-2210-11416",
        "subject": "Scaling Instruction-Finetuned Language M",
        "predicate": "proposed_by",
        "object": "Hyung Won Chung et al. (2022)"
      },
      {
        "id": "st-2210-11416-2",
        "paperId": "paper-2210-11416",
        "subject": "Scaling Instruction-Finetuned Language M",
        "predicate": "addresses_problem",
        "object": "Efficient Foundation Language Models & Scaling Laws"
      },
      {
        "id": "st-2210-11416-3",
        "paperId": "paper-2210-11416",
        "subject": "Scaling Instruction-Finetuned Language M",
        "predicate": "source_archive",
        "object": "arXiv Preprint (2210.11416)"
      }
    ]
  },
  {
    "id": "paper-2305-14314",
    "title": "QLoRA: Efficient Finetuning of Quantized LLMs",
    "abstract": "We present QLoRA, an efficient finetuning approach that reduces memory usage enough to finetune a 65B parameter model on a single 48GB GPU while preserving full 16-bit finetuning task performance. QLoRA backpropagates gradients through a frozen, 4-bit quantized pretrained language model into Low Rank Adapters~(LoRA). Our best model family, which we name Guanaco, outperforms all previous openly released models on the Vicuna benchmark, reaching 99.3% of the performance level of ChatGPT while only requiring 24 hours of finetuning on a single GPU. QLoRA introduces a number of innovations to save memory without sacrificing performance: (a) 4-bit NormalFloat (NF4), a new data type that is information theoretically optimal for normally distributed weights (b) double quantization to reduce the average memory footprint by quantizing the quantization constants, and (c) paged optimziers to manage memory spikes. We use QLoRA to finetune more than 1,000 models, providing a detailed analysis of instruction following and chatbot performance across 8 instruction datasets, multiple model types (LLaMA, T5), and model scales that would be infeasible to run with regular finetuning (e.g. 33B and 65B parameter models). Our results show that QLoRA finetuning on a small high-quality dataset leads to state-of-the-art results, even when using smaller models than the previous SoTA. We provide a detailed analysis of chatbot performance based on both human and GPT-4 evaluations showing that GPT-4 evaluations are a cheap and reasonable alternative to human evaluation. Furthermore, we find that current chatbot benchmarks are not trustworthy to accurately evaluate the performance levels of chatbots. A lemon-picked analysis demonstrates where Guanaco fails compared to ChatGPT. We release all of our models and code, including CUDA kernels for 4-bit training.",
    "doi": "10.48550/arXiv.2305.14314",
    "year": 2023,
    "venue": "arXiv 2023",
    "pdfUrl": "https://arxiv.org/pdf/2305.14314.pdf",
    "openAccess": true,
    "authors": [
      {
        "id": "auth-2305-14314-1",
        "name": "Tim Dettmers",
        "department": "AI Research Lab"
      },
      {
        "id": "auth-2305-14314-2",
        "name": "Artidoro Pagnoni",
        "department": "AI Research Lab"
      },
      {
        "id": "auth-2305-14314-3",
        "name": "Ari Holtzman",
        "department": "AI Research Lab"
      },
      {
        "id": "auth-2305-14314-4",
        "name": "Luke Zettlemoyer",
        "department": "AI Research Lab"
      }
    ],
    "researchProblemId": "prob-3",
    "researchProblemName": "Efficient Foundation Language Models & Scaling Laws",
    "statements": [
      {
        "id": "st-2305-14314-1",
        "paperId": "paper-2305-14314",
        "subject": "QLoRA: Efficient Finetuning of Quantized",
        "predicate": "proposed_by",
        "object": "Tim Dettmers et al. (2023)"
      },
      {
        "id": "st-2305-14314-2",
        "paperId": "paper-2305-14314",
        "subject": "QLoRA: Efficient Finetuning of Quantized",
        "predicate": "addresses_problem",
        "object": "Efficient Foundation Language Models & Scaling Laws"
      },
      {
        "id": "st-2305-14314-3",
        "paperId": "paper-2305-14314",
        "subject": "QLoRA: Efficient Finetuning of Quantized",
        "predicate": "source_archive",
        "object": "arXiv Preprint (2305.14314)"
      }
    ]
  },
  {
    "id": "paper-2401-06080",
    "title": "Secrets of RLHF in Large Language Models Part II: Reward Modeling",
    "abstract": "Reinforcement Learning from Human Feedback (RLHF) has become a crucial technology for aligning language models with human values and intentions, enabling models to produce more helpful and harmless responses. Reward models are trained as proxies for human preferences to drive reinforcement learning optimization. While reward models are often considered central to achieving high performance, they face the following challenges in practical applications: (1) Incorrect and ambiguous preference pairs in the dataset may hinder the reward model from accurately capturing human intent. (2) Reward models trained on data from a specific distribution often struggle to generalize to examples outside that distribution and are not suitable for iterative RLHF training. In this report, we attempt to address these two issues. (1) From a data perspective, we propose a method to measure the strength of preferences within the data, based on a voting mechanism of multiple reward models. Experimental results confirm that data with varying preference strengths have different impacts on reward model performance. We introduce a series of novel methods to mitigate the influence of incorrect and ambiguous preferences in the dataset and fully leverage high-quality preference data. (2) From an algorithmic standpoint, we introduce contrastive learning to enhance the ability of reward models to distinguish between chosen and rejected responses, thereby improving model generalization. Furthermore, we employ meta-learning to enable the reward model to maintain the ability to differentiate subtle differences in out-of-distribution samples, and this approach can be utilized for iterative RLHF optimization.",
    "doi": "10.48550/arXiv.2401.06080",
    "year": 2024,
    "venue": "arXiv 2024",
    "pdfUrl": "https://arxiv.org/pdf/2401.06080.pdf",
    "openAccess": true,
    "authors": [
      {
        "id": "auth-2401-06080-1",
        "name": "Binghai Wang",
        "department": "AI Research Lab"
      },
      {
        "id": "auth-2401-06080-2",
        "name": "Rui Zheng",
        "department": "AI Research Lab"
      },
      {
        "id": "auth-2401-06080-3",
        "name": "Lu Chen",
        "department": "AI Research Lab"
      },
      {
        "id": "auth-2401-06080-4",
        "name": "Yan Liu",
        "department": "AI Research Lab"
      },
      {
        "id": "auth-2401-06080-5",
        "name": "Shihan Dou",
        "department": "AI Research Lab"
      },
      {
        "id": "auth-2401-06080-6",
        "name": "Caishuang Huang",
        "department": "AI Research Lab"
      }
    ],
    "researchProblemId": "prob-1",
    "researchProblemName": "Sequence-to-Sequence Modeling & Neural Machine Translation",
    "statements": [
      {
        "id": "st-2401-06080-1",
        "paperId": "paper-2401-06080",
        "subject": "Secrets of RLHF in Large Language Models",
        "predicate": "proposed_by",
        "object": "Binghai Wang et al. (2024)"
      },
      {
        "id": "st-2401-06080-2",
        "paperId": "paper-2401-06080",
        "subject": "Secrets of RLHF in Large Language Models",
        "predicate": "addresses_problem",
        "object": "Sequence-to-Sequence Modeling & Neural Machine Translation"
      },
      {
        "id": "st-2401-06080-3",
        "paperId": "paper-2401-06080",
        "subject": "Secrets of RLHF in Large Language Models",
        "predicate": "source_archive",
        "object": "arXiv Preprint (2401.06080)"
      }
    ]
  },
  {
    "id": "paper-2402-19427",
    "title": "Griffin: Mixing Gated Linear Recurrences with Local Attention for Efficient Language Models",
    "abstract": "Recurrent neural networks (RNNs) have fast inference and scale efficiently on long sequences, but they are difficult to train and hard to scale. We propose Hawk, an RNN with gated linear recurrences, and Griffin, a hybrid model that mixes gated linear recurrences with local attention. Hawk exceeds the reported performance of Mamba on downstream tasks, while Griffin matches the performance of Llama-2 despite being trained on over 6 times fewer tokens. We also show that Griffin can extrapolate on sequences significantly longer than those seen during training. Our models match the hardware efficiency of Transformers during training, and during inference they have lower latency and significantly higher throughput. We scale Griffin up to 14B parameters, and explain how to shard our models for efficient distributed training.",
    "doi": "10.48550/arXiv.2402.19427",
    "year": 2024,
    "venue": "arXiv 2024",
    "pdfUrl": "https://arxiv.org/pdf/2402.19427.pdf",
    "openAccess": true,
    "authors": [
      {
        "id": "auth-2402-19427-1",
        "name": "Soham De",
        "department": "AI Research Lab"
      },
      {
        "id": "auth-2402-19427-2",
        "name": "Samuel L. Smith",
        "department": "AI Research Lab"
      },
      {
        "id": "auth-2402-19427-3",
        "name": "Anushan Fernando",
        "department": "AI Research Lab"
      },
      {
        "id": "auth-2402-19427-4",
        "name": "Aleksandar Botev",
        "department": "AI Research Lab"
      },
      {
        "id": "auth-2402-19427-5",
        "name": "George Cristian-Muraru",
        "department": "AI Research Lab"
      },
      {
        "id": "auth-2402-19427-6",
        "name": "Albert Gu",
        "department": "AI Research Lab"
      }
    ],
    "researchProblemId": "prob-1",
    "researchProblemName": "Sequence-to-Sequence Modeling & Neural Machine Translation",
    "statements": [
      {
        "id": "st-2402-19427-1",
        "paperId": "paper-2402-19427",
        "subject": "Griffin: Mixing Gated Linear Recurrences",
        "predicate": "proposed_by",
        "object": "Soham De et al. (2024)"
      },
      {
        "id": "st-2402-19427-2",
        "paperId": "paper-2402-19427",
        "subject": "Griffin: Mixing Gated Linear Recurrences",
        "predicate": "addresses_problem",
        "object": "Sequence-to-Sequence Modeling & Neural Machine Translation"
      },
      {
        "id": "st-2402-19427-3",
        "paperId": "paper-2402-19427",
        "subject": "Griffin: Mixing Gated Linear Recurrences",
        "predicate": "source_archive",
        "object": "arXiv Preprint (2402.19427)"
      }
    ]
  },
  {
    "id": "paper-2205-01068",
    "title": "OPT: Open Pre-trained Transformer Language Models",
    "abstract": "Large language models, which are often trained for hundreds of thousands of compute days, have shown remarkable capabilities for zero- and few-shot learning. Given their computational cost, these models are difficult to replicate without significant capital. For the few that are available through APIs, no access is granted to the full model weights, making them difficult to study. We present Open Pre-trained Transformers (OPT), a suite of decoder-only pre-trained transformers ranging from 125M to 175B parameters, which we aim to fully and responsibly share with interested researchers. We show that OPT-175B is comparable to GPT-3, while requiring only 1/7th the carbon footprint to develop. We are also releasing our logbook detailing the infrastructure challenges we faced, along with code for experimenting with all of the released models.",
    "doi": "10.48550/arXiv.2205.01068",
    "year": 2022,
    "venue": "arXiv 2022",
    "pdfUrl": "https://arxiv.org/pdf/2205.01068.pdf",
    "openAccess": true,
    "authors": [
      {
        "id": "auth-2205-01068-1",
        "name": "Susan Zhang",
        "department": "AI Research Lab"
      },
      {
        "id": "auth-2205-01068-2",
        "name": "Stephen Roller",
        "department": "AI Research Lab"
      },
      {
        "id": "auth-2205-01068-3",
        "name": "Naman Goyal",
        "department": "AI Research Lab"
      },
      {
        "id": "auth-2205-01068-4",
        "name": "Mikel Artetxe",
        "department": "AI Research Lab"
      },
      {
        "id": "auth-2205-01068-5",
        "name": "Moya Chen",
        "department": "AI Research Lab"
      },
      {
        "id": "auth-2205-01068-6",
        "name": "Shuohui Chen",
        "department": "AI Research Lab"
      }
    ],
    "researchProblemId": "prob-3",
    "researchProblemName": "Efficient Foundation Language Models & Scaling Laws",
    "statements": [
      {
        "id": "st-2205-01068-1",
        "paperId": "paper-2205-01068",
        "subject": "OPT: Open Pre-trained Transformer Langua",
        "predicate": "proposed_by",
        "object": "Susan Zhang et al. (2022)"
      },
      {
        "id": "st-2205-01068-2",
        "paperId": "paper-2205-01068",
        "subject": "OPT: Open Pre-trained Transformer Langua",
        "predicate": "addresses_problem",
        "object": "Efficient Foundation Language Models & Scaling Laws"
      },
      {
        "id": "st-2205-01068-3",
        "paperId": "paper-2205-01068",
        "subject": "OPT: Open Pre-trained Transformer Langua",
        "predicate": "source_archive",
        "object": "arXiv Preprint (2205.01068)"
      }
    ]
  },
  {
    "id": "paper-2302-05543",
    "title": "Adding Conditional Control to Text-to-Image Diffusion Models",
    "abstract": "We present ControlNet, a neural network architecture to add spatial conditioning controls to large, pretrained text-to-image diffusion models. ControlNet locks the production-ready large diffusion models, and reuses their deep and robust encoding layers pretrained with billions of images as a strong backbone to learn a diverse set of conditional controls. The neural architecture is connected with \"zero convolutions\" (zero-initialized convolution layers) that progressively grow the parameters from zero and ensure that no harmful noise could affect the finetuning. We test various conditioning controls, eg, edges, depth, segmentation, human pose, etc, with Stable Diffusion, using single or multiple conditions, with or without prompts. We show that the training of ControlNets is robust with small (<50k) and large (>1m) datasets. Extensive results show that ControlNet may facilitate wider applications to control image diffusion models.",
    "doi": "10.48550/arXiv.2302.05543",
    "year": 2023,
    "venue": "arXiv 2023",
    "pdfUrl": "https://arxiv.org/pdf/2302.05543.pdf",
    "openAccess": true,
    "authors": [
      {
        "id": "auth-2302-05543-1",
        "name": "Lvmin Zhang",
        "department": "AI Research Lab"
      },
      {
        "id": "auth-2302-05543-2",
        "name": "Anyi Rao",
        "department": "AI Research Lab"
      },
      {
        "id": "auth-2302-05543-3",
        "name": "Maneesh Agrawala",
        "department": "AI Research Lab"
      }
    ],
    "researchProblemId": "prob-4",
    "researchProblemName": "Deep Residual Learning & Image Classification",
    "statements": [
      {
        "id": "st-2302-05543-1",
        "paperId": "paper-2302-05543",
        "subject": "Adding Conditional Control to Text-to-Im",
        "predicate": "proposed_by",
        "object": "Lvmin Zhang et al. (2023)"
      },
      {
        "id": "st-2302-05543-2",
        "paperId": "paper-2302-05543",
        "subject": "Adding Conditional Control to Text-to-Im",
        "predicate": "addresses_problem",
        "object": "Deep Residual Learning & Image Classification"
      },
      {
        "id": "st-2302-05543-3",
        "paperId": "paper-2302-05543",
        "subject": "Adding Conditional Control to Text-to-Im",
        "predicate": "source_archive",
        "object": "arXiv Preprint (2302.05543)"
      }
    ]
  },
  {
    "id": "paper-2005-11401",
    "title": "Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks",
    "abstract": "Large pre-trained language models have been shown to store factual knowledge in their parameters, and achieve state-of-the-art results when fine-tuned on downstream NLP tasks. However, their ability to access and precisely manipulate knowledge is still limited, and hence on knowledge-intensive tasks, their performance lags behind task-specific architectures. Additionally, providing provenance for their decisions and updating their world knowledge remain open research problems. Pre-trained models with a differentiable access mechanism to explicit non-parametric memory can overcome this issue, but have so far been only investigated for extractive downstream tasks. We explore a general-purpose fine-tuning recipe for retrieval-augmented generation (RAG) -- models which combine pre-trained parametric and non-parametric memory for language generation. We introduce RAG models where the parametric memory is a pre-trained seq2seq model and the non-parametric memory is a dense vector index of Wikipedia, accessed with a pre-trained neural retriever. We compare two RAG formulations, one which conditions on the same retrieved passages across the whole generated sequence, the other can use different passages per token. We fine-tune and evaluate our models on a wide range of knowledge-intensive NLP tasks and set the state-of-the-art on three open domain QA tasks, outperforming parametric seq2seq models and task-specific retrieve-and-extract architectures. For language generation tasks, we find that RAG models generate more specific, diverse and factual language than a state-of-the-art parametric-only seq2seq baseline.",
    "doi": "10.48550/arXiv.2005.11401",
    "year": 2020,
    "venue": "arXiv 2020",
    "pdfUrl": "https://arxiv.org/pdf/2005.11401.pdf",
    "openAccess": true,
    "authors": [
      {
        "id": "auth-2005-11401-1",
        "name": "Patrick Lewis",
        "department": "AI Research Lab"
      },
      {
        "id": "auth-2005-11401-2",
        "name": "Ethan Perez",
        "department": "AI Research Lab"
      },
      {
        "id": "auth-2005-11401-3",
        "name": "Aleksandra Piktus",
        "department": "AI Research Lab"
      },
      {
        "id": "auth-2005-11401-4",
        "name": "Fabio Petroni",
        "department": "AI Research Lab"
      },
      {
        "id": "auth-2005-11401-5",
        "name": "Vladimir Karpukhin",
        "department": "AI Research Lab"
      },
      {
        "id": "auth-2005-11401-6",
        "name": "Naman Goyal",
        "department": "AI Research Lab"
      }
    ],
    "researchProblemId": "prob-1",
    "researchProblemName": "Sequence-to-Sequence Modeling & Neural Machine Translation",
    "statements": [
      {
        "id": "st-2005-11401-1",
        "paperId": "paper-2005-11401",
        "subject": "Retrieval-Augmented Generation for Knowl",
        "predicate": "proposed_by",
        "object": "Patrick Lewis et al. (2020)"
      },
      {
        "id": "st-2005-11401-2",
        "paperId": "paper-2005-11401",
        "subject": "Retrieval-Augmented Generation for Knowl",
        "predicate": "addresses_problem",
        "object": "Sequence-to-Sequence Modeling & Neural Machine Translation"
      },
      {
        "id": "st-2005-11401-3",
        "paperId": "paper-2005-11401",
        "subject": "Retrieval-Augmented Generation for Knowl",
        "predicate": "source_archive",
        "object": "arXiv Preprint (2005.11401)"
      }
    ]
  },
  {
    "id": "paper-1409-0473",
    "title": "Neural Machine Translation by Jointly Learning to Align and Translate",
    "abstract": "Neural machine translation is a recently proposed approach to machine translation. Unlike the traditional statistical machine translation, the neural machine translation aims at building a single neural network that can be jointly tuned to maximize the translation performance. The models proposed recently for neural machine translation often belong to a family of encoder-decoders and consists of an encoder that encodes a source sentence into a fixed-length vector from which a decoder generates a translation. In this paper, we conjecture that the use of a fixed-length vector is a bottleneck in improving the performance of this basic encoder-decoder architecture, and propose to extend this by allowing a model to automatically (soft-)search for parts of a source sentence that are relevant to predicting a target word, without having to form these parts as a hard segment explicitly. With this new approach, we achieve a translation performance comparable to the existing state-of-the-art phrase-based system on the task of English-to-French translation. Furthermore, qualitative analysis reveals that the (soft-)alignments found by the model agree well with our intuition.",
    "doi": "10.48550/arXiv.1409.0473",
    "year": 2014,
    "venue": "arXiv 2014",
    "pdfUrl": "https://arxiv.org/pdf/1409.0473.pdf",
    "openAccess": true,
    "authors": [
      {
        "id": "auth-1409-0473-1",
        "name": "Dzmitry Bahdanau",
        "department": "AI Research Lab"
      },
      {
        "id": "auth-1409-0473-2",
        "name": "Kyunghyun Cho",
        "department": "AI Research Lab"
      },
      {
        "id": "auth-1409-0473-3",
        "name": "Yoshua Bengio",
        "department": "AI Research Lab"
      }
    ],
    "researchProblemId": "prob-1",
    "researchProblemName": "Sequence-to-Sequence Modeling & Neural Machine Translation",
    "statements": [
      {
        "id": "st-1409-0473-1",
        "paperId": "paper-1409-0473",
        "subject": "Neural Machine Translation by Jointly Le",
        "predicate": "proposed_by",
        "object": "Dzmitry Bahdanau et al. (2014)"
      },
      {
        "id": "st-1409-0473-2",
        "paperId": "paper-1409-0473",
        "subject": "Neural Machine Translation by Jointly Le",
        "predicate": "addresses_problem",
        "object": "Sequence-to-Sequence Modeling & Neural Machine Translation"
      },
      {
        "id": "st-1409-0473-3",
        "paperId": "paper-1409-0473",
        "subject": "Neural Machine Translation by Jointly Le",
        "predicate": "source_archive",
        "object": "arXiv Preprint (1409.0473)"
      }
    ]
  },
  {
    "id": "paper-1901-02860",
    "title": "Transformer-XL: Attentive Language Models Beyond a Fixed-Length Context",
    "abstract": "Transformers have a potential of learning longer-term dependency, but are limited by a fixed-length context in the setting of language modeling. We propose a novel neural architecture Transformer-XL that enables learning dependency beyond a fixed length without disrupting temporal coherence. It consists of a segment-level recurrence mechanism and a novel positional encoding scheme. Our method not only enables capturing longer-term dependency, but also resolves the context fragmentation problem. As a result, Transformer-XL learns dependency that is 80% longer than RNNs and 450% longer than vanilla Transformers, achieves better performance on both short and long sequences, and is up to 1,800+ times faster than vanilla Transformers during evaluation. Notably, we improve the state-of-the-art results of bpc/perplexity to 0.99 on enwiki8, 1.08 on text8, 18.3 on WikiText-103, 21.8 on One Billion Word, and 54.5 on Penn Treebank (without finetuning). When trained only on WikiText-103, Transformer-XL manages to generate reasonably coherent, novel text articles with thousands of tokens. Our code, pretrained models, and hyperparameters are available in both Tensorflow and PyTorch.",
    "doi": "10.48550/arXiv.1901.02860",
    "year": 2019,
    "venue": "arXiv 2019",
    "pdfUrl": "https://arxiv.org/pdf/1901.02860.pdf",
    "openAccess": true,
    "authors": [
      {
        "id": "auth-1901-02860-1",
        "name": "Zihang Dai",
        "department": "AI Research Lab"
      },
      {
        "id": "auth-1901-02860-2",
        "name": "Zhilin Yang",
        "department": "AI Research Lab"
      },
      {
        "id": "auth-1901-02860-3",
        "name": "Yiming Yang",
        "department": "AI Research Lab"
      },
      {
        "id": "auth-1901-02860-4",
        "name": "Jaime Carbonell",
        "department": "AI Research Lab"
      },
      {
        "id": "auth-1901-02860-5",
        "name": "Quoc V. Le",
        "department": "AI Research Lab"
      },
      {
        "id": "auth-1901-02860-6",
        "name": "Ruslan Salakhutdinov",
        "department": "AI Research Lab"
      }
    ],
    "researchProblemId": "prob-1",
    "researchProblemName": "Sequence-to-Sequence Modeling & Neural Machine Translation",
    "statements": [
      {
        "id": "st-1901-02860-1",
        "paperId": "paper-1901-02860",
        "subject": "Transformer-XL: Attentive Language Model",
        "predicate": "proposed_by",
        "object": "Zihang Dai et al. (2019)"
      },
      {
        "id": "st-1901-02860-2",
        "paperId": "paper-1901-02860",
        "subject": "Transformer-XL: Attentive Language Model",
        "predicate": "addresses_problem",
        "object": "Sequence-to-Sequence Modeling & Neural Machine Translation"
      },
      {
        "id": "st-1901-02860-3",
        "paperId": "paper-1901-02860",
        "subject": "Transformer-XL: Attentive Language Model",
        "predicate": "source_archive",
        "object": "arXiv Preprint (1901.02860)"
      }
    ]
  },
  {
    "id": "paper-2004-05150",
    "title": "Longformer: The Long-Document Transformer",
    "abstract": "Transformer-based models are unable to process long sequences due to their self-attention operation, which scales quadratically with the sequence length. To address this limitation, we introduce the Longformer with an attention mechanism that scales linearly with sequence length, making it easy to process documents of thousands of tokens or longer. Longformer's attention mechanism is a drop-in replacement for the standard self-attention and combines a local windowed attention with a task motivated global attention. Following prior work on long-sequence transformers, we evaluate Longformer on character-level language modeling and achieve state-of-the-art results on text8 and enwik8. In contrast to most prior work, we also pretrain Longformer and finetune it on a variety of downstream tasks. Our pretrained Longformer consistently outperforms RoBERTa on long document tasks and sets new state-of-the-art results on WikiHop and TriviaQA. We finally introduce the Longformer-Encoder-Decoder (LED), a Longformer variant for supporting long document generative sequence-to-sequence tasks, and demonstrate its effectiveness on the arXiv summarization dataset.",
    "doi": "10.48550/arXiv.2004.05150",
    "year": 2020,
    "venue": "arXiv 2020",
    "pdfUrl": "https://arxiv.org/pdf/2004.05150.pdf",
    "openAccess": true,
    "authors": [
      {
        "id": "auth-2004-05150-1",
        "name": "Iz Beltagy",
        "department": "AI Research Lab"
      },
      {
        "id": "auth-2004-05150-2",
        "name": "Matthew E. Peters",
        "department": "AI Research Lab"
      },
      {
        "id": "auth-2004-05150-3",
        "name": "Arman Cohan",
        "department": "AI Research Lab"
      }
    ],
    "researchProblemId": "prob-1",
    "researchProblemName": "Sequence-to-Sequence Modeling & Neural Machine Translation",
    "statements": [
      {
        "id": "st-2004-05150-1",
        "paperId": "paper-2004-05150",
        "subject": "Longformer: The Long-Document Transforme",
        "predicate": "proposed_by",
        "object": "Iz Beltagy et al. (2020)"
      },
      {
        "id": "st-2004-05150-2",
        "paperId": "paper-2004-05150",
        "subject": "Longformer: The Long-Document Transforme",
        "predicate": "addresses_problem",
        "object": "Sequence-to-Sequence Modeling & Neural Machine Translation"
      },
      {
        "id": "st-2004-05150-3",
        "paperId": "paper-2004-05150",
        "subject": "Longformer: The Long-Document Transforme",
        "predicate": "source_archive",
        "object": "arXiv Preprint (2004.05150)"
      }
    ]
  },
  {
    "id": "paper-2205-14135",
    "title": "FlashAttention: Fast and Memory-Efficient Exact Attention with IO-Awareness",
    "abstract": "Transformers are slow and memory-hungry on long sequences, since the time and memory complexity of self-attention are quadratic in sequence length. Approximate attention methods have attempted to address this problem by trading off model quality to reduce the compute complexity, but often do not achieve wall-clock speedup. We argue that a missing principle is making attention algorithms IO-aware -- accounting for reads and writes between levels of GPU memory. We propose FlashAttention, an IO-aware exact attention algorithm that uses tiling to reduce the number of memory reads/writes between GPU high bandwidth memory (HBM) and GPU on-chip SRAM. We analyze the IO complexity of FlashAttention, showing that it requires fewer HBM accesses than standard attention, and is optimal for a range of SRAM sizes. We also extend FlashAttention to block-sparse attention, yielding an approximate attention algorithm that is faster than any existing approximate attention method. FlashAttention trains Transformers faster than existing baselines: 15% end-to-end wall-clock speedup on BERT-large (seq. length 512) compared to the MLPerf 1.1 training speed record, 3$\\times$ speedup on GPT-2 (seq. length 1K), and 2.4$\\times$ speedup on long-range arena (seq. length 1K-4K). FlashAttention and block-sparse FlashAttention enable longer context in Transformers, yielding higher quality models (0.7 better perplexity on GPT-2 and 6.4 points of lift on long-document classification) and entirely new capabilities: the first Transformers to achieve better-than-chance performance on the Path-X challenge (seq. length 16K, 61.4% accuracy) and Path-256 (seq. length 64K, 63.1% accuracy).",
    "doi": "10.48550/arXiv.2205.14135",
    "year": 2022,
    "venue": "arXiv 2022",
    "pdfUrl": "https://arxiv.org/pdf/2205.14135.pdf",
    "openAccess": true,
    "authors": [
      {
        "id": "auth-2205-14135-1",
        "name": "Tri Dao",
        "department": "AI Research Lab"
      },
      {
        "id": "auth-2205-14135-2",
        "name": "Daniel Y. Fu",
        "department": "AI Research Lab"
      },
      {
        "id": "auth-2205-14135-3",
        "name": "Stefano Ermon",
        "department": "AI Research Lab"
      },
      {
        "id": "auth-2205-14135-4",
        "name": "Atri Rudra",
        "department": "AI Research Lab"
      },
      {
        "id": "auth-2205-14135-5",
        "name": "Christopher R\u00e9",
        "department": "AI Research Lab"
      }
    ],
    "researchProblemId": "prob-3",
    "researchProblemName": "Efficient Foundation Language Models & Scaling Laws",
    "statements": [
      {
        "id": "st-2205-14135-1",
        "paperId": "paper-2205-14135",
        "subject": "FlashAttention: Fast and Memory-Efficien",
        "predicate": "proposed_by",
        "object": "Tri Dao et al. (2022)"
      },
      {
        "id": "st-2205-14135-2",
        "paperId": "paper-2205-14135",
        "subject": "FlashAttention: Fast and Memory-Efficien",
        "predicate": "addresses_problem",
        "object": "Efficient Foundation Language Models & Scaling Laws"
      },
      {
        "id": "st-2205-14135-3",
        "paperId": "paper-2205-14135",
        "subject": "FlashAttention: Fast and Memory-Efficien",
        "predicate": "source_archive",
        "object": "arXiv Preprint (2205.14135)"
      }
    ]
  },
  {
    "id": "paper-2204-02311",
    "title": "PaLM: Scaling Language Modeling with Pathways",
    "abstract": "Large language models have been shown to achieve remarkable performance across a variety of natural language tasks using few-shot learning, which drastically reduces the number of task-specific training examples needed to adapt the model to a particular application. To further our understanding of the impact of scale on few-shot learning, we trained a 540-billion parameter, densely activated, Transformer language model, which we call Pathways Language Model PaLM. We trained PaLM on 6144 TPU v4 chips using Pathways, a new ML system which enables highly efficient training across multiple TPU Pods. We demonstrate continued benefits of scaling by achieving state-of-the-art few-shot learning results on hundreds of language understanding and generation benchmarks. On a number of these tasks, PaLM 540B achieves breakthrough performance, outperforming the finetuned state-of-the-art on a suite of multi-step reasoning tasks, and outperforming average human performance on the recently released BIG-bench benchmark. A significant number of BIG-bench tasks showed discontinuous improvements from model scale, meaning that performance steeply increased as we scaled to our largest model. PaLM also has strong capabilities in multilingual tasks and source code generation, which we demonstrate on a wide array of benchmarks. We additionally provide a comprehensive analysis on bias and toxicity, and study the extent of training data memorization with respect to model scale. Finally, we discuss the ethical considerations related to large language models and discuss potential mitigation strategies.",
    "doi": "10.48550/arXiv.2204.02311",
    "year": 2022,
    "venue": "arXiv 2022",
    "pdfUrl": "https://arxiv.org/pdf/2204.02311.pdf",
    "openAccess": true,
    "authors": [
      {
        "id": "auth-2204-02311-1",
        "name": "Aakanksha Chowdhery",
        "department": "AI Research Lab"
      },
      {
        "id": "auth-2204-02311-2",
        "name": "Sharan Narang",
        "department": "AI Research Lab"
      },
      {
        "id": "auth-2204-02311-3",
        "name": "Jacob Devlin",
        "department": "AI Research Lab"
      },
      {
        "id": "auth-2204-02311-4",
        "name": "Maarten Bosma",
        "department": "AI Research Lab"
      },
      {
        "id": "auth-2204-02311-5",
        "name": "Gaurav Mishra",
        "department": "AI Research Lab"
      },
      {
        "id": "auth-2204-02311-6",
        "name": "Adam Roberts",
        "department": "AI Research Lab"
      }
    ],
    "researchProblemId": "prob-3",
    "researchProblemName": "Efficient Foundation Language Models & Scaling Laws",
    "statements": [
      {
        "id": "st-2204-02311-1",
        "paperId": "paper-2204-02311",
        "subject": "PaLM: Scaling Language Modeling with Pat",
        "predicate": "proposed_by",
        "object": "Aakanksha Chowdhery et al. (2022)"
      },
      {
        "id": "st-2204-02311-2",
        "paperId": "paper-2204-02311",
        "subject": "PaLM: Scaling Language Modeling with Pat",
        "predicate": "addresses_problem",
        "object": "Efficient Foundation Language Models & Scaling Laws"
      },
      {
        "id": "st-2204-02311-3",
        "paperId": "paper-2204-02311",
        "subject": "PaLM: Scaling Language Modeling with Pat",
        "predicate": "source_archive",
        "object": "arXiv Preprint (2204.02311)"
      }
    ]
  },
  {
    "id": "paper-2310-06825",
    "title": "Mistral 7B",
    "abstract": "We introduce Mistral 7B v0.1, a 7-billion-parameter language model engineered for superior performance and efficiency. Mistral 7B outperforms Llama 2 13B across all evaluated benchmarks, and Llama 1 34B in reasoning, mathematics, and code generation. Our model leverages grouped-query attention (GQA) for faster inference, coupled with sliding window attention (SWA) to effectively handle sequences of arbitrary length with a reduced inference cost. We also provide a model fine-tuned to follow instructions, Mistral 7B -- Instruct, that surpasses the Llama 2 13B -- Chat model both on human and automated benchmarks. Our models are released under the Apache 2.0 license.",
    "doi": "10.48550/arXiv.2310.06825",
    "year": 2023,
    "venue": "arXiv 2023",
    "pdfUrl": "https://arxiv.org/pdf/2310.06825.pdf",
    "openAccess": true,
    "authors": [
      {
        "id": "auth-2310-06825-1",
        "name": "Albert Q. Jiang",
        "department": "AI Research Lab"
      },
      {
        "id": "auth-2310-06825-2",
        "name": "Alexandre Sablayrolles",
        "department": "AI Research Lab"
      },
      {
        "id": "auth-2310-06825-3",
        "name": "Arthur Mensch",
        "department": "AI Research Lab"
      },
      {
        "id": "auth-2310-06825-4",
        "name": "Chris Bamford",
        "department": "AI Research Lab"
      },
      {
        "id": "auth-2310-06825-5",
        "name": "Devendra Singh Chaplot",
        "department": "AI Research Lab"
      },
      {
        "id": "auth-2310-06825-6",
        "name": "Diego de las Casas",
        "department": "AI Research Lab"
      }
    ],
    "researchProblemId": "prob-3",
    "researchProblemName": "Efficient Foundation Language Models & Scaling Laws",
    "statements": [
      {
        "id": "st-2310-06825-1",
        "paperId": "paper-2310-06825",
        "subject": "Mistral 7B",
        "predicate": "proposed_by",
        "object": "Albert Q. Jiang et al. (2023)"
      },
      {
        "id": "st-2310-06825-2",
        "paperId": "paper-2310-06825",
        "subject": "Mistral 7B",
        "predicate": "addresses_problem",
        "object": "Efficient Foundation Language Models & Scaling Laws"
      },
      {
        "id": "st-2310-06825-3",
        "paperId": "paper-2310-06825",
        "subject": "Mistral 7B",
        "predicate": "source_archive",
        "object": "arXiv Preprint (2310.06825)"
      }
    ]
  },
  {
    "id": "paper-2404-14219",
    "title": "Phi-3 Technical Report: A Highly Capable Language Model Locally on Your Phone",
    "abstract": "We introduce phi-3-mini, a 3.8 billion parameter language model trained on 3.3 trillion tokens, whose overall performance, as measured by both academic benchmarks and internal testing, rivals that of models such as Mixtral 8x7B and GPT-3.5 (e.g., phi-3-mini achieves 69% on MMLU and 8.38 on MT-bench), despite being small enough to be deployed on a phone. Our training dataset is a scaled-up version of the one used for phi-2, composed of heavily filtered publicly available web data and synthetic data. The model is also further aligned for robustness, safety, and chat format. We also provide parameter-scaling results with a 7B, 14B models trained for 4.8T tokens, called phi-3-small, phi-3-medium, both significantly more capable than phi-3-mini (e.g., respectively 75%, 78% on MMLU, and 8.7, 8.9 on MT-bench). To enhance multilingual, multimodal, and long-context capabilities, we introduce three models in the phi-3.5 series: phi-3.5-mini, phi-3.5-MoE, and phi-3.5-Vision. The phi-3.5-MoE, a 16 x 3.8B MoE model with 6.6 billion active parameters, achieves superior performance in language reasoning, math, and code tasks compared to other open-source models of similar scale, such as Llama 3.1 and the Mixtral series, and on par with Gemini-1.5-Flash and GPT-4o-mini. Meanwhile, phi-3.5-Vision, a 4.2 billion parameter model derived from phi-3.5-mini, excels in reasoning tasks and is adept at handling both single-image and text prompts, as well as multi-image and text prompts.",
    "doi": "10.48550/arXiv.2404.14219",
    "year": 2024,
    "venue": "arXiv 2024",
    "pdfUrl": "https://arxiv.org/pdf/2404.14219.pdf",
    "openAccess": true,
    "authors": [
      {
        "id": "auth-2404-14219-1",
        "name": "Marah Abdin",
        "department": "AI Research Lab"
      },
      {
        "id": "auth-2404-14219-2",
        "name": "Jyoti Aneja",
        "department": "AI Research Lab"
      },
      {
        "id": "auth-2404-14219-3",
        "name": "Hany Awadalla",
        "department": "AI Research Lab"
      },
      {
        "id": "auth-2404-14219-4",
        "name": "Ahmed Awadallah",
        "department": "AI Research Lab"
      },
      {
        "id": "auth-2404-14219-5",
        "name": "Ammar Ahmad Awan",
        "department": "AI Research Lab"
      },
      {
        "id": "auth-2404-14219-6",
        "name": "Nguyen Bach",
        "department": "AI Research Lab"
      }
    ],
    "researchProblemId": "prob-1",
    "researchProblemName": "Sequence-to-Sequence Modeling & Neural Machine Translation",
    "statements": [
      {
        "id": "st-2404-14219-1",
        "paperId": "paper-2404-14219",
        "subject": "Phi-3 Technical Report: A Highly Capable",
        "predicate": "proposed_by",
        "object": "Marah Abdin et al. (2024)"
      },
      {
        "id": "st-2404-14219-2",
        "paperId": "paper-2404-14219",
        "subject": "Phi-3 Technical Report: A Highly Capable",
        "predicate": "addresses_problem",
        "object": "Sequence-to-Sequence Modeling & Neural Machine Translation"
      },
      {
        "id": "st-2404-14219-3",
        "paperId": "paper-2404-14219",
        "subject": "Phi-3 Technical Report: A Highly Capable",
        "predicate": "source_archive",
        "object": "arXiv Preprint (2404.14219)"
      }
    ]
  },
  {
    "id": "paper-2407-21783",
    "title": "The Llama 3 Herd of Models",
    "abstract": "Modern AI development is defined by scaling foundation language models across compute and data. We introduce Llama 3, a herd of state-of-the-art language models natively supporting multilinguality, coding, reasoning, and tool use. Our largest model is a 405B parameter dense Transformer pretrained on 15.6 trillion multilingual tokens using an optimized 128k context window and Grouped-Query Attention (GQA). Llama 3 405B achieves performance competitive with top frontier models such as GPT-4o and Claude 3.5 Sonnet across a broad suite of academic benchmarks. We also release open-weights 8B and 70B parameter models fine-tuned with Supervised Fine-Tuning (SFT) and Direct Preference Optimization (DPO).",
    "doi": "10.48550/arXiv.2407.21783",
    "year": 2024,
    "venue": "arXiv 2024",
    "pdfUrl": "https://arxiv.org/pdf/2407.21783.pdf",
    "openAccess": true,
    "authors": [
      { "id": "auth-2407-21783-1", "name": "Abhimanyu Dubey", "department": "AI Research Lab" },
      { "id": "auth-2407-21783-2", "name": "Abhinav Jauhri", "department": "AI Research Lab" },
      { "id": "auth-2407-21783-3", "name": "Abhinav Pandey", "department": "AI Research Lab" }
    ],
    "researchProblemId": "prob-3",
    "researchProblemName": "Efficient Foundation Language Models & Scaling Laws",
    "statements": [
      { "id": "st-2407-21783-1", "paperId": "paper-2407-21783", "subject": "Llama 3 Herd of Models", "predicate": "proposed_by", "object": "Abhimanyu Dubey et al. (2024)" },
      { "id": "st-2407-21783-2", "paperId": "paper-2407-21783", "subject": "Llama 3 Herd of Models", "predicate": "addresses_problem", "object": "Efficient Foundation Language Models & Scaling Laws" },
      { "id": "st-2407-21783-3", "paperId": "paper-2407-21783", "subject": "Llama 3 Herd of Models", "predicate": "source_archive", "object": "arXiv Preprint (2407.21783)" }
    ]
  },
  {
    "id": "paper-2401-04088",
    "title": "Mixtral of Experts",
    "abstract": "We introduce Mixtral 8x7B, a Sparse Mixture-of-Experts (SMoE) language model. Mixtral has the same architecture as Mistral 7B, with the difference that each layer is composed of 8 feed-forward blocks (experts). For every token, at each layer, a router network selects two experts to process the current state and combine their outputs. Mixtral outperforms Llama 2 70B on most benchmarks with 6x faster inference speed and handles a 32k context window seamlessly.",
    "doi": "10.48550/arXiv.2401.04088",
    "year": 2024,
    "venue": "arXiv 2024",
    "pdfUrl": "https://arxiv.org/pdf/2401.04088.pdf",
    "openAccess": true,
    "authors": [
      { "id": "auth-2401-04088-1", "name": "Albert Q. Jiang", "department": "AI Research Lab" },
      { "id": "auth-2401-04088-2", "name": "Alexandre Sablayrolles", "department": "AI Research Lab" }
    ],
    "researchProblemId": "prob-3",
    "researchProblemName": "Efficient Foundation Language Models & Scaling Laws",
    "statements": [
      { "id": "st-2401-04088-1", "paperId": "paper-2401-04088", "subject": "Mixtral of Experts", "predicate": "proposed_by", "object": "Albert Q. Jiang et al. (2024)" },
      { "id": "st-2401-04088-2", "paperId": "paper-2401-04088", "subject": "Mixtral of Experts", "predicate": "addresses_problem", "object": "Efficient Foundation Language Models & Scaling Laws" }
    ]
  },
  {
    "id": "paper-2405-04434",
    "title": "DeepSeek-V2: Strong, Economical, and Efficient Mixture-of-Experts",
    "abstract": "We present DeepSeek-V2, an open-source Mixture-of-Experts (MoE) language model featuring 236B total parameters with 21B active parameters per token. DeepSeek-V2 introduces Multi-head Latent Attention (MLA) to compress Key-Value caches significantly while delivering competitive reasoning, coding, and mathematical capabilities at a fraction of standard training and deployment costs.",
    "doi": "10.48550/arXiv.2405.04434",
    "year": 2024,
    "venue": "arXiv 2024",
    "pdfUrl": "https://arxiv.org/pdf/2405.04434.pdf",
    "openAccess": true,
    "authors": [
      { "id": "auth-2405-04434-1", "name": "DeepSeek AI Team", "department": "AI Research Lab" }
    ],
    "researchProblemId": "prob-3",
    "researchProblemName": "Efficient Foundation Language Models & Scaling Laws",
    "statements": [
      { "id": "st-2405-04434-1", "paperId": "paper-2405-04434", "subject": "DeepSeek-V2", "predicate": "proposed_by", "object": "DeepSeek AI Team (2024)" }
    ]
  },
  {
    "id": "paper-2312-00752",
    "title": "Mamba: Linear-Time Sequence Modeling with Selective State Spaces",
    "abstract": "Fundamental sequence models in deep learning are dominated by Transformers with sub-quadratic O(N^2) attention complexity. We introduce Mamba, a selective state space model (SSM) architecture that achieves linear-time O(N) scaling with sequence length. Mamba improves hardware utilization on GPUs and outperforms Transformers of equivalent size on language, audio, and genomics modeling.",
    "doi": "10.48550/arXiv.2312.00752",
    "year": 2023,
    "venue": "arXiv 2023",
    "pdfUrl": "https://arxiv.org/pdf/2312.00752.pdf",
    "openAccess": true,
    "authors": [
      { "id": "auth-2312-00752-1", "name": "Albert Gu", "department": "Computer Science" },
      { "id": "auth-2312-00752-2", "name": "Tri Dao", "department": "Computer Science" }
    ],
    "researchProblemId": "prob-1",
    "researchProblemName": "Sequence-to-Sequence Modeling & Neural Machine Translation",
    "statements": [
      { "id": "st-2312-00752-1", "paperId": "paper-2312-00752", "subject": "Mamba Selective SSM", "predicate": "proposed_by", "object": "Albert Gu & Tri Dao (2023)" }
    ]
  },
  {
    "id": "paper-2405-08763",
    "title": "Accurate Structure Prediction of Biomolecular Interactions with AlphaFold 3",
    "abstract": "We introduce AlphaFold 3, a joint deep-learning model capable of predicting the 3D structures and molecular interactions of proteins, DNA, RNA, small molecule ligands, and chemical modifications. AlphaFold 3 achieves unprecedented accuracy in predicting protein-ligand and protein-nucleic acid complexes, surpassing specialized docking programs.",
    "doi": "10.48550/arXiv.2405.08763",
    "year": 2024,
    "venue": "Nature / arXiv 2024",
    "pdfUrl": "https://arxiv.org/pdf/2405.08763.pdf",
    "openAccess": true,
    "authors": [
      { "id": "auth-2405-08763-1", "name": "Josh Abramson", "department": "Biomedical Engineering" },
      { "id": "auth-2405-08763-2", "name": "Jonas Adler", "department": "Biomedical Engineering" },
      { "id": "auth-2405-08763-3", "name": "John Jumper", "department": "Biomedical Engineering" },
      { "id": "auth-2405-08763-4", "name": "Demis Hassabis", "department": "Biomedical Engineering" }
    ],
    "researchProblemId": "prob-5",
    "researchProblemName": "3D Protein Structure Prediction from Amino Acid Sequences",
    "statements": [
      { "id": "st-2405-08763-1", "paperId": "paper-2405-08763", "subject": "AlphaFold 3", "predicate": "proposed_by", "object": "Josh Abramson, John Jumper, Demis Hassabis et al. (2024)" },
      { "id": "st-2405-08763-2", "paperId": "paper-2405-08763", "subject": "AlphaFold 3", "predicate": "addresses_problem", "object": "3D Protein Structure Prediction from Amino Acid Sequences" }
    ]
  },
  {
    "id": "paper-2207-14238",
    "title": "ESMFold: Evolutionary Scale Language Models for Fast Protein Structure Prediction",
    "abstract": "We present ESMFold, an end-to-end protein structure prediction framework powered by a 15-billion parameter language model trained on evolutionary sequence diversity across millions of natural proteins. ESMFold generates atomic protein structures directly from single sequences up to 60x faster than MSA-based models.",
    "doi": "10.48550/arXiv.2207.14238",
    "year": 2022,
    "venue": "Science / arXiv 2022",
    "pdfUrl": "https://arxiv.org/pdf/2207.14238.pdf",
    "openAccess": true,
    "authors": [
      { "id": "auth-2207-14238-1", "name": "Zeming Lin", "department": "Biomedical Engineering" },
      { "id": "auth-2207-14238-2", "name": "Halil Akin H", "department": "Biomedical Engineering" }
    ],
    "researchProblemId": "prob-5",
    "researchProblemName": "3D Protein Structure Prediction from Amino Acid Sequences",
    "statements": [
      { "id": "st-2207-14238-1", "paperId": "paper-2207-14238", "subject": "ESMFold", "predicate": "proposed_by", "object": "Zeming Lin et al. (2022)" }
    ]
  },
  {
    "id": "paper-2103-14030",
    "title": "Swin Transformer: Hierarchical Vision Transformer using Shifted Windows",
    "abstract": "We introduce Swin Transformer, a general-purpose vision backbone network that builds hierarchical feature representations by computing self-attention within local shifted windows. Swin Transformer achieves top-1 ImageNet accuracy of 87.3% and sets new state-of-the-art records on COCO object detection and ADE20K semantic segmentation.",
    "doi": "10.48550/arXiv.2103.14030",
    "year": 2021,
    "venue": "ICCV 2021",
    "pdfUrl": "https://arxiv.org/pdf/2103.14030.pdf",
    "openAccess": true,
    "authors": [
      { "id": "auth-2103-14030-1", "name": "Ze Liu", "department": "Computer Vision" },
      { "id": "auth-2103-14030-2", "name": "Yutong Lin", "department": "Computer Vision" }
    ],
    "researchProblemId": "prob-4",
    "researchProblemName": "Deep Residual Learning & Image Classification",
    "statements": [
      { "id": "st-2103-14030-1", "paperId": "paper-2103-14030", "subject": "Swin Transformer", "predicate": "proposed_by", "object": "Ze Liu et al. (2021)" }
    ]
  },
  {
    "id": "paper-2212-04356",
    "title": "Robust Speech Recognition via Large-Scale Weak Supervision (Whisper)",
    "abstract": "We study the robustness and capabilities of speech recognition systems trained on 680,000 hours of multilingual weakly supervised web audio. Our model, Whisper, approaches human-level accuracy in automatic speech recognition (ASR), zero-shot translation, and voice activity detection without fine-tuning.",
    "doi": "10.48550/arXiv.2212.04356",
    "year": 2022,
    "venue": "arXiv 2022",
    "pdfUrl": "https://arxiv.org/pdf/2212.04356.pdf",
    "openAccess": true,
    "authors": [
      { "id": "auth-2212-04356-1", "name": "Alec Radford", "department": "AI Research Lab" },
      { "id": "auth-2212-04356-2", "name": "Jong Wook Kim", "department": "AI Research Lab" }
    ],
    "researchProblemId": "prob-1",
    "researchProblemName": "Sequence-to-Sequence Modeling & Neural Machine Translation",
    "statements": [
      { "id": "st-2212-04356-1", "paperId": "paper-2212-04356", "subject": "Whisper Speech ASR", "predicate": "proposed_by", "object": "Alec Radford & Jong Wook Kim (2022)" }
    ]
  },
  {
    "id": "paper-2307-08691",
    "title": "FlashAttention-2: Faster Attention with Better Parallelism and Work Partitioning",
    "abstract": "We present FlashAttention-2, an algorithm to compute exact attention on GPUs with up to 2x speedup compared to FlashAttention-1, reaching 50-73% of theoretical peak GPU FLOPs throughput. FlashAttention-2 optimizes threadblock warp partitioning and sequence parallelization across GPU SMs.",
    "doi": "10.48550/arXiv.2307-08691",
    "year": 2023,
    "venue": "arXiv 2023",
    "pdfUrl": "https://arxiv.org/pdf/2307.08691.pdf",
    "openAccess": true,
    "authors": [
      { "id": "auth-2307-08691-1", "name": "Tri Dao", "department": "Computer Science" }
    ],
    "researchProblemId": "prob-3",
    "researchProblemName": "Efficient Foundation Language Models & Scaling Laws",
    "statements": [
      { "id": "st-2307-08691-1", "paperId": "paper-2307-08691", "subject": "FlashAttention-2", "predicate": "proposed_by", "object": "Tri Dao (2023)" }
    ]
  },
  {
    "id": "paper-2203-15556",
    "title": "Training Compute-Optimal Large Language Models (Chinchilla)",
    "abstract": "We investigate the optimal allocation of compute budget between model size and training data tokens. By training over 400 language models ranging from 70M to 16B parameters on 5B to 500B tokens, we find that current LLMs are significantly undertrained. We introduce Chinchilla, a 70B parameter model trained on 1.4T tokens that outperforms the 280B Gopher model.",
    "doi": "10.48550/arXiv.2203.15556",
    "year": 2022,
    "venue": "NeurIPS 2022",
    "pdfUrl": "https://arxiv.org/pdf/2203.15556.pdf",
    "openAccess": true,
    "authors": [
      { "id": "auth-2203-15556-1", "name": "Jordan Hoffmann", "department": "AI Research Lab" },
      { "id": "auth-2203-15556-2", "name": "Arthur Bersch", "department": "AI Research Lab" }
    ],
    "researchProblemId": "prob-3",
    "researchProblemName": "Efficient Foundation Language Models & Scaling Laws",
    "statements": [
      { "id": "st-2203-15556-1", "paperId": "paper-2203-15556", "subject": "Chinchilla Compute-Optimal Scaling", "predicate": "proposed_by", "object": "Jordan Hoffmann et al. (2022)" }
    ]
  },
  {
    "id": "paper-1907-11692",
    "title": "RoBERTa: A Robustly Optimized BERT Pretraining Approach",
    "abstract": "Language model pretraining has led to significant performance gains, but careful comparison between different approaches is challenging. We present a replication study of BERT pretraining that measures the impact of hyperparameter tuning and training set size. We find that BERT was significantly undertrained and propose RoBERTa, which matches or exceeds post-BERT models on GLUE.",
    "doi": "10.48550/arXiv.1907.11692",
    "year": 2019,
    "venue": "arXiv 2019",
    "pdfUrl": "https://arxiv.org/pdf/1907.11692.pdf",
    "openAccess": true,
    "authors": [
      { "id": "auth-1907-11692-1", "name": "Yinhan Liu", "department": "AI Research Lab" },
      { "id": "auth-1907-11692-2", "name": "Myle Ott", "department": "AI Research Lab" }
    ],
    "researchProblemId": "prob-2",
    "researchProblemName": "Contextual Language Representation & Masked Pre-training",
    "statements": [
      { "id": "st-1907-11692-1", "paperId": "paper-1907-11692", "subject": "RoBERTa Pretraining", "predicate": "proposed_by", "object": "Yinhan Liu et al. (2019)" }
    ]
  },
  {
    "id": "paper-1609-02907",
    "title": "Semi-Supervised Classification with Graph Convolutional Networks (GCN)",
    "abstract": "We present a scalable approach for semi-supervised learning on graph-structured data based on an efficient variant of convolutional neural networks which operate directly on graphs. Our formulation uses a localized first-order approximation of spectral graph convolutions and achieves state-of-the-art node classification performance.",
    "doi": "10.48550/arXiv.1609.02907",
    "year": 2016,
    "venue": "ICLR 2017",
    "pdfUrl": "https://arxiv.org/pdf/1609.02907.pdf",
    "openAccess": true,
    "authors": [
      { "id": "auth-1609-02907-1", "name": "Thomas N. Kipf", "department": "Computer Science" },
      { "id": "auth-1609-02907-2", "name": "Max Welling", "department": "Computer Science" }
    ],
    "researchProblemId": "prob-1",
    "researchProblemName": "Sequence-to-Sequence Modeling & Neural Machine Translation",
    "statements": [
      { "id": "st-1609-02907-1", "paperId": "paper-1609-02907", "subject": "Graph Convolutional Networks (GCN)", "predicate": "proposed_by", "object": "Thomas N. Kipf & Max Welling (2016)" }
    ]
  },
  {
    "id": "paper-1710-10903",
    "title": "Graph Attention Networks (GAT)",
    "abstract": "We present Graph Attention Networks (GATs), novel neural network architectures that operate on graph-structured data, leveraging masked self-attentional layers to address the shortcomings of prior graph convolutions. By enabling nodes to attend over their neighborhood features, GAT specifies different weights to different nodes in a neighborhood dynamically.",
    "doi": "10.48550/arXiv.1710.10903",
    "year": 2017,
    "venue": "ICLR 2018",
    "pdfUrl": "https://arxiv.org/pdf/1710.10903.pdf",
    "openAccess": true,
    "authors": [
      { "id": "auth-1710-10903-1", "name": "Petar Veličković", "department": "Computer Science" },
      { "id": "auth-1710-10903-2", "name": "Guillem Cucurull", "department": "Computer Science" }
    ],
    "researchProblemId": "prob-1",
    "researchProblemName": "Sequence-to-Sequence Modeling & Neural Machine Translation",
    "statements": [
      { "id": "st-1710-10903-1", "paperId": "paper-1710-10903", "subject": "Graph Attention Networks (GAT)", "predicate": "proposed_by", "object": "Petar Veličković et al. (2017)" }
    ]
  },
  {
    "id": "paper-2305-09972",
    "title": "Ultralytics YOLOv8 for Real-Time Object Detection and Instance Segmentation",
    "abstract": "We introduce YOLOv8, a cutting-edge real-time computer vision framework designed for object detection, instance segmentation, and pose estimation. YOLOv8 features an anchor-free split head architecture, improved loss functions, and accelerated C2f modules.",
    "doi": "10.48550/arXiv.2305.09972",
    "year": 2023,
    "venue": "arXiv 2023",
    "pdfUrl": "https://arxiv.org/pdf/2305.09972.pdf",
    "openAccess": true,
    "authors": [
      { "id": "auth-2305-09972-1", "name": "Glenn Jocher", "department": "Computer Vision" }
    ],
    "researchProblemId": "prob-4",
    "researchProblemName": "Deep Residual Learning & Image Classification",
    "statements": [
      { "id": "st-2305-09972-1", "paperId": "paper-2305-09972", "subject": "YOLOv8 Object Detection", "predicate": "proposed_by", "object": "Glenn Jocher (2023)" }
    ]
  },
  {
    "id": "paper-2305-10403",
    "title": "PaLM 2 Technical Report",
    "abstract": "We introduce PaLM 2, a new state-of-the-art language model with significantly improved multilingual, reasoning, and coding capabilities. PaLM 2 is evaluated across diverse benchmarks, demonstrating strong reasoning performance while being trained on a compute-optimal token-to-parameter ratio across 100+ languages.",
    "doi": "10.48550/arXiv.2305.10403",
    "year": 2023,
    "venue": "arXiv 2023",
    "pdfUrl": "https://arxiv.org/pdf/2305.10403.pdf",
    "openAccess": true,
    "authors": [
      { "id": "auth-2305-10403-1", "name": "Rohan Anil", "department": "AI Research Lab" },
      { "id": "auth-2305-10403-2", "name": "Andrew M. Dai", "department": "AI Research Lab" }
    ],
    "researchProblemId": "prob-3",
    "researchProblemName": "Efficient Foundation Language Models & Scaling Laws",
    "statements": [
      { "id": "st-2305-10403-1", "paperId": "paper-2305-10403", "subject": "PaLM 2 Foundation Model", "predicate": "proposed_by", "object": "Rohan Anil et al. (2023)" }
    ]
  },
  {
    "id": "paper-2106-09685",
    "title": "LoRA: Low-Rank Adaptation of Large Language Models",
    "abstract": "We propose Low-Rank Adaptation, or LoRA, which freezes the pre-trained model weights and injects trainable rank decomposition matrices into each layer of the Transformer architecture, greatly reducing the number of trainable parameters for downstream tasks. Compared to GPT-3 175B fine-tuned with Adam, LoRA can reduce the number of trainable parameters by 10,000 times and the GPU memory requirement by 3 times.",
    "doi": "10.48550/arXiv.2106.09685",
    "year": 2021,
    "venue": "arXiv 2021",
    "pdfUrl": "https://arxiv.org/pdf/2106.09685.pdf",
    "openAccess": true,
    "authors": [
      { "id": "auth-2106-09685-1", "name": "Edward J. Hu", "department": "AI Research Lab" },
      { "id": "auth-2106-09685-2", "name": "Yelong Shen", "department": "AI Research Lab" }
    ],
    "researchProblemId": "prob-3",
    "researchProblemName": "Efficient Foundation Language Models & Scaling Laws",
    "statements": [
      { "id": "st-2106-09685-1", "paperId": "paper-2106-09685", "subject": "LoRA Adaptation", "predicate": "proposed_by", "object": "Edward J. Hu et al. (2021)" }
    ]
  }
];

const MOCK_COMPARISONS = [
  {
    id: 'comp-1',
    title: 'State-of-the-Art Large Language Models Architecture & Training Comparison',
    description: 'Comprehensive comparison of Transformer, BERT, GPT-3, LLaMA, and InstructGPT models.',
    researchProblemId: 'prob-3',
    problemName: 'Efficient Foundation Language Models & Scaling Laws',
    field: 'Computer Science / Natural Language Processing',
    properties: ['Architecture', 'Parameters', 'Pre-training Dataset', 'Context Window', 'Attention Type'],
    papers: [
      {
        id: 'paper-1706-03762',
        title: 'Attention Is All You Need',
        year: 2017,
        venue: 'NeurIPS 2017',
        authors: ['Ashish Vaswani', 'Noam Shazeer', 'Niki Parmar'],
        pdfUrl: 'https://arxiv.org/pdf/1706.03762.pdf',
        values: {
          'Architecture': 'Encoder-Decoder Transformer',
          'Parameters': '65M - 213M',
          'Pre-training Dataset': 'WMT 2014 En-De / En-Fr',
          'Context Window': '512 tokens',
          'Attention Type': 'Multi-Head Self-Attention'
        }
      },
      {
        id: 'paper-1810-04805',
        title: 'BERT: Pre-training of Deep Bidirectional Transformers for Language Understanding',
        year: 2018,
        venue: 'NAACL 2019',
        authors: ['Jacob Devlin', 'Ming-Wei Chang', 'Kenton Lee'],
        pdfUrl: 'https://arxiv.org/pdf/1810.04805.pdf',
        values: {
          'Architecture': 'Bidirectional Transformer Encoder',
          'Parameters': '110M (Base) / 340M (Large)',
          'Pre-training Dataset': 'BooksCorpus (800M) + English Wikipedia (2,500M)',
          'Context Window': '512 tokens',
          'Attention Type': 'Masked Language Model (MLM)'
        }
      },
      {
        id: 'paper-2005-14165',
        title: 'Language Models are Few-Shot Learners',
        year: 2020,
        venue: 'NeurIPS 2020',
        authors: ['Tom B. Brown', 'Benjamin Mann', 'Nick Ryder'],
        pdfUrl: 'https://arxiv.org/pdf/2005.14165.pdf',
        values: {
          'Architecture': 'Autoregressive Transformer Decoder',
          'Parameters': '175 Billion',
          'Pre-training Dataset': 'Filtered Common Crawl (410B) + WebText2 (19B)',
          'Context Window': '2048 tokens',
          'Attention Type': 'Alternating Dense & Sparse Self-Attention'
        }
      },
      {
        id: 'paper-2302-13971',
        title: 'LLaMA: Open and Efficient Foundation Language Models',
        year: 2023,
        venue: 'arXiv 2023',
        authors: ['Hugo Touvron', 'Thibaut Lavril', 'Gautier Izacard'],
        pdfUrl: 'https://arxiv.org/pdf/2302.13971.pdf',
        values: {
          'Architecture': 'Decoder-only Transformer (RoPE + SwiGLU)',
          'Parameters': '7B / 13B / 33B / 65B',
          'Pre-training Dataset': '1.4 Trillion Tokens (Public Data Only)',
          'Context Window': '2048 tokens',
          'Attention Type': 'Rotary Positional Embedding (RoPE)'
        }
      }
    ]
  },
  {
    id: 'comp-2',
    title: 'Computer Vision Backbones: ResNet vs Vision Transformers (ViT) vs CLIP',
    description: 'Structural and empirical analysis of convolutional and self-attention vision networks.',
    researchProblemId: 'prob-4',
    problemName: 'Deep Residual Learning & Image Classification',
    field: 'Computer Science / Computer Vision',
    properties: ['Backbone Type', 'Top-1 ImageNet Accuracy', 'Inductive Bias', 'Pre-training Scale'],
    papers: [
      {
        id: 'paper-1512-03385',
        title: 'Deep Residual Learning for Image Recognition',
        year: 2015,
        venue: 'CVPR 2016',
        authors: ['Kaiming He', 'Xiangyu Zhang', 'Shaoqing Ren'],
        pdfUrl: 'https://arxiv.org/pdf/1512.03385.pdf',
        values: {
          'Backbone Type': 'Deep Convolutional Residual (ResNet-152)',
          'Top-1 ImageNet Accuracy': '78.57%',
          'Inductive Bias': 'High (Translation Invariance & Locality)',
          'Pre-training Scale': '1.28 Million Images (ImageNet-1k)'
        }
      },
      {
        id: 'paper-2010-11929',
        title: 'An Image is Worth 16x16 Words: Transformers for Image Recognition at Scale',
        year: 2020,
        venue: 'ICLR 2021',
        authors: ['Alexey Dosovitskiy', 'Lucas Beyer', 'Alexander Kolesnikov'],
        pdfUrl: 'https://arxiv.org/pdf/2010.11929.pdf',
        values: {
          'Backbone Type': 'Pure Transformer Encoder on 16x16 Patches (ViT-H/14)',
          'Top-1 ImageNet Accuracy': '88.55%',
          'Inductive Bias': 'Low (Global Self-Attention)',
          'Pre-training Scale': '300 Million Images (JFT-300M)'
        }
      },
      {
        id: 'paper-2103-00020',
        title: 'Learning Transferable Visual Models From Natural Language Supervision',
        year: 2021,
        venue: 'ICML 2021',
        authors: ['Alec Radford', 'Jong Wook Kim', 'Chris Hallacy'],
        pdfUrl: 'https://arxiv.org/pdf/2103.00020.pdf',
        values: {
          'Backbone Type': 'Dual Image-Text Encoder (Contrastive Learning)',
          'Top-1 ImageNet Accuracy': '76.2% (Zero-Shot)',
          'Inductive Bias': 'Multimodal Contrastive Alignment',
          'Pre-training Scale': '400 Million Image-Text Pairs (WIT)'
        }
      }
    ]
  }
];

// GET /stats
app.get('/stats', (req, res) => {
  res.json({
    papersCount: MOCK_PAPERS.length,
    authorsCount: 28,
    problemsCount: MOCK_RESEARCH_PROBLEMS.length,
    comparisonsCount: MOCK_COMPARISONS.length,
    statementsCount: MOCK_PAPERS.reduce((acc, p) => acc + (p.statements ? p.statements.length : 0), 0),
    entitiesCount: MOCK_PAPERS.length + 28 + 145,
  });
});

// GET /comparisons
app.get('/comparisons', (req, res) => {
  res.json(MOCK_COMPARISONS);
});

// GET /comparisons/:id
app.get('/comparisons/:id', (req, res) => {
  const comp = MOCK_COMPARISONS.find(c => c.id === req.params.id);
  if (!comp) return res.status(404).json({ error: 'Comparison not found' });
  res.json(comp);
});

// GET /problems
app.get('/problems', (req, res) => {
  res.json(MOCK_RESEARCH_PROBLEMS);
});

// GET /problems/:id
app.get('/problems/:id', (req, res) => {
  const prob = MOCK_RESEARCH_PROBLEMS.find(p => p.id === req.params.id);
  if (!prob) return res.status(404).json({ error: 'Research problem not found' });
  res.json(prob);
});

// GET /papers/search
app.get('/papers/search', (req, res) => {
  const q = (req.query.q || '').toLowerCase().trim();
  if (!q) return res.json(MOCK_PAPERS);

  const filtered = MOCK_PAPERS.filter(p =>
    p.title.toLowerCase().includes(q) ||
    p.abstract.toLowerCase().includes(q) ||
    (p.authors && p.authors.some(a => a.name.toLowerCase().includes(q)))
  );
  res.json(filtered);
});

// GET /papers/:id/graph
app.get('/papers/:id/graph', (req, res) => {
  const paper = MOCK_PAPERS.find(p => p.id === req.params.id);
  if (!paper) return res.status(404).json({ error: 'Paper not found' });

  const nodes = [];
  const links = [];
  
  nodes.push({ id: paper.id, name: paper.title, group: 'paper' });
  
  (paper.authors || []).forEach(a => {
    nodes.push({ id: a.id, name: a.name, group: 'author' });
    links.push({ source: a.id, target: paper.id, label: 'authored' });
  });
  
  (paper.statements || []).forEach(st => {
    const objId = 'concept-' + st.object.toLowerCase().replace(/[^a-z0-9]/g, '-');
    nodes.push({ id: objId, name: st.object, group: 'concept' });
    links.push({ source: paper.id, target: objId, label: st.predicate });
  });

  res.json({ nodes, links });
});

// GET /papers/:id
app.get('/papers/:id', (req, res) => {
  const paper = MOCK_PAPERS.find(p => p.id === req.params.id);
  if (!paper) return res.status(404).json({ error: 'Paper not found' });
  res.json(paper);
});

// GET /papers
app.get('/papers', (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 50;
  const search = req.query.search;

  let filtered = [...MOCK_PAPERS];
  if (search) {
    const q = search.toLowerCase();
    filtered = filtered.filter(p => 
      p.title.toLowerCase().includes(q) || 
      p.abstract.toLowerCase().includes(q) ||
      (p.authors && p.authors.some(a => a.name.toLowerCase().includes(q)))
    );
  }

  res.json({
    data: filtered.slice((page - 1) * limit, page * limit),
    total: filtered.length,
    page,
    totalPages: Math.ceil(filtered.length / limit)
  });
});

// GET /graph
app.get('/graph', (req, res) => {
  const nodes = [];
  const links = [];
  const nodeMap = new Set();

  MOCK_RESEARCH_PROBLEMS.forEach(p => {
    if (!nodeMap.has(p.id)) {
      nodeMap.add(p.id);
      nodes.push({ id: p.id, name: p.name, group: 'problem' });
    }
  });

  MOCK_PAPERS.forEach(p => {
    if (!nodeMap.has(p.id)) {
      nodeMap.add(p.id);
      nodes.push({ id: p.id, name: p.title, group: 'paper' });
    }

    if (p.researchProblemId && nodeMap.has(p.researchProblemId)) {
      links.push({ source: p.id, target: p.researchProblemId, label: 'addresses_problem' });
    }
  });

  res.json({ nodes, links });
});

// POST /ingest/arxiv
app.post('/ingest/arxiv', (req, res) => {
  const { arxivId } = req.body;
  if (!arxivId) return res.status(400).json({ error: 'arXiv ID required' });

  const cleanId = String(arxivId).trim().replace(/^https?:\/\/arxiv\.org\/abs\//, '').replace(/^https?:\/\/arxiv\.org\/pdf\//, '').replace(/\.pdf$/, '');
  
  const newPaper = {
    id: 'paper-arxiv-' + cleanId,
    title: 'arXiv Research Paper (' + cleanId + ')',
    abstract: 'Open-access arXiv research paper ' + cleanId + ' ingested into Nexus Scholar Knowledge Graph.',
    doi: '10.48550/arXiv.' + cleanId,
    year: 2024,
    venue: 'arXiv 2024',
    pdfUrl: 'https://arxiv.org/pdf/' + cleanId + '.pdf',
    openAccess: true,
    authors: [{ id: 'auth-' + cleanId + '-1', name: 'arXiv Contributor' }],
    statements: [
      { id: 'st-' + cleanId + '-1', paperId: 'paper-arxiv-' + cleanId, subject: 'arXiv ' + cleanId, predicate: 'source_repository', object: 'arXiv Open Access' }
    ]
  };

  MOCK_PAPERS.unshift(newPaper);
  res.json({ message: 'Paper successfully ingested!', paper: newPaper });
});

module.exports = app;
