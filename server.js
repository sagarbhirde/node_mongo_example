import express from 'express'
const app = express()
const port = 3243

app.use(express.json())

import accounts from './routes/accounts.js'

app.use('/accounts', accounts)

app.get('/', (req, res) => {
  res.status(200).json({
    message: 'API 100% funcional!👏',
    version: '1.0.1'
  })
})

app.listen(port, function () {
  console.log('Server Started')
})