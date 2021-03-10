import React, { Component } from "react";
import { connect } from "react-redux";
import DailyChecklist from "../../Components/DailyChecklist";
import { fetchDailyChecklist } from "../../redux/actions/dailyChecklist";
import api from "../../utils/api";
import moment from "moment";
import BackButton from "../../Components/BackButton";
class OpeningChecklist extends Component {
  componentDidMount() {
    console.log("id", this.props.route.params.id);
    this.props.fetchDailyChecklist(this.props.route.params.id, "opening");
  }
  state = { stateArray: [] };

  render() {
    const submitChecklist = async (e) => {
      e.preventDefault();
      let url = "/records/checklist";
      console.log(url);
      const date = new Date();
      const nowDate = moment(date);
      const formattedDate = nowDate.format("YYYY-MM-DD");
      let body = {
        data: this.state.stateArray,
        pool_id: this.props.route.params.id,
        recordType: "OpeningTaskChecklist",
        user_id: this.props.user._id,
        date: formattedDate,
      };
      await api
        .post(url, body)
        .then((response) => {
          const data = response.data;
          console.log(data);
          this.props.navigation.navigate("SuccessScreen");
        })
        .catch((error) => {
          const errorMsg = error.message;
          console.log(errorMsg);
        });
      // await this.props.fetchPoolById(this.props.poolId);
    };
    const handleChange = (data, i) => {
      console.log(data);

      let a = this.state.stateArray.slice();

      a.push(data);

      this.setState({ stateArray: a });
      console.log(this.state);
    };

    return (
      <div className="container mx-auto overflow-scroll">
        {" "}
        <BackButton navigation={this.props.navigation} />
        <div className="text-2xl p-4">Opening Checklist : </div>
        <DailyChecklist
          data={this.props.dailyChecklist.data}
          handleChange={(data) => handleChange(data)}
          onSubmit={submitChecklist}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    dailyChecklist: state.dailyChecklist,
    user: state.auth.user,
  };
};

const mapDisptachToProps = (dispatch) => {
  return {
    fetchDailyChecklist: (id, type) => dispatch(fetchDailyChecklist(id, type)),
  };
};

export default connect(mapStateToProps, mapDisptachToProps)(OpeningChecklist);
