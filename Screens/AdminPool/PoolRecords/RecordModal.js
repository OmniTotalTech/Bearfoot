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
    responseData: {},
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
        case "dailyOperations":
          type = "Daily Operation";

          url = "/records-email/DO/Record/DailyOperations";
          console.log(this.props.data.data);
          data = this.props.data.data;

          break;
        case "ChemicalLog":
          type = "Chemical Log";

          url = "/records-email/";
          data = this.props.data;

          break;
        case "incidentReport":
          console.log(this.props.data.dataObject)
          type = "incidentReport";
          data = this.props.data.dataObject;
          url = "/records-email/ir/sensitive/admin";
          break;
        case "patientCare":
          type = "patientCare";
          data = this.props.data.dataObject;

          url = "/records-email/ir/sensitive/admin/other";
          break;
      }
      console.log(url);




      let body = {
        type: type,
        facility: this.props.data.pool_id.pool_name,
        date: this.props.data.date,
        emails: this.state.emails,
        data: data,
        images: images,
        dataObject: this.props.dataObject,
      };
      await api
        .post(url, body)
        .then((response) => {
          const data = response.data;
          console.log(response.data);
          this.setState({
            isButtonDisabled: false,
            responseData: response.data,
          });

          this.props.navigation.navigate("SuccessScreen");
        })
        .catch((error) => {
          const errorMsg = error.message;
          console.log(errorMsg);
          this.setState({ isButtonDisabled: false });
        });
    };

    const emailRegex = (estring) => {
      var re = /\S+@\S+\.\S+/;
      return re.test(estring);
    }
    return (
      <div className={"bg-black"}>
        <div className="grid grid-cols-3">
          <div className={"mx-4"}>
            <button
                className="bg-red-500 text-white px-4 py-2 rounded w-full text-center"
              onClick={handleClose}
            >
              Close
            </button>
          </div>
          <div></div>
          <div className={"mx-4"}>
            {" "}
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded w-full text-center"
              onClick={handleEmail}
            >
              Email
            </button>
          </div>{" "}
        </div>
        {this.state.isEmailOpen ? (
          <>
          <div className={"bg-white p-4"}>


            <h2 className="text-lg my-4">
              Enter an email address to send a copy of this report:
            </h2>
            <input
              className="border"
              onChange={(e) =>
                this.setState({ emailFormInput: e.target.value })
              }
            />
            <br/>
            {emailRegex(this.state.emailFormInput) ?(<button
                className="text-white bg-red-500 px-4 py-2 my-4 rounded"
                onClick={handleEmailSubmit}
            >
              Add Email
            </button>) : (<></>)}

            <div className="my-2">
              <div>
                {this.state.emails.length > 0 ? (
                  <>
                    <div className="my-2 text-lg">
                      (Click an email entry to remove from list)
                    </div>
                    {this.state.emails.map((item, i) => (
                      <>
                        <div
                          className="my-1"
                          onClick={() => handleEmailRemove(i)}
                        >
                          {i + 1} ) {item}
                        </div>
                      </>
                    ))}
                  </>

                ) : (
                  <div className="my-2 text-lg">Please Enter an email.</div>
                )}
              </div>
            </div>
            {this.state.responseData.success
              ? this.state.responseData.msg
              : this.state.responseData.msg}
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
          </div>
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

const viewControl = (type, data, updateStateFunc, props) => {
  switch (type) {
    case "MorningChecklist":
      return <InventoryModal data={data} />;
    case "EveningChecklist":
      return <InventoryModal data={data} />;
    case "OpeningTaskChecklist":
      return <TaskModal data={data} />;
    case "ClosingTaskChecklist":
      return <TaskModal data={data} />;
    case "dailyOperations":
      return <DailyOpModal data={data} />;
    case "ChemicalLog":
      return <ChemLogModal data={data} />;
    case "incidentReport":
      return (
        <SensitiveModal
          data={data}
          handleClose={props.handleClose}
          fetchReports={props.fetchReports}
        />
      );
    case "patientCare":
      return (
        <SensitiveModal2
          data={data}
          usf={updateStateFunc}
          handleClose={props.handleClose}
          fetchReports={props.fetchReports}
        />
      );
  }
};

const DailyOpModal = (data) => {
  console.log("datareceived",data.data)

  let doData = data.data;
// chlorine: ""
// isClosed: ""
// isOpen: ""
// ph: ""
// reason: ""
// reasonArray: Array []
// timeData: Object { timeNoticedH: "", timeNoticedM: "", timeNoticedAP: "", … }
// isOpenAP: ""
// isOpenH: ""
// isOpenM: ""
// timeCleanedAP: ""
// timeCleanedH: ""
// timeCleanedM: ""
// timeNoticedAP: ""
// timeNoticedH: ""
// timeNoticedM: ""
  return (
    <>
      <div className="p-4 my-8 bg-white mx-2">
        <div className="text-xl">
          <button className="p-4 bg-red-500 text-white text-xl">
            Pool : {data.data.pool_id.pool_name}
          </button>
        </div>

        <div className="text-sm">Date : {doData?.date}</div>


        <div className="text-xl">
          Submitted By : {data.data.user_id.name}
          <div className="text-md">Phone : {data.data.user_id.phone}</div>
        </div>
      </div>

      {/*FACILITY MANAGER SHIFTS*/}
      <div className="p-4 my-8 bg-white mx-2">

        <div className={"w-full bg-red-500 text-white"}>
          <h3 className={"bold text-2xl my-2 p-2"}>Facility Manager Shifts </h3>
        </div>

      <div className={"grid grid-cols-2 p-4"}>
        {doData.dataObject?.facilityManagers.map((item,i) => (
            <>
              <div>
                <div>
                  <h1 className={"text-xl"}>{i+1}) Name: {item.name == "" ? "No Name Found" : item.name}</h1>
                </div>
                <div className="grid grid-cols-2">
                  <div className={"my-2"}>
                    <div className="header bg-gray-400">
                      <h2 className="header-title">Start</h2>
                    </div>
                    <p>{item.timeData.startTimeH == "" ? "?" : item.timeData.startTimeH}
                      :
                      {item.timeData.startTimeM == "" ? "?" : item.timeData.startTimeM}
                      {" "}
                      {item.timeData.startTimeAP == "" ? "?" : item.timeData.startTimeAP}</p>
                  </div>
                  <div className={"my-2"}>
                    <div className="header bg-gray-400">
                      <h2 className="header-title">End</h2>
                    </div>
                    <p>{item.timeData.endTimeH  == "" ? "?" : item.timeData.endTimeH}
                      :
                      {item.timeData.endTimeM  == "" ? "?" : item.timeData.endTimeM}
                      {" "}
                      {item.timeData.endTimeAP  == "" ? "?" : item.timeData.endTimeAP }</p>
                  </div>
                </div>
              </div>
            </>
        ))}
        <div>
        </div>
        </div>
      </div>
      <div className="p-4 my-8 bg-white mx-2">

        <div className={"w-full bg-red-500 text-white"}>
          <h3 className={"bold text-2xl my-2 p-2"}>Head Guard Shifts </h3>
        </div>

        <div className={"grid grid-cols-2 p-4"}>
          {doData.dataObject?.headGuards.map((item,i) => (
              <>
                <div>
                  <div>
                    <h1 className={"text-xl"}>{i+1}) Name: {item.name == "" ? "No Name Found" : item.name}</h1>
                  </div>
                  <div className="grid grid-cols-2">
                    <div className={"my-2"}>
                      <div className="header bg-gray-400">
                        <h2 className="header-title">Start</h2>
                      </div>
                      <p>{item.timeData.startTimeH == "" ? "?" : item.timeData.startTimeH}
                        :
                        {item.timeData.startTimeM == "" ? "?" : item.timeData.startTimeM}
                        {" "}
                        {item.timeData.cstartTimeAP == "" ? "?" : item.timeData.startTimeAP}</p>
                    </div>
                    <div className={"my-2"}>
                      <div className="header bg-gray-400">
                        <h2 className="header-title">End</h2>
                      </div>
                      <p>{item.timeData.endTimeH  == "" ? "?" : item.timeData.endTimeH}
                        :
                        {item.timeData.endTimeM  == "" ? "?" : item.timeData.endTimeM}
                        {" "}
                        {item.timeData.endTimeAP  == "" ? "?" : item.timeData.endTimeAP }</p>
                    </div>
                  </div>
                </div>
              </>
          ))}
          <div>
          </div>
        </div>


      </div>




      <div className="p-4 my-8 bg-white mx-2">

        <div className={"w-full bg-red-500 text-white"}>
          <h3 className={"bold text-2xl my-2 p-2"}>Pool Closures </h3>
        </div>

          {doData.dataObject?.poolClosures.map((item,i) => (
              <>
                <div>
                  <h2 className={"bold text-xl my-2 p-2"}>Reasons for pool closure: </h2>
                  {item.reasonArray.map((subitem,j) => (
                      <>
                        <div className="text-md px-4 ">
                          {j+1}) - {subitem}
                        </div>
                      </>
                  ))}
                </div>
                <div className={"grid grid-cols-2 p-4 gap-2 my-4"}>



                  <div>
                      <h3 className={"bold text-xl my-2 p-2"}>Time Noticed </h3>
                      {`${item.timeData?.timeNoticedH == "" ? "?" : item.timeData.timeNoticedH} : ${item.timeData?.timeNoticedM == "" ? "?" : item.timeData.timeNoticedM}  ${item.timeData.timeNoticedAP == "" ? "?" : item.timeData.timeNoticedAP}`}
                  </div>
                  <div>
                    <h3 className={"bold text-xl my-2 p-2 mb-4"}>Time Cleaned </h3>
                    {`${item.timeData?.timeCleanedH == "" ? "?" : item.timeData.timeCleanedH} : ${item.timeData?.timeCleanedM == "" ? "?" : item.timeData.timeCleanedM}  ${item.timeData.timeNoticedAP == "" ? "?" : item.timeData.timeNoticedAP}`}
                  </div>
                  <div>
                    <h3 className={"bold text-xl my-2 p-2"}>Was the pool re-opened? </h3>
                    {`${item.timeData?.isOpenH == "" ? "?" : item.timeData.isOpenH} : ${item.timeData?.isOpenM == "" ? "?" : item.timeData.isOpenM}  ${item.timeData.isOpenAP == "" ? "?" : item.timeData.isOpenAP}`}
                  </div>
                  <div>
                    <h3 className={"bold text-xl my-2 p-2 mb-4"}> Was the pool cleaned? </h3>
                    {`${item.timeData?.timeCleanedH == "" ? "?" : item.timeData.timeCleanedH} : ${item.timeData?.timeCleanedM == "" ? "?" : item.timeData.timeCleanedM}  ${item.timeData.timeNoticedAP == "" ? "?" : item.timeData.timeNoticedAP}`}
                  </div>
                </div>
              </>
          ))}

        </div>
    </>
  );
};

