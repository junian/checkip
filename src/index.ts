import { Hono } from 'hono'
import { getConnInfo } from 'hono/cloudflare-workers'

const app = new Hono();

app.get('/', (c) => {
  const info = getConnInfo(c);
  const userAgent = c.req.header('User-Agent') || ''
  const isBrowser = /Mozilla|Chrome|Safari|Firefox|Edge/i.test(userAgent);
  
  if(!isBrowser)
    return c.text(`${info.remote.address}\r\n`);

  return c.html(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Your IP Address</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          background-color: #f4f4f9;
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
          margin: 0;
        }
        .container {
          background: white;
          padding: 2rem;
          border-radius: 10px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          text-align: center;
        }
        h1 {
          font-size: 2rem;
          color: #333;
          margin-bottom: 1rem;
        }
        .ip-address {
          font-size: 1.5rem;
          color: #007BFF;
          font-weight: bold;
          padding: 0.5rem;
          background: #e9f5ff;
          border-radius: 5px;
          display: inline-block;
        }
        .footer {
          margin-top: 1.5rem;
          font-size: 0.9rem;
          color: #666;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>Your Public IP Address</h1>
        <div class="ip-address">${info.remote.address || 'Unknown'}</div>
        <div class="footer">
          Powered with <a href="https://github.com/junian/checkip" target="_blank">CheckIP</a>
        </div>
      </div>
    </body>
    </html>
  `);
})

export default app;
