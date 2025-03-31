import React from 'react';
import Starter from '../components/Starter'
import Finisher from '../components/Finisher'
import Statusbar from '../components/Statusbar'
import logo from '../logo.svg';


class Starters extends React.Component{
	constructor(props) {
	  super(props);
	  this.state = {
		num:10,
		starters:[],
		protocol: []
	  }
	  this.statusbar = React.createRef()
	  this.Numchange = this.Numchange.bind(this)
	  this.Init = this.Init.bind(this)
	}

	Numchange(event) {
		this.setState({
			num: event.target.value
		});
	}
	
	Init() {
	  var starters = [];
	  for (var i=1; i<=this.state.num; i++) {
		  starters.push(React.createRef());
	  }
	  this.setState({
		starters: starters
	  });
	}
	
	Starters() {
		return this.state.starters.map((starter, i) =>  <Starter key={i+1} number={i+1} ref={starter} setOnRace={this.setOnRace} />);
	}
	
	finishStarter = (number, dtfinish) => {
		this.state.starters[number-1].current.FinishExt(dtfinish);
	}
	
	setOnRace = () => {
		var onrace = [];
		for (var i=1; i<=this.state.num; i++) {
			var starterState = this.state.starters[i-1].current.state;
			if (starterState.status === 'started') {
				onrace.push(i);
			}
		}
		this.statusbar.current.setOnRace(onrace);
	}
	
	TheEnd = () => {
		var sprt = [];
		for (var i=1; i<=this.state.num; i++) {
			var starterState = this.state.starters[i-1].current.state;
			starterState.number = this.state.starters[i-1].current.props.number;
			if (starterState.time > 0) {
				sprt.push(starterState);
			}
		}
		sprt.sort(function (a, b) {
		  if (a.time > b.time) {
			return 1;
		  }
		  if (a.time < b.time) {
			return -1;
		  }
		  // a должно быть равным b
		  return 0;
		});
		this.setState({protocol:sprt});
	}

	Finishers() {
		return this.state.protocol.map((starter, i) =>  <Finisher key={i+1} number={starter.number} status={starter.status} time={starter.time} />);
	}	
	
	render() {
		let Items;
		if (this.state.protocol.length > 0) {
			let Finishers = this.Finishers();
			Items = <div className="race-screen">
						<h2>Результаты</h2>
						{Finishers}
					</div>
		}
		else if (this.state.starters.length > 0) {
			let Starters = this.Starters();
			Items = <div className="race-screen">
						{Starters}
						<div className="lastblock"></div>
						<Statusbar finishStarter={this.finishStarter} TheEnd={this.TheEnd} ref={this.statusbar} />
					</div>
		}
		else {
			Items = <div className="start-screen">
						<div>
							<label htmlFor="num_starters">Участников:</label>
						</div>
						<div>
							<input type="number" id="num_starters" value={this.state.num} onChange={this.Numchange} size="3" />
						</div>
						<div>
							<button onClick={this.Init}>На старт!</button>
						</div>
						<img src={logo} className="App-logo" alt="logo" />
					</div>
		}
		
		return (
			  <div className="mainblock">
				{Items}
			  </div>
		);
	}
}

export default Starters;
