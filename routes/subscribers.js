const express = require('express');
const router = express.Router();
const Subscriber = require('../models/subscriber')
//Getting all
router.get('/', async (req, res) => {
    try {
        const subscribers = await Subscriber.find();
        res.json(subscribers)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})
//Getting One
router.get('/:id',getSubscriber, (req, res) => {
   res.json(res.subscriber)
})
//Creating One
router.post('/', async (req, res) => {
    const subscriber = new Subscriber({
        name: req.body.name,
        subscribeToChannel:
        req.body.subscribedToChannel
    })
    try {
        const newSubscriber = await subscriber.save()
        res.status(201).json(newSubscriber)
    }catch (err){
        res.status(400).json({message: err.message})

    }
})
//Updating One
router.patch('/', getSubscriber,async(req, res) => {

})
//Deleting One
router.delete('/', getSubscriber, async(req, res) => {
    try{
        await res.subscriber.remove()
        res.json({message:'Deleted'})
    }catch(err) 
    {
        res.status(500).json({message:err.message})
    }
})

async function getSubscriber(req,res,next){
    try{
        subscriber = await Subscriber.findById(req.params.id)
        if(subscriber == null)
        {
            return res.status(404).json({message:'Cannot find Subscriber'})
        }
    }catch(err)
    {
return res.status(500).json({message:err.message})
    }
    res.subscriber = subscriber
}


module.exports = router