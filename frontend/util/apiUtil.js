var ServerActions = require('../actions/ServerActions');

var apiUtil = {
  fetch: function (callback) {
    $.ajax({
      url: "/api/pokemon",
      method: "GET",
      success: function (pokemons){
        ServerActions.receiveAllPokemons(pokemons);
      }
    });
  },
  fetchToy: function(id){
    $.ajax({
      url: "/api/toys/" + id,
      method: "GET",
      success: function(toy){
        ServerActions.getToy(toy);
      },
      error: function(a,b,c){
      }
    });
  }
};

module.exports = apiUtil;
