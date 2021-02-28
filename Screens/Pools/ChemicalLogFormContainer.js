import React, { Component } from "react";
import moment from "moment";

class ChemicalLogFormContainer extends Component {
  componentWillReceiveProps(nextProps) {
    for (const index in nextProps) {
      if (nextProps[index] !== this.props[index]) {
        console.log(index, this.props[index], "==>", nextProps[index]);
        if (nextProps.timeArray.length > 0) {
          console.log("true");
          this.setState({ stateArray: this.loadProps(nextProps) });
        }
      }
    }
  }

  loadProps = (props) => {
    console.log(this.props.timeArray);
    let newArray = [];
    console.log(props);
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
    console.log(newArray);

    return newArray;
    //   this.setState({ formObjectArray: newArray });
  };
  //   const [formObjectArray, setFormObjectArray] = React.useState([]);
  state = { stateArray: [] };
  render() {
    const handleSubmit = () => {
      console.log("hit submit");
      const date = new Date();
      const nowDate = moment(date);
      const formattedDate = nowDate.format("YYYY-MM-DD");

      let body = {
        data: this.state.stateArray,
        pool_id: this.props.id,
        recordType: "ChemicalLog",
        specificPool: "",
        user_id: this.props.user._id,
        date: formattedDate,
      };

      this.props.onSubmit(body);
    };
    const handlePHChange = (e, i) => {
      let stateArray = this.state.stateArray;

      let newData = this.state.stateArray[i].data;
      newData.ph = e.target.value;
      stateArray[i].data = newData;

      this.setState({ stateArray: stateArray });
      console.log(this.state);
    };

    const handleClChange = (e, i) => {
      let stateArray = this.state.stateArray;

      let newData = this.state.stateArray[i].data;
      newData.cl = e.target.value;
      stateArray[i].data = newData;

      this.setState({ stateArray: stateArray });
      console.log(this.state);
    };

    const handlePodChange = (e, i) => {
      let stateArray = this.state.stateArray;

      let newData = this.state.stateArray[i].data;
      newData.pod = e.target.value;
      stateArray[i].data = newData;

      this.setState({ stateArray: stateArray });
      console.log(this.state);
    };
    const handlePipChange = (e, i) => {
      let stateArray = this.state.stateArray;

      let newData = this.state.stateArray[i].data;
      newData.pip = e.target.value;
      stateArray[i].data = newData;

      this.setState({ stateArray: stateArray });
      console.log(this.state);
    };
    const handleArChange = (e, i) => {
      let stateArray = this.state.stateArray;
      let newData = this.state.stateArray[i].data;
      newData.ar = e.target.value;
      stateArray[i].data = newData;

      this.setState({ stateArray: stateArray });
      console.log(this.state);
    };

    const handleFaChange = (e, i) => {
      let stateArray = this.state.stateArray;
      let newData = stateArray[i].data;

      newData.fa = e.target.value;
      stateArray[i].data = newData;

      this.setState({ stateArray: stateArray });
      console.log(this.state);
    };
    return (
      <div className="overflow-scroll">
        <div>
          <p className="text-lg p-4 my-2 text-black">Chemical Log Page</p>
        </div>
        <div className="grid grid-cols-2 text-center mx-1">
          {this.state.stateArray.length > 0 ? (
            this.state.stateArray.map((item, i) => (
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
            ))
          ) : (
            <div></div>
          )}
        </div>
        <button onClick={handleSubmit} className="text-white bg-red-500 p-4">
          Submit
        </button>
      </div>
    );
  }
}

export default ChemicalLogFormContainer;
