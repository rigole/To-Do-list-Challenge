const express = require('express')
const db = require('./db')
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express()
app.use(cors())
app.use(bodyParser.json())
const PORT = process.env.PORT || 3000



//User Task
app.get('/api/data/:userId',  async (req, res) => {
    
    const userId = req.params.userId;
    if (userId) {
      try {
        const [rows] = await db.execute('SELECT * FROM task WHERE user_id = ?', [userId]);
        res.json(rows);
      } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
    } else {
      res.status(400).json({ error: 'User ID is required' });
    }
})

//Details of a Task

app.get('/api/task/:taskId',  async (req, res) => {
    
    const taskId = req.params.taskId;

    if (taskId) {
      try {
        const [rows] = await db.execute('SELECT * FROM task WHERE id = ?', [taskId]);
        res.json(rows[0]);
      } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
    } else {
      res.status(400).json({ error: 'Task ID is required' });
    }
})




//Sign Up
app.post('/api/signup/', async (req, res) => {
    const { name, email, password} = req.body;

    try {
        const [result] =  await db.execute('INSERT INTO user (name, email, password) VALUES (?, ?, ?)', [name, email, password])
        const userId = result.insertId;
        res.json({ success: true, message: 'Registration Successfull', userId});

    } catch (error) {
        console.log('Error of registration ', error)
        res.status(500).json({ success: false, message: 'Internal error server'})
    }
});


//Add a task

app.post('/api/data/', async (req, res) => {
    
    const { title, description, category, userId } = req.body
    
    try{
        await db.execute('INSERT INTO task (title, description, category, user_id) VALUES (?, ?, ?, ?)', [title, description, category, userId])
        res.json({ success: true, message: 'Task Added'});
    } catch(error){
        console.log(error)
    }

})

//Update a Task

app.put('/api/task/:taskId',  async (req, res) => {
    
  const taskId = req.params.taskId;
  const updatedTask = req.body;
  if (taskId) {
    try {
      const [rows] = await db.query('UPDATE task SET ? WHERE id = ?', [updatedTask, taskId]);
      if (rows.affectedRows > 0) {
        res.status(200).json({message: 'task updated successfull'})
      } else {
        res.status(404).json({error: 'Task not Found'})
      }
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.status(400).json({ error: 'Task ID is required' });
  }
})


//Signin 

app.post('/api/signin/', async (req, res) => {
    const { email, password } = req.body;

    try {
        const [login] = await db.execute('SELECT *  FROM user WHERE email = ? AND password = ?', [email, password])
        if (login.length> 0) {
            const user = login[0]
            res.json({success:true, message: 'Successfull Login', userId: user.user_id})
        }
        else {
            res.json({ success: false, message: 'Invalid username or password' });
          }
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }

})

// Delete a Task
app.delete('/api/task/:taskId', async (req, res) => {
  const taskId = req.params.taskId;

  try {
    // Assuming 'items' is your table name
    const [result] = await db.query('DELETE FROM task WHERE id = ?', [taskId]);

    if (result.affectedRows > 0) {
      res.status(200).json({ message: 'task deleted successfully' });
    } else {
      res.status(404).json({ error: 'task not found' });
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});