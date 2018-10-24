import React, { Component } from 'react';
import './App.css';
import Navigation from './components/Navigation/Navigation';
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';

const initialState = {
      input:'',      
      route:'signin',
      isSignedIn : false,
      user:{
        id:'',
        name: '',
        email: '',
        joined: ''
      }

}
class App extends Component {
//Setup state variables
  constructor(){
    super();
    this.state ={
      input:'',   
      route:'signin',
      isSignedIn : false,
      user:{
        id:'',
        name: '',
        email: '',        
        joined: ''
      }
    }
  }

  loadUser = (userInfo) =>{
    this.setState({user:{
        id:userInfo.id,
        name: userInfo.name,
        email: userInfo.email,
        joined: userInfo.joined
      }})
  }
  //change route 
  onRouteCahnge = (route) => {
    if(route === 'signout'){
      this.setState(initialState)  
      route = 'signin'   
    }else if (route === 'home'){
      this.setState({isSignedIn: true})
    }
    this.setState({route: route});
  }
  render() {
    const { isSignedIn,route} = this.state;
    return (
      <div className="App">
        <Navigation isSignedIn={isSignedIn} onRouteCahnge={this.onRouteCahnge}/>
        { this.state.route === 'home' ?
            <div>             
              
                    
            </div>            
          :( route === 'signin' ?
                <Signin loadUser={this.loadUser} onRouteCahnge={this.onRouteCahnge}/>
                :
                <Register loadUser={this.loadUser} onRouteCahnge={this.onRouteCahnge}/>
            )           
       }
      </div>
    );
  }
}

export default App;
