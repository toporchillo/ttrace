import React from 'react';

const smallComment = {
	fontSize: "0.6em"
}

class Statusbar extends React.Component{
	constructor(props) {
	  super(props);
	  this.state = {
		onrace: [],
		finishers: {},
		finished: 0,
		truefinished: 0
	  }
	  this.Finish = this.Finish.bind(this)
	  this.SelectToFinish = this.SelectToFinish.bind(this)
	  //this.Finishers = this.Finishers.bind(this)
	  this.TheEnd = this.TheEnd.bind(this)
	}

	setOnRace(onrace) {
	  this.setState({
		onrace: onrace
	  });
	}
	
	Finish() {
	  let finishers = this.state.finishers;
	  if (Object.values(finishers).length >= this.state.onrace.length) {
		  return;
	  }
	  let finished = this.state.finished+1;
	  let truefinished = this.state.truefinished+1;
	  finishers[finished] = {fin: finished, dtfinish: new Date(), ord: truefinished};
	  this.setState({
		finishers: finishers,
		finished: finished,
		truefinished: truefinished
	  });
	}
	
	SelectToFinish(event) {
		let tofinish = event.target.value;
		if (tofinish === "-1") {
			return;
		}
		let finnumber = tofinish;
		let finisher;
		let val = tofinish.split(':');

		let finishers = this.state.finishers;
		let truefinished = this.state.truefinished;
		if (val[1]) {
		  finnumber = val[0];
		  finisher = val[1];
		  this.props.finishStarter(finisher, this.state.finishers[finnumber].dtfinish);
		}
		else {
			truefinished--;
			for (let i in finishers) {
				if (i>finnumber) {
					finishers[i].ord--;
				}
			}
		}
		delete finishers[finnumber];
		this.setState({
			finishers: finishers,
			truefinished: truefinished
		})
	}
	
	TheEnd() {
		const conf = window.confirm('Завершить гонку?');
		if (conf) {
			this.props.TheEnd();
		}
	}
	
	FormatTime(d) {
		let h = d.getHours();
		let m = d.getMinutes();
		let s = d.getSeconds();
		if (h<10) { h = "0"+h; }
		if (m<10) { m = "0"+m; }
		if (s<10) { s = "0"+s; }
		return h+":"+m+":"+s;
	}
	
	FinisherSelector(fin) {
	  let options = this.state.onrace.map(function(st) {
		  let val = fin.fin+':'+st
		  return <option key={st} value={val}>{st}</option>
	  });
	  let time = this.FormatTime(fin.dtfinish);
	  
	  return ( <select key={fin.fin} name="onRace" id="on-race-num" defaultValue="-1" onChange={this.SelectToFinish}>
				<option value="-1" disabled>Финиш в {time}?</option>
				<option value={fin.fin}>Отмена</option>
				{options}
			</select> );
	}
	
	Finishers() {
		var self = this;
		return Object.values(this.state.finishers).map(function(fin, i) {
			let Selector = self.FinisherSelector(fin);
			return <div key={fin.fin}>{Selector}</div>
		});
	}

	render() {
	  let block;
	  let finishers = '';
	  if (this.state.onrace.length > 0) {
		finishers = this.Finishers();
		block = <button onClick={this.Finish} className="finishbtn">Финиш!<div style={smallComment}>не видно номер</div></button>
	  }
	  else {
		  block = <button onClick={this.TheEnd} className="finishbtn">Конец<div style={smallComment}>закончить гонку</div></button>
	  }

	  return ( <div className="statusbar">{finishers}{block}</div> );
	}
}

export default Statusbar;
