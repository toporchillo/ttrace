import React from 'react';

const styleFinisher = {
  height: "2em",
  display: "flex",
  flexDirection: "row",
  margin: "0.2em",
  textAlign: "left"
}

const styleStarterFinished = {
	backgroundColor: "#ff7070",
    width: "100%",
	padding: "0.1em"
}

const styleStarterDnf = {
	backgroundColor: "#a0a0a0",
    width: "100%",
	padding: "0.1em"
}

const styleNumber = {
  padding: "0.2em auto 0.4em auto",
  flex: "1",
  color: "#002e82",
  fontSize: "1.6em",
  width: "1.4em",
  fontWeight: "bold",
  float: "left",
  textAlign: "right"
}

const styleResult = {
  fontSize: "1.4em",
  color: "white",
  height: "2em",
  marginLeft: "1em"
}

class Finisher extends React.Component{

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
	  if (this.props.status === 'finished') {
		  var time = this.TFormat(this.props.time);
		  var microtime = this.TmilliFormat(this.props.time);
		  block = <div style={styleStarterFinished}>
				<div style={styleNumber}>{this.props.number}</div>
				<span style={styleResult}>
					{time}<small>,{microtime}</small>
				</span>
			  </div>
	  }
	  else if (this.props.status === 'dnf') {
		  block = <div style={styleStarterDnf}>
				<div style={styleNumber}>{this.props.number}</div>
				<span style={styleResult}>DNF</span>
			  </div>
	  }
	  return ( <div key={this.props.number} style={styleFinisher}>{block}</div> );
	}
}

export default Finisher;
