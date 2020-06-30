import React,{ Component } from 'react'
import { BrowserRouter , Route } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';
import Header from './Header';
import Landing from './Landing';

import SurveyNew from './surveys/SurveyNew';
import Dashboard from './Dashboard'
//const Dashboard = ()=><h2>Dashboard</h2>
//const SurveyNew = ()=><h2>SurveyNew</h2>
const SurveyThanks = ()=><div style={{textAlign:'center'}}><h2>Thnaks for voting!!</h2></div>
//const Landing = ()=><h2>Landing</h2>

class App extends Component {
    componentDidMount(){
        this.props.fetchUser();

    }
    render(){
        return(
            <div>
               
               <BrowserRouter>
                    <Header/>
                    <div className="container">
                        
                        <Route exact path="/" component = { Landing } />
                        <Route exact path="/survey" component = { Dashboard } />
                        <Route exact path="/survey/new" component = { SurveyNew } />
                        <Route path="/api/survey/:surveyId/:choice" component = { SurveyThanks } />
                        
                    </div>
               </BrowserRouter>
            </div>
        );
    }
}

export default connect(null,actions)(App) ;