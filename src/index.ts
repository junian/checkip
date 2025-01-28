import { Hono } from 'hono'
import { getConnInfo } from 'hono/cloudflare-workers'

const app = new Hono()

app.get('/', (c) => {
  const info = getConnInfo(c) // info is `ConnInfo`
  return c.text(`${info.remote.address}\r\n`)
})

export default app
