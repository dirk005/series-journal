import React, { Component }from 'react';
import Card from '../Card/Card.js';

class CardList extends Component {
	constructor(props){
		super(props);	
	}	
	
  render() {
  	const {searchArray} = this.props;
  	console.log(searchArray)
    return( 
    	<div>
           {

	           	searchArray.map((searchDetail,i) =>{
	           		return(
	           				<Card 
	           					key={i}	           					
	           					seriesName={searchDetail.seriesName}
	           					overview={searchDetail.overview}
	           					firstAired={searchDetail.firstAired}
	           					id={searchDetail.id}
	           					status={searchDetail.status}
	           					banner={searchDetail.banner}
	           					network={searchDetail.network}
	           				/>
	           			);
	           	})
			}
        </div>
      );
  }
}

export default CardList;
