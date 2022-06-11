import React, { Component } from "react";
import TitleAndInput from "./TitleAndInput";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import parse from "html-react-parser";
import RichEditor from "./Admin/RichEditor";
import Modal from "react-modal";
import api from "../utils/api";
import Checkbox from "@material-ui/core/Checkbox";
import { connect } from "react-redux";
import { fetchEmployeesByOrg } from "../redux/actions/adminEmployeeManagement";
import ImageUploader from "react-images-upload";
import moment from 'moment'
import {
  SafeAreaView,
  Text,
  View,
  TouchableHighlight,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from "react-native";
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from "react-accessible-accordion";
import InvitedUser from "../Components/InvitedUser";
import { InformationSections } from "./General/InformationSections";
import ChecklistAdmin from "./ChecklistAdmin";
import ChecklistFormatter from "./ChecklistFormatter";
import * as events from "events";

class BasicInformation extends Component {
  state = {
    disableButton: false,
    newSubPoolString: "",
    responseMsg: "",
    hoasInPool: [{ userId: { organizations: [] } }],
  };
  constructor(props) {
    super(props);

    this.runHOAFunc = this.runHOAFunc.bind(this);
    this.runLoadAccordionData = this.runLoadAccordionData.bind(this);
    this.runHOAFuncHome = this.runHOAFuncHome.bind(this);
  }

  runLoadAccordionData = async () => {
    await api
      .get("/poolDetails/" + this.props.id)
      .then((response) => {
        console.log(response.data);
        this.setState({ accordionData: response.data });
      })
      .catch((error) => {
        const errorMsg = error.message;
      });
    await api
      .get("/subPools/" + this.props.id)
      .then((response) => {
        console.log(response);
        this.setState({ subPools: response.data });
      })
      .catch((error) => {
        const errorMsg = error.message;
      });
  };
  runHOAFunc = () => {
    this.setState({ hoaSearchString: "" });
    this.props.fetchEmployeesByOrg(
      this.props.user.organizations[0].orgName,
      "HOA" + "/" + this.state.hoaSearchString
    );
    this.setState({ addView: false, manageView: true });
  };

  runHOAFuncHome = async () => {
    console.log(this.props);
    await api
      .get("/hoa/" + this.props.id)
      .then((response) => {
        if (response.data.length > 0) {
          this.setState({ hoasInPool: response.data });
          console.log(response.data);
        }
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  addUserToHOA = async (id) => {
    let body = {
      poolId: id,
      assignedLocation: this.props.id,
    };

    await api
      .post("/hoa/", body)
      .then((response) => {
        this.setState({ responseMsg: response.data.message });
        console.log(response.data);
        this.runHOAFuncHome()
      })
      .catch((error) => {
        const errorMsg = error.message;
      });
  };

  state = {
    isDefault: true,
    pool_address: this.props.pool.pool_address,
    pool_state: this.props.pool.pool_state,
    pool_zip: this.props.pool.pool_zip,
    pool_name: this.props.pool.pool_name,
    pool_desc: this.props.pool.pool_desc,
    opening: false,
    closing: false,
    timeArray: [
      {
        time: "12am",
        checked: false,
      },
      {
        time: "1am",
        checked: false,
      },
      {
        time: "2am",
        checked: false,
      },
      {
        time: "3am",
        checked: false,
      },
      {
        time: "4am",
        checked: false,
      },
      {
        time: "5am",
        checked: false,
      },
      {
        time: "6am",
        checked: false,
      },
      {
        time: "7am",
        checked: false,
      },
      {
        time: "8am",
        checked: false,
      },
      {
        time: "9am",
        checked: false,
      },
      {
        time: "10am",
        checked: false,
      },
      {
        time: "11am",
        checked: false,
      },
      {
        time: "12pm",
        checked: false,
      },
      {
        time: "1pm",
        checked: false,
      },
      {
        time: "2pm",
        checked: false,
      },
      {
        time: "3pm",
        checked: false,
      },
      {
        time: "4pm",
        checked: false,
      },
      {
        time: "5pm",
        checked: false,
      },
      {
        time: "7pm",
        checked: false,
      },
      {
        time: "8pm",
        checked: false,
      },
      {
        time: "9pm",
        checked: false,
      },
      {
        time: "10pm",
        checked: false,
      },
      {
        time: "11pm",
        checked: false,
      },
    ],
    isNewPoolDetailModalOpen: false,
    pictures: [],
    accordionData: [],
  };

  async componentDidMount() {
    this.runHOAFuncHome();
    this.runLoadAccordionData();
  }


  render() {
    const handleSelectChange = async (value) => {

      this.setState({ searchValue: value });

      if (value == 0) {
        this.setState({ isDefault: true });
      } else {
        this.setState({ isDefault: false });
        await api
          .get("/chemTimes/" + this.props.id + "/" + value)
          .then((response) => {
            if (response.data.data.chemTimeData) {
              console.log(response.data);
              this.setState({ timeArray: response.data.data.chemTimeData });
            }
          })
          .catch((error) => {
            const errorMsg = error.messages;
          });
      }
    };
    const handleSaveLayout = async () => {
      let url = "/poolDetails/";
      let sad = this.state.accordionData;
      sad.forEach((item, i) => {
        item.position = i
      })
      console.log(sad)

      await api.put(url, sad)
        .then((response) => {
          console.log(response.data)
        })
        .catch(err => console.log(err.message))
    }
    const handleDeleteSubPool = async (id) => {
      let url = "/subPools/" + id;
      await api
        .delete(url)
        .then((response) => {
          api.get("/subPools/" + this.props.id).then((response) => {
            console.log(response);
            this.setState({ subPools: response.data });
            this.setState({ newSubPoolString: "" });
          });
        })
        .catch((error) => {
          const errorMsg = error.message;
        });
    };
    const handleDeletePool = async (id) => {
      let url = "/pool/" + id;
      await api
        .delete(url)
        .then((response) => {
          console.log(response);
          this.props.navigation.navigate("SuccessScreenAll");
        })
        .catch((error) => {
          const errorMsg = error.message;
        });
    };
    const onDrop = (picture) => {
      this.setState({
        pictures: this.state.pictures.concat(picture),
      });
    };
    const renderItem = ({ item }) => (
      <div style={{ margin: "10px" }}>
        <InvitedUser
          pic={item.profileImage}
          name={item.name}
          email={item.email}
        />
        <button
          className="bg-red-500 px-4 py-2 text-white rounded"
          onClick={() => this.addUserToHOA(item._id)}
        >
          Add HOA to Pool
        </button>
      </div>
    );
    const { text } = this.state;
    const handleSubmit = async () => {
      let body = {
        poolId: this.props.id,
        chemTimeData: this.state.timeArray,
        subPoolId: this.state.searchValue,
      };
      console.log(body);
      await api
        .post("/chemTimes/" + this.props.id, body)
        .then((response) => {
          console.log(response.data);
          this.setState({
            recMsg: "",
          });
        })
        .catch((error) => {
          const errorMsg = error.message;
          console.log(errorMsg);
          this.setState({ recMsg: "There was an error. Try again." });
        });
      await api
        .get("/chemTimes/" + this.props.id + "/" + this.state.searchValue)
        .then((response) => {
          this.setState({
            timeArray: response.data.data.chemTimeData,
            recMsg: "Saved. Thank you.",
          });
        })
        .catch((error) => {
          const errorMsg = error.message;
          this.setState({ recMsg: "There was an error. Try again." });
        });
    };
    const inputs = [
      {
        placeholder: "Address",
        title: "Address",
        value: "pool_address",
        defaultValue: this.props.pool.pool_address,
      },
      {
        placeholder: "State",
        title: "State",
        value: "pool_state",
        isState: true,
        defaultValue: this.props.pool.pool_state,
      },
      {
        placeholder: "00000",
        title: "Zip",
        value: "pool_zip",
        isZip: true,
        defaultValue: this.props.pool.pool_zip,
      },
      {
        placeholder: "Pool Name",
        title: "Pool Name",
        value: "pool_name",
        defaultValue: this.props.pool.pool_name,
      },
    ];

    const onChange = (e, value) => {
      this.setState({ [value]: e });
    };
    const handleDelete = async (id, type) => {
      console.log(this.props.pool);
      console.log("submitted", this.state.taskText);
      this.setState({ taskText: "" });
      this.setState({ taskText: "" });
      let url =
        "/dailyChecklist/delete/" + this.props.pool._id + "/" + id + "/" + type;
      await api
        .delete(url)
        .then((response) => {
          console.log(response);
          this.props.fetchDailyChecklist(this.props.id, type);
        })
        .catch((error) => {
          const errorMsg = error.message;
        });

      console.log(id);
    };
    const handleNewPoolDetailSubmit = async () => {
      let body = {
        poolId: this.props.id,
        headerText: this.state.headerText,
        bodyText: this.state.bodyText,
        images: this.state.pictures,
      };

      await api
        .post("/poolDetails/", body)
        .then((response) => {
          this.setState({
            timeArray: response.data.data.chemTimeData,
            recMsg: "Saved. Thank you.",
          });
        })
        .catch((error) => {
          const errorMsg = error.message;
          this.setState({ recMsg: "There was an error. Try again." });
        });
    };

    const handleNewPoolDetail = () => {
      this.setState({
        isNewPoolDetailModalOpen: !this.state.isNewPoolDetailModalOpen,
      });
    };

    const handlePoolDetailDelete = async (id) => {
      await api
        .delete("/poolDetails/" + id)
        .then((response) => {
          this.runLoadAccordionData();
        })
        .catch((error) => {
          const errorMsg = error.message;
          this.setState({ recMsg: "There was an error. Try again." });
        });
    };

    const inputsMap = (array) => {
      return array.map((item, i) => (
        <>
          <TitleAndInput
            key={i}
            item={item}
            onChange={(value, item) => onChange(value, item)}
          />

          <br />
        </>
      ));
    };

    const handleUpdatePoolInfo = async () => {
      console.log(this.state);

      let body = {
        pool_address: this.state.pool_address,
        pool_state: this.state.pool_state,
        pool_zip: this.state.pool_zip,
        pool_name: this.state.pool_name,
      };

      await api
        .patch("/pool/" + this.props.id, body)
        .then((response) => {
          this.props.navigation.navigate("SuccessScreenSpecial");
        })
        .catch((error) => {
          const errorMsg = error.message;
          this.setState({ recMsg: "There was an error. Try again." });
        });
    };

    const handleUpdatePosition = async (data) => {

    }

    const handleSubmitChecklist = async (type,text) => {


      let len = this.props.dailyChecklist.data.data.length
      if(len == undefined | null){
        len = 0
      }
      console.log(this.props.dailyChecklist.data)
      let body = {
        poolId: this.props.dailyChecklist.data.pool_id,
        type: type,
        data:
          {
            position: len,
            text: text
          }
      }

      console.log(body)
        // text: this.state.taskText,

      await api
          .patch
          ("/dailyChecklist/", body)
          .then((response) => {
            this.props.fetchDailyChecklist(this.props.id, type);
          })
          .catch((error) => {
            const errorMsg = error.message;
          });

    };
    const onAddingItem = async (val,i) => {

let timeArray = this.state.timeArray;

timeArray[i].checked = val

        this.setState({
          ...this.state,
          timeArray: timeArray
        })

      // handleSubmitChecklist();
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
          .post("uploadPoolDetails", data)
          .then(async (response) => {
            let body = {
              poolId: this.props.id,
              headerText: this.state.headerText,
              bodyText: this.state.bodyText,
              images: response.data.files,
              position: this.state.accordionData.length
            };

            await api
              .post("uploadPoolDetailsPart2", body)
              .then((response) => {
                this.setState({ isNewPoolDetailModalOpen: false });
                this.props.navigation.navigate("SuccessScreen");
              })
              .catch((error) => {
              });
          })
          .catch((error) => {
          });
      }

      this.setState({ pictures: [] });
    };
    const userInfoEmployeeMap = (
      <div>
        <FlatList
          data={this.props.adminEmployeeManagement.data.data}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      </div>
    );

    const handleSubPoolStateChange = async (value) => {
      this.setState({ newSubPoolString: value });
    };
    const updateState = (array) => {
      console.log(array)
      console.log(this.state)
      this.setState({
        accordionData: array
      })

      console.log(this.state)
    }
    const handleSubmitSubPool = async () => {
      let body = {
        poolId: this.props.id,
        subPoolName: this.state.newSubPoolString,
      };

      await api
        .post("/subPools/", body)
        .then((response) => {
          console.log("hereee")
          this.setState({ newSubPoolString: "" });

          api
            .get("/subPools/" + this.props.id)
            .then((response) => {
              console.log(response);
              this.setState({ subPools: response.data });

            })
            .catch((error) => {
              const errorMsg = error.message;
            });
        })
        .catch((error) => {
          const errorMsg = error.message;
        });

    };

    const handleDeleteHoa = async (pool, user, state) => {

      await api.delete(`/HOA/${state._id}`)
        .then((response) => {
          console.log("gonna try to reload")
          this.props.navigation.navigate("SuccessScreen")
        })
        .catch((error) => {
          console.log(error.message)
        })
      this.runHOAFuncHome()

    }

    return (
      <>
        <div>
          <div className="editor container max-w-lg mx-auto">
            <Accordion>
              <AccordionItem>
                <AccordionItemHeading>
                  <AccordionItemButton>
                    <button className="text bg-red-700  mb-4 px-4 py-2 w-11/12 rounded text-white text-xl">
                      Basic Information
                    </button>
                  </AccordionItemButton>
                </AccordionItemHeading>
                <AccordionItemPanel>
                  <div className="mx-auto align-left text-left container max-w-2xl shadow-md mx-4">
                    <div className="bg-white space-y-6 mt-4">
                      <div className=" space-y-4 md:space-y-0 w-full p-4 text-black ">
                        <h2 className="display-1">Pool Information</h2>
                        {inputsMap(inputs)}
                        <button
                          className="bg-red-500 text-white py-2 px-4"
                          onClick={handleUpdatePoolInfo}
                        >
                          Update Pool
                        </button>

                        {/* <p>{parse(text)}</p> */}
                        <h1 className=" text-xl ">Information Sections</h1>
                        <h2>
                          This is intended for information regarding operations at
                          your location.
                        </h2>
                        <button
                          className="bg-red-500 text-white p-4 rounded my-8!"
                          onClick={handleNewPoolDetail}
                        >
                          {" "}
                          + Add a New Section
                        </button>
                        <br/>
                        <br/>
                        <button
                          className="bg-blue-500 my-4 text-white p-4 rounded my-8!"
                          onClick={handleSaveLayout}
                        >
                          {" "}
                          + Save Layout Settings
                        </button>
                        <InformationSections state={this.state} updateState={(array) => updateState(array)} handlePoolDetailDelete={handlePoolDetailDelete} />
                        {/*  state = {*/}
                        {/*  disableButton: false,*/}
                        {/*  newSubPoolString: "",*/}
                        {/*  responseMsg: "",*/}
                        {/*  hoasInPool: [{ userId: { organizations: [] } }],*/}
                        {/*};*/}
                        <Modal
                          {...this.props}
                          ariaHideApp={false}
                          isOpen={this.state.isNewPoolDetailModalOpen}
                          style={{ width: "100%" }}
                        >
                          <button
                            className="text bg-gray-600 p-2 rounded text-white"
                            onClick={() => {
                              this.setState({ isNewPoolDetailModalOpen: false });
                            }}
                          >
                            close
                          </button>
                          <div className="w-full">
                            <div>
                              <label className="text-lg">Header:</label> <br />
                              <input
                                className="p-2 border"
                                onChange={(e) =>
                                  this.setState({ headerText: e.target.value })
                                }
                              />
                            </div>
                            <div>
                              <label className="text-lg w-full">Body:</label>{" "}
                              <br />
                              <div className="w-full">
                                <textarea
                                  rows={5}
                                  className="p-2 border w-full"
                                  onChange={(e) =>
                                    this.setState({ bodyText: e.target.value })
                                  }
                                />
                              </div>
                            </div>
                            <div>
                              <label className="text-lg">Images:</label> <br />
                              <ImageUploader
                                  withIcon={true}
                                  buttonText="Choose images"
                                  onChange={onDrop}
                                  imgExtension={[".jpg", ".gif", ".png", ".gif", ".jpeg"]}
                                  maxFileSize={1000000}
                                  withPreview={true}
                                  label="max file size: 1GB, Must be: JPG,PBG,GIF"
                                  withLabel={true}
                              />
                              {/* <button
                              onClick={handleUploadImages}
                              className="bg-red-500 text-white px-4 py-2 rounded  mx-auto"
                            >
                              Upload Image
                            </button> */}
                            </div >

                            <button
                              className="bg-red-500 px-4 py-2 text-white"
                              onClick={handleUpload}
                            >
                              Save
                            </button>
                          </div >
                        </Modal >
                      </div >
                    </div >
                  </div >
                </AccordionItemPanel >
              </AccordionItem > {" "}
              < AccordionItem >
                <AccordionItemHeading>
                  <AccordionItemButton>
                    <button className="text bg-red-700  mb-4 px-4 py-2 w-11/12 rounded text-white text-xl">
                      HOA Assignment
                    </button>
                  </AccordionItemButton>
                </AccordionItemHeading>
                <AccordionItemPanel>
                  <button
                    onClick={() => this.setState({ hoaModal: true })}
                    className="bg-red-500 text-white px-4 py-2 mb-4 rounded"
                  >
                    Add An HOA account to this Pool
                  </button>
                  <div>
                    {this.state.hoasInPool && this.state.hoasInPool.length > 0 ? (
                      <div className="container bg-white">
                        {this.state.hoasInPool.map((item, i) => (
                          <div className="my-2">
                            {i + 1})
                            <div className="text-md">
                              {item.poolId ? item.poolId.name : null}
                            </div>
                            <div className="text-md">
                              {item.poolId ? item.poolId.email : null}
                            </div>
                            <div className="text-md">
                              {item.poolId
                                ? item.poolId.organizations.map((item) => (
                                  <div>Organization : {item.orgName}</div>
                                ))
                                : null}
                              <button
                                onClick={() => {
                                  this.props.pool.pool_managers.includes(this.props.user.userId) | this.props.user.role > 2 ?
                                    handleDeleteHoa(this.props.pool, this.props.user, this.state.hoasInPool[i]) :
                                    (console.log(false))
                                }}
                                className="bg-red-500 text-white px-4 py-2 mb-4 rounded"
                              >
                                Remove HOA Account From {item.userId ? item.userId.name : null}
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div></div>
                    )}
                  </div>
                  <Modal
                    {...this.props}
                    ariaHideApp={false}
                    isOpen={this.state.hoaModal}
                    style={{ width: "100%" }}
                  >
                    <div className="container mx-auto max-w-2xl">
                      <div>
                        <button
                          className="bg-gray-500 px-4 py-2 text-white"
                          onClick={() => this.setState({ hoaModal: false })}
                        >
                          Close
                        </button>
                      </div>
                      <div>
                        <input
                          className="border-2 shadow-md my-2"
                          onChange={(e) =>
                            this.setState({ hoaSearchString: e.target.value })
                          }
                        />
                      </div>
                      <div>
                        <button
                          className="bg-red-500 px-4 py-2 text-white rounded"
                          onClick={this.runHOAFunc}
                        >
                          Search
                        </button>
                        <div>
                          {" "}
                          {this.state.responseMsg ? (
                            this.state.responseMsg
                          ) : (
                            <div></div>
                          )}
                        </div>
                      </div>
                      <div className="mx-auto container max-w-2xl shadow-md mx-4">
                        <View style={{ overflow: "scroll", maxHeight: "600px" }}>
                          {userInfoEmployeeMap}
                        </View>{" "}
                      </div>
                    </div>
                  </Modal>
                </AccordionItemPanel>
              </AccordionItem >
              <AccordionItem>
                <AccordionItemHeading>
                  <AccordionItemButton>
                    <button className="text bg-red-700  mb-4 px-4 py-2 w-11/12 rounded text-white text-xl">
                      Daily Logs Management
                    </button>
                  </AccordionItemButton>
                </AccordionItemHeading>
                <AccordionItemPanel>
                  <div className="container px-4 max-w-2xl mx-auto">
                    <p>
                      List of pools for your employees to fill paperwork for
                      daily.
                    </p>

                    {this.state.newSubPoolString &&
                      this.state.newSubPoolString.length > 3 ? (
                      <button
                        onClick={handleSubmitSubPool}
                        className="inline-flex text bg-red-700 px-2 py-1 mx-2 rounded text-white my-2"
                      >
                        Add
                      </button>
                    ) : (
                      <div>Enter your desired name:</div>
                    )}
                    <input
                      className="my-4 border-2 shadow-xl"
                      value={this.state.newSubPoolString}
                      onChange={(e) => handleSubPoolStateChange(e.target.value)}
                    />

                    <div className="">
                      {this.state.subPools && this.state.subPools.length > 0 ? (
                        <div>
                          <div className="text-lg">SubPools:</div>
                          {this.state.subPools.map((item, i) => (
                            <div className="m-2">
                              {i + 1}){item.subPoolName}{" "}
                              <button
                                className="bg-red-500 text-white rounded p-1 mx-4"
                                onClick={() => handleDeleteSubPool(item._id)}
                              >
                                Delete SubPool
                              </button>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className={"text-gray-600 bold mb-2"}>No subpools found</div>
                      )}{" "}
                    </div>
                  </div>
                </AccordionItemPanel>
              </AccordionItem>
              <AccordionItem>
                <AccordionItemHeading>
                  <AccordionItemButton>
                    <button className="text bg-red-700  mb-4 px-4 py-2 w-11/12 rounded text-white text-xl">
                      Checklist Management
                    </button>
                  </AccordionItemButton>
                </AccordionItemHeading>
                <AccordionItemPanel>
                  <div className="mx-auto  container bg-white max-w-2xl p-4 shadow-md mx-4 mb-4">
                    <div className=" space-y-6 mt-4 mb-4">
                      <p className="text-md max-w-md mx-auto">
                        Set the tasks you would like the employees of this pool to
                        complete every morning and evening.
                      </p>
                      <div className="">
                        <button
                          onClick={() => {
                            console.log(this.props.id),
                              this.setState({ opening: true }),
                              this.props.fetchDailyChecklist(
                                this.props.id,
                                "opening"
                              );
                          }}
                          className="text bg-red-700 p-2 mx-2 rounded text-white"
                        >
                          Opening
                        </button>
                        <button
                          onClick={() => (
                            console.log(this.props.id),
                            this.setState({ closing: true }),
                            this.props.fetchDailyChecklist(
                              this.props.id,
                              "closing"
                            )
                          )}
                          className="text bg-red-700 p-2 mx-2 rounded text-white"
                        >
                          Closing
                        </button>
                      </div>
                    </div>
                  </div>
                  <Modal
                    {...this.props}
                    ariaHideApp={false}
                    isOpen={this.state.opening}
                    style={{ width: "100%" }}
                  >
                    <button
                      className="text bg-gray-600 p-2 rounded text-white"
                      onClick={() => {
                        this.setState({ opening: false });
                      }}
                    >
                      close
                    </button>
                    {console.log("dailyChecklist",this.props.dailyChecklist)}
                    <ChecklistAdmin
                        checklistId={this.props.dailyChecklist.data?._id}
                        type={"opening"}
                        handleSubmitChecklist={handleSubmitChecklist}
                        fetchDailyChecklistOpening={() => this.props.fetchDailyChecklist(this.props.id,"opening")}
                        fetchDailyChecklistClosing={() => this.props.fetchDailyChecklist(this.props.id,"closing")}
                        dailyChecklist={ChecklistFormatter(this.props.dailyChecklist.data?.data)}
                    />
                  </Modal>
                  <Modal
                    {...this.props}
                    ariaHideApp={false}
                    isOpen={this.state.closing}
                    style={{ width: "100%" }}
                  >
                    <button
                      className="text bg-gray-600 p-2 rounded text-white"
                      onClick={() => {
                        this.setState({ closing: false });
                      }}
                    >
                      close
                    </button>

                    <ChecklistAdmin
                        checklistId={this.props.dailyChecklist.data?._id}
                        type={"closing"}
                        handleSubmitChecklist={handleSubmitChecklist}
                        fetchDailyChecklistOpening={() => this.props.fetchDailyChecklist(this.props.id,"opening")}
                        fetchDailyChecklistClosing={() => this.props.fetchDailyChecklist(this.props.id,"closing")}
                        dailyChecklist={ChecklistFormatter(this.props.dailyChecklist.data?.data)}
                    />
                  </Modal>
                </AccordionItemPanel>
              </AccordionItem>
              <AccordionItem>
                <AccordionItemHeading>
                  <AccordionItemButton>
                    <button className="text bg-red-700  mb-4 px-4 py-2 w-11/12 rounded text-white text-xl">
                      Chemical Log Management
                    </button>
                  </AccordionItemButton>
                </AccordionItemHeading>
                <AccordionItemPanel>
                  <div className="bg-white p-2 m-2">
                    <p>
                      List of pools for your employees to fill paperwork for
                      daily.
                    </p>
                    <p>(Times will not update until the NEXT calendar day, if you have already recorded a log for that day.)</p>


                    {this.state.newSubPoolString &&
                      this.state.newSubPoolString.length > 3 ? (
                      <button
                        onClick={handleSubmitSubPool}
                        className="inline-flex text bg-red-700 px-2 py-1 mx-2 rounded text-white my-2"
                      >
                        Add
                      </button>
                    ) : (
                      <div>Enter your desired name:</div>
                    )}
                    <input
                      className="my-4 border-2 shadow-xl"
                      value={this.state.newSubPoolString}
                      onChange={(e) => handleSubPoolStateChange(e.target.value)}
                    />

                    <div className="">
                      {this.state.subPools && this.state.subPools.length > 0 ? (
                        <div>
                          <div className="text-lg">SubPools:</div>
                          {this.state.subPools.map((item, i) => (
                            <div className="m-2">
                              {i + 1}){item.subPoolName}{" "}
                              <button
                                className="bg-red-500 text-white rounded p-1 mx-4"
                                onClick={() => handleDeleteSubPool(item._id)}
                              >
                                Delete SubPool
                              </button>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div>No subpools found</div>
                      )}{" "}
                    </div>
                    {this.state.subPools && this.state.subPools.length > 0 ? (
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
                        No Subpools Created Yet. You have to create at least one
                        subpool to add chemical log times to.
                      </div>
                    )}
                    {this.state.isDefault ? (
                      <div>Please select a subpool.</div>
                    ) : (
                      <>
                        <h2 className="text-xl p-2">
                          Please Choose the Hours to Check the chemical logs
                        </h2>
                        <div className="text-center grid grid-cols-3">
                          {/* {checkboxMap(this.state.timeArray)} */}
                          {this.state.timeArray.map((item, i) => (
                            <div key={i}>
                              <label className="inline-flex items-center mt-3">
                                <Checkboxes
                                  item={item}
                                  index={i}
                                  updateCheck={(val,index) => onAddingItem(val,index)}
                                />
                                <span className="ml-2 text-gray-700">
                                  {item.time}
                                </span>
                              </label>
                            </div>
                          ))}
                        </div>
                        <div className="w-full my-2">
                          <button
                            onClick={handleSubmit}
                            className="p-2 bg-red-500 text-white rounded m-2 align-right"
                          >
                            Save
                          </button>
                          {this.state.recMsg ? (
                            <div>{this.state.recMsg}</div>
                          ) : (
                            <div></div>
                          )}
                        </div>{" "}
                      </>
                    )}
                  </div>
                </AccordionItemPanel>
              </AccordionItem>
            </Accordion >
            {
              this.props.user.role > 4 ? (
                <div className="m-2">
                  <button
                    onClick={() => this.setState({ issueDropDown: true })}
                    className="text bg-red-700 p-2 mb-4 px-2 rounded text-white sm:w-full md:w-full text-xl"
                  >
                    Delete Pool
                  </button>
                  {this.state.issueDropDown ? (
                    <div>
                      {this.state.isSure ? (
                        <>
                          <div>
                            Cancel now if you did not intend to proceed, but the
                            next confirmation will delete this pool.
                          </div>
                          <button
                            onClick={() =>
                              this.setState({ isSure: false, issueDropDown: false })
                            }
                            className="bg-red-500 text-white rounded px-4 py-2 mx-1"
                          >
                            Cancel
                          </button>
                          <button
                            onClick={() => handleDeletePool(this.props.id)}
                            className="bg-red-500 text-white rounded px-4 py-2 mx-1"
                          >
                            Confirm Delete
                          </button>
                        </>
                      ) : (
                        <>
                          <div>
                            Deleting this pool will result in breaks from this
                            moment forward of the data collected, and the data
                            binded to this pool. It is always better to retire a
                            pool, and no longer use it, than to break the record.
                            However, if you wish to proceed, you acknowledge this
                            risk.
                          </div>
                          <button
                            onClick={() => this.setState({ isSure: true })}
                            className="bg-red-500 text-white rounded px-4 py-2"
                          >
                            Continue.{" "}
                          </button>
                        </>
                      )}
                    </div>
                  ) : (
                    <div></div>
                  )}
                </div>
              ) : null
            }

            < div className="max-w-2xl pt-4 mx-auto" >
              {/* <CKEditor
              editor={ClassicEditor}
              data={text}
              onChange={(e, editor) => {
                const data = editor.getData();
                this.setState({ text: data });
              }}
            /> */}
            </div >
          </div >
        </div >
      </>
    );
  }
}
class Checkboxes extends Component {

  render() {
  console.log("herebi", this.props)


    const handleChange = async (event) => {
      await this.props.updateCheck(event.target.checked,this.props.index);
    };

    return (
        <div>
          <Checkbox
              checked={this.props.item.checked}
              onChange={handleChange}
              inputProps={{ "aria-label": "primary checkbox" }}
          />
        </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
    adminEmployeeManagement: state.adminEmployeeManagement,
  };
};

const mapDisptachToProps = (dispatch) => {
  return {
    fetchEmployeesByOrg: (orgName, string) =>
      dispatch(fetchEmployeesByOrg(orgName, string)),
  };
};

export default connect(mapStateToProps, mapDisptachToProps)(BasicInformation);
