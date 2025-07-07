import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url';
import bodyParser from 'body-parser';
import { notesRouter } from './routes/notesRoute.js';
import { categoryRouter } from './routes/categoryRoute.js';
import { archiveRouter } from './routes/archiveRoute.js';
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

// daniela here
app.use('/category', categoryRouter)
// archives api
// zerich add here

app.use(`/archive`, archiveRouter)
app.listen(port, (req, res) => {
  console.log(`the server is running at localhost:${port}`)
})
