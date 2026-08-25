import { create } from 'zustand';

// Rich mock data for demonstrating the full feature set
export const MOCK_NODES = [
  { id: '1', name: 'Dr. Sarah Chen', type: 'author', department: 'Computer Science', val: 5 },
  { id: '2', name: 'Prof. James Miller', type: 'author', department: 'Computer Science', val: 4 },
  { id: '3', name: 'Dr. Aisha Patel', type: 'author', department: 'Biomedical Engineering', val: 5 },
  { id: '4', name: 'Prof. Marco Rossi', type: 'author', department: 'Physics', val: 3 },
  { id: '5', name: 'Dr. Emily Nakamura', type: 'author', department: 'Mathematics', val: 4 },
  { id: '6', name: 'Prof. David Okonkwo', type: 'author', department: 'Chemistry', val: 3 },
  { id: '7', name: 'Deep Learning', type: 'concept', department: 'Computer Science', val: 8 },
  { id: '8', name: 'Neural Networks', type: 'concept', department: 'Computer Science', val: 6 },
  { id: '9', name: 'Protein Folding', type: 'concept', department: 'Biomedical Engineering', val: 7 },
  { id: '10', name: 'Quantum Computing', type: 'concept', department: 'Physics', val: 5 },
  { id: '11', name: 'Graph Theory', type: 'concept', department: 'Mathematics', val: 4 },
  { id: '12', name: 'Molecular Dynamics', type: 'concept', department: 'Chemistry', val: 5 },
  { id: '13', name: 'Transformer Architecture', type: 'method', department: 'Computer Science', val: 6 },
  { id: '14', name: 'Monte Carlo Simulation', type: 'method', department: 'Physics', val: 4 },
  { id: '15', name: 'GNN (Graph Neural Nets)', type: 'method', department: 'Computer Science', val: 5 },
  { id: '16', name: 'ImageNet', type: 'dataset', department: 'Computer Science', val: 3 },
  { id: '17', name: 'PDB (Protein Data Bank)', type: 'dataset', department: 'Biomedical Engineering', val: 4 },
  { id: '18', name: 'CERN Open Data', type: 'dataset', department: 'Physics', val: 3 },
  { id: '19', name: 'Computer Science', type: 'department', department: 'Computer Science', val: 10 },
  { id: '20', name: 'Biomedical Engineering', type: 'department', department: 'Biomedical Engineering', val: 8 },
  { id: '21', name: 'Physics', type: 'department', department: 'Physics', val: 7 },
  { id: '22', name: 'Mathematics', type: 'department', department: 'Mathematics', val: 6 },
  { id: '23', name: 'Chemistry', type: 'department', department: 'Chemistry', val: 6 },
];

export const MOCK_LINKS = [
  { source: '1', target: '7', name: 'researches', type: 'researches' },
  { source: '1', target: '13', name: 'uses_method', type: 'uses_method' },
  { source: '1', target: '19', name: 'belongs_to', type: 'belongs_to' },
  { source: '2', target: '8', name: 'researches', type: 'researches' },
  { source: '2', target: '15', name: 'uses_method', type: 'uses_method' },
  { source: '2', target: '19', name: 'belongs_to', type: 'belongs_to' },
  { source: '3', target: '9', name: 'researches', type: 'researches' },
  { source: '3', target: '7', name: 'researches', type: 'researches' },
  { source: '3', target: '20', name: 'belongs_to', type: 'belongs_to' },
  { source: '4', target: '10', name: 'researches', type: 'researches' },
  { source: '4', target: '14', name: 'uses_method', type: 'uses_method' },
  { source: '4', target: '21', name: 'belongs_to', type: 'belongs_to' },
  { source: '5', target: '11', name: 'researches', type: 'researches' },
  { source: '5', target: '15', name: 'uses_method', type: 'uses_method' },
  { source: '5', target: '22', name: 'belongs_to', type: 'belongs_to' },
  { source: '6', target: '12', name: 'researches', type: 'researches' },
  { source: '6', target: '23', name: 'belongs_to', type: 'belongs_to' },
  { source: '7', target: '8', name: 'related_to', type: 'related_to' },
  { source: '7', target: '9', name: 'cross_discipline', type: 'cross_discipline' },
  { source: '8', target: '13', name: 'implements', type: 'implements' },
  { source: '9', target: '12', name: 'cross_discipline', type: 'cross_discipline' },
  { source: '10', target: '14', name: 'implements', type: 'implements' },
  { source: '11', target: '15', name: 'implements', type: 'implements' },
  { source: '1', target: '16', name: 'uses_dataset', type: 'uses_dataset' },
  { source: '3', target: '17', name: 'uses_dataset', type: 'uses_dataset' },
  { source: '4', target: '18', name: 'uses_dataset', type: 'uses_dataset' },
  { source: '1', target: '3', name: 'collaborates_with', type: 'collaborates_with' },
  { source: '2', target: '5', name: 'collaborates_with', type: 'collaborates_with' },
  { source: '6', target: '3', name: 'collaborates_with', type: 'collaborates_with' },
];

