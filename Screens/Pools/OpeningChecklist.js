import React, { Component } from "react";
import { connect } from "react-redux";
import DailyChecklist from "../../Components/DailyChecklist";
import { fetchDailyChecklist } from "../../redux/actions/dailyChecklist";

class OpeningChecklist extends Component {
  componentDidMount() {
    this.props.fetchDailyChecklist(this.props.route.params.id);
  }

  render() {
    return (
      <div className="container mx-auto">
        <div className="text-3xl">Opening Checklist : </div>
        <DailyChecklist />
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
    fetchDailyChecklist: (id) => dispatch(fetchDailyChecklist(id)),
  };
};

export default connect(mapStateToProps, mapDisptachToProps)(OpeningChecklist);
