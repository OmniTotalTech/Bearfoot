import React, { Component } from "react";
import { connect } from "react-redux";
import DailyChecklist from "../../Components/DailyChecklist";
import { fetchDailyChecklist } from "../../redux/actions/dailyChecklist";

class OpeningChecklist extends Component {
  componentDidMount() {
    console.log("id", this.props.route.params.id);
    this.props.fetchDailyChecklist(this.props.route.params.id, "opening");
  }

  render() {
    const handleChange = (evt) => {
      console.log(evt.target.checked);
    };
    return (
      <div className="container mx-auto">
        <div className="text-3xl">Opening Checklist : </div>
        <DailyChecklist
          data={this.props.dailyChecklist.data}
          handleChange={handleChange}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    dailyChecklist: state.dailyChecklist,
  };
};

const mapDisptachToProps = (dispatch) => {
  return {
    fetchDailyChecklist: (id, type) => dispatch(fetchDailyChecklist(id, type)),
  };
};

export default connect(mapStateToProps, mapDisptachToProps)(OpeningChecklist);
