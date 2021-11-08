import type { FunctionComponent } from 'preact'
import TradeHistory from '@/components/trade_history/trade_history'
import { WS_URL, parseTrade } from '@coinset/coincheck'
import { useState } from 'preact/hooks'
import { useWebSocket } from '@/hooks/useWebSocket'

type TradeData = { date: Date; side: Side; price: number; amount: number }
type Side = 'buy' | 'sell'

const Index: FunctionComponent = () => {
  const [data, setData] = useState<TradeData[]>([])

  useWebSocket<string>(
    {
      url: WS_URL,
      data: JSON.stringify({ type: 'subscribe', channel: 'btc_jpy-trades' }),
      onMessage: ({ data }) => {
        const [, , price, amount, side] = parseTrade(data)

        setData((state) => {
          const taked = state.splice(0, 100)
          return [
            {
              price,
              amount,
              side,
              date: new Date()
            },
            ...taked
          ]
        })
      },
      onError: console.log
    },
    []
  )

  return <TradeHistory data={data} />
}

export default Index
