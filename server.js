const path = require('path');
const exphbs = require('express-handlebars'); 
const routes = require('./controllers'); 
const express = require('express'); 
const session = require('express-session');

const sequelize = require('./config/connection'); 
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const app = express();
const PORT = process.env.PORT || 3001;

const hbs = exphbs.create();

const sess = {
  secret: 'red',
  cookie: {
    maxage: 24 * 60 * 60 * 1000 // expires in one day
  },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};

app.use(session(sess));

app.use(express.urlencoded({ extended: true }));
app.engine('handlebars', hbs.engine);
app.use(express.json());
app.set('view engine', 'handlebars');
app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);


sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`));
  });
  