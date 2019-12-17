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
    validMoney: false,
    validName: false,
    strategyChecked: false,
    isLoadingStocks:false,
    isLoadingHistory:false,
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  getHistoryData = () => {
    // var data = JSON.stringify({
    //   "name": this.state.name,
    //   "amount": this.state.investamount,
    //   "strategies": strategies
    //  });

    this.setState({historyDates: undefined, historyTimestamps: undefined, history: undefined});

     var xhr = new XMLHttpRequest();
     xhr.withCredentials = true;

     xhr.addEventListener("readystatechange", function () {
      if (this.readyState === 4) {
        console.log(this.responseText);
      }
     });

     xhr.open("GET", "http://127.0.0.1:5002/history/" + this.state.name);
     xhr.setRequestHeader("Content-Type", "application/json");
     xhr.setRequestHeader("Accept", "*/*");
     // xhr.setRequestHeader("Host", "127.0.0.1:5002");
     let self = this;
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
          self.setState({isLoadingHistory: false});
       }
     }
    this.setState({isLoadingHistory: true});

     xhr.send();
  }

  handleSubmit = (event) => {
    //this.fetchHelloWorld();
    // alert('A name was submitted: ' + this.state.name);
    // event.preventDefault();

    this.setState({bought: undefined, cash: undefined});

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
          self.setState({bought: response.bought});
          self.setState({cash: response.cash});
          self.setState({isLoadingStocks: false});
       }
     }
     this.setState({isLoadingStocks: true});
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

  getCounts = () => {
    debugger;
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
    return count;
  }

  onChange = (e) => {
    let count = this.getCounts();
    if(!this.state[e.target.value]) {
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
          data: this.state.historyDates,
          name: "Date",
          nameLocation: "center",
          nameGap: "35"
      },
      yAxis: {
          type: 'value',
          min: min,
          max: max,
          name: "Portfolio Cost ($)",
          nameLocation: "center",
          nameGap: "55"
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
    if(this.state.isLoadingHistory) {
      return (
        "Loading History..."
      )
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
    if(this.state.isLoadingStocks) {
      return (
        "Loading Stock Recommendations..."
      )
    }
    else if(this.state.bought) {
      return (
          this.getBoughtContents()
      );
    }
    return(<div />);
  }

  updateName = (e) => {
    if(e.target.value != "") {
      this.setState({validName: true});
    }
    else {
      this.setState({validName: false});
    }
    this.setState({name: e.target.value});
  }

  updateMoney = (e) => {
    if(e.target.value < 5000) {
      this.setState({validMoney: false});
    }
    else {
      this.setState({validMoney: true});
    }
    this.setState({investamount: e.target.value});
  }

  render() {
    console.log("valid money: " + this.state.validMoney + " stragegyChecked: " +this.state.strategyChecked + " validName: " +this.state.validName);
    return (
      <div>
        {/* <div className="form-style-2"> */}
            <div className="form-style-2-heading">Provide your information</div>
                <form action="" method="post" onSubmit={this.handleSubmit}>
                    <label ><span>Name <span className="required">*</span></span><input type="text" className="input-field" name="field1" onChange={(e) => this.updateName(e)} /></label>
                    <label ><span>Money <span className="required">*</span></span><input type="number" className="input-field" investamount="field2" onChange={(e) => this.updateMoney(e)} /></label>
                    <Checkbox value="ethicalstrategy" checked = {this.state.ethicalstrategy} onChange={this.onChange}/><b>&nbsp;Ethical Investing</b> <label></label>
                    <Checkbox value="growthstrategy" checked = {this.state.growthstrategy} onChange={this.onChange}/><b>&nbsp;Growth Investing</b> <label></label>
                    <Checkbox value="indexstrategy" checked = {this.state.indexstrategy} onChange={this.onChange}/><b>&nbsp;Index  &nbsp;&nbsp;&nbsp;Investing</b> <label></label>
                    <Checkbox value="qualitystrategy" checked = {this.state.qualitystrategy} onChange={this.onChange}/><b>&nbsp;Quality Investing</b> <label></label>
                    <Checkbox value="valuestrategy" checked = {this.state.valuestrategy} onChange={this.onChange}/><b>&nbsp;Value &nbsp;&nbsp;&nbsp;Investing</b> <label></label>
                    <Button variant="contained" disabled = {!(this.state.validMoney && this.getCounts() > 0 && this.getCounts() <= 2 && this.state.validName)} onClick = {this.handleSubmit}>Submit</Button>
                    <Button variant="contained" disabled = {!(this.state.validName)} onClick = {this.getHistoryData}>View History</Button>
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