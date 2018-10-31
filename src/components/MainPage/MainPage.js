

import React, { Component } from 'react';

class MainPage extends Component {
	constructor(props){
		super(props);
		this.state ={
			
		}	
	}
	componentDidMount(){
		this.connectToApi();		
	}
	 connectToApi = () => {
	 	fetch('http://localhost:3001/tvdblogin')
	 	.then(response => response.json())
	 	.then(res => console.log(res))
		.catch(err => console.log(err))	
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
