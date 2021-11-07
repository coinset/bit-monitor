import { InfluxDB } from '@influxdata/influxdb-client-browser'

const token = import.meta.env.VITE_INFLUXDB_TOKEN as string

const client = new InfluxDB({
  url: 'https://ap-southeast-2-1.aws.cloud2.influxdata.com',
  token
})

export { client }