export const MOCK_ACTIVITY = [
  { id: 1, type: 'ingest', title: 'Uploaded: "Attention Is All You Need.pdf"', time: '2 min ago', department: 'Computer Science' },
  { id: 2, type: 'entity', title: 'Extracted 14 entities from "Protein Structure Prediction"', time: '8 min ago', department: 'Biomedical Engineering' },
  { id: 3, type: 'relationship', title: 'Discovered cross-disciplinary link: Deep Learning ↔ Protein Folding', time: '12 min ago', department: 'Cross-Dept' },
  { id: 4, type: 'redundancy', title: 'Redundancy detected: 87% overlap between 2 papers on GNNs', time: '25 min ago', department: 'Computer Science' },
  { id: 5, type: 'collaboration', title: 'New collaboration path: Dr. Chen → Prof. Rossi (via Quantum ML)', time: '1 hr ago', department: 'Physics' },
  { id: 6, type: 'ingest', title: 'Uploaded: "monte_carlo_sim.zip" (code repository)', time: '2 hrs ago', department: 'Physics' },
];

export const MOCK_REDUNDANCIES = [
  {
    id: 1,
    paper1: { title: 'Deep Learning for Graph Classification', authors: ['Dr. Sarah Chen', 'Prof. James Miller'], department: 'Computer Science' },
    paper2: { title: 'Neural Graph Classification Methods', authors: ['Dr. Emily Nakamura'], department: 'Mathematics' },
    similarity: 0.87,
    sharedEntities: ['Graph Neural Networks', 'Node Classification', 'Graph Isomorphism'],
    recommendation: 'High overlap detected — consider merging efforts or coordinating approaches.',
  },
  {
    id: 2,
    paper1: { title: 'Molecular Dynamics via ML Potentials', authors: ['Prof. David Okonkwo'], department: 'Chemistry' },
    paper2: { title: 'AI-Driven Protein Folding Simulations', authors: ['Dr. Aisha Patel'], department: 'Biomedical Engineering' },
    similarity: 0.72,
    sharedEntities: ['Molecular Dynamics', 'Force Fields', 'Deep Learning'],
    recommendation: 'Complementary angles detected — strong collaboration opportunity across departments.',
  },
  {
    id: 3,
    paper1: { title: 'Quantum Error Correction Codes', authors: ['Prof. Marco Rossi'], department: 'Physics' },
    paper2: { title: 'Topological Quantum Codes Survey', authors: ['Prof. Marco Rossi', 'Dr. Emily Nakamura'], department: 'Physics' },
    similarity: 0.65,
    sharedEntities: ['Quantum Error Correction', 'Stabilizer Codes'],
    recommendation: 'Moderate overlap — papers address different angles of the same topic.',
  },
];

