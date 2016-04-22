var React = require('react');
var pokeStore = require('../../stores/pokedexStore');
var ClientActions = require('../../actions/clientactions');
var HashHistory = require('react-router').hashHistory;

var PokemonsIndex = React.createClass ({
  getInitialState: function(){
    return {pokemons: []};
  },
  componentDidMount: function() {
    ClientActions.fetchAllPokemons();
    this.listener = pokeStore.addListener(this._onChange);
  },
  _onChange: function(){
    var pokemons = pokeStore.all();
    this.setState({pokemons: pokemons});
  },
  componentWillUnmount: function(){
    this.listener.remove();
  },

  handleClick: function(id) {
    HashHistory.push('/pokemon/' + id);
  },
  render: function(){
    var pokemonList = [];
    this.state.pokemons.forEach(function(pokemon){
      pokemonList.push(
        <li
          className="poke-list-item"
          key={pokemon.id}
          onClick={this.handleClick.bind(this, pokemon.id)} >
            {pokemon.name}
        </li>
      );
    }.bind(this));
    return (
      <div className="pokemon-index-pane">
        {pokemonList}
      </div>
    );
  }

});

module.exports = PokemonsIndex;
