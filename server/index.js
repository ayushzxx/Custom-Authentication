require('dotenv').config();
const app = require('./src/app');
const connectDB = require('./src/config/db');

connectDB();

app.get('/', (req, res) => {
    res.send('hello')
})

const PORT = 3000
app.listen(PORT, () => {
    console.log(`server is running on port http://localhost:${PORT} `)
})