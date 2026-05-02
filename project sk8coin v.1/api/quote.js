export default async function handler(req, res) {
    const { inputMint, outputMint, amount, slippageBps } = req.query;
    try {
        const jupUrl = `https://quote-api.jup.ag/v6/quote?inputMint=${inputMint}&outputMint=${outputMint}&amount=${amount}&slippageBps=${slippageBps || 100}`;
        const response = await fetch(jupUrl);
        const data = await response.json();
        res.status(response.status).json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}