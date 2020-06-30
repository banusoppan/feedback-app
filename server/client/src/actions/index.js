import axios from 'axios';
import { FETCH_USER ,FETCH_SURVEYS} from './types';

export const fetchUser = () => async dispatch =>{
    const res = await axios.get('/api/current_user')

    dispatch({type: FETCH_USER , payload: res.data })
    
    
};

export const handleToken = token => async dispatch =>{
    const res = await axios.post('/api/stripe',token)

    dispatch({type: FETCH_USER , payload: res.data })
    
    
};

export const createSurvey = (values,history) => async dispatch =>{
    const res = await axios.post('/api/surveys',values);
    history.push('/survey');
    dispatch({type:FETCH_USER,payload:res.data});

};
export const fetchSurvey = () => async dispatch =>{
    const res = await axios.get('/api/surveys');
    console.log("in action "+res.data)
    dispatch({type:FETCH_SURVEYS,payload:res.data});
}