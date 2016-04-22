var React = require('react');
var toyStore = require('./stores/toyStore.js');
var util = require('./util/apiutil');
var HashHistory = require('react-router').hashHistory;
var ClientActions = require('../actions/clientactions');


var ToyIndex = React.createClass({
  getInitialState: function(){
    return {toys: []};
  },

  componentDidMount: function() {
    ClientActions.fetchAllToys();
    this.listener = toyStore.addListener(this._onChange);
  },

  _onChange: function(){
    var toys = toyStore.all();
    this.setState({toys: toys});
  },
  componentWillUnmount: function(){
    this.listener.remove();
  },

  handleClick: function(id) {
    HashHistory.push('/toy/' + id);
  },
  render: function(){
    var toyList = [];
    this.state.toys.forEach(function(toy){
      toyList.push(
        <li
          className="toy-list-item"
          key={toy.id}
          onClick={this.handleClick.bind(this, toy.id)} >
            {toy.name}
        </li>
      );
    }.bind(this));
    return (
      <ul>
        {toyList}
      </ul>
    );
  }

});

module.exports = ToyIndex;
