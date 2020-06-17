const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const keys = require('./config/keys');
const passport = require('passport');


mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

mongoose.connect('mongodb+srv://emaily-admin:banu@8939@cluster0-vnfhk.mongodb.net/emaily?retryWrites=true&w=majority',{ useNewUrlParser: true ,useUnifiedTopology: true})
.then(()=>{
    console.log("connected to database");
  })
  .catch(()=>{
    console.log("connection failed");
  });
const app = express();
app.use(
  cookieSession({
    maxAge: 30*24*60*60*1000,
    keys: [keys.cookieKey]
  })
);
app.use(passport.initialize());
app.use(passport.session());

require('./models/User');
require('./services/passport');

require('./routes/authRoutes')(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT);