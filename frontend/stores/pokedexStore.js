var AppDispatcher = require('../dispatcher/dispatcher');
var Store = require('flux/utils').Store;

var pokeStore = new Store(AppDispatcher);

var _pokemons = {};
var currentPokemon;
var currentToy;

pokeStore.__onDispatch = function (payload) {
  switch (payload.actionType) {
    case 'POKEMONS_RECEIVED':
      pokeStore.resetPokemons(payload.pokemons);
      pokeStore.__emitChange();
      break;
    case 'FIND_POKEMON':
      pokeStore.find(payload.pokemonid);
      break;
    case 'GETTOY':
      pokeStore.findToy(payload.toy);
      break;
  }
};
pokeStore.findToy = function(toy){
  currentToy = toy;
  this.__emitChange();
};

pokeStore.find = function(id){
  currentPokemon = _pokemons[id];
  this.__emitChange();
};

pokeStore.currentPokemon = function(){
  return currentPokemon;
};

pokeStore.currentToy = function(){
  return currentToy;
};

pokeStore.resetPokemons = function(pokemons){
  _pokemons = {};
  pokemons.forEach(function(pokemon){
    _pokemons[pokemon.id] = pokemon;
  });
};

pokeStore.all = function(){
  var values = [];
  var keys = Object.keys(_pokemons);
  keys.forEach(function(id){
    values.push(_pokemons[id]);
  });
  return values;
};

module.exports = pokeStore;
