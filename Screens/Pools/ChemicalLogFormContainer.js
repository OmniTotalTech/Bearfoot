import React, { Component } from "react";
import moment from "moment";
import ImageUploader from "react-images-upload";
import BackButton from "../../Components/BackButton";
import api from "../../utils/api";
class ChemicalLogFormContainer extends Component {
  componentDidMount() {}
  componentWillReceiveProps(nextProps) {
    for (const index in nextProps) {
      if (nextProps[index] !== this.props[index]) {
        if (nextProps.timeArray.length > 0) {
          this.setState({ stateArray: this.loadProps(nextProps) });
        }
      }
    }
  }

  loadProps = (props) => {
    let newArray = [];
    for (let i = 0; i < props.timeArray.length; i++) {
      if (props.timeArray[i].checked) {
        let body = {
          time: props.timeArray[i].time,
          data: {
            ph: 0,
            cl: 0,
            pod: 0,
            pip: 0,
            ar: 0,
            fa: 0,
          },
        };
        newArray.push(body);
      }
    }

    return newArray;
    //   this.setState({ formObjectArray: newArray });
  };
  //   const [formObjectArray, setFormObjectArray] = React.useState([]);
  state = { stateArray: [], pictures: [] };
  render() {
    console.log(this.props);
    const onDrop = (picture) => {
      this.setState({
        pictures: this.state.pictures.concat(picture),
      });
    };

    const handleUpload = async () => {
      const formData = new FormData();
      formData.append("image", this.state.pictures);

      const data = new FormData();
      let selectedFiles = this.state.pictures;

      if (selectedFiles) {
        for (let i = 0; i < selectedFiles.length; i++) {
          data.append("image", selectedFiles[i]);
        }
        await api
          .post("uploadCLDetails", data)
          .then(async (response) => {
            console.log(response);
            console.log(response.data);
            const date = new Date();
            const nowDate = moment(date);
            const formattedDate = nowDate.format("YYYY-MM-DD");
            let newDataObj = {};
            let body = {
              data: this.state.stateArray,
              pool_id: this.props.id,
              recordType: "ChemicalLog",
              specificPool: this.props.subPool,
              user_id: this.props.userId,
              date: formattedDate,
              dataObject: {
                combinedChlorine: this.state.combinedChlorine,
                cyanuricAcid: this.state.cyanuricAcid,
                akalinity: this.state.akalinity,
                calciumHardness: this.state.calciumHardness,
                LSICalculation: this.state.LSICalculation,
              },
              images: response.data.files,
            };
            this.props.onSubmit(body);
          })
          .catch((error) => {
            console.log(error);
          });
      }

      this.setState({ pictures: [] });
    };

    const handlePHChange = (e, i) => {
      let stateArray = this.state.stateArray;

      let newData = this.state.stateArray[i].data;
      newData.ph = e.target.value;
      stateArray[i].data = newData;

      this.setState({ stateArray: stateArray });
    };

    const handleClChange = (e, i) => {
      let stateArray = this.state.stateArray;

      let newData = this.state.stateArray[i].data;
      newData.cl = e.target.value;
      stateArray[i].data = newData;

      this.setState({ stateArray: stateArray });
    };

    const handlePodChange = (e, i) => {
      let stateArray = this.state.stateArray;

      let newData = this.state.stateArray[i].data;
      newData.pod = e.target.value;
      stateArray[i].data = newData;

      this.setState({ stateArray: stateArray });
    };
    const handlePipChange = (e, i) => {
      let stateArray = this.state.stateArray;

      let newData = this.state.stateArray[i].data;
      newData.pip = e.target.value;
      stateArray[i].data = newData;

      this.setState({ stateArray: stateArray });
    };
    const handleArChange = (e, i) => {
      let stateArray = this.state.stateArray;
      let newData = this.state.stateArray[i].data;
      newData.ar = e.target.value;
      stateArray[i].data = newData;

      this.setState({ stateArray: stateArray });
    };

    const handleFaChange = (e, i) => {
      let stateArray = this.state.stateArray;
      let newData = stateArray[i].data;

      newData.fa = e.target.value;
      stateArray[i].data = newData;

      this.setState({ stateArray: stateArray });
    };
    return (
      <div className="overflow-scroll container mx-auto">
        {this.state.loadedData ? <div></div> : <div></div>}
        <div>
          <p className="text-lg p-4 my-2 text-black">Chemical Log Page</p>
        </div>
        {this.state.stateArray.length > 0 ? (
          <>
            <div className="grid grid-cols-2 text-center mx-1">
              {this.state.stateArray.map((item, i) => (
                <div key={i}>
                  <div>
                    <div className="bg-black text-white my-2 w-full">
                      {item.time}
                    </div>
                    <label>pH</label> <br />
                    <input
                      onChange={(e) => handlePHChange(e, i)}
                      id={"ph"}
                      className="border-2"
                    />{" "}
                    <br />
                    <label>Cl</label> <br />
                    <input
                      onChange={(e) => handleClChange(e, i)}
                      id={"cl"}
                      className="border-2"
                    />{" "}
                    <br />
                    <label>Patrons On Deck</label> <br />
                    <input
                      onChange={(e) => handlePodChange(e, i)}
                      id={"pod"}
                      className="border-2"
                    />{" "}
                    <br />
                    <label>Patrons in Pool</label> <br />
                    <input
                      onChange={(e) => handlePipChange(e, i)}
                      id={"pip"}
                      className="border-2"
                    />{" "}
                    <br />
                    <label>Active Rescue</label> <br />
                    <input
                      onChange={(e) => handleArChange(e, i)}
                      id={"ar"}
                      className="border-2"
                    />{" "}
                    <br />
                    <label>First-Aid</label> <br />
                    <input
                      onChange={(e) => handleFaChange(e, i)}
                      id={"fa"}
                      className="border-2"
                    />{" "}
                    <br />
                  </div>
                </div>
              ))}
            </div>
            <div className="container mx-auto my-4 text-center">
              <div>
                <h1 className="text-2xl"> Misc Form Information:</h1>
              </div>
              <div>
                <label>Combined Chlorine:</label> <br />
                <input
                  onChange={(e) =>
                    this.setState({ combinedChlorine: e.target.value })
                  }
                  className="border-2"
                />{" "}
              </div>{" "}
              <div>
                <label>Cyanuric Acid:</label> <br />
                <input
                  onChange={(e) =>
                    this.setState({ cyanuricAcid: e.target.value })
                  }
                  className="border-2"
                />{" "}
              </div>{" "}
              <div>
                <label>Alkalinity:</label> <br />
                <input
                  onChange={(e) => this.setState({ akalinity: e.target.value })}
                  className="border-2"
                />{" "}
              </div>{" "}
              <div>
                <label>Calcium Hardness:</label> <br />
                <input
                  onChange={(e) =>
                    this.setState({ calciumHardness: e.target.value })
                  }
                  className="border-2"
                />{" "}
              </div>
              <div>
                <label>LSI Calculation:</label> <br />
                <input
                  onChange={(e) =>
                    this.setState({ LSICalculation: e.target.value })
                  }
                  className="border-2"
                />{" "}
              </div>
              <ImageUploader
                withIcon={true}
                buttonText="Choose images"
                onChange={onDrop}
                imgExtension={[".jpg", ".gif", ".png", ".gif"]}
                maxFileSize={262144000}
                withPreview={true}
                withLabel={true}
              />
              <button
                onClick={handleUpload}
                className="text-white bg-red-500 px-4 py-2 rounded"
              >
                Submit
              </button>
            </div>
          </>
        ) : (
          <div>
            No selected times to check the Pool's data have been set by the
            admin.
          </div>
        )}
      </div>
    );
  }
}

export default ChemicalLogFormContainer;
