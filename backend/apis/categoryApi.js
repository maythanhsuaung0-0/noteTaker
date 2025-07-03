import {v4 as uuidv4} from 'uuid'

export function createCategory(req, res) {
    let uuid = uuidv4()
    let data = req.body
    res.json()
}