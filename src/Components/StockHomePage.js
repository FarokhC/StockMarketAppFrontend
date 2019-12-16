import React from 'react';
//import ReactDOM from 'react-dom';
// import CurrencyInput from 'react-currency-input';
import { Checkbox, Button} from '@material-ui/core';
import ReactEcharts from "echarts-for-react";

class StockHomePage extends React.Component {

constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  state = {
    name: '',
    investamount: '',
    ethicalstrategy: false,
    growthstrategy: false,
    indexstrategy: false,
    qualitystrategy: false,
    valuestrategy: false,
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  getHistoryData = (self) => {
    // var data = JSON.stringify({
    //   "name": this.state.name,
    //   "amount": this.state.investamount,
    //   "strategies": strategies
    //  });

     var xhr = new XMLHttpRequest();
     xhr.withCredentials = true;

     xhr.addEventListener("readystatechange", function () {
      if (this.readyState === 4) {
        console.log(this.responseText);
      }
     });

     xhr.open("GET", "http://127.0.0.1:5002/history/" + self.state.name);
     xhr.setRequestHeader("Content-Type", "application/json");
     xhr.setRequestHeader("Accept", "*/*");
     // xhr.setRequestHeader("Host", "127.0.0.1:5002");

     xhr.onreadystatechange = function() {
        if(xhr.readyState == XMLHttpRequest.DONE) {
          let response = JSON.parse(xhr.response);
          console.log(JSON.stringify(response));
          let history = [];
          let historyTimestamps = [];
          for (var key in response) {
            console.log("key: " + JSON.stringify(key));
            historyTimestamps.push(key);
            console.log("value: " + JSON.stringify(response[key]));
            history.push(response[key]);
          }
          self.setState({history: history});

          let historyDates = [];
          console.log("tiemstaps: " + JSON.stringify(historyTimestamps));
          // for (var timestamp in historyTimestamps) {
          //   console.log("time stamp: " + timestamp);
          //   var date = new Date(timestamp / 1000);
          //   console.log("date: " + JSON.stringify(date));
          //   historyDates.push(date);
          // }
          let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
          historyTimestamps.forEach(timestamp => {
            console.log(timestamp);
            let date = new Date(parseInt(timestamp, 10));
            historyDates.push(months[date.getMonth()] + " " + date.getDate() + ", " + date.getFullYear());
          });
          console.log("historyDates: " + JSON.stringify(historyDates));
          self.setState({historyDates: historyDates});
       }
     }

     xhr.send();
  }

  handleSubmit = (event) => {
    //this.fetchHelloWorld();
    // alert('A name was submitted: ' + this.state.name);
    // event.preventDefault();

    let strategies = [];
    if(this.state.ethicalstrategy) {
      strategies.push("ethical");
    }
    if(this.state.growthstrategy) {
      strategies.push("growth");
    }
    if(this.state.indexstrategy) {
      strategies.push("index");
    }
    if(this.state.qualitystrategy) {
      strategies.push("quality");
    }
    if(this.state.valuestrategy) {
      strategies.push("value");
    }

    var data = JSON.stringify({
      "name": this.state.name,
      "amount": this.state.investamount,
      "strategies": strategies
     });

     var xhr = new XMLHttpRequest();
     xhr.withCredentials = true;

     xhr.addEventListener("readystatechange", function () {
      if (this.readyState === 4) {
        console.log(this.responseText);
      }
     });

     xhr.open("POST", "http://127.0.0.1:5002/stocks");
     xhr.setRequestHeader("Content-Type", "application/json");
     xhr.setRequestHeader("Accept", "*/*");
     // xhr.setRequestHeader("Host", "127.0.0.1:5002");

     let self = this;
     xhr.onreadystatechange = function() {
        if(xhr.readyState == XMLHttpRequest.DONE) {
          let response = JSON.parse(xhr.response);
          self.getHistoryData(self);
          self.setState({bought: response.bought});
          self.setState({cash: response.cash});

       }
     }

     xhr.send(data);
  }

  fetchHelloWorld() {
    console.log("fetching python localhost");
    fetch('http://localhost:5002/stocks', {
      method: 'GET',
      //mode:'cors',
      dataType: 'json'
    })
      .then(r => r.json())
      .then(r => {
        console.log(r)
        this.setState({
          name: r
        })
      })
      .catch(err => console.log(err))
  }

  onChange = (e) => {
    if(!this.state[e.target.value]) {
      let count = 0;
      if(this.state.ethicalstrategy) {
        count += 1;
      }
      if(this.state.growthstrategy) {
        count += 1;
      }
      if(this.state.indexstrategy) {
        count += 1;
      }
      if(this.state.qualitystrategy) {
        count += 1;
      }
      if(this.state.valuestrategy) {
        count += 1;
      }
      if(count <= 1) {
        this.setState({[e.target.value] : !this.state[e.target.value]});
      }
    }
    else {
      this.setState({[e.target.value] : !this.state[e.target.value]});
    }
  }

  renderHistory = () => {
    let min = undefined;
    let max = undefined;
    if(this.state.history) {
      min = Math.max.apply(null, this.state.history);
      max = Math.min.apply(null, this.state.history);
    }

    let option = {
      xAxis: {
          type: 'category',
          // data: ['4 Days Ago', '3 Days Ago', '2 Days Ago', '1 days ago', 'Today']
          data: this.state.historyDates
      },
      yAxis: {
          type: 'value',
          min: min,
          max: max
      },
      series: [{
          // data: [820, 932, 901, 934, 1290, 1330, 1320],
          data: this.state.history,
          type: 'line'
      }]
    };
    if(this.state.history) {
      return(
        <div >
          <ReactEcharts option = {option}/>
        </div>
      );
    }
    else if (this.state.bought && !this.state.history){
      return ("Loading History...");
    }
  }

  getBoughtContents = () => {
    let result = "";

    for (var key in this.state.bought) {
      if (this.state.bought.hasOwnProperty(key)) {
        result += "Stock name: " + key + ", Stock count: " + this.state.bought[key][0] + ", Stock price: " + this.state.bought[key][1] + "\n";
      }
    }
    return result;
  }

  renderStockRecommendataions = () => {
    if(this.state.bought) {
      return (
          this.getBoughtContents()
      );
    }
    return(<div />);
  }

  render() {

    return (
      <div>
        {/* <div className="form-style-2"> */}
            <div className="form-style-2-heading">Provide your information</div>
                <form action="" method="post" onSubmit={this.handleSubmit}>
                    <label ><span>Name <span className="required">*</span></span><input type="text" className="input-field" name="field1" onChange={(e) => this.setState({name: e.target.value})} /></label>
                    <label ><span>Money <span className="required">*</span></span><input type="text" className="input-field" investamount="field2" onChange={(e) => this.setState({investamount: e.target.value})} /></label>
                    <Checkbox value="ethicalstrategy" checked = {this.state.ethicalstrategy} onChange={this.onChange}/><b>&nbsp;Ethical Investing</b> <label></label>
                    <Checkbox value="growthstrategy" checked = {this.state.growthstrategy} onChange={this.onChange}/><b>&nbsp;Growth Investing</b> <label></label>
                    <Checkbox value="indexstrategy" checked = {this.state.indexstrategy} onChange={this.onChange}/><b>&nbsp;Index  &nbsp;&nbsp;&nbsp;Investing</b> <label></label>
                    <Checkbox value="qualitystrategy" checked = {this.state.qualitystrategy} onChange={this.onChange}/><b>&nbsp;Quality Investing</b> <label></label>
                    <Checkbox value="valuestrategy" checked = {this.state.valuestrategy} onChange={this.onChange}/><b>&nbsp;Value &nbsp;&nbsp;&nbsp;Investing</b> <label></label>
                    <Button variant="contained" onClick = {this.handleSubmit}>Submit</Button>
                </form>
            <div>
              {this.renderStockRecommendataions()}
            </div>
            <div>
              {this.renderHistory()}
            </div>

         </div>
        );
    }
}

export default StockHomePage;