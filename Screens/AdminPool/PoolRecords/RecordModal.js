import React from "react";
import { Component } from "react";
import DailyChecklistDisabled from "../../../Components/DailyChecklistDisabled";
import api from "../../../utils/api";
class RecordModal extends Component {
  constructor(props) {
    super(props);
  }
  state = {
    isEmailOpen: false,
    emailFormInput: "",
    emails: [],
    isButtonDisabled: false,
  };

  render() {
    const handleClose = () => {
      this.props.handleClose();
    };

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
      console.log("SUBMITTED");
      this.setState({ isButtonDisabled: true });
      var type;
      var data;
      var tempArray = [];
      var placeholder = [];
      var url = "";
      var images = [];
      console.log(this.props.type);

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
          type = "Closing";
          for (var i = 0; i < this.props.data.data.length; i++) {
            tempArray.push({ task: this.props.data.data[i].text });
          }
          images = this.props.data.images;
          console.log(images);
          data = tempArray;
          url = "/records-email/TaskChecklist";
          break;
        case "MorningChecklist":
          type = "Morning";
          console.log(this.props.data);
          for (var i = 0; i < this.props.data.data.length; i++) {
            tempArray.push({
              item: this.props.data.data[i].name,
              inStockAmt: this.props.data.data[i].inStockAmt,
            });
          }

          data = tempArray;
          url = "/records-email/InventoryChecklist/Morning";
          break;
        case "EveningChecklist":
          type = "Evening";
          for (var i = 0; i < this.props.data.data.length; i++) {
            tempArray.push({
              item: this.props.data.data[i].name,
              inStockAmt: this.props.data.data[i].inStockAmt,
            });
          }

          data = tempArray;
          url = "/records-email/InventoryChecklist/Evening";
          break;
        case "dailyOperationsAM":
          type = "AM";

          url = "/records-email/DO/Record/DailyOperations/AM";
          console.log(this.props.data.data);
          data = this.props.data.data;
          break;
        case "dailyOperationsPM":
          type = "PM";

          url = "/records-email/DO/Record/DailyOperations/PM";
          break;
        case "incidentReport":
          type = "incidentReport";

          url = "/records-email/ir/sensitive/admin";
          break;
      }

      let body = {
        type: type,
        facility: this.props.data.pool_id.pool_name,
        date: this.props.data.date,
        emails: this.state.emails,
        data: data,
        images: images,
        dataObject: this.props.dataObject,
      };
      console.log(body);
      await api
        .post(url, body)
        .then((response) => {
          const data = response.data;
          this.props.handleClose();
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
                      {i + 1} ) {item}
                    </div>
                  ))
                ) : (
                  <div className="my-2">Please Enter an email.</div>
                )}
              </div>
            </div>
            <button
              className="text-white bg-red-500 px-4 py-2 my-4 rounded"
              disabled={this.state.isButtonDisabled}
              onClick={handleCompleteSubmit}
            >
              {this.state.isButtonDisabled ? (
                <div>Sending...</div>
              ) : (
                <div>Send Emails</div>
              )}
            </button>
          </>
        ) : (
          <div></div>
        )}

        {viewControl(
          this.props.type,
          this.props.data,
          this.props.updateState,
          this.props
        )}
      </div>
    );
  }
}

const viewControl = (type, data, updateStateFunc) => {
  console.log(data);
  switch (type) {
    case "MorningChecklist":
      return <InventoryModal data={data} />;
    case "EveningChecklist":
      return <InventoryModal data={data} />;
    case "OpeningTaskChecklist":
      return <TaskModal data={data} />;
    case "ClosingTaskChecklist":
      return <TaskModal data={data} />;
    case "dailyOperationsAM":
      return <DailyOpModal data={data} />;
    case "dailyOperationsPM":
      return <DailyOpModal data={data} />;
    case "ChemicalLog":
      return <ChemLogModal data={data} />;
    case "patientCare":
      return <SensitiveModal data={data} />;
    case "incidentReport":
      return <SensitiveModal2 data={data} usf={updateStateFunc} />;
  }
};

