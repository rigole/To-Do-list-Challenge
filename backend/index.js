const express = require('express')
const db = require('./db')
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express()
app.use(cors())
app.use(bodyParser.json())
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


app.post('/api/signup/', async (req, res) => {
    const { name, email, password} = req.body;

    try {
        await db.execute('INSERT INTO user (name, email, password) VALUES (?, ?, ?)', [name, email, password])
        res.json({ success: true, message: 'Registration Successfull' });

    } catch (error) {

        console.log('Error of registration ', error)
        res.status(500).json({ success: false, message: 'Internal error server'})
    }
});

app.post('/api/signin/', async (req, res) => {
    const { email, password } = req.body;

    try {
        const [login] = await db.execute('SELECT *  FROM user WHERE email = ? AND password = ?', [email, password])
        if (login.length> 0) {
            res.json({success:true, message: 'Successfull Login'})
        }
        else {
            res.json({ success: false, message: 'Invalid username or password' });
          }
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }

})

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});