import React, { Component } from 'react';
import './App.css';
import Navigation from './components/Navigation/Navigation';
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';
//import MainPage from './components/MainPage/MainPage'
import CardList from './components/CardList/CardList';
import Scroll from './components/Scroll/scroll';

const initialState = {
      input:'',      
      route:'signin',
      isSignedIn : false,
      user:{
        id:'',
        name: '',
        email: '',
        joined: ''
      },
      authkey :[],
      searchTerm: '',
      notFound:false,
      displayCards:false

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
      },
      authkey :[],
      searchTerm: '',
      notFound:false,
      displayCards:false
    }
    this.onSearchChange = this.onSearchChange.bind(this);
  }
  componentDidMount(){
    this.connectToApi();
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

  // Login to server and get auth key
   connectToApi = () => {
    fetch('http://localhost:3001/tvdblogin')
    .then(response => response.json())
    .then(res => {
      if(res === 'error'){
        console.log('error')
      }else{
        const authArr= JSON.parse(res); //Change response sting to an object        
        this.setState({authkey: authArr.token});
        console.log('connected')
        console.log(this.state.authkey)
        }
   })
    .catch(err => console.log(err)) 
  }

    //search series
  searchSeries =()=>{
    this.setState({notFound:false});
    let searchSeriesArray = [];    
    fetch('http://localhost:3001/seriesSearch',{
        method : 'post',
        headers : {'Content-Type': 'application/json'},
        body : JSON.stringify({
          authKey : this.state.authkey,
          searchTerm: this.state.searchTerm
        })
      })
      .then(response => response.json())
      .then(res => {
      if(res === 'error')
      {
        console.log(`error connecting to search ${this.state.searchTerm}`)
      }else if(res === '404'){
        this.setState({notFound:true});
        console.log(this.state.notFound)
      } 
      else{
        const search = JSON.parse(res);
        for ( var i =0 ;i < search.data.length;i++){
            searchSeriesArray.push({
              banner: search.data[i].banner,
              firstAired: search.data[i].firstAired,
              id: search.data[i].id,
              network: search.data[i].network,
              overview: search.data[i].overview,
              seriesName: search.data[i].seriesName,
              slug: search.data[i].slug,
              status: search.data[i].status
            })
            //add series ID's to series Array           
            this.setState({searchArray:searchSeriesArray});
            console.log(searchSeriesArray)
        } 
        this.setState({displayCards:true});
        console.log('searched')       
      } 
     })
    .catch(err => console.log(err)) 
  }
  onSearchChange = (value) =>{
    this.setState({searchTerm: value})   
  }

  render() {
    const { isSignedIn,route,user,notfound,searchTerm,displayCards,authkey,searchArray} = this.state;
    return (
     
      <div className={"App " + (route !== 'home' ? 'showBack' : 'hideBack')}>
        <Navigation isSignedIn={isSignedIn} onRouteCahnge={this.onRouteCahnge} userDetails={user} searchSeries={this.searchSeries} onSearchChange={this.onSearchChange} />
        { route === 'home' ?
            <div>    
              <div>
               { notfound ?
                  <div className="alert f4  pa2  ba bw1 br2 ma1">
                     <p><strong>{`No match for ${searchTerm}`}</strong></p>
                  </div>
                :( displayCards  ?
                    <div>
                      <Scroll>
                        <CardList  searchArray={searchArray}/>
                      </Scroll>
                    </div>              
                   :
                    <div className=" f4  pa2  ba bw1 br2 ma1">
                      <p><strong>{`No series yet, search a series`}</strong></p>
                    </div>
                  )
             }
           </div>
            {         
              // <MainPage/>    
            }                
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