export const MOCK_SEARCH_RESULTS = [
  { title: 'Attention Is All You Need — Transformer Architecture for Sequence Modeling', similarity: 0.94, department: 'Computer Science', entities: ['Transformer', 'Self-Attention', 'Sequence-to-Sequence'], type: 'pdf', snippet: '...we propose a new simple network architecture based entirely on attention mechanisms...' },
  { title: 'Graph Neural Networks for Protein Structure Prediction', similarity: 0.82, department: 'Biomedical Engineering', entities: ['GNN', 'Protein Folding', 'AlphaFold'], type: 'pdf', snippet: '...leveraging graph-based representations of amino acid residue contacts for improved prediction...' },
  { title: 'Monte Carlo Methods in Quantum Computing', similarity: 0.71, department: 'Physics', entities: ['Monte Carlo', 'Quantum Simulation', 'Sampling'], type: 'markdown', snippet: '...stochastic sampling techniques applied to quantum circuit simulations...' },
  { title: 'Spectral Methods on Graphs: A Survey', similarity: 0.68, department: 'Mathematics', entities: ['Graph Theory', 'Spectral Analysis', 'Laplacian'], type: 'pdf', snippet: '...comprehensive review of spectral methods for graph-structured data...' },
];

export const MOCK_COLLABORATION_PATH = [
  { id: '1', name: 'Dr. Sarah Chen', type: 'author', department: 'Computer Science' },
  { id: '7', name: 'Deep Learning', type: 'concept', department: 'Computer Science' },
  { id: '9', name: 'Protein Folding', type: 'concept', department: 'Biomedical Engineering' },
  { id: '3', name: 'Dr. Aisha Patel', type: 'author', department: 'Biomedical Engineering' },
  { id: '12', name: 'Molecular Dynamics', type: 'concept', department: 'Chemistry' },
  { id: '6', name: 'Prof. David Okonkwo', type: 'author', department: 'Chemistry' },
];

export const MOCK_SUGGESTED_COLLABORATIONS = [
  { author1: 'Dr. Sarah Chen', author2: 'Dr. Emily Nakamura', sharedTopics: ['Graph Neural Networks', 'Deep Learning'], strength: 0.85, departments: ['Computer Science', 'Mathematics'] },
  { author1: 'Prof. Marco Rossi', author2: 'Dr. Aisha Patel', sharedTopics: ['Simulation Methods', 'Computational Modeling'], strength: 0.62, departments: ['Physics', 'Biomedical Engineering'] },
  { author1: 'Prof. David Okonkwo', author2: 'Dr. Aisha Patel', sharedTopics: ['Molecular Dynamics', 'Protein Structure'], strength: 0.78, departments: ['Chemistry', 'Biomedical Engineering'] },
];

interface GraphState {
  currentEntityId: string | null;
  setCurrentEntityId: (id: string | null) => void;
  stats: {
    docs: number;
    entities: number;
    relationships: number;
    departments: number;
    redundancies: number;
    collaborations: number;
  };
  setStats: (stats: any) => void;

  // Graph filters
  activeEntityTypes: string[];
  toggleEntityType: (type: string) => void;
  departmentFilter: string | null;
  setDepartmentFilter: (dept: string | null) => void;
  dimensionMode: 'all' | 'topic' | 'author' | 'department' | 'method';
  setDimensionMode: (mode: 'all' | 'topic' | 'author' | 'department' | 'method') => void;

  // Processing pipeline
  processingStep: number;
  setProcessingStep: (step: number) => void;
}

export const useGraphStore = create<GraphState>((set) => ({
  currentEntityId: null,
  setCurrentEntityId: (id) => set({ currentEntityId: id }),
  stats: { docs: 47, entities: 312, relationships: 864, departments: 5, redundancies: 8, collaborations: 23 },
  setStats: (stats) => set({ stats }),

  activeEntityTypes: ['author', 'concept', 'method', 'dataset', 'department'],
  toggleEntityType: (type) =>
    set((state) => ({
      activeEntityTypes: state.activeEntityTypes.includes(type)
        ? state.activeEntityTypes.filter((t) => t !== type)
        : [...state.activeEntityTypes, type],
    })),
  departmentFilter: null,
  setDepartmentFilter: (dept) => set({ departmentFilter: dept }),
  dimensionMode: 'all',
  setDimensionMode: (mode) => set({ dimensionMode: mode }),

  processingStep: -1,
  setProcessingStep: (step) => set({ processingStep: step }),
}));
