import { WS_URL, parseTrade } from '@coinset/coincheck'
import { useContext } from 'preact/hooks'
import { useWebSocket } from 'react-hookable'

import TradeHistory from '@/components/trade_history/trade_history'
import { ContextTradeHistory } from '@/pages/coincheck/contexts'
import type { FunctionComponent } from 'preact'

const Index: FunctionComponent = () => {
  const [data, setData] = useContext(ContextTradeHistory)

  useWebSocket<string>(
    {
      url: WS_URL,
      data: JSON.stringify({ type: 'subscribe', channel: 'btc_jpy-trades' }),
      onMessage: ({ data }) => {
        const [, , price, amount, side] = parseTrade(data)

        setData((state) => {
          const taked = state.splice(0, 1000)
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
