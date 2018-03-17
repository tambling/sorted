import React, { Component } from 'react';
import * as sort from 'async-merge-sort';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      a: null,
      b: null,
      unsorted: [],
      sorted: []
    }

    this.chooseLeft = this.chooseLeft.bind(this)
    this.chooseRight = this.chooseRight.bind(this)
  }

  startSorting() {
    sort(
      this.state.unsorted, 
      (a, b, callback) => {
        this.setState({ a, b, callback });
      },
      (err, sorted) => {this.setState({sorted})}
    )
  }

  chooseLeft() {
    this.state.callback(null, -1)
  }

  chooseRight() {
    this.state.callback(null, 1)
  }

  handleFileUpload(files) {
    const reader = new FileReader();
    reader.onload = e => {
      const unsorted = e.target.result.split('\n');
      this.setState({ unsorted }, () => this.startSorting())
    }

    reader.readAsText(files[0])
  }



  render() {
    return (
      <div className="App">
        {
          !this.state.unsorted.length && 
            <input type="file" onChange={(e) => this.handleFileUpload(e.target.files)} />
        }
        {
          !!(this.state.unsorted.length && !this.state.sorted.length) &&
            <div>
              <button className="a" onClick={this.chooseLeft}>
                {this.state.a}
              </button>
              <button className="b" onClick={this.chooseRight}>
                {this.state.b}
              </button>
            </div>
        }
        {
          !!this.state.sorted.length && 
            <ol>
              {this.state.sorted.map(entity => <li>{entity}</li>)}
            </ol>
        }
      </div>
    );
  }
}

export default App;
