import React from 'react';
import './Navigation.css';

const Navigation= ({ onRouteCahnge , isSignedIn ,userDetails}) => {
	
		if(isSignedIn){
			return(
				
					<nav className="flex justify-between bb b--white-10 ba shadow-5 center  bg-black o-80">
					  <div className=" no-underline flex items-center pa3 " href="">
					      <input 
							        className="f6 dib black bg-animate hover-bg-black hover-white no-underline pv2 ph4 br-pill ba b--white-20 ma1" 
							        type="text" 
							        name="search"  
							        id="search"
							        //onChange={this.onSearchChange}
						        />
						        <p 
						        	onClick={() => onRouteCahnge('signout')}	
						        	className="pointer f6 dib white bg-animate hover-bg-white hover-black no-underline pv2 ph4 br-pill ba b--white-20 ma1"> 
						        	SEARCH
						        </p>
					  </div>
					  <div className="flex-grow pa3 flex items-center">
					  	<p className='f3 white pa2 ma1' >Signed in to : {userDetails.name}</p>
					  	<p  
					  		onClick={() => onRouteCahnge('signout')} 
					  		className='pointer f6 dib white bg-animate hover-bg-white hover-black no-underline pv2 ph4 br-pill ba b--white-20 ma1'>
					  		SIGN OUT
					  	</p>
					 {
					    // <a className="f6 link dib white dim mr3 mr4-ns" href="#0">About</a>
					    // <a className="f6 link dib white dim mr3 mr4-ns" href="#0">Sign In</a>
					    // <a className="f6 dib white bg-animate hover-bg-white hover-black no-underline pv2 ph4 br-pill ba b--white-20" href="#0">Sign Up</a>
					}
					  </div>
				{	
					//</nav>
				
				// <nav>
				// <div className="grid-container" className='ba  b--black-10    shadow-5 center  bg-black o-80'>
				// 		  	<div className="grid-item tl">
						  		
				// 		        <input 
				// 			        className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
				// 			        type="text" 
				// 			        name="search"  
				// 			        id="search"
				// 			        //onChange={this.onSearchChange}
				// 		        />
				// 		  	</div>
				// 		  	 	<div className="grid-item tl">
				// 		  		<input 
				// 			      	className="f4 link dim black bg-white pa2 pointer ba bw1 br2 ma1" 
				// 			      	type="submit" 
				// 			      	value="Search "
				// 			      	//onClick={this.searchSeries}
				// 			      />
				// 		  	</div>
				// 		  	<div className="grid-item tr">
								
				// 					<p className='f3 white pa2 ma1' >Signed in to : {userDetails.name}</p>
				// 			</div>
				// 			<div className="grid-item tr">
				// 					<p  onClick={() => onRouteCahnge('signout')} className='f4 link dim black bg-white pa2 pointer ba bw1 br2 ma1'>SIGN OUT</p>
								
				// 		  	</div>
						  	   
				// 		</div>
					
				// 	// <nav style={{display: 'flex',justifyContent:'flex-start'}} className='ba  b--black-10    shadow-5 center  bg-black o-80'>
				// 	// 	<p className='f3 white pa2 ma1' >Signed in to : {userDetails.name}</p>
				// 	// 	<p  onClick={() => onRouteCahnge('signout')} className='f4 link dim black bg-white pa2 pointer ba bw1 br2 ma1'>SIGN OUT</p>
				// 	// </nav>
			}		
		 </nav>
			
			);
		}else{
			return(
				<nav style={{display: 'flex',justifyContent:'flex-end'}} className='ba  b--black-10    shadow-5 center  bg-black o-80 '>
					{
					// <p  onClick={() => onRouteCahnge('signin')} className='f4 link dim black bg-white pa2 pointer ba bw1 br2 ma1 '>SIGN IN</p>
					// <p  onClick={() => onRouteCahnge('register')} className='f4 link dim black bg-white pa2 pointer ba bw1 br2 ma1'>REGISTER</p>
				}
					<p  onClick={() => onRouteCahnge('signin')} className='pointer f6 dib white bg-animate hover-bg-white hover-black no-underline pv2 ph4 br-pill ba b--white-20 ma1'>SIGN IN</p>
					<p  onClick={() => onRouteCahnge('register')} className='pointer f6 dib white bg-animate hover-bg-white hover-black no-underline pv2 ph4 br-pill ba b--white-20 ma1'>REGISTER</p>
				</nav>
			);
		}
}
export default Navigation;