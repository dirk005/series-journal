import React, { Component }from 'react';
import Card from '../Card/Card.js';

class CardList extends Component {
  render() {
  	const {searchArray,onRouteChange,onSeriesChange} = this.props;
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
	           					onRouteChange={onRouteChange}
	           					onSeriesChange={onSeriesChange}
	           				/>
	           			);
	           	})
			}
        </div>
      );
  }
}

export default CardList;
