import React, { Component } from "react";
import "./SeriesDetail.css";
import {
	Accordion,
	AccordionGroup,
	AccordionGroupTitle,
	AccordionGroupBody
} from "@starnavi/react-accordion";

class SeriesDetail extends Component {
	constructor(props) {
		super(props);
		this.state = {
			authkey: this.props.authKey,
			seriesKey: this.props.seriesId,
			airedEpisodes: "",
			Seasons: [],
			episodesDetailed: [],
			seriesDetails: [],
			SeriesActors: []
		};
	}

	componentDidMount() {
		this.getSeriesDetail(); //get series details
		this.getSeriesSeasons(); //get series season details
		this.getSeriesEpisodes(); //get series episodes
		this.getSeriesActors(); // get series actors
	}

	//get series details to display
	getSeriesDetail() {
		fetch("http://localhost:3001/getSeries", {
			method: "post",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				authKey: this.state.authkey,
				seriesId: this.state.seriesKey
			})
		})
			.then(response => response.json())
			.then(res => {
				if (res === "error") {
					console.log(`error getting id ${this.state.seriesKey}`);
				} else if (res === "404") {
					console.log("page not found");
				} else {
					const seriesInfo = JSON.parse(res);
					const seriesDetails = {
						seriesName: seriesInfo.data.seriesName,
						seriesBanner: seriesInfo.data.banner,
						seriesFirstAired: seriesInfo.data.firstAired,
						seriesGenre: seriesInfo.data.genre,
						seriesNetwork: seriesInfo.data.network,
						seriesOverview: seriesInfo.data.overview,
						seriesRating: seriesInfo.data.rating,
						seriesRuntime: seriesInfo.data.runtime,
						seriesSiteRating: seriesInfo.data.siteRating,
						seriesSlug: seriesInfo.data.slug,
						seriesStatus: seriesInfo.data.status
					};
					this.setState({ seriesDetails: seriesDetails });
				}
			})
			.catch(err => {
				console.log(err);
			});
	}

	//get Season numbers and number of aired episodes
	getSeriesSeasons() {
		console.log(this.state.seriesKey);
		fetch("http://localhost:3001/getSeriesSeason", {
			method: "post",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				authKey: this.state.authkey,
				seriesId: this.state.seriesKey
			})
		})
			.then(response => response.json())
			.then(res => {
				if (res === "error") {
					console.log(`error getting Seasons`);
				} else if (res === "404") {
					console.log("page not found");
				} else {
					const SeasonInfo = JSON.parse(res);

					//change season array to number and sort
					const numberArray = SeasonInfo.data.airedSeasons.map(val =>
						Number(val)
					);
					const SortedSeasons = numberArray.sort((a, b) => a - b);

					this.setState({
						airedEpisodes: SeasonInfo.data.airedEpisodes
					});
					this.setState({ Seasons: SortedSeasons });
				}
			})
			.catch(err => {
				console.log(err);
			});
	}

	//get episodes information with async await
	async getSeriesEpisodes() {
		let episodesDetailedArray = [];
		let morePagesAvailable = true;
		let currentPage = 0;

		while (morePagesAvailable) {
			const response = await fetch(
				"http://localhost:3001/getSeriesEpisodes",
				{
					method: "post",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({
						authKey: this.state.authkey,
						seriesId: this.state.seriesKey,
						pageNum: currentPage
					})
				}
			);

			let res = await response.json();
			const episodeInfo = JSON.parse(res);

			episodeInfo.data.map(details => {
				return episodesDetailedArray.push({
					id: details.id,
					airedSeason: details.airedSeason,
					airedEpisodeNumber: details.airedEpisodeNumber,
					episodeName: details.episodeName,
					firstAired: details.firstAired,
					siteRating: details.siteRating
				});
			});

			let total_pages = episodeInfo.links.last; // Get Number of pages from API
			currentPage++; // add current page
			morePagesAvailable = currentPage < total_pages; // check if current page is more than total pages
		}

		//sort array to episode number and add to state
		episodesDetailedArray.sort(
			(a, b) => a.airedEpisodeNumber - b.airedEpisodeNumber
		);
		this.setState({ episodesDetailed: episodesDetailedArray });
	}

	//get series actors
	getSeriesActors() {
		let seriesActorsArray = [];
		fetch("http://localhost:3001/getSeriesActors", {
			method: "post",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				authKey: this.state.authkey,
				seriesId: this.state.seriesKey
			})
		})
			.then(response => response.json())
			.then(res => {
				if (res === "error") {
					console.log(`error getting Seasons`);
				} else if (res === "404") {
					console.log("page not found");
				} else {
					const ActorsInfo = JSON.parse(res);

					seriesActorsArray = ActorsInfo.data.map(details => {
						return {
							name: details.name,
							role: details.role,
							image: details.image
						};
					});
					this.setState({ SeriesActors: seriesActorsArray });
				}
			})
			.catch(err => {
				console.log(err);
			});
	}

	render() {
		const {
			seriesDetails,
			Seasons,
			episodesDetailed,
			SeriesActors,
			airedEpisodes
		} = this.state;

		if (seriesDetails.seriesBanner === "") {
			return <div />;
		} else {
			return (
				<div className="cardDisplay bg-black white br3 pa3  bw2 shadow-5 o-80">
					<div className="flex-items">
						<div className="flex-image ">
							<img
								alt={``}
								src={`https://www.thetvdb.com/banners/${
									seriesDetails.seriesBanner
								}`}
							/>
						</div>
						<div className="flex-detail">
							<div className="overflow-auto">
								<table className="f5 center " cellSpacing="0">
									<tbody className="lh-copy">
										<tr>
											<td className="pr3 tl underline">
												First aired
											</td>
											<td className="tl">
												{seriesDetails.seriesFirstAired}
											</td>
										</tr>
										<tr>
											<td className="pr3 tl underline">
												Network
											</td>
											<td className="tl">
												{seriesDetails.seriesNetwork}
											</td>
										</tr>
										<tr>
											<td className="pr3 tl underline">
												Status
											</td>
											<td className="tl">
												{seriesDetails.seriesStatus}
											</td>
										</tr>
										<tr>
											<td className="pr3 tl underline">
												Genre
											</td>
											<td className="tl">{`${
												seriesDetails.seriesGenre
											}`}</td>
										</tr>
										<tr>
											<td className="pr3 tl underline">
												Rated
											</td>
											<td className="tl   ">
												{seriesDetails.seriesRating}
											</td>
										</tr>
										<tr>
											<td className="pr3 tl underline">
												Runtime
											</td>
											<td className="tl ">
												{seriesDetails.seriesRuntime}
											</td>
										</tr>
										<tr>
											<td className="pr3 tl  underline">
												Rating
											</td>
											<td className="tl ">
												{seriesDetails.seriesSiteRating}
											</td>
										</tr>
										<tr>
											<td className="pr3 tl underline">
												Episodes
											</td>
											<td className="tl">
												{airedEpisodes}
											</td>
										</tr>
									</tbody>
								</table>
							</div>
						</div>
						<div className="flex-detail ">
							<div>
								<p className="ma2 underline">Overview</p>
								<p>{seriesDetails.seriesOverview}</p>
							</div>
						</div>
						
						<div className="flex-season">
							{// add seasons
							Seasons.map((seasonNumber, i) => {
								return (
									<Accordion key={seasonNumber}>
										<AccordionGroup>
											<AccordionGroupTitle className="pointer f3 black pa2 ma1 bb b--white-10 ba shadow-5 center  bg-white o-80 ">
												Season {seasonNumber}
											</AccordionGroupTitle>
											<AccordionGroupBody>
												<div className="">
													<div className="pa2 ">
														<table
															className="f6 mw8 center"
															cellSpacing="0"
														>
															<tbody className="lh-copy ">
																<tr>
																	<th className="fw6 bb b--black-20 tl pb3 pr3 bg-white black o-80">
																		#
																	</th>
																	<th className="fw6 bb b--black-20 tl pb3 pr3 bg-white black o-80">
																		Name
																	</th>
																	<th className="fw6 bb b--black-20 tl pb3 pr3 bg-white black o-80">
																		Aired
																		Date
																	</th>
																	<th className="fw6 bb b--black-20 tl pb3 pr3 bg-white black o-80">
																		Rating
																	</th>
																</tr>
																{//add episodes
																episodesDetailed.map(
																	(
																		value,
																		ii
																	) => {
																		return value.airedSeason ===
																			seasonNumber ? (
																			<tr
																				key={
																					value.id
																				}
																			>
																				<td className="pv3 pr3 tl bb b--white-20">
																					{
																						value.airedEpisodeNumber
																					}
																				</td>
																				<td className="pv3 pr3 tl bb b--white-20">
																					{
																						value.episodeName
																					}
																				</td>
																				<td className="pv3 pr3 tl bb b--white-20">
																					{
																						value.firstAired
																					}
																				</td>
																				<td className="pv3 pr3 tr bb b--white-20">
																					{
																						value.siteRating
																					}
																				</td>
																			</tr>
																		) : null;
																	}
																)}
															</tbody>
														</table>
													</div>
												</div>
											</AccordionGroupBody>
										</AccordionGroup>
									</Accordion>
								);
							})}
						</div>
						<h2 className=" f2 underline ">{`Actors`} </h2>
						<div className="flex-actors">
							{// Add actors
							SeriesActors.map((actor, i) => {
								return (
									<div key={i} className="gallery-item">
										<img
											alt={``}
											src={`https://www.thetvdb.com/banners/${
												actor.image
											}`}
										/>
										<span className="text-wrapper">
											<span className="name">
												{actor.role}
											</span>
											<a
												href={`http://www.google.com/search?q=${
													actor.name
												}`}
												rel="noopener noreferrer"
												target="_blank"
											>
												<span className="title">
													{actor.name}
												</span>
											</a>
										</span>
									</div>
								);
							})}
						</div>
					</div>
				</div>
			);
		}
	}
}
export default SeriesDetail;
