const express = require('express');
const fetch = require('node-fetch');
const path = require('path');

const app = express();

app.get('/api/widget', async (req, res) => {
    try {
        const response = await fetch("https://discord.com/api/guilds/1379130532675457136/widget.json");
        const data = await response.json();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch Discord data' });
    }
});

app.use(express.static(path.join(__dirname, '../client')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/index.html'));
});

const port = process.env.PORT || 5000;
app.listen(port, '0.0.0.0', () => {
    console.log(`Server running on port ${port}`);
});