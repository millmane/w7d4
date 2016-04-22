var React = require('react');
var pokeStore = require('../stores/pokedexStore');
var ClientActions = require('../actions/clientactions');

var Toy = React.createClass ({

  getInitialState: function () {
    return {  toy: undefined };
  },

  componentWillReceiveProps: function(newProps){
    ClientActions.findToy(newProps.params.toyid);
  },
  componentDidMount: function (){
    ClientActions.findToy(this.props.params.toyid);
    this.listener = pokeStore.addListener(this.onChange);
  },
  componentWillUnmount: function (){
    this.listener.remove();
  },
  onChange: function(){
    var toy = pokeStore.currentToy();
    this.setState({toy: toy});
  },

  render: function(){
    var display = "";
    var toy = this.state.toy;
    if (toy) {
      display = (
        <div className='toy-detail-pane toy'>
          <div className='detail'>
            <img src={toy.image_url} className="toy-image"/>
            <p>Name: {toy.name}</p>
            <p>Happiness: {toy.happiness}</p>
            <p>Price: {toy.price}</p>
          </div>
        </div>
      );
    }

    return (
      <div>
        {display}
      </div>
    );
  }

});

module.exports = Toy;
