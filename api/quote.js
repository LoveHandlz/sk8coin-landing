export default async function handler(req, res) {
    const { inputMint, outputMint, amount, slippageBps } = req.query;
    try {
        const jupUrl = `https://quote-api.jup.ag/v6/quote?inputMint=${inputMint}&outputMint=${outputMint}&amount=${amount}&slippageBps=${slippageBps || 100}`;
        
        // DRESSING VERCEL UP AS A HUMAN BROWSER
        const response = await fetch(jupUrl, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                'Accept': 'application/json'
            }
        });

        // READ RAW TEXT FIRST SO WE DON'T CRASH ON HTML
        const text = await response.text();
        
        try {
            const data = JSON.parse(text);
            return res.status(response.status).json(data);
        } catch (parseError) {
            // IF CLOUDFLARE BLOCKS US, TELL THE FRONTEND GRACEFULLY
            return res.status(500).json({ error: "Cloudflare Blocked Vercel", details: text.slice(0, 100) });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
