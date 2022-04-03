import React, { Component } from "react";
import { connect } from "react-redux";
import moment from "moment";
import api from "../utils/api";
import BackButton from "../Components/BackButton";
import DailyOperationsSection from "../Components/DailyOperationsSection";
class DailyOperations extends Component {
  state = { loadedProps: {lastUpdated:"",lastUpdatedBy:""},didFindRecord: false, facilityManagers: [],headGuards: [],poolClosures: [], shiftNotes: ""};

  async componentDidMount() {
    console.log(this.props.route.params)
    await api
        .get(`records/search/${this.props.route.params.id}/${this.props.route.params.sub_pool_id}/dailyOperations/${moment().format("YYYY-MM-DD")}`)
        .then((response) => {
          console.log(response.data);
          if(response.data != null | undefined){
            console.log("found")
            this.setState({
              loadedProps:response.data,
              didFindRecord: true,
              facilityManagers: response.data.dataObject.facilityManagers,
              headGuards: response.data.dataObject.headGuards,
              poolClosures:  response.data.dataObject.poolClosures,
              shiftNotes:  response.data.dataObject.shiftNotes
            })
          }
        })
        .catch((error) => {
          const errorMsg = error.message;
        });
  }

  handleStateUpdate = (type,value,index,key) => {
    console.log(type,value,index,key)
    console.log(this.state.facilityManagers)
    let fm;
    let hg;
    let pc;
    switch (type){
      case "addFM":
        fm = this.state.facilityManagers
        fm.push(value)
        this.setState({facilityManagers: fm})
        break;
      case "addHG":
        hg = this.state.headGuards
        hg.push(value)
        this.setState({headGuards: hg})
        break;
      case "addPC":
        pc = this.state.poolClosures
        pc.push(value)
        this.setState({poolClosures: pc})
        break;
      case "updateFM":
        console.log(this.state.facilityManagers,index)
        fm = this.state.facilityManagers;
        fm[index][key] = value
        this.setState({facilityManagers: fm})
        break;

      default:
        break;
    }
  }

  render() {


    const handleSubmit = async (e,dataObject) => {
      e.preventDefault();
      let type;

      type = "dailyOperations";

      var date = new Date();
      var dateObj = date;
      var momentObj = moment(dateObj);
      var momentString = momentObj.format("YYYY-MM-DD"); // 2016-07-15
      const time = moment().format("LT");
      let body = {

        pool_id: this.props.route.params.id,
        specificPool: this.props.route.params.sub_pool_id,
        recordType: type,
        type: "dailyOperations",
        date: momentString,
        data: {},
        dataObject: {
          facilityManagers: this.state.facilityManagers,
          headGuards: this.state.headGuards,
          poolClosures: this.state.poolClosures,
          shiftNotes: this.state.shiftNotes
        },
        user_id: this.props.user._id,
        time: time,
      };
      console.log(body);
      console.log(this.state)
      if(this.state.didFindRecord){

        body._id = this.state.loadedProps._id
        await api
            .post("/records/", body)
            .then((response) => {
              console.log(response);
              this.props.navigation.navigate("SuccessScreen");
            })
            .catch((error) => {
              const errorMsg = error.message;
            });
      } else {
        await api
            .post("/records/" + type, body)
            .then((response) => {
              console.log(response);
              this.props.navigation.navigate("SuccessScreen");
            })
            .catch((error) => {
              const errorMsg = error.message;
            });
      }

    };
    let {lastUpdated,lastUpdatedBy} = this.state.loadedProps

    const momentFunc = (time) => {
      if(time == ""){
        return new Date();
      } else {
        return time
      }
    }
    return (

      <div className="overflow-scroll">
        {" "}
        <BackButton navigation={this.props.navigation} />
          <div>
            {" "}
            <div className="max-w-2xl m-4 p-4 mx-auto">
              <div className="container">
                <div>
                  {console.log(this.state.loadedProps.lastUpdated)}

                  {/*{this.state.loadedProps == null ? (<p>No record has been submitted for this pool today.</p>):(*/}
                  {/*  <>*/}
                      <h1>Last Updated - {moment(momentFunc(lastUpdated)).format('lll')}</h1>
                  {/*  </>*/}
                  {/*)}*/}
                </div>
              </div>
              <DailyOperationsSection
                 state={this.state}
                 setState={this.setState}
                 handleStateUpdate={(type,value,i,key) => this.handleStateUpdate(type,value,i,key)}
                 handleSubmit={handleSubmit}
                 navigation={this.props.navigation}
              />
            </div>
          </div>

      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
  };
};

export default connect(mapStateToProps)(DailyOperations);
