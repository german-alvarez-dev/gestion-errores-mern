const { Schema, model } = require("mongoose")
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const userSchema = new Schema({
  email: {
    type: String,
    unique: true,
    required: [true, 'El email es obligatorio']
  },
  password: {
    type: String,
    required: [true, 'La contraseña es obligatoria'],
    minlength: [5, 'La contraseña debe tener mínimo 5 caracteres']
  },
  username: {
    type: String,
    required: [true, 'El nombre de usuario es obligatorio']
  }
},
  {
    timestamps: true
  }
)

userSchema.pre('save', function (next) {

  const saltRounds = 10
  const salt = bcrypt.genSaltSync(saltRounds)
  const hashedPassword = bcrypt.hashSync(this.password, salt)
  this.password = hashedPassword

  next()
})



userSchema.methods.validatePassword = function (candidatePassword) {
  return bcrypt.compareSync(candidatePassword, this.password)
}



userSchema.methods.signToken = function () {
  const { _id, username, email } = this
  const payload = { _id, username, email }

  const authToken = jwt.sign(
    payload,
    process.env.TOKEN_SECRET,
    { algorithm: 'HS256', expiresIn: "6h" }
  )

  return authToken
}


module.exports = model("User", userSchema)
