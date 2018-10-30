

import React, { Component } from 'react';

class MainPage extends Component {
	constructor(props){
		super(props);
		this.state ={
			apikey : '6IRSO76GZPTPQ0U8',
			userkey : 'EPUUU79RZ0JT31IM',
			username: 'dirkvanrensburg5o1b'
		}	
	}
	componentDidMount(){
		this.connectToApi();		
	}
	 connectToApi = () => {
		fetch('https://api.thetvdb.com/login',{
				method : 'post',
				headers : {'Content-Type': 'application/json'},
				body : JSON.stringify({
					apikey : this.state.apikey,
					userkey : this.state.userkey,
					username : this.state.username
				})
			}).then(response => response.json())
			.then(details => console.log(details))


	}	
  render() {
    
    return (
     
      <div>
        <h1>working</h1>
      </div>
    );
  }
}

export default MainPage;
