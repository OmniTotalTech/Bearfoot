import React, { Component } from "react";
import moment from "moment";
import ImageUploader from "react-images-upload";
import BackButton from "../../Components/BackButton";
import api from "../../utils/api";
class ChemicalLogFormContainer extends Component {
  componentDidMount() { }
  componentWillReceiveProps(nextProps) {
    for (const index in nextProps) {
      if (nextProps[index] !== this.props[index]) {
        if (nextProps.timeArray.length > 0) {
          //   this.setState({ stateArray: this.loadProps(nextProps) });
          // }
          console.log(nextProps.foundSubPoolRecord.dataObject)
          this.setState({dataObject: nextProps.foundSubPoolRecord.dataObject})
          if (nextProps.foundSubPoolRecord.data == 0) {
            this.setState({ stateArray: this.loadProps(nextProps) })
          } else {
            this.setState({ stateArray: nextProps.foundSubPoolRecord.data })
          }
        }
      }
    }
  }

  loadProps = (props) => {
    let newArray = [];
    for (let i = 0; i < props.timeArray.length; i++) {
      if (props.timeArray[i].checked) {

        let BodyItem = {
          time: props.timeArray[i].time,
          data: { ph: 0, cl: 0, pod: 0, pip: 0, ar: 0, fa: 0 }
        };

        let body = BodyItem
        newArray.push(body);
      }

    }
    console.log(newArray)
    return newArray;
  };

