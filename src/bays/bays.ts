import express from "express";

const router = express.Router()

router.get('/', (req, res)=>{
    res.send('getting all items')
})


router.post('/', (req, res) =>{
    res.send('post for a new vehicle')
})

export default router