import './App.css';
import React from 'react';
import Map from './components/Map.js';
import BottomBar from './components/BottomBar.js';
import SearchBar from './components/SearchBar';
import Timeline from './components/Timeline';
import Legend from './components/Legend';
import dataMonth from './data/data_by_month.json';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      postcode: null,
      value: null,
      monthIndex: 235,
      lng: 133.5,
      lat: -28.5,
      zoom: 3.5,
      isInstall: true
    };
  }

  onClick = (postcode) => {
    this.setState({ postcode: postcode, value: null });
  }

  onSelectArea = (value) => {
    this.setState({
      value: value,
      postcode: value ? value.postcode : null,
    });
  }

  onChangeMonth = (value) => {
    this.setState({
      monthIndex: value,
    });
  }

  onChange = () => {
    this.setState({ isInstall: !this.state.isInstall })
  }

  render() {
    const category = this.state.isInstall ? 'install' : 'output';
    const months = Object.keys(dataMonth[category]);
    return (
      <div className="App">
        <header className="App-header">
          <Map
            data={dataMonth[category][months[this.state.monthIndex]]}
            onClick={this.onClick}
            lng={this.state.lng}
            lat={this.state.lat}
            zoom={this.state.zoom}
            isInstall={this.state.isInstall}
          />
          <BottomBar
            postcode={this.state.postcode}
            isInstall={this.state.isInstall}
            onChange={this.onChange}
          />
          <SearchBar
            value={this.state.value}
            onSelectArea={this.onSelectArea}
            onChange={this.onChange}
            isInstall={this.state.isInstall}
          />
          <Timeline
            value={this.state.monthIndex}
            onChange={this.onChangeMonth}
            isInstall={this.state.isInstall}
          />
          <Legend
            isInstall={this.state.isInstall}
          />
        </header>
      </div>
    );
  }
}

export default App;
