type TradeHistoryProps = {
  className?: string
  data: {
    date: Date
    price: number
    amount: number
    side: 'buy' | 'sell'
  }[]
}

const TradeHistory = ({ className, data }: TradeHistoryProps): JSX.Element => {
  return (
    <div className={className}>
      {data.map(({ date, price, amount, side }, i) => {
        return (
          <div
            className="overflow-hidden text-xs space-x-2 font-medium"
            key={i}
          >
            <span>{date.toLocaleTimeString()}</span>
            <span
              className={side === 'buy' ? 'text-green-500' : 'text-red-500'}
            >
              {price.toFixed()}
            </span>
            <span>{amount.toFixed(8)}</span>
          </div>
        )
      })}
    </div>
  )
}

export default TradeHistory
export type { TradeHistoryProps }
