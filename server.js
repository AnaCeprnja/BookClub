require('dotenv').config();
const express = require('express');
const layouts = require('express-ejs-layouts');
const session = require('express-session');
const passport = require('./config/ppConfig'); //
const flash = require('connect-flash');
const multer = require('multer');
const cloudinary = require('cloudinary');
const uploads = multer({ dest: './uploads' });
let methodOverride = require('method-override');
const db = require('./models')




const app = express();
app.set('view engine', 'ejs');

// Session 
const SECRET_SESSION = process.env.SECRET_SESSION;
const isLoggedIn = require('./middleware/isLoggedIn');
const { post } = require('./controllers/auth');

// MIDDLEWARE
app.use(require('morgan')('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/public'));
app.use(layouts);
app.use(methodOverride('_method'))

// Session Middleware

// secret: What we actually will be giving the user on our site as a session cookie
// resave: Save the session even if it's modified, make this false
// saveUninitialized: If we have a new session, we save it, therefore making that true

const sessionObject = {
  secret: SECRET_SESSION,
  resave: false,
  saveUninitialized: true
}
app.use(session(sessionObject));
// Passport
app.use(passport.initialize()); // Initialize passport
app.use(passport.session()); // Add a session
// Flash 
app.use(flash());
app.use((req, res, next) => {
  console.log(res.locals);
  res.locals.alerts = req.flash();
  res.locals.currentUser = req.user;
  next();
});

// Controllers
app.use('/auth', require('./controllers/auth'));
app.use('/comment', require('./controllers/comment'));
app.use('/post', require('./controllers/post'));

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/profile', isLoggedIn, (req, res) => {
  const { id, name, email, image } = req.user.get();
  res.render('profile', { id, name, email, image });
});

app.get('/profile/new', (req, res) => {
  res.render('new');
});

app.put('/profile/:id', uploads.single('inputFile'), (req, res) => {

  const image = req.file.path;
  //console.log(image);

  cloudinary.uploader.upload(image, (result) => {
    console.log('🌖🌹🌼🌙', result);

  }).then(image => {
    console.log('🌔🪐🌈💧', image)
    db.user.update({
      image: image.url
    },
      {
        where: {
          id: req.params.id
        }
      })
  })
    .then(() => {
      res.redirect('back')
    }
    )
    .catch(error => {
      console.log(error);
    })

})



const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => {
  console.log(`🎧 You're listening to the smooth sounds of port ${PORT} 🎧`);
});

module.exports = server;





