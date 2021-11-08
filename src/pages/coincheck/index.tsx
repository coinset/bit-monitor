import { useEffect, useState, useRef } from 'preact/hooks'

type Trades = [number, 'btc_jpy', string, string, Side]

type TradeData = { date: Date; side: Side; price: number; amount: number }

type Side = 'buy' | 'sell'

import TradeHistory from '@/components/trade_history/trade_history'

const Index = () => {
  const [data, setData] = useState<TradeData[]>([])
  const ref = useRef<WebSocket>()

  useEffect(() => {
    const socket = new WebSocket('wss://ws-api.coincheck.com/')
    socket.addEventListener('open', () => {
      socket.send(
        JSON.stringify({ type: 'subscribe', channel: 'btc_jpy-trades' })
      )
    })

    ref.current = socket

    socket.addEventListener('message', ({ data }: MessageEvent<string>) => {
      const [id, pair, price, amount, side] = JSON.parse(data)

      setData((state) => {
        const taked = state.splice(0, 60)
        return [
          {
            price: Number(price),
            amount: Number(amount),
            side,
            date: new Date()
          },
          ...taked
        ]
      })
    })

    return () => socket.close()
  }, [])

  return (
    <main className="grid grid-cols-[1fr,200px]">
      <div className="p-4">
        <h1>Coincheck</h1>
      </div>

      <div>
        <h2>Trade History</h2>

        <TradeHistory data={data} />
      </div>
    </main>
  )
}

export default Index
