import React,{ Component} from 'react';
import { fetchSurvey } from '../../actions';
import { connect } from 'react-redux';

class SurveyList extends Component{
    componentDidMount(){
        this.props.fetchSurvey();
    }
    renderSurveys(){
        return this.props.surveys.reverse().map(survey=>{
            return(
                <div className="card darken-1 " key={survey._id }>
                    <div className="card-content ">
                        <span className="card-title">{survey.title}</span>
                        <p>{survey.body}</p>
                        <p className="right">
                            Sent on: { new Date(survey.dateSent).toLocaleDateString()}
                        </p>
                    </div>
                    <div className="card-action">
                        <p style={{display:"inline ",marginRight:"10px"}} className="blue-text text-darken-2">Yes: {survey.yes}</p>
                        <p style={{display:"inline"}} className="blue-text text-darken-2">No: {survey.no}</p>
                    </div>

                </div>
            );
        })

    }
    
    render(){
        return(
            <div>
               {this.renderSurveys()}
            </div>
        );
    }
}
function mapStateToProps({ surveys }){
    
    return { surveys };

}
export default connect(mapStateToProps, { fetchSurvey })(SurveyList);