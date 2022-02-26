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
<<<<<<< HEAD
          //   this.setState({ stateArray: this.loadProps(nextProps) });
          // }
          if (nextProps.foundSubPoolRecord.data.length == 0) {
            this.setState({stateArray: this.loadProps(nextProps)})
          } else {
            this.setState({stateArray: nextProps.foundSubPoolRecord.data})
            this.setState({dataObject: nextProps.foundSubPoolRecord.dataObject})
          }
=======
          this.setState({ stateArray: this.loadProps(nextProps) });
>>>>>>> a8ccdac77f8b7a47ef2a0db5e9b084921f0b02be
        }
      }
    }
  }

  loadProps = (props) => {
    let newArray = [];
    for (let i = 0; i < props.timeArray.length; i++) {
      if (props.timeArray[i].checked) {
<<<<<<< HEAD

        let BodyItem = {
          time: props.timeArray[i].time,
          data: {ph: 0, cl: 0, pod: 0, pip: 0, ar: 0, fa: 0}
        };

        let body = BodyItem
        newArray.push(body);
      }

    }
    console.log(newArray)
    return newArray;
  };

  state = { stateArray: [], pictures: [], dataObject: { combinedChlorine: 0, cyanuricAcid: 0,akalinity: 0, calciumHardness: 0, LSICalculation: 0 }};
  render() {
=======
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
>>>>>>> a8ccdac77f8b7a47ef2a0db5e9b084921f0b02be
    const onDrop = (picture) => {
      this.setState({
        pictures: this.state.pictures.concat(picture),
      });
    };

<<<<<<< HEAD
    const handleUpload = async (e) => {
      e.preventDefault()
=======
    const handleUpload = async () => {
>>>>>>> a8ccdac77f8b7a47ef2a0db5e9b084921f0b02be
      const formData = new FormData();
      formData.append("image", this.state.pictures);

      const data = new FormData();
      let selectedFiles = this.state.pictures;

      if (selectedFiles) {
        for (let i = 0; i < selectedFiles.length; i++) {
          data.append("image", selectedFiles[i]);
        }
<<<<<<< HEAD

        await api
          .post("uploadCLDetails", data)
          .then(async (response) => {

            const date = new Date();
            const nowDate = moment(date);
            const formattedDate = nowDate.format("YYYY-MM-DD");
            let body = {
              _id: this.props.foundSubPoolRecord._id,
=======
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
>>>>>>> a8ccdac77f8b7a47ef2a0db5e9b084921f0b02be
              data: this.state.stateArray,
              pool_id: this.props.id,
              recordType: "ChemicalLog",
              specificPool: this.props.subPool,
              user_id: this.props.userId,
              date: formattedDate,
              dataObject: {
<<<<<<< HEAD
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
=======
                combinedChlorine: this.state.combinedChlorine,
                cyanuricAcid: this.state.cyanuricAcid,
                akalinity: this.state.akalinity,
                calciumHardness: this.state.calciumHardness,
                LSICalculation: this.state.LSICalculation,
              },
              images: response.data.files,
            };
>>>>>>> a8ccdac77f8b7a47ef2a0db5e9b084921f0b02be
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
<<<<<<< HEAD

    const handleDataObjectChange = (index, value) => {
      let dataObjectState = this.state.dataObject;
      console.log(dataObjectState)
      let newData = dataObjectState[index];
      console.log(newData)
      this.setState({dataObject : newData})
    }

    const handleEnter = (event) => {
      if (event.key.toLowerCase() === "enter" || event.key.toLowerCase() === "return" ) {
        event.preventDefault();

        const form = event.target.form;
        const index = [...form].indexOf(event.target);
        form.elements[index+1].focus()

      }
    }

    return (
      <div className="overflow-scroll container mx-auto">
        <form>
=======
    return (
      <div className="overflow-scroll container mx-auto">
>>>>>>> a8ccdac77f8b7a47ef2a0db5e9b084921f0b02be
        {this.state.loadedData ? <div></div> : <div></div>}
        <div>
          <p className="text-lg p-4 my-2 text-black">Chemical Log Page</p>
        </div>
<<<<<<< HEAD

=======
>>>>>>> a8ccdac77f8b7a47ef2a0db5e9b084921f0b02be
        {this.state.stateArray.length > 0 ? (
          <>
            <div className="grid grid-cols-2 text-center mx-1">
              {this.state.stateArray.map((item, i) => (
<<<<<<< HEAD
                  <>
=======
>>>>>>> a8ccdac77f8b7a47ef2a0db5e9b084921f0b02be
                <div key={i}>
                  <div>
                    <div className="bg-black text-white my-2 w-full">
                      {item.time}
                    </div>
                    <label>pH</label> <br />
                    <input
<<<<<<< HEAD
                        onKeyDown={event => handleEnter(event)}
                      onChange={(e) => handlePHChange(e, i)}
                      id={"ph"}
                        defaultValue={this.state.stateArray[i].data.ph}
                        value={this.state.stateArray[i].data.ph}
=======
                      onChange={(e) => handlePHChange(e, i)}
                      id={"ph"}
>>>>>>> a8ccdac77f8b7a47ef2a0db5e9b084921f0b02be
                      className="border-2"
                    />{" "}
                    <br />
                    <label>Cl</label> <br />
                    <input
<<<<<<< HEAD
                        onKeyDown={event => handleEnter(event)}
                      onChange={(e) => handleClChange(e, i)}
                      id={"cl"}
                        value={this.state.stateArray[i].data.cl}
                        className="border-2"
=======
                      onChange={(e) => handleClChange(e, i)}
                      id={"cl"}
                      className="border-2"
>>>>>>> a8ccdac77f8b7a47ef2a0db5e9b084921f0b02be
                    />{" "}
                    <br />
                    <label>Patrons On Deck</label> <br />
                    <input
<<<<<<< HEAD
                        onKeyDown={event => handleEnter(event)}
                      onChange={(e) => handlePodChange(e, i)}
                      id={"pod"}
                        value={this.state.stateArray[i].data.pod}

                        className="border-2"
=======
                      onChange={(e) => handlePodChange(e, i)}
                      id={"pod"}
                      className="border-2"
>>>>>>> a8ccdac77f8b7a47ef2a0db5e9b084921f0b02be
                    />{" "}
                    <br />
                    <label>Patrons in Pool</label> <br />
                    <input
<<<<<<< HEAD
                        onKeyDown={event => handleEnter(event)}
                      onChange={(e) => handlePipChange(e, i)}
                      id={"pip"}
                        value={this.state.stateArray[i].data.pip}

                        className="border-2"
=======
                      onChange={(e) => handlePipChange(e, i)}
                      id={"pip"}
                      className="border-2"
>>>>>>> a8ccdac77f8b7a47ef2a0db5e9b084921f0b02be
                    />{" "}
                    <br />
                    <label>Active Rescue</label> <br />
                    <input
<<<<<<< HEAD
                        onKeyDown={event => handleEnter(event)}
                      onChange={(e) => handleArChange(e, i)}
                        value={this.state.stateArray[i].data.ar}

                        id={"ar"}
=======
                      onChange={(e) => handleArChange(e, i)}
                      id={"ar"}
>>>>>>> a8ccdac77f8b7a47ef2a0db5e9b084921f0b02be
                      className="border-2"
                    />{" "}
                    <br />
                    <label>First-Aid</label> <br />
                    <input
<<<<<<< HEAD
                        onKeyDown={event => handleEnter(event)}
                      onChange={(e) => handleFaChange(e, i)}
                        value={this.state.stateArray[i].data.fa}

                        id={"fa"}
=======
                      onChange={(e) => handleFaChange(e, i)}
                      id={"fa"}
>>>>>>> a8ccdac77f8b7a47ef2a0db5e9b084921f0b02be
                      className="border-2"
                    />{" "}
                    <br />
                  </div>
                </div>
<<<<<<< HEAD
                  </>
=======
>>>>>>> a8ccdac77f8b7a47ef2a0db5e9b084921f0b02be
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
<<<<<<< HEAD
                    this.setState({
                      dataObject : Object.assign(
                          {},
                          this.state.dataObject,
                          {combinedChlorine: e.target.value}
                      )
                    })
                  }
                  className="border-2"
                  defaultValue={0}
                  value={this.state.dataObject?.combinedChlorine}

=======
                    this.setState({ combinedChlorine: e.target.value })
                  }
                  className="border-2"
>>>>>>> a8ccdac77f8b7a47ef2a0db5e9b084921f0b02be
                />{" "}
              </div>{" "}
              <div>
                <label>Cyanuric Acid:</label> <br />
                <input
                  onChange={(e) =>
<<<<<<< HEAD
                    this.setState( {dataObject : Object.assign(
                          {},
                          this.state.dataObject,
                          {cyanuricAcid: e.target.value})
                    })
                  }
                  className="border-2"
                  defaultValue={0}
                  value={this.state.dataObject?.cyanuricAcid}

=======
                    this.setState({ cyanuricAcid: e.target.value })
                  }
                  className="border-2"
>>>>>>> a8ccdac77f8b7a47ef2a0db5e9b084921f0b02be
                />{" "}
              </div>{" "}
              <div>
                <label>Alkalinity:</label> <br />
                <input
<<<<<<< HEAD
                    onChange={(e) =>
                        this.setState( {dataObject : Object.assign(
                              {},
                              this.state.dataObject,
                              {akalinity: e.target.value})
                        })
                    }
                    className="border-2"
                  defaultValue={0}
                  value={this.state.dataObject?.akalinity}

=======
                  onChange={(e) => this.setState({ akalinity: e.target.value })}
                  className="border-2"
>>>>>>> a8ccdac77f8b7a47ef2a0db5e9b084921f0b02be
                />{" "}
              </div>{" "}
              <div>
                <label>Calcium Hardness:</label> <br />
                <input
<<<<<<< HEAD
                  onChange={(e) => this.setState({
                    dataObject :
                        Object.assign(
                            {},
                            this.state.dataObject,
                            {calciumHardness: e.target.value}
                        )
                  })}
                  className="border-2"
                  defaultValue={0}
                  value={this.state.dataObject?.calciumHardness}

=======
                  onChange={(e) =>
                    this.setState({ calciumHardness: e.target.value })
                  }
                  className="border-2"
>>>>>>> a8ccdac77f8b7a47ef2a0db5e9b084921f0b02be
                />{" "}
              </div>
              <div>
                <label>LSI Calculation:</label> <br />
                <input
                  onChange={(e) =>
<<<<<<< HEAD
                      this.setState( {dataObject : Object.assign(
                            {},
                            this.state.dataObject,
                            {LSICalculation: e.target.value})
                      })
                  }
                  className="border-2"
                  defaultValue={0}

                  value={this.state.dataObject?.LSICalculation}
                />{" "}
              </div>
              <div className="container w-100 bg-white">
                {this.props.foundSubPoolRecord.images?.length > 0  ?
                    <h2 className="text-2xl" style={{fontSize: 24}}>Images Previously submitted:</h2>
                    :
                  null

                }
                {this.props.foundSubPoolRecord.images?.map((item,i) => (
                    <>
                      <div>
                        <img src={item.image} width={"100%"} height={"100%"}/>
                      </div>
                    </>
                ))}
              </div>
=======
                    this.setState({ LSICalculation: e.target.value })
                  }
                  className="border-2"
                />{" "}
              </div>
>>>>>>> a8ccdac77f8b7a47ef2a0db5e9b084921f0b02be
              <ImageUploader
                withIcon={true}
                buttonText="Choose images"
                onChange={onDrop}
                imgExtension={[".jpg", ".gif", ".png", ".gif", ".jpeg"]}
                maxFileSize={262144000}
                withPreview={true}
                withLabel={true}
              />
              <button
<<<<<<< HEAD
                onClick={(e) => handleUpload(e)}
=======
                onClick={handleUpload}
>>>>>>> a8ccdac77f8b7a47ef2a0db5e9b084921f0b02be
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
<<<<<<< HEAD
        </form>
=======
>>>>>>> a8ccdac77f8b7a47ef2a0db5e9b084921f0b02be
      </div>
    );
  }
}

export default ChemicalLogFormContainer;
