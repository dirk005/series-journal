import React, { Component } from "react";
import "./Card.css";

class Card extends Component {
//Send Series ID to the App.js page
	onSeriesSelect = () => {
		this.props.onSeriesChange(this.props.id);
	};

	render() {
		const {
			overview,
			firstAired,
			status,
			banner,
			network,
			onRouteChange
		} = this.props;
		if (banner === "") {
			return <div />;
		} else {
			return (
				<div className="cardDisplay bg-black white br3 pa3  bw2 shadow-5 o-80">
					<div className="flex-items">
						<div className="flex-image ">
							<img
								alt={``}
								src={`https://www.thetvdb.com/banners/${banner}`}
							/>
						</div>
						<div className="flex-detail">
							<div className="overflow-auto">
								<table
									className="f5  mw8 center"
									cellSpacing="0"
								>
									<tbody className="lh-copy">
										<tr>
											<td className=" pr5 tl  underline ">
												First aired
											</td>
											<td className="pr5 tl ">
												{firstAired}
											</td>
										</tr>
										<tr>
											<td className=" pr5 tl  underline ">
												Network
											</td>
											<td className=" pr5 tl   ">
												{network}
											</td>
										</tr>
										<tr>
											<td className=" pr5 tl  underline">
												Status
											</td>
											<td className=" pr5 tl ">
												{status}
											</td>
										</tr>
									</tbody>
								</table>
							</div>
						</div>
						<div>
							<p className="ma2 underline">Overview</p>
							<p>{overview}</p>
							<p
								onClick={() => {
									this.onSeriesSelect(); //add series ID to App.js
									onRouteChange("SeriesDetail"); //change Route to dislay series detail
								}}
								className="pointer f6 dib white bg-animate hover-bg-white hover-black no-underline pv2 ph4 br-pill ba b--white-20 ma1 flex-button"
							>
								VIEW
							</p>
						</div>
					</div>
				</div>
			);
		}
	}
}
export default Card;
