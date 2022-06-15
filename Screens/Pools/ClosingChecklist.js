import React, { Component } from "react";
import { connect } from "react-redux";
import DailyChecklist from "../../Components/DailyChecklist";
import { fetchDailyChecklist } from "../../redux/actions/dailyChecklist";
import api from "../../utils/api";
import moment from "moment";
import ImageUploader from "react-images-upload";
import BackButton from "../../Components/BackButton";
class ClosingChecklist extends Component {
  componentDidMount() {
    console.log("id", this.props.route.params.id);
    this.props.fetchDailyChecklist(this.props.route.params.id, "closing");
  }
  state = { stateArray: [], pictures: [] };

  render() {
    const submitChecklist = async (e) => {
      e.preventDefault();
      let url = "/records/checklist";
      console.log(url);
      const date = new Date();
      const nowDate = moment(date);
      const formattedDate = nowDate.format("YYYY-MM-DD");

      /*******GONNA SET THE IMAGES******* */

      console.log(this.props.navigation);
      const formData = new FormData();
      const data = new FormData();

      formData.append("image", this.state.pictures);

      let selectedFiles = this.state.pictures;

      if (selectedFiles) {
        for (let i = 0; i < selectedFiles.length; i++) {
          data.append("image", selectedFiles[i]);
        }
        await api
          .post("uploadClosingImages", data)
          .then(async (response) => {
            console.log(response);
            console.log(response.data);
            const date = new Date();
            const nowDate = moment(date);
            const formattedDate = nowDate.format("YYYY-MM-DD");
            const time = moment().format("LT");

            let body = {
              data: this.state.stateArray,
              pool_id: this.props.route.params.id,
              recordType: "ClosingTaskChecklist",
              user_id: this.props.user._id,
              date: formattedDate,
              images: response.data.files,
              time: time,
            };
            console.log(body);
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
          })
          .catch((errr) => {
            console.log(errr);
          });
      }
      /***************THEN SEND THE RESPONSE LINKS***************** */

      // await this.props.fetchPoolById(this.props.poolId);
    };
    const handleChange = (data, i) => {
      console.log(data);

      let a = this.state.stateArray.slice();

      a.push(data);

      this.setState({ stateArray: a });
      console.log(this.state);
    };
    const onDrop = (picture) => {
      this.setState({
        pictures: this.state.pictures.concat(picture),
      });
    };

    return (
      <div className="container mx-auto overflow-scroll mx-auto">
        {" "}
        <BackButton navigation={this.props.navigation} />
        <div className="text-2xl p-4 container mx-auto">
          Closing Checklist :{" "}
        </div>
        <DailyChecklist
          data={this.props.dailyChecklist.data}
          handleChange={(data) => handleChange(data)}
          onSubmit={submitChecklist}
        />
        <div className="container max-w-md mx-auto">
          <div className="text-lg">Closing Image Upload:</div>
            <ImageUploader
                withIcon={true}
                buttonText="Choose images"
                onChange={onDrop}
                imgExtension={[".jpg", ".gif", ".png", ".gif", ".jpeg","heic"]}
                maxFileSize={1000000000}
                withPreview={true}
                label="max file size: 1GB, Must be: JPG,PBG,GIF"
                withLabel={true}
            />
        </div>
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

export default connect(mapStateToProps, mapDisptachToProps)(ClosingChecklist);
