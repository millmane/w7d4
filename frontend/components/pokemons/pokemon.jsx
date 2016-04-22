var React = require('react');
var pokeStore = require('../../stores/pokedexStore');
var ClientActions = require('../../actions/clientactions');
var HashHistory = require('react-router').hashHistory;

var Pokemon = React.createClass ({

  getInitialState: function () {
    return {  pokemon: undefined };
  },

  componentWillReceiveProps: function(newProps){
    ClientActions.findPokemon(newProps.params.pokemonid);
  },
  componentDidMount: function (){
    ClientActions.findPokemon(this.props.params.pokemonid);
    this.listener = pokeStore.addListener(this.onChange);
  },
  componentWillUnmount: function (){
    this.listener.remove();
  },
  onChange: function () {
    var pokemon = pokeStore.currentPokemon();
    this.setState({pokemon: pokemon});
  },
  handleClick: function(id){
    HashHistory.push('/pokemon/' + this.state.pokemon.id + '/toys/' + id);
  },

  render: function(){
    var display = "";
    var pokemon = this.state.pokemon;
    var toys = [];
    if (pokemon) {
      var moves = pokemon.moves.map(function(move, i){
        return <li className="moves" key={pokemon + i}> {move}<br/></li>;
      });
      toys = pokemon.toys.map(function(toy, j){
        var toyStats = (
          <li
            className="toy-list-item"
            key={toy + j}
            onClick={this.handleClick.bind(this,toy.id)}>
            <p> Name: {toy.name} </p>
            <p> Happiness: {toy.happiness} </p>
            <p> Price: {toy.price} </p></li>
        );
        return toyStats;
      }.bind(this));
      display = (
      <div className='pokemon-detail-pane'>
        <div className='detail'>
          <img src={pokemon.image_url}/>
          <p>Name: {pokemon.name}</p>
          <p>Attack: {pokemon.attack}</p>
          <p>Defense: {pokemon.defense}</p>
          <p>Type: {pokemon.poke_type}</p>
          <ul> <u>Moves </u> <br/>{moves}</ul>
        </div>
        <h2 className="detail-header">Toys:</h2>
        <ul> {toys} </ul>

      </div>
      );
    }

    return (
      <div >
        {display}
        {this.props.children}
      </div>
    );
  }

});

module.exports = Pokemon;
