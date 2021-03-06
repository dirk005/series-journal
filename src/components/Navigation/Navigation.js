import React, {Component} from 'react';
import './Navigation.css';

class Navigation extends Component{
	
	
	//read field value from the event and send it to the parent
	onFieldChange(event) {        
        const fieldValue = event.target.value;
        this.props.onSearchChange(fieldValue);
    }

    render(){
    	const {isSignedIn,searchSeries,onRouteChange,userDetails} = this.props;
    	if(isSignedIn){
			return(				
				<nav className="flex justify-between flex-wrap  bb b--white-10 ba shadow-5 center  bg-black o-80">
				  	<div className="flex-grow pa3 flex items-center">
				  		<p className='f3 white pa2 ma1' >Signed in to : {userDetails.name}</p>
				  		<p  
				  			onClick={() => onRouteChange('signout')} 
				  			className='pointer f6 dib white bg-animate hover-bg-white hover-black no-underline pv2 ph4 br-pill ba b--white-20 ma1'>
				  			SIGN OUT
				  		</p>					
				 	</div>
				  	<div className="flex-grow no-underline flex items-center pa3 " href="">
				      	<input 
						    className="f6 dib black bg-animate hover-bg-black hover-white no-underline pv2 ph4 br-pill ba b--white-20 ma1" 
					        type="text" 
					        name="search"  
					        id="search"
					        onChange={ this.onFieldChange.bind(this)}
				        />
				        <p 
				        	onClick={() => {
				        		onRouteChange('home')
				        		searchSeries()
				        		} 
				        	}	
				        	className="pointer f6 dib white bg-animate hover-bg-white hover-black no-underline pv2 ph4 br-pill ba b--white-20 ma1"> 
				        	SEARCH
				        </p>
				  	</div>					  				
	 			</nav>			
			);
		}else{
			return(
				<nav style={{display: 'flex',justifyContent:'flex-end'}} className='ba  b--black-10 mainColor   shadow-5 center  o-80 '>					
					<p  onClick={() => onRouteChange('signin')} className='pointer f6 dib white bg-animate hover-bg-white hover-black no-underline pv2 ph4 br-pill ba b--white-20 ma1'>SIGN IN</p>
					<p  onClick={() => onRouteChange('register')} className='pointer f6 dib white bg-animate hover-bg-white hover-black no-underline pv2 ph4 br-pill ba b--white-20 ma1'>REGISTER</p>
				</nav>
			);
		}
    }
}

export default Navigation;