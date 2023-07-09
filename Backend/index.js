const connectToMongo=require('./db');
const express = require('express')
connectToMongo();

const app = express()
const port = 5000
//installed cors in the backend and is used to fetch
var cors = require('cors')
app.use(cors())

//MIDDLEWARE IS USED TO ACCESS REQ.BODY
app.use(express.json())

//ALL AVAILABLE ROUTES
app.use('/api/auth',require('./routes/auth'))
app.use('/api/notes',require('./routes/notes'))

app.listen(port, () => {
  console.log(`iNotebook app listening on port ${port}`)
})