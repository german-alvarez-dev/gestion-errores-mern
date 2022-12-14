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
      res.status(500).json({ errorMessages: ['Se ha producido un error en servidor.'] })
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


# Extensión del esquema de modelo

Es posible extender el modelo a través de su esquema, con métodos adicionales que estarán presentes tanto en el propio modelo como en los objetos retornados por Mongoose.

Ejemplo 1: dotación de capacidad para comparar contraseñas

````javascript
// User.model.js

[...]

userSchema.methods.validatePassword = function (candidatePassword) {
  return bcrypt.compareSync(candidatePassword, this.password)
}

[...]
````

Ejemplo 2: dotación de capacidad para generar tokens

````javascript
// User.model.js

[...]

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

[...]
````


Aspecto final de ruta de `login`:

````javascript
// auth.routes.js

[...]

router.post('/login', (req, res, next) => {

  const { email, password } = req.body

  if (email === '' || password === '') {
    res.status(400).json({ errorMessages: ['Indica email y contraseña'] })
    return
  }

  User
    .findOne({ email })
    .then(foundUser => {
      if (foundUser && foundUser.validatePassword(password)) {
        res.json({ authToken: foundUser.signToken() })
      }
      else {
        res.status(401).json({ errorMessages: ['Usuario o contraseña incorrectos'] })
      }
    })
    .catch(err => next(err))
})

[...]
