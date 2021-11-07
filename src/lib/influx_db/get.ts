import { client } from '@/lib/influx_db/client'
import { org } from '@/lib/influx_db/constants'

const query = `from(bucket: "crypto_currency") |> range(start: -5m)
|> filter(fn: (r) => r["_measurement"] == "bitbank")
|> filter(fn: (r) => r["_field"] == "BTCJPY")
|> yield(name: "mean")`

const get = () => {
  const queryApi = client.getQueryApi(org)
  queryApi.queryRows(query, {
    next(row, tableMeta) {
      const o = tableMeta.toObject(row)
    },
    error(error) {
      console.error(error)
      console.log('Finished ERROR')
    },
    complete() {
      console.log('Finished SUCCESS')
    }
  })
}

export { get }
