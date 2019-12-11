import React from 'react';
//import ReactDOM from 'react-dom';
import CurrencyInput from 'react-currency-input';

class StockHomePage extends React.Component {

constructor(props) {
    super(props);
  }
  
  state = {
    name: '',
    investAmount: '',
    investStrategy: ''
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    alert('A name was submitted: ' + this.state.value);
    event.preventDefault();
  }

  render() {
    return (
        <div className="form-style-2">
            <div className="form-style-2-heading">Provide your information</div>
                <form action="" method="post" onSubmit={this.handleSubmit}>
                    <label ><span>Name <span className="required">*</span></span><input type="text" className="input-field" name="field1" value={this.state.name} onChange={(e) => this.setState({name: e.target.value})} /></label>
                    <label ><span>Money <span className="required">*</span></span><input type="text" className="input-field" investAmount="field2" value={this.state.investAmount} onChange={(e) => this.setState({investAmount: e.target.value})} /></label>
                    <label><span> </span><input type="submit" value="Submit" /></label>
                </form>
            </div>
        );
    }
}

export default StockHomePage;