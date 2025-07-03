import express from 'express'
import { v4 as uuidv4 } from 'uuid'
import { readFile, writeFile, appendFile } from 'node:fs/promises';
import { createReadStream } from 'node:fs'
import { createInterface } from 'node:readline'
import fs from 'fs'
export const categoryRouter = express.Router()
const dataFileUrl = new URL('../data/category.txt', import.meta.url)

categoryRouter.get('/', async (req, res) => {
  let data = [];
  try {
    fs.access(dataFileUrl, fs.constants.F_OK, (err) => {
      if (err) {
        res.json({ message: "no data", data: null })
      }
      else {
        const stream = createInterface({
          input: createReadStream(dataFileUrl, { encoding: 'utf8' }),
        })
        stream.on('line', function(line) {
          data.push(JSON.parse(line))
        })
        stream.on('close', function() {
          res.json({ message: "fetch success", data: data })
        })

      }
    })
  }
  catch (err) {
    console.log('could not read file', err)
  }

})
categoryRouter.post('/create', async (req, res) => {
  console.log('filePath', dataFileUrl)
  let uuid = uuidv4()
  let id = { id: uuid }
  let data_obj = { ...id, ...req.body, }
  let data = JSON.stringify(data_obj) + "\n"
  let prev = [];

  // check if file exists
  try {
    fs.access(dataFileUrl, fs.constants.F_OK, (err) => {
      // if file doesn't exist
      if (err) {
        writeFile(dataFileUrl, data, (err) => {
          if (err) {
            console.log("err while writing", err)
            res.json({ message: "Error while saving note" })
          }
        })

          res.json({ message: "Note created successfully",status:200})
      }
      // if file exists, append data
      else {
        console.log('file exists')
        appendFile(dataFileUrl, data, (err) => {
          if (err) {
            console.log("err while appending data", err)
          }
          else {
            console.log("data has appended")
          }

        })
        res.json({ message: "Note created successfully" ,status:200})

      }
    })
  }
  catch (err) {
    console.log(err)
    res.json({ message: "Error while saving note" ,status:500})
  }
})
categoryRouter.delete('/delete/:id', async (req, res) => {
  const id = req.params.id;
  await readFile(dataFileUrl, 'utf8').then((data, err) => {
    const lines = data.split("\n")
    const filteredLines = lines.filter(line => !line.includes(id))
    const updatedContent = filteredLines.join("\n")
    try {
      writeFile(dataFileUrl, updatedContent, (err) => {
        if (err) {
          res.json({ message: "Error while deleting note", data: null })
        }
      })
      res.json({ message: "Successfully deleted",status:200, data: updatedContent })
    }
    catch (err) {
      console.log(err)
      res.json({ message: "Error while deleting note",status:500, data: null })
    }
  })
})
