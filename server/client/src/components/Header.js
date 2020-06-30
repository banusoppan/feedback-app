import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import  Payment  from './Payment';

class Header extends Component {
    renderContent(){
        switch(this.props.auth){
            case null :
                return;
            case false :
                return (
                    <li><a href="/auth/google">Login With Google</a></li>
                );
            default :
                return[
                    <li key="1"><Payment/></li>,
                <li key="2" style={{margin:"0px 10px"}}>credits : {this.props.auth.credits}</li>,
                    <li key="3"><a href="/api/logout">Logout</a></li>
                ];
        }
    }
    render(){
        console.log(this.props)
        return (
            <nav>
                <div className="nav-wrapper">
                    <Link 
                        to={this.props.auth?'/survey':'/'} 
                        className="brand-logo left"
                    >Emaily
                    </Link>
                    <ul id="nav-mobile" className="right " >
                        { this.renderContent()}
                    </ul>
                </div>
            </nav>
        );
    }
}

function mapStateProps({ auth }){
    
    return { auth }
}
export default connect(mapStateProps)(Header);