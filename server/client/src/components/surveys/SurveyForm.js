import React , { Component } from 'react';
import { reduxForm,Field} from 'redux-form';
import { Link } from 'react-router-dom';
import SurveyField from './SurveyField'
import _ from 'lodash';
import validateEmail from '../../utils/validateEmail'

import formField from './formField'

class SurveyForm extends Component{
    renderField(){
        return _.map(formField,({label,name}) =>{
            return(
                <Field key={name} component={ SurveyField } type="text" label={label} name={name} />
            );

        });
    }
    render(){
        return(
            <div >
                <form onSubmit={this.props.handleSubmit(this.props.onSurveySubmit)}>
                    {this.renderField()}
                    <br/>

                    <Link to="/survey" className="red btn-flat left white-text">Cancel
                        <i className="material-icons right">close</i>
                    </Link>
                    <button type="submit" className="teal btn-flat right white-text">Next
                        <i className="material-icons right">done</i>
                    </button>
                    

                </form>
                
            </div>
        );
    }

}

function validate(values){
    const errors = {}
    errors.recipients = validateEmail(values.recipients || '');
    
    _.each(formField,({name,noValueError})=>{
        if(!values[name]){
            errors[name] = noValueError
        }
    })
    

    return errors
    
}

export default reduxForm({
    validate,
    form: 'surveyForm',
    destroyOnUnmount: false
})(SurveyForm);