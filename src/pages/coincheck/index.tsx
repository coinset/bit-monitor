import ReactEChartsCore from 'echarts-for-react/lib/core'
import { LineChart } from 'echarts/charts'
import {
  GridComponent,
  DataZoomComponent,
  TitleComponent,
  DatasetComponent
} from 'echarts/components'
import * as echarts from 'echarts/core'
import { SVGRenderer } from 'echarts/renderers'

import TradeHistory from '@/components/trade_history'

echarts.use([
  LineChart,
  GridComponent,
  SVGRenderer,
  DatasetComponent,
  TitleComponent,
  DataZoomComponent
])
import { useState, useMemo } from 'preact/hooks'

import { ContextTradeHistory } from '@/pages/coincheck/contexts'
import type { TradeData } from '@/pages/coincheck/contexts'

const Index = () => {
  const [data, setData] = useState<TradeData[]>([])

  const lastPrice = useMemo<number | undefined>(() => {
    if (data.length) {
      return data[0].price
    }
  }, [data])

  const series = useMemo<[Date, number][]>(
    () => data.map(({ date, price }) => [date, price]),
    [data]
  )

  return (
    <ContextTradeHistory.Provider value={[data, setData]}>
      <main className="md:grid relative h-full grid-cols-[1fr,200px]">
        <div className="p-4">
          <h1 class="text-3xl">Coincheck</h1>

          {lastPrice && (
            <div class="flex p-8">
              <div class="shadow rounded-xl p-4">
                <span class="text-3xl text-blue-600 pr-2 mr-2">
                  {lastPrice.toLocaleString()}
                </span>
                <h3>Last Price</h3>
              </div>
            </div>
          )}

          <ReactEChartsCore
            echarts={echarts}
            option={{
              animation: false,
              title: {
                left: 'left',
                text: 'BTCJPY'
              },
              xAxis: {
                type: 'time',
                boundaryGap: false,
                splitLine: {
                  show: false
                }
              },
              yAxis: {
                type: 'value',
                min: 'dataMin',
                max: 'dataMax'
              },
              series: [
                {
                  data: series,
                  showSymbol: false,
                  step: 'start',
                  type: 'line'
                }
              ]
            }}
          />
        </div>

        <div class="h-full hidden md:block fixed w-200px right-0">
          <h2>Trade History</h2>

          <TradeHistory />
        </div>
      </main>
    </ContextTradeHistory.Provider>
  )
}

export default Index
