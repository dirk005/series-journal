import React from 'react';
import './SignIn.css';

class Signin  extends React.Component{
	constructor(props){
		super(props);
		this.state ={
			signInEmail : '',
			signInPassword : '',
			showWarning: false,
			warningMSG: ''
		}
	}
	onEmailChange = (event) =>{
		this.setState({signInEmail: event.target.value})		
	}

	onPasswordChnge = (event) =>{
		this.setState({signInPassword: event.target.value})
	}

	onSubmitSignIn = () => {

		fetch(' localhost:3001/signin',{

			method : 'post',
			headers : {'Content-Type': 'application/json'},
			body : JSON.stringify({
				email : this.state.signInEmail,
				password : this.state.signInPassword
			},console.log('fetch statment'))
		}).then(response => 
		{
			response.json()
			console.log('got response')
			
		})
		.then(user => {
			if (user.id){
				this.props.loadUser(user);
				this.props.onRouteCahnge('home');
			}else{
				this.setState({warningMSG: 'Incorrect Email or Password.'});
				this.setState({showWarning: true})
			}
		}).catch(err => {
				this.setState({warningMSG: 'Error try again later'});
				this.setState({showWarning: true});
			})	
	}

	hideWarning = () => {
		this.setState({showWarning: false})			
	}


	render(){
		const { onRouteCahnge } = this.props;
		const {showWarning,warningMSG} = this.state;
		return (
		<article className="br3 ba  b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center  bg-white o-80">
			<main className="pa4 black-80">
			  <div className="measure ">
			    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
			      <legend className="f1 fw6 ph0 mh0">Sign In</legend>
			      <div className="mt3">
			        <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
			        <input 
			        	className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
			        	type="email" name="email-address"  
			        	id="email-address"
			        	onChange={this.onEmailChange}
			        />
			      </div>
			      <div className="mv3">
			        <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
			        <input 
			        	className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
			        	type="password" 
			        	name="password"  
			        	id="password"
			        	onChange={this.onPasswordChnge}
			        />
			      </div>
			     	{ 
			     		 showWarning ?
			      			<div className="alert f4  pa2  ba bw1 br2 ma1" id='warning' >
 								<span className="closebtn pointer" onClick={this.hideWarning}>&times;</span> 
  								<p><strong>{warningMSG} </strong></p>
				  			</div>	
				  			: 
				  			<div>
				  			</div>
				  			    
				 	}  
			    </fieldset>
			    <div className="">
			      <input 
			      	className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
			      	type="submit" 
			      	value="Sign in"

			      	onClick={ this.onSubmitSignIn}
			      />
			    </div>
			    <div className="lh-copy mt3">
			      <p onClick={() => onRouteCahnge('register')} className="f6 link dim black db pointer">Register</p>			      
			    </div>
			  </div>
			</main>

		</article>
		);
	}
	
}

export default Signin;