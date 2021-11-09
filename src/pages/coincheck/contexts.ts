import { createContext } from 'preact'
import type { StateUpdater } from 'preact/hooks'

type TradeData = { date: Date; side: Side; price: number; amount: number }
type Side = 'buy' | 'sell'

const vfn = () => {}

const ContextTradeHistory = createContext<
  [TradeData[], StateUpdater<TradeData[]>]
>([[], vfn])

export { ContextTradeHistory }
export type { TradeData, Side }
