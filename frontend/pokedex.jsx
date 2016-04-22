var pokeStore = require('./stores/pokedexStore.js');
var util = require('./util/apiutil');
var PokemonsIndex = require('./components/pokemons/pokemonsindex');
var Pokemon = require('./components/pokemons/pokemon');
var Toy = require('./components/toy.jsx');
var React = require('react'),
    ReactDOM = require('react-dom');
var Router = require('react-router').Router;
var Route = require('react-router').Route;
var HashHistory = require('react-router').hashHistory;

var App = React.createClass({
  render : function () {
    return (
      <div id="pokedex">
        <PokemonsIndex />
        {this.props.children}
      </div>
    );
  }
});

var routes = (
  <Route path="/" component={App}>
    <Route path="pokemon/:pokemonid" component={Pokemon}>
      <Route path="toys/:toyid" component={Toy} />
    </Route>
  </Route>);


$(function () {
  var root = document.getElementById('root');
  ReactDOM.render(< Router history={HashHistory}>{routes}</Router>, root);
});
