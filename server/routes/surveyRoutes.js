const requireLogin = require('../middleware/requireLogin');
const requireCredit = require('../middleware/requireCredit');
const _ = require('lodash');
const { Path } = require('path-parser');
const { URL } =require('url');
const mongoose = require('mongoose');
const Survey = mongoose.model('surveys');
const Mailer = require('../services/Mailer');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate');

module.exports = (app) => {
    app.get('/api/surveys',requireLogin,async (req,res)=>{
        const surveys = await Survey.find({_user: req.user.id}).select({recipients:false})
        res.send(surveys);
    })

    app.post('/api/surveys', requireLogin, requireCredit,async (req, res) => {
        const { title, subject, body,  recipients } = req.body
        const survey = new Survey({
            title,
            subject,
            body,
            recipients : recipients.split(',').map(email => { 
                return  {email : email}
            }),
            _user : req.user.id,
            dateSent : Date.now()
        });
        //survey.save();
        //console.log(survey);
        const mailer = new Mailer(survey,surveyTemplate(survey));
        try{
            await mailer.send(); 
            await survey.save();
            req.user.credits -=1;
            const user = await req.user.save();
            res.send(user);

        }catch(err){
            console.log(err);
            console.log(err.response.body);
            res.status(422).send(err);
        }
        

    });

    app.post('/api/surveys/webhooks',(req,res)=>{
        _.chain(req.body)
            .map(({email,url})=>{
                const pathanme = new URL(url).pathname
                const p = new Path('/api/survey/:surveyId/:choice');
                const match = p.test(pathanme)
                if(match){
                    return {email, surveyId : match.surveyId, choice : match.choice }

                }
            

            })
            
            .compact()
            .uniqBy('email','surveyId')
            .each(({surveyId,email,choice}) =>{
                Survey.updateOne({
                    _id : surveyId,
                    recipients : {
                        $elemMatch : { email : email ,responded : false}
                    }
                },{
                    $inc:{ [choice] : 1},
                    $set : {'recipients.$.responded' : true},
                    lastResponded : new Date()
                }).exec();
            })
            .value();
            //console.log('reci')
            res.send({});
        
        

    });
    

}