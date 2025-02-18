import { create } from "zustand";

export interface FileHistory {
  fileName: string;
  text: string | null;
  isSuccess: boolean;
}

interface FileHistoryStore {
  fileHistory: FileHistory[];
  resetFileHistory: () => void;
  appendFileHistory: (newFileHistory: FileHistory) => void;
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
        },
      ],
    })),
}));
