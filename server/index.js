const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const keys = require('./config/keys');
const passport = require('passport');
const bodyParser = require('body-parser');
const { strict } = require('assert');
const { ENGINE_METHOD_NONE } = require('constants');


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
app.use(bodyParser.json());

app.use(
  cookieSession({
    maxAge: 30*24*60*60*1000,
    keys: [keys.cookieKey]
  })
);
app.use(passport.initialize());
app.use(passport.session());
require('./models/User');
require('./models/Survey');
require('./services/passport');
require('./routes/authRoutes')(app);
require('./routes/billingRoutes')(app);
require('./routes/surveyRoutes')(app);

if(process.env.NODE_ENV === 'production'){
  app.use(express.static('client/build'));
  const path = require('path');
  app.get('*',(req,res)=>{
    res.sendFile(path.resolve(__dirname,'client','build','index.html'));
  });
}



const PORT = process.env.PORT || 5000;
app.listen(PORT);