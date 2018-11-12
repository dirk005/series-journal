import React, { Component }from 'react';
import Card from '../Card/Card.js';

class CardList extends Component {
	constructor(props){
		super(props);
		this.state ={
			authkey :this.props.authKey,			
			seriesArray:this.props.seriesIdArray
		}	
	}	
	componentWillReceiveProps(props) {
 	 const { authkey, seriesArray } = this.props;
 	 console.log(seriesArray)
	 	 if (seriesArray !== this.state.seriesArray && seriesArray !== undefined ) {
	   	 	this.setState({seriesArray: !this.state.seriesArray})
  		}
}
	
  render() {
  	const {authkey,seriesArray,seriesName} = this.state;
    return( 
    	<div>
           {
			seriesArray.map((seriesId, i) =>{							
				
				return (					
					<Card
						authKey={authkey} //always send auth key
		 				key={i}
		 				seriesId={seriesArray[i]} 		 				
					 />
		 			);
			})
		}
        </div>
      );
  }
}

export default CardList;
