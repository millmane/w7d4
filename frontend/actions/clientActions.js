var pokeConstants = require('../constants/pokemonconstants');
var AppDispatcher = require('../dispatcher/dispatcher');
var apiUtil = require('../util/apiutil');

var ClientActions = {
  fetchAllPokemons: function (pokemons) {
    apiUtil.fetch();
  },
  findPokemon: function(id){
    AppDispatcher.dispatch({
      actionType: pokeConstants.FIND_POKEMON,
      pokemonid: id
    });
  },
  findToy: function(toyid){
    apiUtil.fetchToy(toyid);
  }
};

module.exports = ClientActions;
