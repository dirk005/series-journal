import React, { Component } from 'react';
import CardList from '../CardList/CardList';

class MainPage extends Component {
	constructor(props){
		super(props);
		this.state ={
			authkey :[],
			searchTerm: '',
			notFound:false,
			seriesArray:[],
			displayCards:false
		}	
	}
	componentDidMount(){
		this.connectToApi();

	}
	 // shouldComponentUpdate(nextProps,nextState){
	 // 	console.log(`${this.state.seriesArray}    ${nextState.seriesArray}`)
  //  		 return this.state.seriesArray !== nextState.seriesArray ? true: false;
  //  	 }

	// Login to server and get auth key
	 connectToApi = () => {
	 	fetch('http://localhost:3001/tvdblogin')
	 	.then(response => response.json())
	 	.then(res => {
	 		if(res === 'error'){
				console.log('error')
	 		}else{
	 			const authArr= JSON.parse(res); //Change response sting to an object	 			
	 			this.setState({authkey: authArr.token});
	 			console.log('connected')
	 			//console.log(this.state.authkey)
	 			}
	 })
		.catch(err => console.log(err))	
	}	
	//refresh auth key
	refreshAuthKey =()=>{
		fetch('http://localhost:3001/refreshToken',{
				method : 'post',
				headers : {'Content-Type': 'application/json'},
				body : JSON.stringify({
					authKey : this.state.authkey
				})
			})
			.then(response => response.json())
	 		.then(res => {
	 		if(res === 'error')
	 		{
	 			console.log('error connecting 1' + this.state.authkey)
	 		} else{
	 			const authArr= JSON.parse(res);
	 			this.setState({authkey: authArr.token}); // update authkey
	 			console.log(`refreshed ${this.state.authkey}` )
	 		} 
		 })
		.catch(err => console.log(err))	
	}

	//search series
	searchSeries =()=>{
		this.setState({notFound:false});
		this.setState({seriesArray:[]});
		fetch('http://localhost:3001/seriesSearch',{
				method : 'post',
				headers : {'Content-Type': 'application/json'},
				body : JSON.stringify({
					authKey : this.state.authkey,
					searchTerm: this.state.searchTerm
				})
			})
			.then(response => response.json())
	 		.then(res => {
	 		if(res === 'error')
	 		{
	 			console.log(`error connecting to search ${this.state.searchTerm}`)
	 		}else if(res === '404'){
	 			this.setState({notFound:true});
	 			console.log(this.state.notFound)
	 		} 
	 		else{
	 			const search = JSON.parse(res);
	 			for ( var i =0 ;i < search.data.length;i++){
	 				 	//add series ID's to series Array
	 				 	this.setState({seriesArray:[...this.state.seriesArray,search.data[i].id]}); 
	 			}	
	 			this.setState({displayCards:true});
	 			console.log('searched') 			
	 		} 
		 })
		.catch(err => console.log(err))	
	}
	onSearchChange = (event) =>{
		this.setState({searchTerm: event.target.value})		
	}
  render() {
    const {authkey,searchTerm,notfound,seriesArray,displayCards} = this.state;

    return (
     
      <div>
        {		//remarked out will add to when token needs to be refreshed
        			// <input 
				    //   	className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
				    //   	type="submit" 
				    //   	value="Refresh Token"
				    //   	onClick={this.refreshAuthKey}
				    //   />
		}
		<label className="db fw6 lh-copy f6" htmlFor="name">Search </label>
				        <input 
					        className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
					        type="text" 
					        name="search"  
					        id="search"
					        onChange={this.onSearchChange}
				        />
				      
		 <input 
				      	className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
				      	type="submit" 
				      	value="Search "
				      	onClick={this.searchSeries}
				      />
				     {
				     	notfound ?
				     	<div className="alert f4  pa2  ba bw1 br2 ma1">
				     		<p><strong>{`No match for ${searchTerm}`}</strong></p>
				     	</div>
				     	:( displayCards  ?
				     		 <div>
				     			<CardList seriesIdArray={seriesArray} authKey={authkey}/>
				     		</div>				     	
				     		:
				     		<div className=" f4  pa2  ba bw1 br2 ma1">
				     			<p><strong>{`No series yet search a series`}</strong></p>
				     		</div>
				     	)
				     }
      </div>
    );
  }
}

export default MainPage;
