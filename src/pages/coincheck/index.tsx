import TradeHistory from '@/components/trade_history'

const Index = () => {
  return (
    <main className="md:grid relative h-full grid-cols-[1fr,200px]">
      <div className="p-4">
        <h1 class="text-3xl">Coincheck</h1>
      </div>

      <div class="h-full hidden md:block fixed w-200px right-0">
        <h2>Trade History</h2>

        <TradeHistory />
      </div>
    </main>
  )
}

export default Index
