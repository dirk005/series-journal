import React, { Component }from 'react';
import './Card.css';

class Card extends Component {
	constructor(props){
		super(props);
		this.state ={
			
		}	
	}

render() {
		const {	 seriesName, overview, firstAired, id, status, banner, network} = this.props;
	console.log(seriesName)
		if (banner === ''){
			return <div></div>;
		}else{
		return (
			<div className='cardDisplay bg-black white br3 pa3  bw2 shadow-5 o-80' >
				<div className=''>				
					<div className="flex justify flex-wrap">
						<div className="flex ">
							<img className='cardImage' alt={``} src={`https://www.thetvdb.com/banners/${banner}`} />
						</div>
						<div className=" flex  center  ">
								
								<div className="">
								<h2 className=' f2 underline '>{`${seriesName}`} </h2>
			             		 	<div className="overflow-auto">
									    <table className="f5 w-100 mw8 center" cellSpacing="0">
									      	<tbody className="lh-copy">
												<tr>
										          <td className=" pr5 tl  underline ">First aired</td>
										          <td className="pr5 tl ">{firstAired}</td>										          
										        </tr>	
										        <tr>
										          <td className=" pr5 tl  underline ">Network</td>
										          <td className=" pr5 tl   ">{network}</td>
										          
										        </tr>
										        <tr>
										          <td className=" pr5 tl  underline">Status</td>
										          <td className=" pr5 tl ">{status}</td>
										          
										        </tr>
				        					</tbody>
										</table>
									 </div>
								</div>
							</div>						
					</div>
				</div>
				<div>
					<p className='ma2 underline'>Series overview</p>
					<p>{overview}</p>
					<p  
				  		onClick={() => this.getSeriesSeasons()} 
				  		className='pointer f6 dib white bg-animate hover-bg-white hover-black no-underline pv2 ph4 br-pill ba b--white-20 ma1'>
				  			VIEW MORE
				  	</p>					
				</div>
			</div>
			);
		}
	}
}
export default Card;