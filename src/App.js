import React, { Component } from "react";
import "./App.css";
import Navigation from "./components/Navigation/Navigation";
import Signin from "./components/Signin/Signin";
import Register from "./components/Register/Register";
//import MainPage from './components/MainPage/MainPage'
import CardList from "./components/CardList/CardList";
import Scroll from "./components/Scroll/scroll";
import SeriesDetail from "./components/SeriesDetail/SeriesDetail";

//setup initial state to clear if logged out
const initialState = {
  input: "",
  route: "signin",
  isSignedIn: false,
  user: {
    id: "",
    name: "",
    email: "",
    joined: ""
  },
  authkey: [],
  searchTerm: "",
  notFound: false,
  displayCards: false
};

class App extends Component {
  //Setup state variables
  constructor() {
    super();
    this.state = {
      input: "",
      route: "signin",
      isSignedIn: false,
      user: {
        id: "",
        name: "",
        email: "",
        joined: ""
      },
      authkey: [],
      searchTerm: "",
      notFound: false,
      displayCards: false,
      viewSeries: ""
    };
    this.onSearchChange = this.onSearchChange.bind(this);
  }

  componentDidMount() {
    this.connectToApi(); //Connect to the tv db
    this.addBackground(); //On load add background
  }

  //load user details
  loadUser = userInfo => {
    this.setState({
      user: {
        id: userInfo.id,
        name: userInfo.name,
        email: userInfo.email,
        joined: userInfo.joined
      }
    });
  };
  //change route
  onRouteChange = route => {
    if (route === "signout") {
      this.setState(initialState);
      route = "signin";
      this.addBackground();
    } else if (route === "home") {
      this.setState({ isSignedIn: true });
      this.removeBackground();
    }
    this.setState({ route: route });
  };
  //add or remove background
  addBackground = () => {
    document.body.classList.add("showBack");
  };
  removeBackground = () => {
    document.body.classList.remove("showBack");
  };

  // Login to server and get auth key
  connectToApi = () => {
    fetch("http://localhost:3001/tvdblogin")
      .then(response => response.json())
      .then(res => {
        if (res === "error") {
          console.log("Error connecting to API");
        } else {
          const authArr = JSON.parse(res); //Parse response to an object
          this.setState({ authkey: authArr.token });
          // console.log(this.state.authkey) //display Auth in testing
        }
      })
      .catch(err => console.log(err));
  };

  //Search series
  searchSeries = () => {
    this.setState({ notFound: false });
    // Clear array before search
    let searchSeriesArray = [];

    fetch("http://localhost:3001/seriesSearch", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        authKey: this.state.authkey,
        searchTerm: this.state.searchTerm
      })
    })
      .then(response => response.json())
      .then(res => {
        if (res === "error") {
          console.log(`error connecting to search ${this.state.searchTerm}`);
        } else if (res === "404") {
          this.setState({ notFound: true });
        } else {
          const search = JSON.parse(res); //Parse response to Object

          //Read data and add to to searchSeriesArray
          searchSeriesArray = search.data.map(detail => {
            return {
              banner: detail.banner,
              firstAired: detail.firstAired,
              id: detail.id,
              network: detail.network,
              overview: detail.overview,
              seriesName: detail.seriesName,
              slug: detail.slug,
              status: detail.status
            };
          });
          //add series ID's to series Array
          this.setState({ searchArray: searchSeriesArray });
          this.setState({ displayCards: true });
        }
      })
      .catch(err => console.log(err));
  };

  //Change state to display series detail
  onSeriesChange = value => {
    this.setState({ viewSeries: value });
  };

  //change state of search box value
  onSearchChange = value => {
    this.setState({ searchTerm: value });
  };

  render() {
    const {
      isSignedIn,
      route,
      user,
      notFound,
      searchTerm,
      displayCards,
      authkey,
      searchArray,
      viewSeries
    } = this.state;
    return (
      <div className="App">
        {
          // ******************
          // Display Navigation
          // ******************
        }
        <Navigation
          isSignedIn={isSignedIn}
          onRouteChange={this.onRouteChange}
          userDetails={user}
          searchSeries={this.searchSeries}
          onSearchChange={this.onSearchChange}
        />
        {
          // ******************************
          // Change the dislay as necessary
          // ******************************
        }
        {route === "home" ? (
          <div>
            <div>
              {notFound ? (
                <div className="alert f4  pa2  ba bw1 br2 ma1">
                  <p>
                    <strong>{`No match for ${searchTerm}`}</strong>
                  </p>
                </div>
              ) : displayCards ? (
                <div>
                  <Scroll>
                    <CardList
                      searchArray={searchArray}
                      onRouteChange={this.onRouteChange}
                      onSeriesChange={this.onSeriesChange}
                    />
                  </Scroll>
                </div>
              ) : (
                <div className=" f4  pa2  ba bw1 br2 ma1">
                  <p>
                    <strong>{`No series yet, search a series`}</strong>
                  </p>
                </div>
              )}
            </div>
          </div>
        ) : route === "SeriesDetail" ? (
          <SeriesDetail authKey={authkey} seriesId={viewSeries} />
        ) : route === "signin" ? (
          <Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
        ) : (
          <Register
            loadUser={this.loadUser}
            onRouteChange={this.onRouteChange}
          />
        )}
      </div>
    );
  }
}

export default App;
