import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url';
import bodyParser from 'body-parser';
import { v4 as uuidv4 } from 'uuid'
import { notesRouter } from './routes/notesRoute.js';
const app = express()
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const port = 3000;
// serving frontend files
app.use(express.static(path.join(__dirname, '../frontend/')))
app.use(bodyParser.json())
// notes api
// may here
app.use('/notes',notesRouter)
// category/folder api
<<<<<<< HEAD
// daniela here
app.get('/category', (req, res) => {
  res.json({ message : "Hello World" })
})
=======
// daniella here

>>>>>>> fb734835d44e78eaf3689b0dcd5cafb70df29ab3
// archives api
// zerich add here
app.listen(port, (req, res) => {
  console.log(`the server is running at localhost:${port}`)
})
