import { createContext } from 'preact'
import type { useBoolean } from 'react-hookable'

const ContextIsMinify = createContext<ReturnType<typeof useBoolean>>([
  false,
  () => {}
])

export { ContextIsMinify }
