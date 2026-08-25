import { create } from 'zustand';

interface GraphState {
  currentEntityId: string | null;
  setCurrentEntityId: (id: string | null) => void;
  stats: { docs: number; entities: number; relationships: number };
  setStats: (stats: any) => void;
}

export const useGraphStore = create<GraphState>((set) => ({
  currentEntityId: null,
  setCurrentEntityId: (id) => set({ currentEntityId: id }),
  stats: { docs: 0, entities: 0, relationships: 0 },
  setStats: (stats) => set({ stats }),
}));
