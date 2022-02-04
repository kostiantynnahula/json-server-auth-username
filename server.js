const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()
const jwt = require('jsonwebtoken');


server.use(middlewares)

server.use(jsonServer.bodyParser)
// Add custom routes before JSON Server router
server.post('/login', (req, res, next) => {
  
  const username = req.body.username || null;
  
  if (!username) {
    res.status(400).json({
      message: 'Username is required',
    })
  }

  const password = req.body.password || null;

  if (!password) {
    res.status(400).json({
      message: 'Password is required',
    })
  }

  const user = router.db.get('users').find({username: username}).value();

  if (!user) {
    res.status(400).json({
      message: 'Username or password is incorrect'
    })
  }

  const accessToken = jwt.sign(user, 'secret')

  res.status(200).json({
    user,
    accessToken
  })
})

server.use(router)

server.listen(3004, () => {
  console.log('JSON Server is running')
})