import { create } from 'zustand';

/**
 * Global UI store — for cross-cutting concerns like modals, sidebars, theme.
 * Feature-specific state should live in its own feature store under `src/features/`.
 */
interface UIState {
  sidebarOpen: boolean;
  toggleSidebar: () => void;
  setSidebarOpen: (open: boolean) => void;
}

export const useUIStore = create<UIState>((set) => ({
  sidebarOpen: false,
  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
  setSidebarOpen: (open) => set({ sidebarOpen: open }),
}));
