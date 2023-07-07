const connectToMongo=require('./db');
const express = require('express')
connectToMongo();

const app = express()
const port = 5000
//MIDDLEWARE IS USED TO ACCESS REQ.BODY
app.use(express.json())

//ALL AVAILABLE ROUTES
app.use('/api/auth',require('./routes/auth'))
app.use('/api/notes',require('./routes/notes'))

app.listen(port, () => {
  console.log(`iNotebook app listening on port ${port}`)
})