var express=require('express');
var cors=require('cors');
var bodyParser=require('body-parser');
var mongoose=require('mongoose');
var User=require('./models/User');
var Post=require('./models/Post');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var { check, validationResult } = require('express-validator/check');
var app=express();
mongoose.connect('mongodb://localhost:27017/reddit');
app.use(cors({
  origin: ['http://localhost:3000'],
  methods: ['GET', 'POST', 'DELETE', 'PUT'],
  credentials: true
}));

app.use(session({
  resave: true,
  secret: 'sri723742',
  saveUninitialized: true,
  cookie: { maxAge: (180000 * 30) },
  store: new MongoStore({ mongooseConnection: mongoose.connection })
}));

app.use(bodyParser.json());

app.post('/api/register', [
  check('email')
    .isEmail().withMessage('Must be an email')
    .custom(function (value) {
      return User.findOne({ email: value }).then(function (user) {
        if (user) {
          throw new Error('This email is already in use');
        }
      })
    }),


  check('password', 'passwords must be at least 6 characters long')
    .isLength({ min: 6 })
], function (req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.send({ status: 'error', errors: errors.mapped() });
  }

  User.create(req.body)
    .then(function (user) {
      res.send({ status: 'success', message: 'User created in database' });
    })
    .catch(function (error) {
      return res.send({ status: 'error', message: 'Something went wrong' });
    });
});
app.post('/api/login',function(req,res){
  User.findOne({
          email:req.body.email,
          password:req.body.password

          })
  .then(function(user){
    req.session.user = user;
    if(!user){
        return res.send({status:'error',message:'Cannot find user'});
    }
      res.send(user);
  })
  .catch(function(error){
    res.send({status:'error',message:'Something went wrong with the database'});

});
});
app.get('/api/current_user', function (req, res) {
  console.log()
  if (req.session.user) {
    res.send({
      _id: req.session.user._id,
      firstname: req.session.user.firstname
    })
  } else {
    res.send({ error: 'not logged in' })
  }
});
app.post('/api/addpost',function(req,res){
  Post.create(req.body)

  .then(function(post) {
    res.send(post);
  })
  .catch(function (error) {
    return res.send({ status: 'error', message: 'Something went wrong' });

});
});

app.get('/api/retrievepost',function(req,res){
  Post.find().sort( { upvote: -1 } )

    .then(function(messages){
      //console.log(messages)
      res.send(messages);

    }).catch(function(error){
      console.log(error);
      res.send({status:'error',message:'db problem'});
    });
});
app.put('/api/upvotepost/:id', function (req, res) {
  Post.findById(req.params.id)
    .then(function (post) {
      post.upvote = post.upvote + 1;
      post.save();
      res.send({ likes: post.likes })
    })
});
app.get('/api/logout', function (req, res) {
  req.session.destroy();
  res.send({ message: 'session destroyed' });
});
app.listen(8080);