const ChemLogModal = (data) => {
  return (
    <div className="md:m-4 bg-white">
      <div className="text-xl">Date : {data.data.date}</div>
      <div className="text-xl">Pool : {data.data.pool_id.pool_name}</div>
      <div className="text-xl">
        Specific Pool : {data.data.specificPool.subPoolName}
      </div>
      <div className="text-xl">
        Submitted By : {data.data.user_id.name}
        <div className="text-md">Phone : {data.data.user_id.phone}</div>
      </div>
      <div className={"bg-white"}>
      {data.data.dataObject ? (
        <div className="shadow-xl p-2 my-6">
          <div className="text-black text-lg p-4">
            Weekly Information Completed:
          </div>
          <div>
            <span className="font-bold">
              LSI Calculation :{" "}
              {data.data.dataObject.LSICalculation
                ? data.data.dataObject.LSICalculation
                : "None"}
            </span>
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
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 bg-white">
        {data.data.data.map((item) => (
          <>
            <div className="shadow-xl p-2">
              <div className="text-black text-xl">
                Time : <span className="font-bold"> {item.time}</span>
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
    <>
      <div className="container mx-auto p-1">
        <div className="text-2xl w-full my-8 mx-2">
          <span className="bg-red-500 shadow-xl w-full text-white px-4 py-2">
            Incident Report
          </span>
        </div>
        <div className="text-lg my-4 mx-2">
          <span className="bg-red-500 shadow-xl text-white px-4 py-2">
            Patron Information:
          </span>
        </div>
        <div className={"text-white"}>
        {data.data.dataObject.patronInfo.map((item,i) => (
            <>
              <div className="text-md  my-4 mx-2">
                <span className="">Name:</span> {item.name}
              </div>

              <div className="text-md my-4 mx-2">
                <span className="">Phone: {item.phone}</span>
              </div>
              <div className="text-md my-4 mx-2">
                Email: {item.email}
              </div>
            </>
        ))}
        </div>
        <div className="py-2">
          <div className="text-lg my-4 mx-2">
            <span className="bg-red-500 shadow-xl text-white px-4 py-2">
              Event Description:{" "}
            </span>
          </div>{" "}
          <div className="text-md  my-4 mx-2 text-white">
            {data.data.dataObject.eventDescription}
          </div>
          <div className="text-lg my-4 mx-2">
            <span className="bg-red-500 shadow-xl text-white px-4 py-2">
              Resolution Description:{" "}
            </span>
          </div>
          <div className="text-md px-4 text-white">{data.data.dataObject.resDescription}</div>
        </div>
      </div>
      <div>
        {data.data.isApproved ? (
          <div></div>
        ) : (
          <button
            onClick={() => handleApprove(data)}
            className="bg-red-500 text-white rounded px-4 py-2 w-11/12 my-4 mx-auto"
          >
            Approve
          </button>
        )}
      </div>
    </>
  );
};

const TitleSwitch = (val) => {

  switch(val){
    case "step1":
      return "Patron Information"
      break;
    case "step2":
      return "Incident Information"
      break;
    case "step3":
      return "Injury Information"
      break;
    case "step4":
      return "Rescue Information"
      break;
    case "step5":
      return "Witness Information"
      break;
    case "step6":
      return "Finalization"
      break;
    default:
      break;
  }
}

const QuestionSwitch = (val) => {
  switch(val){
    case "hospital":
      return "Did the patient go to the hospital?"
      break;
    case "hospitalName":
      return "Hospital Name"
      break;
    case "legalAdult":
      return "Is the patient a legal adult?"
      break;
    case "legalAdultName":
      return "Guardian Name"
      break;
    case "guardianPhone":
      return "Guardian's Phone: "
      break;
    case "detailedDescription":
      return "Description of Event:"
      break;
    case "detailedResolution":
      return "Resolution:"
      break;
    case "detailedTreatment":
      return "Treatment:"
      break;
    default:
      return val
      break;
  }
}

const SensitiveModal2 = (data) => {


  const handleApprove = async (data) => {
    let body = {
      _id: data.data._id,
      type: data.data.recordType,
    };
    await api
        .post("/records", body)
        .then((response) => {
          console.log(response.data);
          data.handleClose();
          data.fetchReports();
          this.props.navigation.navigate("SuccessScreen");
        })
        .catch((error) => {
          const errorMsg = error.message;
          console.log(errorMsg);
        });
  };

  const dataFormatter = (val) => {
  console.log(val)
    if(val != null | undefined && val.toString().includes("data:image/")){
      return (
          <>
            <img src={val} height={200} width={200} className={"bg-white"}/>
          </>
      )
    } else {
      return val
    }
  }

  const arrayFormatter = (key,array) => {
    console.log(key,array)

        if(key == 2){
          return (
              <>

                {array.map((item, i) => (
                    <>{item.checked ? (
                      <>
                        <div className={"my-4"}>
                          <h3>
                            <span className={"bg-red-500"}> Type </span> : {item.type}
                          </h3>
                          <h4>
                            <span className={"bg-red-500"}> Specific Details</span>: {item.value}
                            </h4>
                        </div>
                      </>
                    ) : (
                        <>
                        </>
                    )}
                      </>
                ))}
              </>
          )
        } else if(key == 3) {
          return (
              <>
              <h3>SAMPLE</h3>
                {array.map((item,i) => (
              <>
                <div className={"my-2"}>
                {item.letter} - {item.value}
                </div>
              </>
          ))}
              </>
          )
        }
         else {
          return (<>
            <div className="my-4">
            <h3>Name - {array.name}</h3>
            <h4>Phone - {array.phone}</h4>
            <h4>Address -{array.address}</h4>
            <h4>{array.city}</h4>
            <h4>{array.state}</h4>
            <h4>{array.zip}</h4>
            </div>
          </>)
        }
  }
  return (
    <div className="container mx-auto p-1">
      <div className={"w-full bg-red-500 text-white"}>
        <h2 className="text-3xl px-4">Patient Care Information</h2>
      </div>

      <div>
        {Object.keys(data.data.dataObject).map((item, i) => (
            <>
              <div>
                <div className={"w-full bg-red-500 text-white"}>
                  <h2 className="text-2xl px-4 my-4 text-white">
                    {TitleSwitch(item)}
                  </h2>
                </div>
                <div className={"px-8 py-2"}>
                {Object.keys(data.data.dataObject[item]).map((subItem,j) => (

                    <div>
                      <p className="text-xl text-red-400">{QuestionSwitch(subItem)}</p>
                      <p className="text-xl text-white">{typeof data.data?.dataObject[item][subItem] != "object" ? (<>
                          {dataFormatter(data.data.dataObject[item][subItem])}
                      </>
                      ):(<>
                      {arrayFormatter(i, data.data.dataObject[item][subItem]) }
                      </>)}</p>

                      <p className={"text-xl text-white"}>{typeof data.data?.dataObject[item][subItem] == "boolean" ? (
                          data.data?.dataObject[item][subItem] == true ? "Yes":"No"
                      ):(<></>)}</p>

                    </div>
                ))}
                </div>
              </div>
            </>
        ))}

      </div>
      <button
          onClick={() => handleApprove(data)}
          className="bg-red-500 text-white rounded px-4 py-2"
      >
        Approve
      </button>
    </div>

  );
};

const InventoryModal = (data, props) => {
  console.log(data.data);
  return (
    <div>
      <div className="my-8 bg-white">
        <div className="text-xl">Date : {data.data.date}</div>
        <div className="text-xl">Pool : {data.data.pool_id.pool_name}</div>
        <div className="text-xl">Time : {data.data.time}</div>

        <div className="text-xl">
          Submitted By : {data.data.user_id.name}
          <div className="text-md">Phone : {data.data.user_id.phone}</div>
        </div>
      </div>
      <div className={"w-full my-4 bg-red-500 text-white"}>
        <h2 className="text-3xl px-4">Inventory Checklist Recorded Information</h2>
      </div>
      <div className="bg-white">
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
    </div>
  );
};

const TaskModal = (data) => {
  console.log(data);

  return (
    <div className="container mx-auto overflow-scroll bg-white mx-auto">
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
