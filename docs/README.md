# CheckIP

Check Public IP Address.

## Development

Install dependencies.

```bash
npm install
```

Run in local machine.

```bash
npm run dev
```

Deploy to Cloudflare Worker.


```bash
npm run deploy
```

## Usage

Open web browser.

From terminal, you can use `curl`.

```bash
$ curl -L checkip.junian.dev
203.0.113.113
```

Integrate with code, example in C#:

```csharp
public string GetPublicIPAddress()
{
    var uri = "https://checkip.junian.dev/";
    var ip = string.Empty;

    using (var client = new HttpClient())
    {
        ip = client?.GetAsync(uri)?.Result?.Content?
            .ReadAsStringAsync()?.Result?.Trim();
    }

    return ip;
}
```

