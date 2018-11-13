import React, { Component }from 'react';
import './Card.css';
class Card extends Component {
	constructor(props){
		super(props);
		this.state ={
			authkey :this.props.authKey,			
			seriesKey:this.props.seriesId,
			seriesName:''
		}	
	}

	componentDidMount(){
		this.getSeriesDetail(); //get series details
	}
	getSeriesDetail(seriesId){		
			fetch('http://localhost:3001/getSeries',{
					method : 'post',
					headers : {'Content-Type': 'application/json'},
					body : JSON.stringify({
						authKey : this.state.authkey,
						seriesId: this.state.seriesKey,
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
						seriesStatus:''


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
		 			
		 			console.log(seriesInfo.data)		 				
		 		} 
			 })
			.catch(err =>{
			 console.log(err)		 
			})			
	}

render() {
		const {seriesName,seriesBanner,seriesFirstAired,seriesGenre,seriesNetwork,seriesOverview,seriesRating,seriesRuntime,seriesSiteRating,seriesSlug,seriesStatus} = this.state;
		return (
			<div className='cardDisplay bg-black white br3 pa3  bw2 shadow-5 '>
			
				<div className="flex">
					<div className="w-50 pa3 mr2">
						<img className='cardImage' alt={``} src={`https://www.thetvdb.com/banners/${seriesBanner}`} />
					</div>
					<div className=" w-25  tl">
					    <h2 className='underline'>{`${seriesName}`} </h2>						    
							
						<div className="grid-container">
						  	<div className="grid-item">First aired </div>
						  	<div className="grid-item">{seriesFirstAired}</div>
						  	<div className="grid-item">Genre</div>  
						  	<div className="grid-item">{`${seriesGenre}`}</div>
						  	<div className="grid-item">Network</div>
							<div className="grid-item">{seriesNetwork}</div>   
						</div>
					</div>

					<div className="w-25  tr">
					   	<h2>{`Rating : ${seriesSiteRating}`}</h2>
					   	<div className="grid-container">
						  	<div className="grid-item">Status </div>
							<div className="grid-item">{seriesStatus}</div>
							<div className="grid-item">Rated</div>  
							<div className="grid-item">{seriesRating}</div>
							<div className="grid-item">Runtime</div>
							<div className="grid-item">{seriesRuntime}</div>   
						</div>
					</div>
				
				</div>
				<div>
					<p className='ma2 underline'>Series overview</p>
					<p>{seriesOverview}</p>
				</div>
			</div>
			);
	}
}
export default Card;