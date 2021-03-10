import React from "react";
import { Component } from "react";
import Modal from "react-modal";
import DailyChecklistDisabled from "../../../Components/DailyChecklistDisabled";
import api from "../../../utils/api";
class RecordModal extends Component {
  state = {
    isEmailOpen: false,
    emailFormInput: "",
    emails: [],
  };

  render() {
    const handleClose = () => {
      this.props.handleClose();
    };
    console.log(this.props);

    const handleEmail = () => {
      this.setState({ isEmailOpen: true });
    };

    const handleEmailSubmit = () => {
      var newEmails = this.state.emails;

      newEmails.push(this.state.emailFormInput);

      this.setState({ emails: newEmails });
    };

    const handleEmailRemove = (i) => {
      console.log(i);
      var newEmails = this.state.emails;

      newEmails.splice(i, 1);

      this.setState({ emails: newEmails });
    };

    const handleCompleteSubmit = async () => {
      var type;
      var data;
      var tempArray = [];
      var url = "";
      switch (this.props.type) {
        case "OpeningTaskChecklist":
          type = "Opening";
          for (var i = 0; i < this.props.data.data.length; i++) {
            tempArray.push({ task: this.props.data.data[i].text });
          }
          data = tempArray;
          url = "/records-email/TaskChecklist";
          break;
        case "ClosingTaskChecklist":
          type = "Opening";
          for (var i = 0; i < this.props.data.data.length; i++) {
            tempArray.push({ task: this.props.data.data[i].text });
          }
          data = tempArray;
          url = "/records-email/TaskChecklist";
          break;
      }

      let body = {
        type: type,
        facility: this.props.data.pool_id.pool_name,
        date: this.props.data.date,
        emails: this.state.emails,
        data: tempArray,
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
    };
    return (
      <div>
        <div className="grid grid-cols-3">
          <div>
            <button
              className="bg-red-500 text-white px-4 py-2 rounded"
              onClick={handleClose}
            >
              Close
            </button>
          </div>
          <div></div>
          <div>
            {" "}
            <button
              className="bg-red-500 text-white px-4 py-2 rounded"
              onClick={handleEmail}
            >
              Email
            </button>
          </div>{" "}
        </div>
        {this.state.isEmailOpen ? (
          <>
            <h2 className="text-lg my-4">
              Enter an email address to send a copy of this report:
            </h2>
            <input
              className="border"
              onChange={(e) =>
                this.setState({ emailFormInput: e.target.value })
              }
            />
            <button
              className="text-white bg-red-500 px-4 py-2 my-4 rounded"
              onClick={handleEmailSubmit}
            >
              Add Email
            </button>
            <div className="my-2">
              <div>
                {this.state.emails.length > 0 ? (
                  this.state.emails.map((item, i) => (
                    <div className="my-1" onClick={() => handleEmailRemove(i)}>
                      {i} ) {item}
                    </div>
                  ))
                ) : (
                  <div className="my-2">Please Enter an email.</div>
                )}
              </div>
            </div>
            <button
              className="text-white bg-red-500 px-4 py-2 my-4 rounded"
              onClick={handleCompleteSubmit}
            >
              Send Emails
            </button>
          </>
        ) : (
          <div></div>
        )}

        {viewControl(
          this.props.type,
          this.props.data.data,
          this.props._id,
          this.props
        )}
      </div>
    );
  }
}

const viewControl = (type, data, id, props) => {
  switch (type) {
    case "MorningChecklist":
      return <InventoryModal data={data} props={props} />;
    case "EveningChecklist":
      return <InventoryModal data={data} props={props} />;
    case "OpeningTaskChecklist":
      return <TaskModal data={data} />;
    case "ClosingTaskChecklist":
      return <TaskModal data={data} />;
    case "DailyOperations":
      return <InventoryModal data={data} />;
    case "ChemicalLog":
      return <InventoryModal data={data} />;
  }
};

const InventoryModal = (data, props) => {
  console.log(data);
  return (
    <div>
      {data.data.length > 0 ? (
        data.data.map((item, i) => (
          <>
            <div>
              <p className="text-lg">{item._id}</p>
              <p>{item.inStockAmt}</p>
            </div>
            <hr />
          </>
        ))
      ) : (
        <div></div>
      )}
    </div>
  );
};

const TaskModal = (data) => {
  console.log(data);

  return (
    <div className="container mx-auto overflow-scroll">
      <div className="text-2xl">Opening Checklist : </div>
      <DailyChecklistDisabled data={data} />
    </div>
  );
};
export default RecordModal;