  state = { stateArray: [], pictures: [], dataObject: { combinedChlorine: 0, cyanuricAcid: 0, akalinity: 0, calciumHardness: 0, LSICalculation: 0 } };
  render() {
    const onDrop = (picture) => {
      this.setState({
        pictures: this.state.pictures.concat(picture),
      });
    };

    const handleUpload = async (e) => {
      e.preventDefault()
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

            const date = new Date();
            const nowDate = moment(date);
            const formattedDate = nowDate.format("YYYY-MM-DD");
            let _id;
            if(this.props.foundSubPoolRecord._id == undefined){
              _id = this.props.subPool._id
            } else {
              _id = this.props.foundSubPoolRecord._id
            }
            console.log(_id)
            let body = {
              data: this.state.stateArray,
              pool_id: this.props.id,
              recordType: "ChemicalLog",
              specificPool: this.props.subPool,
              user_id: this.props.userId,
              date: formattedDate,
              dataObject: {
                combinedChlorine: this.state.dataObject.combinedChlorine,
                cyanuricAcid: this.state.dataObject.cyanuricAcid,
                akalinity: this.state.dataObject.akalinity,
                calciumHardness: this.state.dataObject.calciumHardness,
                LSICalculation: this.state.dataObject.LSICalculation,
              },
              images: response.data.files,
            };
            console.log(body);
            console.log(this.state)
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

    const handleDataObjectChange = (index, value) => {
      let dataObjectState = this.state.dataObject;
      console.log(dataObjectState)
      let newData = dataObjectState[index];
      console.log(newData)
      this.setState({ dataObject: newData })
    }

    const handleEnter = (event) => {
      if (event.key.toLowerCase() === "enter" || event.key.toLowerCase() === "return") {
        event.preventDefault();

        const form = event.target.form;
        const index = [...form].indexOf(event.target);
        form.elements[index + 1].focus()

      }
    }

    return (
      <div className="overflow-scroll container mx-auto">
        <form>
          {this.state.loadedData ? <div></div> : <div></div>}
          <div>
            <p className="text-lg p-4 my-2 text-black">Chemical Log Page</p>
          </div>
          <div>

            {this.props.lastUpdatedData.lastUpdated != "" ? (
                <>
                <p className="text-md p-4 my-4">Last Updated At: {this.props.lastUpdatedData.lastUpdated}</p>
                <p className="text-md p-4 my-4">Updated By: {this.props.lastUpdatedData.lastUpdatedBy}</p>
              </>
              ):(<></>)}
          </div>
          {this.state.stateArray.length > 0 ? (
            <>
              <div className="grid grid-cols-2 text-center mx-1">
                {this.state.stateArray.map((item, i) => (
                  <>
                    <div key={i}>
                      <div>
                        <div className="bg-black text-white my-2 w-full">
                          {item.time}
                        </div>
                        <label>pH</label> <br />
                        <input
                          onKeyDown={event => handleEnter(event)}
                          onChange={(e) => handlePHChange(e, i)}
                          id={"ph"}
                          defaultValue={this.state.stateArray[i].data.ph}
                          value={this.state.stateArray[i].data.ph}
                          className="border-2"
                        />{" "}
                        <br />
                        <label>Cl</label> <br />
                        <input
                          onKeyDown={event => handleEnter(event)}
                          onChange={(e) => handleClChange(e, i)}
                          id={"cl"}
                          value={this.state.stateArray[i].data.cl}
                          className="border-2"
                        />{" "}
                        <br />
                        <label>Patrons On Deck</label> <br />
                        <input
                          onKeyDown={event => handleEnter(event)}
                          onChange={(e) => handlePodChange(e, i)}
                          id={"pod"}
                          value={this.state.stateArray[i].data.pod}

                          className="border-2"
                        />{" "}
                        <br />
                        <label>Patrons in Pool</label> <br />
                        <input
                          onKeyDown={event => handleEnter(event)}
                          onChange={(e) => handlePipChange(e, i)}
                          id={"pip"}
                          value={this.state.stateArray[i].data.pip}

                          className="border-2"
                        />{" "}
                        <br />
                        <label>Active Rescue</label> <br />
                        <input
                          onKeyDown={event => handleEnter(event)}
                          onChange={(e) => handleArChange(e, i)}
                          value={this.state.stateArray[i].data.ar}

                          id={"ar"}
                          className="border-2"
                        />{" "}
                        <br />
                        <label>First-Aid</label> <br />
                        <input
                          onKeyDown={event => handleEnter(event)}
                          onChange={(e) => handleFaChange(e, i)}
                          value={this.state.stateArray[i].data.fa}

                          id={"fa"}
                          className="border-2"
                        />{" "}
                        <br />
                      </div>
                    </div>
                  </>
                ))}
              </div>
              <div className="container mx-auto my-4 text-center">
                <div>
                  <h1 className="text-2xl"> Misc Form Information:</h1>
                </div>
                <div>
                  <label>Combined Chlorine:</label> <br />
                  <input
                      value={this.state.dataObject.combinedChlorine}
                      onChange={(e) =>
                      this.setState({
                        dataObject: Object.assign(
                          {},
                          this.state.dataObject,
                          { combinedChlorine: e.target.value }
                        )
                      })
                    }
                    className="border-2"
                    defaultValue={0}
                    value={this.state.dataObject?.combinedChlorine}

                  />{" "}
                </div>{" "}
                <div>
                  <label>Cyanuric Acid:</label> <br />
                  <input
                      value={this.state.dataObject.cyanuricAcid}

                      onChange={(e) =>
                      this.setState({
                        dataObject: Object.assign(
                          {},
                          this.state.dataObject,
                          { cyanuricAcid: e.target.value })
                      })
                    }
                    className="border-2"
                    defaultValue={0}
                    value={this.state.dataObject?.cyanuricAcid}

                  />{" "}
                </div>{" "}
                <div>
                  <label>Alkalinity:</label> <br />
                  <input
                      value={this.state.dataObject.akalinity}

                      onChange={(e) =>
                      this.setState({
                        dataObject: Object.assign(
                          {},
                          this.state.dataObject,
                          { akalinity: e.target.value })
                      })
                    }
                    className="border-2"
                    defaultValue={0}
                    value={this.state.dataObject?.akalinity}

                  />{" "}
                </div>{" "}
                <div>
                  <label>Calcium Hardness:</label> <br />
                  <input
                      value={this.state.dataObject.calciumHardness}

                      onChange={(e) => this.setState({
                      dataObject:
                        Object.assign(
                          {},
                          this.state.dataObject,
                          { calciumHardness: e.target.value }
                        )
                    })}
                    className="border-2"
                    defaultValue={0}
                    value={this.state.dataObject?.calciumHardness}

                  />{" "}
                </div>
                <div>
                  <label>LSI Calculation:</label> <br />
                  <input
                      value={this.state.dataObject.LSICalculation}

                    onChange={(e) =>
                      this.setState({
                        dataObject: Object.assign(
                          {},
                          this.state.dataObject,
                          { LSICalculation: e.target.value })
                      })
                    }
                    className="border-2"
                    defaultValue={0}

                    value={this.state.dataObject?.LSICalculation}
                  />{" "}
                </div>
                <div className="container w-100 bg-white">
                  {this.props.foundSubPoolRecord.images?.length > 0 ?
                    <h2 className="text-2xl" style={{ fontSize: 24 }}>Images Previously submitted:</h2>
                    :
                    null

                  }
                  {this.props.foundSubPoolRecord.images?.map((item, i) => (
                    <>
                      <div>
                        <img src={item.image} width={"100%"} height={"100%"} />
                      </div>
                    </>
                  ))}
                </div>
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
                <button
                  onClick={(e) => handleUpload(e)}
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
        </form>
      </div>
    );
  }
}

export default ChemicalLogFormContainer;