const DailyOpModal = (data) => {
  return (
    <>
      <div className="p-1 my-8">
        <div className="text-xl">Date : {data.data.date}</div>
        <div className="text-xl">Pool : {data.data.pool_id.pool_name}</div>

        <div className="text-xl">
          Submitted By : {data.data.user_id.name}
          <div className="text-md">Phone : {data.data.user_id.phone}</div>
        </div>
      </div>
      {data.data.data.map((item) => (
        <div>
          <div className="text-xl">
            Facility Manager : {item.facilityManager}
          </div>
          <div className="text-xl">Shift Hours : {item.shiftHours}</div>
          <div className="text-xl">Head Guard : {item.headGuard}</div>
          <div className="text-xl">
            Shift Guard Hours : {item.shiftGuardHours}
          </div>
          <div className="text-2xl my-4 ">
            If any pools were closed for any reason, you will find it here:
          </div>{" "}
          <div className="text-2xl my-4 ">
            <div className="text-xl">
              Vomit :{" "}
              {item.vomit ? (
                <div className="text-red-500">Yes</div>
              ) : (
                <div className="text-green-500">No</div>
              )}{" "}
            </div>
            <div className="text-xl">
              Fecal :{" "}
              {item.fecal ? (
                <div className="text-red-500">Yes</div>
              ) : (
                <div className="text-green-500">No</div>
              )}{" "}
            </div>
            <div className="text-xl">
              Weather :{" "}
              {item.closedweather ? (
                <div className="text-red-500">Yes</div>
              ) : (
                <div className="text-green-500">No</div>
              )}{" "}
            </div>
            <div className="text-xl">
              Pool Clarity :{" "}
              {item.poolClarity ? (
                <div className="text-red-500">Yes</div>
              ) : (
                <div className="text-green-500">No</div>
              )}
            </div>{" "}
            <div className="text-xl">
              Lightning :{" "}
              {item.lightning ? (
                <div className="text-red-500">Yes</div>
              ) : (
                <div className="text-green-500">No</div>
              )}{" "}
            </div>
            <div className="text-xl">
              Heavy Rain :{" "}
              {item.heavyRain ? (
                <div className="text-red-500">Yes</div>
              ) : (
                <div className="text-green-500">No</div>
              )}{" "}
            </div>
            <div className="text-xl">
              Thunder :{" "}
              {item.thunder ? (
                <div className="text-red-500">Yes</div>
              ) : (
                <div className="text-green-500">No</div>
              )}{" "}
            </div>
            <div className="text-xl">
              Other :{" "}
              {item.other ? (
                <div className="text-red-500">Yes</div>
              ) : (
                <div className="text-green-500">No</div>
              )}{" "}
            </div>
          </div>
          <div className="text-xl">Weather : {item.weather}</div>
          <div className="text-xl">Shift Notes : {item.shiftNotes}</div>
          <div className="text-xl">Pools : {item.pools}</div>
          <div className="text-xl">Reason : {item.reason}</div>
          <div className="text-xl">Time Noticed : {item.timeNoticed}</div>
          <div className="text-xl">Time Closed : {item.timeClosed}</div>
          <div className="text-xl">Time Cleaned : {item.timeCleaned}</div>
          <div className="text-xl">Time Closed : {item.ph}</div>
          <div className="text-xl">Time Cleaned : {item.chlorine}</div>
        </div>
      ))}
    </>
  );
};

