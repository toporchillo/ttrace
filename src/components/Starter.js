import React from 'react';

const styleStarter = {
  border: "solid 0.2em gray",
  width: "5em",
  height: "4.8em",
  padding: "0.4em",
  display: "flex",
  flexDirection: "column",
  float: "left",
  margin: "0.4em 0 0 0.4em"
}

const styleStarterReady = {
	backgroundColor: "yellow",
	cursor: "pointer",
	padding: "0.1em"
}

const styleStarterStarted = {
	backgroundColor: "#70ff70",
	cursor: "pointer",
	padding: "0.1em"
}

const styleStarterFinished = {
	backgroundColor: "#ff7070",
	padding: "0.1em"
}

const styleStarterDnf = {
	backgroundColor: "#a0a0a0",
	padding: "0.1em"
}

const styleNumber = {
  padding: "0.2em auto 0.4em auto",
  flex: "1",
  color: "#002e82",
  fontSize: "4em",
  fontWeight: "bold",
}

const styleResult = {
  fontSize: "1.4em",
  marginTop: "-2em",
  color: "white",
  height: "2em",
  zIndex: "10"
}

class Starter extends React.Component{
	constructor(props) {
	  super(props);
	  this.state = {
		status:'ready',
		dtstart: null,
		dtfinish: null,
		time: 0
	  }
	  this.Start = this.Start.bind(this)
	  this.Finish = this.Finish.bind(this)
	  this.Continue = this.Continue.bind(this)
	  this.Dnf = this.Dnf.bind(this)
	  this.ftimer = null;
	  this.Timer = this.Timer.bind(this)
	}

	Start() {
	  this.setState({
		status:'started',
		dtstart: new Date()
	  }, () => { this.props.setOnRace(); });
	  this.ftimer = setInterval(this.Timer, 1000);
	  
	}
	
	Finish() {
	  var dtfinish = new Date();
	  clearInterval(this.ftimer);
	  this.setState({
		status:'finished',
		dtfinish: dtfinish,
		time: dtfinish - this.state.dtstart
	  }, () => { this.props.setOnRace(); });
	  const conf = window.confirm(`Финиш #`+this.props.number+'?');
	  if (!conf) {
		  this.Continue();
	  }
	}
	
	FinishExt(dtfinish) {
	  clearInterval(this.ftimer);
	  this.setState({
		status:'finished',
		dtfinish: dtfinish,
		time: dtfinish - this.state.dtstart
	  }, () => { this.props.setOnRace(); });
	}	

	Continue() {
	  this.setState({
		status:'started',
		dtfinish: null,
		time: 0
	  }, () => { this.props.setOnRace(); });
	  this.ftimer = setInterval(this.Timer, 1000);
	}
	
	Dnf() {
	  const conf = window.confirm(`DNF?`);
	  if (conf) {
		  this.setState({
			status:'dnf',
			time: 999999,
			dtfinish: null
		  });
	  }
	}	

	Timer() {
	  let dtstart = this.state.dtstart;
	  this.setState({
		time: new Date() - dtstart
	  });
	}

	TFormat(time) {
		var msec_num = parseInt(time, 10); // don't forget the second param
		var sec_num = Math.floor(msec_num / 1000);
		var hours   = Math.floor(sec_num / 3600);
		var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
		var seconds = sec_num - (hours * 3600) - (minutes * 60);

		//if (hours   < 10) {hours   = "0"+hours;}
		if (minutes < 10) {minutes = "0"+minutes;}
		if (seconds < 10) {seconds = "0"+seconds;}
		return hours+':'+minutes+':'+seconds;
	}
	
	TmilliFormat(time) {
		var millisec = parseInt(time, 10)%1000;
		if (millisec < 10) {millisec = "00"+millisec;}
		else if (millisec < 100) {millisec = "0"+millisec;}
		return millisec;
	}
	
	render() {
	  let block;
	  var time;
	  if (this.state.status === 'ready') {
		  block = <div style={styleStarterReady} onClick={this.Start}>
				<div style={styleNumber}>{this.props.number}</div>
			  </div>
	  }
	  else if (this.state.status === 'started') {
		  time = this.TFormat(this.state.time);
		  block = <div style={styleStarterStarted} onClick={this.Finish}>
				<div style={styleNumber}>{this.props.number}</div>
				<div style={styleResult}>{time}</div>
			  </div>
	  }
	  else if (this.state.status === 'finished') {
		  time = this.TFormat(this.state.time);
		  var microtime = this.TmilliFormat(this.state.time);
		  block = <div style={styleStarterFinished} onClick={this.Dnf}>
				<div style={styleNumber}>{this.props.number}</div>
				<div style={styleResult}>
					{time}
					<br /><sup>,{microtime}</sup>
				</div>
			  </div>
	  }
	  else if (this.state.status === 'dnf') {
		  block = <div style={styleStarterDnf}>
				<div style={styleNumber}>{this.props.number}</div>
				<div style={styleResult}>DNF</div>
			  </div>
	  }
	  return ( <div key={this.props.number} style={styleStarter}>{block}</div> );
	}
}

export default Starter;
