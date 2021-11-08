import { useEffect, useMemo, useState } from 'preact/hooks'
import { client } from '@/lib/influx_db/client'
import { org } from '@/lib/influx_db/constants'
import Highcharts from 'highcharts/highstock'
import type { Options } from 'highcharts/highstock'
import HighchartsReact from 'highcharts-react-official'

const query = `from(bucket: "crypto_currency") |> range(start: -24h)
|> filter(fn: (r) => r["_measurement"] == "bitbank" or r["_measurement"] == "bitflyer" or r["_measurement"] == "btcbox" or r["_measurement"] == "coincheck" or r["_measurement"] == "decurret" or r["_measurement"] == "gmocoin" or r["_measurement"] == "huobi" or r["_measurement"] == "liquid" or r["_measurement"] == "zaif")
|> filter(fn: (r) => r["_field"] == "BTCJPY")
|> aggregateWindow(every: 15m, fn: mean, createEmpty: false)
|> yield(name: "mean")`

const Index = (): JSX.Element => {
  const [data, setData] = useState<Record<string, [number, number]>>({})

  const options = useMemo<Options>(() => {
    const series = Object.entries(data).map(([name, data]) => {
      return {
        name,
        data
      }
    })
    return {
      title: 'btcjpy',

      series
    }
  }, [data])

  useEffect(() => {
    const queryApi = client.getQueryApi(org)
    queryApi.queryRows(query, {
      next(row, tableMeta) {
        const { _time, _value, _measurement } = tableMeta.toObject(row)

        setData((state) => {
          const x = state[_measurement] ?? []
          return {
            ...state,
            [_measurement]: [
              ...x,
              [new Date(_time).getTime(), Math.round(_value as number)]
            ]
          }
        })
      },
      error(error) {
        console.error(error)
        console.log('Finished ERROR')
      },
      complete() {
        console.log('Finished SUCCESS')
      }
    })
  }, [])
  return (
    <main>
      <div>BTCJPY</div>
      <HighchartsReact
        constructorType="stockChart"
        highcharts={Highcharts}
        options={options}
      />
    </main>
  )
}

export default Index
