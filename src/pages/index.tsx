import { useEffect, useMemo, useState } from 'preact/hooks'
import { client } from '@/lib/influx_db/client'
import { org } from '@/lib/influx_db/constants'
import Highcharts from 'highcharts/highstock'
import type { Options } from 'highcharts/highstock'
import HighchartsReact from 'highcharts-react-official'

const query = `from(bucket: "crypto_currency") |> range(start: -1h)
|> filter(fn: (r) => r["_measurement"] == "bitbank")
|> filter(fn: (r) => r["_field"] == "BTCJPY")
|> yield(name: "mean")`

const Index = (): JSX.Element => {
  const [data, setData] = useState<[number, number][]>([])

  const options = useMemo<Options>(() => {
    return {
      title: 'coincheck',
      series: [
        {
          name: 'hoge',
          data
        }
      ]
    }
  }, [data])

  useEffect(() => {
    const queryApi = client.getQueryApi(org)
    queryApi.queryRows(query, {
      next(row, tableMeta) {
        const o = tableMeta.toObject(row)

        setData((state) => [...state, [new Date(o._time).getTime(), o._value]])
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
    <>
      <div>BTCJPY</div>
      <HighchartsReact
        constructorType="stockChart"
        highcharts={Highcharts}
        options={options}
      />
    </>
  )
}

export default Index
