import { create } from "zustand"

type AppState = {
  isTerminalMode: boolean
  toggleTerminalMode: () => void

  batterySaverMode: boolean
  toggleBatterySaverMode: () => void

  currentSection: string
  setCurrentSection: (section: string) => void

  scrollProgress: number
  setScrollProgress: (progress: number) => void

  isExperienceExpanded: boolean
  toggleExperienceExpanded: () => void

  isSkillCloudActive: boolean
  toggleSkillCloud: () => void

  isWeb3Connected: boolean
  setWeb3Connected: (connected: boolean) => void
}

export const useAppStore = create<AppState>((set) => ({
  isTerminalMode: false,
  toggleTerminalMode: () => set((state) => ({ isTerminalMode: !state.isTerminalMode })),

  batterySaverMode: false,
  toggleBatterySaverMode: () => set((state) => ({ batterySaverMode: !state.batterySaverMode })),

  currentSection: "hero",
  setCurrentSection: (section) => set({ currentSection: section }),

  scrollProgress: 0,
  setScrollProgress: (progress) => set({ scrollProgress: progress }),

  isExperienceExpanded: false,
  toggleExperienceExpanded: () => set((state) => ({ isExperienceExpanded: !state.isExperienceExpanded })),

  isSkillCloudActive: false,
  toggleSkillCloud: () => set((state) => ({ isSkillCloudActive: !state.isSkillCloudActive })),

  isWeb3Connected: false,
  setWeb3Connected: (connected) => set({ isWeb3Connected: connected }),
}))
