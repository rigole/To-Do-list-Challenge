const express = require('express')
const db = require('./db')

const app = express()
const PORT = process.env.PORT || 3000

app.get('/api/data/', async (req, res) => {

try{
// Fetch data from the database
    const [rows, fields] = await db.execute('SELECT * FROM user');
    const data = rows;

// Send data as JSON response
    res.json(data);
} 
 catch (error ){
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
}

})

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});