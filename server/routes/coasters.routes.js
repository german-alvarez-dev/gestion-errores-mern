const router = require("express").Router()

const { isAuthenticated } = require("../middleware/jwt.middleware")
const Coaster = require('./../models/Coaster.model')

router.get("/getAllCoasters", (req, res) => {

  Coaster
    .find()
    .sort({ title: 1 })
    .select({ title: 1, imageUrl: 1, owner: 1 })
    .then(response => setTimeout(() => res.json(response), 1000))
    .catch(err => res.status(500).json(err))
})


router.get("/getOneCoaster/:coaster_id", (req, res, next) => {

  const { coaster_id } = req.params

  Coaster
    .findById(coaster_id)
    .then(response => res.json(response))
    .catch(err => res.status(500).json(err))
})


router.post("/saveCoaster", isAuthenticated, (req, res, next) => {

  Coaster
    .create({ ...req.body, owner: req.payload._id })
    .then(response => res.json(response))
    .catch(err => next(err))
})

module.exports = router