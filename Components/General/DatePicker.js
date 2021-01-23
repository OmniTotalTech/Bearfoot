import React, { Component } from "react";
import DatePicker from "react-datepicker";
import moment from "moment";
// import "react-datepicker/dist/react-datepicker.css";

// CSS Modules, react-datepicker-cssmodules.css
// import 'react-datepicker/dist/react-datepicker-cssmodules.css';

class datePicker extends Component {
  state = {
    startDate: new Date(),
  };

  handleChange = (date) => {
    var dateObj = date;
    var momentObj = moment(dateObj);
    var momentString = momentObj.format("YYYY-MM-DD"); // 2016-07-15
    console.log(momentString);
    this.setState({ date: momentString, startDate: date }, () => {
      if (this.props.onChange) {
        this.props.onChange(this.state);
      }
      // this.props.updateState(this.state.date);
    });
  };

  handleSubmit = () => {};
  render() {
    return (
      <DatePicker
        selected={this.state.startDate}
        onChange={this.handleChange}
      />
    );
  }
}

export default datePicker;
