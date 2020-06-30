export default emails =>{
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const emailArray  = emails
        .split(',')
        .map(email=>email.trim())
        .filter(email=>re.test(email)===false);
    
    if(emailArray.length){
        return `These email are invalid:${emailArray}`;

    }
    return null;
};