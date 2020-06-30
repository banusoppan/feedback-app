import React  from 'react';
import { connect } from 'react-redux';
import formField from './formField';
import _ from 'lodash';
import * as actions from '../../actions';
import { withRouter } from "react-router";


const SurveyReview = ({onCancel,formValues,createSurvey,history}) =>{

    
    const reviewField = _.map(formField,({name,label}) =>{
        return(
            <div key={name}>
                <label>{label}</label>
                <div>{formValues[name]}</div>
            </div>
            
        );

    })

    return(
        <div>
            <h5>Please check your email details</h5>
           {reviewField}

            <button className="yellow darken-3 btn-flat text-white" onClick={onCancel} style={{marginTop:"20px"}}>Back</button>
            <button className="green btn-flat text-white right" onClick={()=>createSurvey(formValues,history)} style={{marginTop:"20px"}}>
                Send Survey
                <i className="material-icons right">mail</i>
            </button>
            
        </div>
        
    );
}
function mapStateToProps(state){
    
   return{
        formValues : state.form.surveyForm.values
   };

}

export default connect(mapStateToProps,actions)(withRouter(SurveyReview));