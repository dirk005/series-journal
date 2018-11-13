import React, { Component }from 'react';
import Card from '../Card/Card.js';

class CardList extends Component {
	constructor(props){
		super(props);
		this.state ={
			//authkey :this.props.authKey,			
			//seriesArray:this.props.seriesIdArray
		}	
	}	
// 	componentWillReceiveProps(props) {
//  	 const { authkey, seriesArray } = this.props;
//  	 console.log(seriesArray)
// 	 	 if (seriesArray !== this.state.seriesArray && seriesArray !== undefined ) {
// 	   	 	this.setState({seriesArray: !this.state.seriesArray})
//   		}
// }
	
  render() {
  	const {authKey,seriesIdArray} = this.props;
    return( 
    	<div>
           {
			seriesIdArray.map((seriesId, i) =>{							
				
				return (					
					<Card
						authKey={authKey} //always send auth key
		 				key={i}
		 				seriesId={seriesId} 		 				
					 />
		 			);
			})
		}
        </div>
      );
  }
}

export default CardList;
