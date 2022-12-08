# Gestión de errores aplicación MERN
Grabaciones [en este enlace](https://drive.google.com/drive/folders/1vhkkaiN6eKrAIruHqzFkVRjE74xZvIwM?usp=sharing)


## Middleware de errores (vídeo 1)
````javascript
  app.use((err, req, res, next) => {

    if (err.code && err.code === 11000) {
      res.status(409).json({ errorMessages: ['El registro ya se encuentra presente en la base de datos'] })
    }

    if (err.name === 'ValidationError') {
      let errorMessages = Object.values(err.errors).map(el => el.message)
      res.status(400).json({ errorMessages })
    }

    console.error("ERROR", req.method, req.path, err);

    if (!res.headersSent) {
      res.status(500).json({ message: "Internal server error. Check the server console" })
    }
  })
````

## Modelo `User.model.js` con presave (vídeo 3)
````javascript
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
````
