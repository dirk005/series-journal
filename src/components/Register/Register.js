import React from 'react';
import './Register.css'

class Register  extends React.Component{
	
	constructor(props){
		super(props);
		this.state ={
			email : '',
			password : '',
			name : '',
			showWarning: false,
			warningMSG: '',
		}
	}

	onNameChange = (event) =>{
		this.setState({name: event.target.value})		
	}

	onEmailChange = (event) =>{
		this.setState({email: event.target.value})		
	}

	onPasswordChnge = (event) =>{
		this.setState({password: event.target.value})		
	}

	onSubmitRegister = () => {
		if ( !this.state.email || !this.state.password || !this.state.name ){
			this.setState({warningMSG: 'Need more info to create user'});
			this.setState({showWarning: true});
		} else{
			fetch('http://localhost:3001/register',{
				method : 'post',
				headers : {'Content-Type': 'application/json'},
				body : JSON.stringify({
					email : this.state.email,
					password : this.state.password,
					name : this.state.name
				})
			}).then(response => response.json())
			.then(user => {
				if (user.id){
					this.props.loadUser(user);
					this.props.onRouteCahnge('home');
				}else{
					this.setState({warningMSG: 'User exists'});
				this.setState({showWarning: true});
				}
			})
			.catch(err => {
				this.setState({warningMSG: 'Error creating user'});
				this.setState({showWarning: true});
			})
		}
	}

	hideWarning = () => {
		this.setState({showWarning: false})			
	}

	render(){
		const {showWarning ,warningMSG} = this.state;
		return (
 
			<article className="br3 ba  b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center bg-white o-80">
				<main className="pa4 black-80  ">
				  <div className="measure ">
				    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
				      <legend className="f1 fw6 ph0 mh0">Register</legend>
				     <div className="mt3">
				        <label className="db fw6 lh-copy f6" htmlFor="name">Name</label>
				        <input 
					        className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
					        type="text" 
					        name="name"  
					        id="name"
					        onChange={this.onNameChange}
				        />
				      </div>
				     <div className="mt3">
				        <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
				        <input 
					        className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
					        type="email" 
					        name="email-address"  
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
  								<p><strong>{warningMSG}</strong></p>
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
				      	value="Register"
				      	onClick={this.onSubmitRegister}
				      />
				    </div>
				    
				  </div>
				</main>

			</article>
			);
	}
}

export default Register;