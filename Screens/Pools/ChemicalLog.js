import React, { Component } from "react";
import api from "../../utils/api";
import ChemicalLogFormContainer from "./ChemicalLogFormContainer";
import { connect } from "react-redux";
import BackButton from "../../Components/BackButton";
import moment from "moment";

class ChemicalLog extends Component {
  state = { timeArray: [], formObject: {}, subPools: [], selectedSubPool: "", foundSubPoolRecord: { data: [] } };

  async componentDidMount() {
    await api
      .get("/subPools/" + this.props.route.params.id)
      .then((response) => {
        this.setState({ subPools: response.data });
      })
      .catch((error) => {
        const errorMsg = error.message;
      });

  }

  render() {
    const onSubmit = async (body) => {
      let url = "/uploadCLDetailsPart2";
      await api
        .post(url, body)
        .then((response) => {
          console.log(response.data);
          this.props.navigation.navigate("SuccessScreen");
        })
        .catch((error) => {
          const errorMsg = error.message;
        });
    };

    const handleSelectChange = async (value) => {
      this.setState({ selectedSubPool: value });
      if (value == 0) {
        this.setState({ isNull: true });
      } else {
        this.setState({ isNull: false });
        console.log(value);
        await api
          .get("/chemTimes/" + this.props.route.params.id + "/" + value)
          .then((response) => {
            console.log(response.data);
            if (
              response.data.data.chemTimeData &&
              response.data.data.chemTimeData.length > 0
            ) {
              this.setState({ timeArray: response.data.data.chemTimeData });
            }
          })
          .catch((error) => {
            const errorMsg = error.message;
          });
        await api
          .get(`/chemLogs/getOldest/oneRecord/${value}/${moment().format("YYYY-MM-DD")}`)
          .then((response) => {
            console.log("getNew", response.data);
            this.setState({
              foundSubPoolRecord: response.data.data == null ? { data: [] } : response.data.data
            })
          })
          .catch((error) => {
            const errorMsg = error.message;
          });
      }
    };

    return (
      <>
        <div className="container mx-auto bg-white">
          <div className="p-4">
            <BackButton navigation={this.props.navigation} />

            <label for="subpools">
              Select a specific pool at this location:
            </label>

            {this.state.subPools.length > 0 ? (
              <select
                value={this.state.value}
                onChange={(e) => handleSelectChange(e.target.value)}
              >
                <option value={0}>Select One</option>

                {this.state.subPools.map((item, i) => (
                  <option value={item._id} key={i}>
                    {item.subPoolName}
                  </option>
                ))}
              </select>
            ) : (
              <div>
                No SubPools Have been set. You must create at least one subpool
                in the Admin "Edit Pool" area.
              </div>
            )}
          </div>
        </div>
        {this.state.isNull ? (
          <div className="container p-4">Please Select a valid SubPool.</div>
        ) : (
          <ChemicalLogFormContainer
            subPool={this.state.selectedSubPool}
            navigation={this.props.navigation}
            userId={this.props.user._id}
            onSubmit={onSubmit}
            timeArray={this.state.timeArray}
            foundSubPoolRecord={this.state.foundSubPoolRecord}
            id={this.props.route.params.id}
          />
        )}
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
  };
};

export default connect(mapStateToProps)(ChemicalLog);
