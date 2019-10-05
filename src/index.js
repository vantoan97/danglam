const express = require('express');
const morgan = require('morgan');
const path = require('path');
const exphbs = require('express-handlebars');
const session = require('express-session');
const validator = require('express-validator');
const passport = require('passport');
const flash = require('connect-flash');
const MySQLStore = require('express-mysql-session')(session);
const bodyParser = require('body-parser');

const { database } = require('./keys');

// Intializations
const app = express();
require('./lib/passport');

// Settings
app.set('port', process.env.PORT || 4000);
app.set('views', path.join(__dirname, 'views'));
// Public
app.use(express.static(path.join(__dirname, 'public')));
// app.engine('.hbs', exphbs({
//   defaultLayout: 'main',
//   layoutsDir: path.join(app.get('views'), 'layouts'),
//   partialsDir: path.join(app.get('views'), 'partials'),
//   extname: '.hbs',
//   helpers: require('./lib/handlebars')
// }))
app.set('view engine', '.ejs');

// Middlewares
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(session({
  secret: 'faztmysqlnodemysql',
  resave: false,
  saveUninitialized: false,
  store: new MySQLStore(database)
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use(validator());

// Global variables
app.use((req, res, next) => {
  app.locals.message = req.flash('message');
  app.locals.success = req.flash('success');
  app.locals.user = req.user;
  next();
});
// Routes
app.use(require('./routes/index'));
app.use('/dtdd',require('./routes/dtdd'));
app.use('/phu-kien',require('./routes/phukien'));
//app.use(require('./routes/start'));
// app.use(require('./routes/authentication'));
// app.use('/customers', require('./routes/customers'));
// app.use('/accountsbank', require('./routes/accountsbank'));
// app.use('/bills', require('./routes/bills'));

// app.use('/users', require('./routes/users'));
// app.use('/links', require('./routes/links'));



// Starting
app.listen(app.get('port'), () => {
  console.log('Server is in port', app.get('port'));
});