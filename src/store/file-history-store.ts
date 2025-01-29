import { create } from "zustand";

export interface FileHistory {
  textFileName: string | null;
  text: string | null;
  isSuccess: boolean;
  timestamp: string;
}

interface FileHistoryStore {
  fileHistory: FileHistory[];
  resetFileHistory: () => void;
  appendFileHistory: (newFileHistory: Omit<FileHistory, "timestamp">) => void;
}

export const useFileHistoryStore = create<FileHistoryStore>((set) => ({
  fileHistory: [],
  resetFileHistory: () => set({ fileHistory: [] }),
  appendFileHistory: (newFileHistory) =>
    set((state) => ({
      fileHistory: [
        ...state.fileHistory,
        {
          ...newFileHistory,
          timestamp: new Date().toLocaleString(),
        },
      ],
    })),
}));
