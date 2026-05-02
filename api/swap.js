export default async function handler(req, res) {
    if (req.method !== 'POST') return res.status(405).json({ error: 'Method Not Allowed' });
    try {
        const response = await fetch('https://quote-api.jup.ag/v6/swap', {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                'Accept': 'application/json'
            },
            body: JSON.stringify(req.body)
        });
        
        const text = await response.text();
        
        try {
            const data = JSON.parse(text);
            return res.status(response.status).json(data);
        } catch (parseError) {
            return res.status(500).json({ error: "Cloudflare Blocked Swap POST", details: text.slice(0, 100) });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
