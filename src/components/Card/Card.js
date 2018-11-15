import React, { Component }from 'react';
import './Card.css';
 import { Accordion, AccordionGroup, AccordionGroupTitle, AccordionGroupBody } from '@starnavi/react-accordion'
class Card extends Component {
	constructor(props){
		super(props);
		this.state ={
			authkey :this.props.authKey,			
			seriesKey:this.props.seriesId,
			seriesName:'',
			seriesbanner:'',
			seriesFirstAired:'',
			seriesGenre:[],
			seriesNetwork:'',
			seriesOverview:'',
			seriesRating:'',
			seriesRuntime:'',
			seriesSiteRating:0,
			seriesSlug:'',
			seriesStatus:'',
			airedEpisodes:'',
			Seasons:[]
		}	
	}

	componentDidMount(){
		this.getSeriesDetail(); //get series details
	}

	//get series details to display
	getSeriesDetail(){		
			fetch('http://localhost:3001/getSeries',{
					method : 'post',
					headers : {'Content-Type': 'application/json'},
					body : JSON.stringify({
						authKey : this.state.authkey,
						seriesId: this.state.seriesKey
					})
				})
				.then(response => response.json())
		 		.then(res => {
		 		if(res === 'error')
		 		{
		 			console.log(`error getting id ${this.state.seriesKey}`)
		 		}else if(res === '404'){
		 			console.log('page not found')		 			
		 		} 
		 		else{
		 			const seriesInfo = JSON.parse(res);
		 			// set up data to display
		 			this.setState({seriesName:seriesInfo.data.seriesName});
		 			this.setState({seriesBanner:seriesInfo.data.banner});
		 			this.setState({seriesFirstAired:seriesInfo.data.firstAired});
		 			this.setState({seriesGenre:seriesInfo.data.genre});
		 			this.setState({seriesNetwork:seriesInfo.data.network});
		 			this.setState({seriesOverview:seriesInfo.data.overview});
		 			this.setState({seriesRating:seriesInfo.data.rating});
		 			this.setState({seriesRuntime:seriesInfo.data.runtime});
		 			this.setState({seriesSiteRating:seriesInfo.data.siteRating});
		 			this.setState({seriesSlug:seriesInfo.data.slug});
		 			this.setState({seriesStatus:seriesInfo.data.status});
		 			//console.log(this.state.seriesKey)
		 		} 
			 })
			.catch(err =>{
			 console.log(err)		 
			})			
	}

	//get Season numbers and number of aired episodes
	getSeriesSeasons(){
		console.log(this.state.seriesKey)
		fetch('http://localhost:3001/getSeriesSeason',{
			method : 'post',
					headers : {'Content-Type': 'application/json'},
					body : JSON.stringify({
						authKey : this.state.authkey,
						seriesId: this.state.seriesKey
					})
				})
		.then(response => response.json())
		.then(res =>{
			if (res ==='error'){
				console.log(`error getting Seasons`)
			}else if (res === '404'){
				console.log('page not found')
			}else{
				const SeasonInfo = JSON.parse(res);
				//change season array to number and sort
				const numberArray = SeasonInfo.data.airedSeasons.map((val) => Number(val));
				const SortedSeasons = numberArray.sort((a,b) => a-b);

				//add to state
				this.setState({airedEpisodes:SeasonInfo.data.airedEpisodes});
				this.setState({Seasons:SortedSeasons})
			}
		})
		.catch(err =>{
			 console.log(err)		 
			})	
	}

	//get episodes information
	getSeriesEpisodes(){
		console.log(this.state.seriesKey)
		fetch('http://localhost:3001/getSeriesEpisodes',{
			method : 'post',
					headers : {'Content-Type': 'application/json'},
					body : JSON.stringify({
						authKey : this.state.authkey,
						seriesId: this.state.seriesKey
					})
				})
		.then(response => response.json())
		.then(res =>{
			if (res ==='error'){
				console.log(`error getting episodes`)
			}else if (res === '404'){
				console.log('page not found')
			}else{
				const episodeInfo = JSON.parse(res);
				console.log(episodeInfo.data)
			}
		})
		.catch(err =>{
			 console.log(err)		 
			})	
	}
		

render() {
		const {seriesName,seriesBanner,seriesFirstAired,seriesGenre,seriesNetwork,seriesOverview,seriesRating,seriesRuntime,seriesSiteRating,seriesSlug,seriesStatus,Seasons} = this.state;
		
		if (seriesBanner === ''){
			return <div></div>;
		}else{
		return (
			<div className='cardDisplay bg-black white br3 pa3  bw2 shadow-5 o-80'>
				<div className=''>				
					<div className="flex justify flex-wrap">
						<div className="flex ">
							<img className='cardImage' alt={``} src={`https://www.thetvdb.com/banners/${seriesBanner}`} />
						</div>
						
						<div className=" flex ma2  ">
						    <div className="grid-container ">
						    	<h2 className='underline '>{`${seriesName}`} </h2>
						    	<h2 className='tr'>{`Rating : ${seriesSiteRating}`}</h2>
							  	<div className="grid-item underline">First aired </div>
							  	<div className="grid-item">{seriesFirstAired}</div>
							  	<div className="grid-item underline">Genre</div>  
							  	<div className="grid-item">{`${seriesGenre}`}</div>
							  	<div className="grid-item underline">Network</div>
								<div className="grid-item">{seriesNetwork}</div>
								<div className="grid-item underline">Status </div>
								<div className="grid-item">{seriesStatus}</div>
								<div className="grid-item underline">Rated</div>  
								<div className="grid-item">{seriesRating}</div>
								<div className="grid-item underline">Runtime</div>
								<div className="grid-item">{seriesRuntime}</div>   
							</div>							
						</div>	
					</div>
				</div>
				<div>
					<p className='ma2 underline'>Series overview</p>
					<p>{seriesOverview}</p>
					<p  
				  		onClick={() => this.getSeriesSeasons()} 
				  		className='pointer f6 dib white bg-animate hover-bg-white hover-black no-underline pv2 ph4 br-pill ba b--white-20 ma1'>
				  			VIEW MORE
				  	</p>
				  	{ 	// add seasons to page is any is found or else add nothing.
				  		Seasons.length ? 
				  			Seasons.map((val,i) => {
					  		return (
					  				<Accordion>
						        		<AccordionGroup>
						             		<AccordionGroupTitle>
						                		Season {val}
						             		</AccordionGroupTitle>
						             		<AccordionGroupBody>
						                 		Body part, you can put here any element you want
						             		</AccordionGroupBody>
						         		</AccordionGroup>						         
					     			</Accordion>
					     			)
					     		})
				 				:
				 				<div></div>				 	
				 	}
				</div>
			</div>
			);
		}
	}
}
export default Card;