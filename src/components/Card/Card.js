import React, { Component }from 'react';

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
			<div className=' tc bg-black white dib br3 pa3 ma2 grow bw2 shadow-5'>
				<img  alt={`${seriesName}`} src={`https://www.thetvdb.com/banners/${seriesBanner}`} />
				<div>
					<h2>{seriesName}</h2>
					<p>{seriesOverview}</p>
				</div>
			</div>
			);
	}
}
export default Card;