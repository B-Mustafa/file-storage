import { create } from "zustand";

interface AppState {
    isDeleteModalOpen: boolean;
    setIsDeleteModalOpen: (open: boolean) => void;

    isRenameModalOpen: boolean;
    setIsRenameModalOpen: (open: boolean) => void;
    
    fileId: string | null;
    setFileId: (fileId: string) => void;
    
    filename: string;
    setFilename: (filename: string) => void;
}

export const useAppStore = create<AppState>((set) => ({
    fileId: null,
    setFileId: (fileId: string) => set({ fileId }),
    
    filename: "",
    setFilename: (filename: string) => set({ filename }),
    
    isDeleteModalOpen: false,
    setIsDeleteModalOpen: (open: boolean) => set({ isDeleteModalOpen: open }),
  
    isRenameModalOpen: false,
    setIsRenameModalOpen: (open: boolean) => set({ isRenameModalOpen: open }),
  }));