const ChemLogModal = (data) => {
  return (
    <div className="md:m-4">
      <div className="text-xl">Date : {data.data.date}</div>
      <div className="text-xl">Pool : {data.data.pool_id.pool_name}</div>
      <div className="text-xl">
        Specific Pool : {data.data.specificPool.subPoolName}
      </div>
      <div className="text-xl">
        Submitted By : {data.data.user_id.name}
        <div className="text-md">Phone : {data.data.user_id.phone}</div>
      </div>
      {data.data.dataObject ? (
        <div className="shadow-xl p-2 my-6">
          <div className="text-black text-lg p-4">
            Weekly Information Completed:
            <div>
              <span className="font-bold">
                LSI Calculation :{" "}
                {data.data.dataObject.LSICalculation
                  ? data.data.dataObject.LSICalculation
                  : "None"}
              </span>
            </div>
          </div>
          <div>
            <span className="font-bold">
              Alkalinity :{" "}
              {data.data.dataObject.akalinity
                ? data.data.dataObject.akalinity
                : "None"}
            </span>
          </div>{" "}
          <div>
            <span className="font-bold">
              Calcium Hardness :{" "}
              {data.data.dataObject.calciumHardness
                ? data.data.dataObject.calciumHardness
                : "None"}
            </span>
          </div>{" "}
          <div>
            <span className="font-bold">
              Combined Chlorine :{" "}
              {data.data.dataObject.combinedChlorine
                ? data.data.dataObject.combinedChlorine
                : "None"}
            </span>
          </div>{" "}
          <div>
            <span className="font-bold">
              Cyanuric Acid :{" "}
              {data.data.dataObject.cyanuricAcid
                ? data.data.dataObject.cyanuricAcid
                : "None"}
            </span>
          </div>{" "}
        </div>
      ) : (
        <div className="shadow-xl p-2 text-xl">
          {" "}
          Weekly Information Completed:
          <div className="text-md">
            No weekly information was gathered today
          </div>
        </div>
      )}
      <div className="grid grid-cols-1 md: grid-cols-3">
        {data.data.data.map((item) => (
          <>
            <div className="shadow-xl p-2">
              <div className="text-black text-xl">
                Time Submitted : <span className="font-bold"> {item.time}</span>
              </div>
              <div className="text-black text-lg">
                pH : <span className="font-bold"> {item.data.ph}</span>
              </div>
              <div className="text-black text-lg">
                Chlorine : <span className="font-bold"> {item.data.cl}</span>
              </div>
              <div className="text-black text-lg">
                People in Pool :
                <span className="font-bold"> {item.data.pip}</span>
              </div>
              <div className="text-black text-lg">
                People On Deck :{" "}
                <span className="font-bold">{item.data.pip}</span>
              </div>
              <div className="text-black text-lg">
                Active Rescue :{" "}
                <span className="font-bold"> {item.data.ar}</span>
              </div>
            </div>
          </>
        ))}
      </div>
      <div className="my-4">Images:</div>
      <div className="grid grid-cols-2">
        {data.data.images.length > 0 ? (
          data.data.images.map((item, i) => (
            <div>
              <span className="font-bold">Image {i + 1}) </span>
              <img src={item.image} style={{ maxHeight: 500 }} />
            </div>
          ))
        ) : (
          <div>No images Attached for this report</div>
        )}
      </div>
    </div>
  );
};

const SensitiveModal = (data) => {
  console.log(data);

  return (
    <div className="container mx-auto p-1">
      <div className="text-lg my-4 mx-2">
        <span className="bg-red-500 shadow-xl text-white px-4 py-2">
          Patient Information:
        </span>
      </div>
      <div className="text-md  my-4 mx-2">
        <span className="">Name:</span> {data.data.dataObject.patronName}
      </div>

      <div className="text-md my-4 mx-2">
        <span className="">Phone: {data.data.dataObject.patronPhone}</span>
      </div>
      <div className="text-md my-4 mx-2">
        Email: {data.data.dataObject.patronEmail}
      </div>

      <div className="py-2">
        <div className="text-lg my-4 mx-2">
          <span className="bg-red-500 shadow-xl text-white px-4 py-2">
            Event Description:{" "}
          </span>
        </div>{" "}
        <div className="text-sm py-2">
          {data.data.dataObject.eventDescription}
        </div>
        <div className="text-lg my-4 mx-2">
          <span className="bg-red-500 shadow-xl text-white px-4 py-2">
            Resolution Description:{" "}
          </span>
        </div>
        <div className="text-sm">{data.data.dataObject.resDescription}</div>
      </div>
    </div>
  );
};

