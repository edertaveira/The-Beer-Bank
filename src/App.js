import React, { Component } from 'react';
import './App.css';

import { Modal, ModalBody, Button, Card, CardImg, CardBody, CardTitle, CardSubtitle } from 'reactstrap';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';
import { Favourite } from './components/Favourite';
import { Home } from './components/Home';
import { Search } from './components/Search';
import { Header } from './components/Header';

var prevScrollpos = window.pageYOffset;
window.onscroll = function () {
  var currentScrollPos = window.pageYOffset;
  if (prevScrollpos > currentScrollPos) {
    document.getElementById("navbar").style.top = "0";
  } else {
    document.getElementById("navbar").style.top = "-50px";
  }
  prevScrollpos = currentScrollPos;
}

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      beers: [],
      page: 1,
      modal: false,
      beer: {
        food_pairing: []
      },
      similar: [],
      favourites: [],
      isTyping: false,
      inSearch: false, 
      isLoading: false
    }
    this.handleOnScroll = this.handleOnScroll.bind(this);
    this.handleOnKeyUp = this.handleOnKeyUp.bind(this);
    this.loadBeers = this.loadBeers.bind(this);
    this.searchBeers = this.searchBeers.bind(this);
    this.toggle = this.toggle.bind(this);
    this.handleFavorite = this.handleFavorite.bind(this);
    this.checkFavoritos = this.checkFavoritos.bind(this);
    this.loadFavourites = this.loadFavourites.bind(this);
    this.updateInSearch = this.updateInSearch.bind(this);
    this.clearSearch = this.clearSearch.bind(this);
  }

  static propTypes = {
    cookies: instanceOf(Cookies).isRequired
  };

  componentDidMount() {
    this.loadBeers();
    window.addEventListener('scroll', this.handleOnScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleOnScroll);
  }

  handleOnScroll() {
    var scrollTop = (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop;
    var scrollHeight = (document.documentElement && document.documentElement.scrollHeight) || document.body.scrollHeight;
    var clientHeight = document.documentElement.clientHeight || window.innerHeight;
    var scrolledToBottom = Math.ceil(scrollTop + clientHeight) >= scrollHeight;

    if (scrolledToBottom) {
      this.loadBeers();
    }
  }

  handleOnKeyUp(e) {
    if (e.target.value !== "") {
      this.setState({ isTyping: true });
      this.searchBeers(e.target.value);
    } else {
      this.clearSearch();
    }
  }

  clearSearch() {
    document.getElementById("search").value = "";
    this.setState({ beers: [], isTyping: false });
    this.loadBeers();
  }

  updateInSearch(inSearch) {
    this.setState({ inSearch: inSearch });
  }

  handleFavorite(beer) {
    const { cookies } = this.props;
    let favs;
    if (cookies.get('_favs__') !== undefined) {
      favs = cookies.get('_favs__');
      if (favs.filter(elem => elem === beer.id).length > 0) {
        favs.splice(favs.indexOf(beer.id), 1);
      } else {
        favs.push(beer.id);
      }
      cookies.set('_favs__', favs, { path: '/' });
    } else {
      favs = [];
      favs.push(beer.id);
      cookies.set('_favs__', favs, { path: '/' });
    }
  }

  checkFavoritos(beer) {
    const { cookies } = this.props;
    if (cookies.get('_favs__') !== undefined) {
      const favs = cookies.get('_favs__');
      if (favs.filter(elem => elem === beer.id).length > 0) {
        return true;
      }
    }
    return false;
  }

  toggle(beer) {
    if (beer !== undefined && beer.id) {

      this.props.Punkapi.getSimilar(beer.ingredients.hops[0].name, beer.ingredients.malt[0].name).then((res) => {
        console.log(res.data)
        this.setState({ similar: res.data });
      });

      this.setState({
        modal: !this.state.modal,
        beer: beer
      });
    } else {
      this.setState({
        modal: !this.state.modal,
        beer: { food_pairing: [] },
        similar: []
      });
    }
  }

  loadBeers() {
    const newPage = this.state.page + 1;
    this.setState({ page: newPage, isLoading: true });
    this.props.Punkapi.getBeers(newPage).then((res) => {
      let data = this.state.beers.concat(res.data);
      this.setState({ beers: data, isLoading: false });
    });
  }

  loadSimilar(beer) {

    const hops = beer.ingredients.hops[0]
    hops.replace(/ /g, "_");

  }

  loadFavourites() {
    const { cookies } = this.props;
    if (cookies.get('_favs__') !== undefined) {
      const list = cookies.get('_favs__');
      this.setState({ isLoading: true });
      this.props.Punkapi.getIds(list.join('|')).then((res) => {
        let data = res.data;
        this.setState({ favourites: data, isLoading: false });
      });
    } else {
      this.setState({ favourites: [] });
    }
  }

  searchBeers(term) {
    this.setState({ page: 1 });
    this.setState({ isLoading: true });
    this.props.Punkapi.search(term).then((res) => {
      this.setState({ beers: res.data, isLoading: false });
    });
  }


  render() {
    return (
      <Router>
        <div>
          <Header {...this.props} handleOnKeyUp={this.handleOnKeyUp} inSearch={this.state.inSearch} clearSearch={this.clearSearch} />
          <div className="container mt-5">
            <Route exact path='/' render={(props) => {
              return (<Home
                {...props}
                loadBeers={this.loadBeers}
                isLoading={this.state.isLoading}
                onClick={this.toggle}
                beers={this.state.beers}
                handleFavorite={this.handleFavorite}
                checkFavoritos={this.checkFavoritos}
                page={this.state.page}
                updateInSearch={this.updateInSearch}
              />)
            }}
            />
            <Route exact path='/favourite' render={(props) => {
              return (<Favourite
                {...props}
                onClick={this.toggle}
                isLoading={this.state.isLoading}
                loadFavourites={this.loadFavourites}
                beers={this.state.favourites}
                handleFavorite={this.handleFavorite}
                checkFavoritos={this.checkFavoritos}
                updateInSearch={this.updateInSearch}
              />)
            }} />
            <Route exact path='/search' render={(props) => {
              return (<Search
                {...props}
                loadBeers={this.loadBeers}
                isLoading={this.state.isLoading}
                onClick={this.toggle}
                beers={this.state.beers}
                handleFavorite={this.handleFavorite}
                checkFavoritos={this.checkFavoritos}
                page={this.state.page}
                updateInSearch={this.updateInSearch}
              />)
            }}
            />
            {!this.state.inSearch && this.state.isTyping && <Redirect to='/search' />}
            {this.state.inSearch && !this.state.isTyping && <Redirect to='/' />}


          </div>

          <Modal isOpen={this.state.modal} size="lg" toggle={this.toggle} className={this.props.className}>
            <Button color="link" onClick={(e) => this.toggle()} className="btn-close-modal">
              <i className="fa fa-times"></i>
            </Button>
            <ModalBody>

              <img src={this.state.beer.image_url} alt={this.state.beer.name} />


              <h2>{this.state.beer.name}</h2>
              <small>{this.state.beer.tagline}</small>
              <div className="line-separate"><span></span></div>
              <p>
                <b>IBU:</b> {this.state.beer.ibu}
                <b>ABV:</b> {this.state.beer.abv}
                <b>EBC:</b> {this.state.beer.ebc}
              </p>
              <p>{this.state.beer.description}</p>
              <p className="mt-10">
                <b>Best server with:</b>
              </p>
              <ul>
                {this.state.beer.food_pairing.map((item, i) => {
                  return <li key={i}>{item}</li>
                })}
              </ul>
              <h3>You might also like:</h3>
              <div className="row similar-container">
                {this.state.similar.map((item, i) => {
                  return (
                    <div key={item.id} className="col-lg-4 col-md-4 col-sm-6 col-xs-12">
                      <Card>
                        <div className="card-container" >
                          <CardImg top width="100%" src={item.image_url} alt={item.name} />
                          <CardBody>
                            <CardTitle>{item.name}</CardTitle>
                            <CardSubtitle>{item.tagline}</CardSubtitle>
                          </CardBody>
                        </div>
                      </Card>
                    </div>
                  )
                })}
              </div>


            </ModalBody>
          </Modal>
        </div>
      </Router>
    );
  }
}

//export default App;
export default withCookies(App);
