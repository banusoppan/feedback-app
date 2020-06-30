import React , { Component } from 'react';
import { Link } from 'react-router-dom';
import SurveyList from '../components/surveys/SurveyList'


class Dashboard extends Component{
    render(){
        return(
            <div >
                
                <SurveyList/>
                
                <div className="fixed-action-btn">
                    <Link className="btn-floating btn-large red" to="/survey/new">
                        <i className="large material-icons">add</i>
                    </Link>
                    
                </div>      
               
            </div>
            
        );
    }

}

export default Dashboard;