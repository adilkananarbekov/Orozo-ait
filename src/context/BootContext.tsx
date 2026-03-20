import { createContext, useContext } from 'react'

export type BootContextValue = {
  introEnabled: boolean
  markWebGLReady: () => void
}

const defaultValue: BootContextValue = {
  introEnabled: true,
  markWebGLReady: () => {},
}

export const BootContext = createContext<BootContextValue>(defaultValue)

export function useBoot() {
  return useContext(BootContext)
}
