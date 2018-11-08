import React, { Component }from 'react';
import Card from '../Card/Card.js';

class CardList extends Component {
	constructor(props){
		super(props);
		this.state ={
			authkey :this.props.authKey,			
			seriesArray:this.props.seriesIdArray,
			seriesName:''
		}	

	}

	componentDidMount(){
		// console.log(this.props.seriesIdArray)
		// console.log(this.props.authKey)		
	}
	getSeriesDetail(seriesId){		
		fetch('http://localhost:3001/getSeries',{
				method : 'post',
				headers : {'Content-Type': 'application/json'},
				body : JSON.stringify({
					authKey : this.state.authkey,
					seriesId: seriesId
				})
			})
			.then(response => response.json())
	 		.then(res => {
	 		if(res === 'error')
	 		{
	 			console.log(`error getting id ${this.state.seriesId}`)
	 		}else if(res === '404'){
	 			return false;
	 		} 
	 		else{
	 			const seriesInfo = JSON.parse(res);

	 			// for ( var i =0 ;i < search.data.length;i++){
	 			// 	 	//add series ID's to series Array
	 			// 	 	this.setState({seriesArray:[...this.state.seriesArray,search.data[i].id]}); 
	 			// }	
	 			// this.setState({displayCards:true});
	 			//console.log(seriesInfo.data.seriesName) 
	 			this.setState({seriesName:seriesInfo.data.seriesName})		
	 		} 
		 })
		.catch(err =>{
		 console.log(err)
		 return false
		})		
	}
	
  render() {
  	const {authkey,seriesArray,seriesName} = this.state;
  	// this.getDataFromParent();
    return( 
    	<div>
           {
			seriesArray.map((seriesId, i) =>{
				console.log(seriesId)
				if(seriesId  !== undefined){ 				
				this.getSeriesDetail(seriesId);
				//console.log(seriesInfo)
				return (
					
					<Card
		 				key={i}
		 				id={seriesArray[i]} 
		 				name={seriesName}
		 				email={`test@gmail.com`} 
					 />
		 			);
				
			}
		})
		}
        </div>
            );
  }
}

export default CardList;
