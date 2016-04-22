var pokeConstants = require('../constants/pokemonconstants');
var AppDispatcher = require('../dispatcher/dispatcher');

var ServerActions = {
  receiveAllPokemons: function (pokemons) {
    AppDispatcher.dispatch({
      actionType: pokeConstants.POKEMONS_RECEIVED,
      pokemons: pokemons
    });
  },
  getToy: function(toy) {
    AppDispatcher.dispatch({
      actionType: "GETTOY",
      toy: toy
    });
  }
};

module.exports = ServerActions;
