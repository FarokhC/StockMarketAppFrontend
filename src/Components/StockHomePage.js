import React from 'react';
//import ReactDOM from 'react-dom';
import CurrencyInput from 'react-currency-input';

class StockHomePage extends React.Component {

constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  
  state = {
    name: '',
    investamount: '',
    ethicalstrategy: '',
    growthstrategy: '',
    indexstrategy: '',
    qualitystrategy: '',
    valuestrategy: '',
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    //this.fetchHelloWorld();
    // alert('A name was submitted: ' + this.state.name);
    // event.preventDefault();
    var data = JSON.stringify({
      "name": this.state.name,
      "amount": this.state.investamount,
      "strategies": [

      ]
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



  render() {
    return (
        <div className="form-style-2">
            <div className="form-style-2-heading">Provide your information</div>
                <form action="" method="post" onSubmit={this.handleSubmit}>
                    <label ><span>Name <span className="required">*</span></span><input type="text" className="input-field" name="field1" onChange={(e) => this.setState({name: e.target.value})} /></label>
                    <label ><span>Money <span className="required">*</span></span><input type="text" className="input-field" investamount="field2" onChange={(e) => this.setState({investamount: e.target.value})} /></label>
                    <label><input type="radio" value="ethical" /><b>&nbsp;Ethical Investing</b></label>
                    <label><input type="radio" value="growth" /><b>&nbsp;Growth Investing</b></label>
                    <label><input type="radio" value="index" /><b>&nbsp;Index Investing</b></label>
                    <label><input type="radio" value="quality" /><b>&nbsp;Quality Investing</b></label>
                    <label><input type="radio" value="value" /><b>&nbsp;Value Investing</b></label>
                    <label><span> </span><input type="submit" value="Submit" /></label>
                </form>
            </div>
        );
    }
}

export default StockHomePage;