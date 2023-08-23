import express from 'express';
import yahooFinance from 'yahoo-finance2';

const app = express();

app.use(express.static('public'));

// Endpoint for current stock data
app.get('/api/stock/:symbol', async (req, res) => {
    try {
        const symbol = req.params.symbol;
        const data = await yahooFinance.quote(symbol);
        res.json(data);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error fetching stock data');
    }
});

// Endpoint for stock search
app.get('/api/search/:query', async (req, res) => {
    try {
        const query = req.params.query;
        const data = await yahooFinance.search(query);
        res.json(data);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error fetching search results');
    }
});


// Endpoint for historical stock data
app.get('/api/historical/:symbol', async (req, res) => {
    try {
        const symbol = req.params.symbol;
        const data = await yahooFinance.historical(symbol, { period1: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), period2: new Date() });
        res.json(data);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error fetching historical data');
    }
});

app.listen(3138, () => {
    console.log('Server running on http://localhost:3138');
});
