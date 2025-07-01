import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url';

const app = express()
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const port = 3000;
// serving frontend files
app.use(express.static(path.join(__dirname, '../frontend/')))
// notes api
// may here
app.get('/notes', (req, res) => {
  res.json({ message: "Hello world" })
})
// category/folder api
// daniella here
// archives api
// zerich add here
app.listen(port, (req, res) => {
  console.log(`the server is running at localhost:${port}`)
})
