import React from 'react';

const Namvigation= ({ onRouteCahnge , isSignedIn }) => {
	
		if(isSignedIn){
			return(
				<nav style={{display: 'flex',justifyContent:'flex-end'}} className='br3 ba  b--black-10    shadow-5 center  bg-white o-80'>
					<p  onClick={() => onRouteCahnge('signout')} className='f4 link dim black bg-white pa2 pointer ba bw1 br2 ma1'>SIGN OUT</p>
				</nav>
			);
		}else{
			return(
				<nav style={{display: 'flex',justifyContent:'flex-end'}} className='ba  b--black-10    shadow-5 center  bg-black o-80 '>
					<p  onClick={() => onRouteCahnge('signin')} className='f4 link dim black bg-white pa2 pointer ba bw1 br2 ma1 '>SIGN IN</p>
					<p  onClick={() => onRouteCahnge('register')} className='f4 link dim black bg-white pa2 pointer ba bw1 br2 ma1'>REGISTER</p>
				</nav>
			);
		}
}
export default Namvigation;