const SensitiveModal2 = (data) => {
  console.log(data);
  let tempValue = Object.keys(data.data.dataObject);
  let tempValue2 = Object.values(data.data.dataObject);
  let checkData = (term) => {
    if (
      term.includes("patient") ||
      term.includes("witness") ||
      term.includes("hospital")
    ) {
      return true;
    }

    switch (term) {
      case "ems":
      case "hospital":
      case "legalAdult":
      case "location":
      case "injured":
      case "detailedDescription":
      case "detailedTreatment":
      case "detailedResolution":
      case "reportFilerName":
      case "filerSignature":
      case "managerName":
      case "manFilerSignature":
      case "supName":
      case "supFilerSignature":
        return true;
      default:
        return false;
    }
  };
  //OH BOY WHAT DO YOU KNOW A FOR LOOP IN A FOR LOOP WHAT ARE THE ODDS///
  let renderArray = [];
  for (var i = 0; i < tempValue.length; i++) {
    if (checkData(tempValue[i])) {
      let body = { [tempValue[i]]: tempValue2[i] };
      renderArray.push(body);
    }
  }

  const realData = data.usf(renderArray);
  console.log(realData);

  // this.setState({ format: realData });

  // var count = (temp.match(/is/g) || []).length;
  let renderValues = (item) => {
    if (item.includes("patient")) {
      return item.replace("patient", "Patient ");
    }

    if (item.includes("witness")) {
      return item.replace("witness", "Witness ");
    }

    if (item.includes("detailed")) {
      return item.replace("detailed", "Detailed ");
    }

    switch (item) {
      case "ems":
        return "Was the ems called?";
      case "hospital":
        return "Were they take to a hospital?";
      case "hospitalName":
        return "Where were they taken?";
      case "legalAdult":
        return "Is the patient a legal adult?";
      case "location":
        return "Where on the property did this happen?";
      case "injured":
        return "Was the patient injured?";
      case "reportFilerName":
        return "Report Filer";
      case "filerSignature":
        return "Filer Signature";
      case "managerName":
        return "Report Filer";
      case "manFilerSignature":
        return "Manager Signature";
      case "supName":
        return "Report Filer";
      case "supFilerSignature":
        return "Supervisor Signature";
      default:
        return null;
    }
  };
  let renderKeys = (item) => {
    switch (typeof item[0]) {
      case "boolean":
        if (item[0]) {
          return "Yes";
        } else {
          return "No";
        }
      case "string":
        if (item[0].includes("data:image/png;base64")) {
          return (
            <div>
              <img src={item[0]} />
            </div>
          );
        }
      default:
        return item[0];
    }
  };
  return (
    <div className="container mx-auto p-1">
      <div className="text-lg my-4 mx-2">
        <span className="px-4 py-2">Incident Report Information:</span>
      </div>
      <div className="p-4">
        <div className="my-8">
          <div className="text-xl">Date : {data.data.date}</div>
          <div className="text-xl">Pool : {data.data.time}</div>

          {data.data.pool_id != null ? (
            <>
              <div className="text-xl">
                Pool : {data.data.pool_id.pool_name}
              </div>
              <div className="text-xl">
                Submitted By : {data.data.user_id.name}
                <div className="text-md">Phone : {data.data.user_id.phone}</div>
              </div>
            </>
          ) : (
            <div></div>
          )}
        </div>
      </div>
      <div></div>
      {renderArray.map((item) => (
        <>
          <div className="p-4">
            <div className="text-bold text-lg">
              {renderValues(Object.keys(item).toString())}
            </div>
            <hr />

            <div>{renderKeys(Object.values(item))}</div>
          </div>
        </>
      ))}
    </div>
  );
};

const InventoryModal = (data, props) => {
  console.log(data.data);
  return (
    <div>
      <div className="my-8">
        <div className="text-xl">Date : {data.data.date}</div>
        <div className="text-xl">Pool : {data.data.pool_id.pool_name}</div>
        <div className="text-xl">Time : {data.data.time}</div>

        <div className="text-xl">
          Submitted By : {data.data.user_id.name}
          <div className="text-md">Phone : {data.data.user_id.phone}</div>
        </div>
      </div>
      {data.data.data.length > 0 ? (
        data.data.data.map((item, i) => (
          <>
            <div className="my-4">
              <p className="text-lg">
                <span className="text-xl">Item : </span>
                {item.name}
              </p>
              <p>
                <span className="text-xl">In Stock : </span>
                {item.inStockAmt}
              </p>
            </div>
            <hr />
          </>
        ))
      ) : (
        <div>
          Sorry, this record didn't load, or has no information. Check again
          later.
        </div>
      )}
    </div>
  );
};

const TaskModal = (data) => {
  console.log(data);

  return (
    <div className="container mx-auto overflow-scroll">
      <div className="my-8">
        <div className="text-xl">Date : {data.data.date}</div>
        <div className="text-xl">Pool : {data.data.pool_id.pool_name}</div>
        <div className="text-xl">Time : {data.data.time}</div>

        <div className="text-xl">
          Submitted By : {data.data.user_id.name}
          <div className="text-md">Phone : {data.data.user_id.phone}</div>
        </div>
      </div>
      <div className="text-2xl">Opening Checklist : </div>
      <DailyChecklistDisabled data={data.data} />
    </div>
  );
};
export default RecordModal;
