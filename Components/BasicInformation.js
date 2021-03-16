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

class BasicInformation extends Component {
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
  };
  runHOAFunc = () => {
    this.props.fetchEmployeesByOrg(
      this.props.user.organizations[0].orgName,
      "HOA" + "/" + this.state.hoaSearchString
    );
    this.setState({ addView: false, manageView: true });
  };

  runHOAFuncHome = async () => {
    await api
      .get("/hoa/" + this.props.id)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  addUserToHOA = async (id) => {
    let body = {
      userId: id,
      assignedLocation: this.props.id,
    };

    await api
      .post("/hoa/", body)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        const errorMsg = error.message;
      });
  };

  state = {
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
        time: "6pm",
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
    await api
      .get("/chemTimes/" + this.props.id)
      .then((response) => {
        console.log(response.data);
        if (
          response.data.data.chemTimeData &&
          response.data.data.chemTimeData.length > 0
        ) {
          this.setState({ timeArray: response.data.data.chemTimeData });
        }
      })
      .catch((error) => {
        const errorMsg = error.message;
      });
    this.runHOAFuncHome();
    this.runLoadAccordionData();
  }

  render() {
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
        <button onClick={() => this.addUserToHOA(item._id)}>
          Add HOA to Pool
        </button>
      </div>
    );
    const { text } = this.state;
    const handleSubmit = async () => {
      let body = {
        poolId: this.props.id,
        chemTimeData: this.state.timeArray,
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
        .get("/chemTimes/" + this.props.id)
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
    const handleDelete = (id) => {
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
          this.props.navigation.navigate("SuccessScreen");
        })
        .catch((error) => {
          const errorMsg = error.message;
          this.setState({ recMsg: "There was an error. Try again." });
        });
    };

    const handleSubmitChecklist = async (type) => {
      console.log("submitted", this.state.taskText);
      console.log(type);
      let body = {
        pool_id: this.props.id,
        checklistType: type,
        text: this.state.taskText,
      };
      this.setState({ taskText: "" });

      await api
        .post("/dailyChecklist/", body)
        .then((response) => {
          console.log(response);
          this.props.fetchDailyChecklist(this.props.id, type);
        })
        .catch((error) => {
          const errorMsg = error.message;
        });
      this.setState({ taskText: "" });
    };

    const handleChecklistInput = (e) => {
      this.setState({ taskText: e.target.value });
    };
    const onAddingItem = async (i) => {
      this.setState((state, props) => {
        state.timeArray[i].checked = !state.timeArray[i].checked;
      });

      console.log(this.state);
      handleSubmitChecklist();
    };

    const handleUpload = async () => {
      console.log(this.props.navigation);
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
            console.log(response.data);
            let body = {
              poolId: this.props.id,
              headerText: this.state.headerText,
              bodyText: this.state.bodyText,
              images: response.data.files,
            };

            await api
              .post("uploadPoolDetailsPart2", body)
              .then((response) => {
                this.setState({ isNewPoolDetailModalOpen: false });
                this.props.navigation.navigate("SuccessScreen");
                console.log(response);
              })
              .catch((error) => {
                console.log(error.message);
              });
          })
          .catch((error) => {
            console.log(error);
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

    return (
      <div>
        <div className="editor">
          <Accordion>
            <AccordionItem>
              <AccordionItemHeading>
                <AccordionItemButton>
                  <button className="inline-flex text bg-red-700 p-2 rounded text-white">
                    Basic Information
                  </button>{" "}
                </AccordionItemButton>
              </AccordionItemHeading>
              <AccordionItemPanel>
                <div className="mx-auto align-left text-left container max-w-2xl shadow-md mx-4">
                  <div className="bg-white space-y-6 mt-4">
                    <div className=" space-y-4 md:space-y-0 w-full p-4 text-black ">
                      <h2 className="">Basic Info</h2>
                      {inputsMap(inputs)}
                      <button
                        className="bg-red-500 text-white py-2 px-4"
                        onClick={handleUpdatePoolInfo}
                      >
                        Update Pool
                      </button>

                      {/* <p>{parse(text)}</p> */}
                      <h1 className="text-lg">Information Sections</h1>
                      <h2>
                        This is intended for information regarding operations at
                        your location.
                      </h2>
                      <button
                        className="bg-red-500 text-white p-4 rounded"
                        onClick={handleNewPoolDetail}
                      >
                        {" "}
                        + Add a New Section
                      </button>
                      {this.state.accordionData.length > 0 ? (
                        this.state.accordionData.map((item, i) => (
                          <div>
                            <p>{i + 1})</p>
                            <h1>{item.headerText}</h1>
                            <h1>{item.bodyText}</h1>
                            <div>
                              {this.state.accordionData[i].images != null &&
                              this.state.accordionData[i].images.length > 0 ? (
                                this.state.accordionData[
                                  i
                                ].images.map((item) => (
                                  <img
                                    src={item.image}
                                    alt="..."
                                    className="shadow object-contain h-32  align-middle border-none object-contain"
                                  />
                                ))
                              ) : (
                                <div></div>
                              )}
                            </div>
                            <button
                              className="bg-red-500 text-white px-4 py-2 my-2"
                              onClick={() => handlePoolDetailDelete(item._id)}
                            >
                              Delete
                            </button>
                          </div>
                        ))
                      ) : (
                        <div></div>
                      )}

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
                        <div>
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
                            <label className="text-lg">Body:</label> <br />
                            <input
                              className="p-2 border"
                              onChange={(e) =>
                                this.setState({ bodyText: e.target.value })
                              }
                            />
                          </div>
                          <div>
                            <label className="text-lg">Images:</label> <br />
                            <ImageUploader
                              singleImage={false}
                              withIcon={true}
                              buttonText="Choose images"
                              onChange={onDrop}
                              imgExtension={[".jpg", ".gif", ".png", ".gif"]}
                              maxFileSize={5242880}
                              withPreview={true}
                              withLabel={true}
                            />
                            {/* <button
                              onClick={handleUploadImages}
                              className="bg-red-500 text-white px-4 py-2 rounded  mx-auto"
                            >
                              Upload Image
                            </button> */}
                          </div>

                          <button
                            className="bg-red-500 px-4 py-2 text-white"
                            onClick={handleUpload}
                          >
                            Save
                          </button>
                        </div>
                      </Modal>
                    </div>
                  </div>
                </div>
              </AccordionItemPanel>
            </AccordionItem>{" "}
            <AccordionItem>
              <AccordionItemHeading>
                <AccordionItemButton>
                  <button className="inline-flex text bg-red-700 p-2 rounded text-white m-2">
                    HOA Assignment
                  </button>
                </AccordionItemButton>
              </AccordionItemHeading>
              <AccordionItemPanel>
                <button
                  onClick={() => this.setState({ hoaModal: true })}
                  className="bg-red-500 text-white px-4 py-2 rounded"
                >
                  Add An HOA account to this Pool
                </button>
                <div></div>
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
                        onChange={(e) =>
                          this.setState({ hoaSearchString: e.target.value })
                        }
                      />
                    </div>
                    <div>
                      <button
                        className="bg-red-500 px-4 py-2 text-white"
                        onClick={this.runHOAFunc}
                      >
                        Search
                      </button>
                    </div>
                    <div className="mx-auto container max-w-2xl shadow-md mx-4">
                      <View style={{ overflow: "scroll", maxHeight: "600px" }}>
                        {userInfoEmployeeMap}
                      </View>{" "}
                    </div>
                  </div>
                </Modal>
              </AccordionItemPanel>
            </AccordionItem>
            <AccordionItem>
              <AccordionItemHeading>
                <AccordionItemButton>
                  <button className="inline-flex text bg-red-700 p-2 rounded text-white my-2">
                    Daily Logs Management
                  </button>
                </AccordionItemButton>
              </AccordionItemHeading>
              <AccordionItemPanel>
                <div className="container px-4">
                  <p>
                    List of pools for your employees to fill paperwork for
                    daily.
                  </p>
                  <input className="my-4" />
                  <button className="inline-flex text bg-red-700 px-2 py-1 mx-2 rounded text-white my-2">
                    Add
                  </button>
                </div>
              </AccordionItemPanel>
            </AccordionItem>
            <AccordionItem>
              <AccordionItemHeading>
                <AccordionItemButton>
                  <button className="inline-flex text bg-red-700 p-2 rounded text-white my-2">
                    Checklist Management
                  </button>
                </AccordionItemButton>
              </AccordionItemHeading>
              <AccordionItemPanel>
                <div className="mx-auto text-left container bg-white max-w-2xl p-4 shadow-md mx-4">
                  <div className=" space-y-6 mt-4 mb-4">
                    <p className="text-md">
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

                  <div className="mx-auto container max-w-2xl mx-4">
                    <div className="bg-white space-y-6 mt-4 w-full">
                      <input
                        className="shadow-md w-full"
                        value={this.state.taskText}
                        onSubmit={() => this.setState({ taskText: "" })}
                        onChange={(e) => handleChecklistInput(e)}
                      />
                      <button
                        onClick={() => {
                          handleSubmitChecklist("opening");
                        }}
                        className="bg-red-500 text-white px-4 py-2 rounded"
                      >
                        Add
                      </button>
                    </div>
                    <div>
                      {this.props.dailyChecklist.data &&
                      this.props.dailyChecklist.data.data ? (
                        <div className="w-full">
                          {this.props.dailyChecklist.data.data.map((item) => (
                            <>
                              <div
                                key={item._id}
                                className="w-full shadow-md py-2 border-1 p-2"
                              >
                                <div className="w-2/3">
                                  <p className="text-lg">{item.text}</p>
                                </div>
                                <div className="w-1/6">
                                  <button
                                    className="bg-red-500 p-1 text-white rounded"
                                    onClick={() => handleDelete(item._id)}
                                  >
                                    Delete
                                  </button>
                                </div>
                              </div>
                            </>
                          ))}
                        </div>
                      ) : (
                        <div>This pool has not set any tasks yet...</div>
                      )}
                    </div>
                  </div>
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

                  <div className="mx-auto container max-w-2xl mx-4">
                    <div className="bg-white space-y-6 mt-4 w-full">
                      <input
                        className="shadow-md w-full"
                        onChange={(e) => handleChecklistInput(e)}
                      />
                      <button
                        onClick={() => {
                          handleSubmitChecklist("closing");
                        }}
                        className="bg-red-500 text-white px-4 py-2 rounded"
                      >
                        Add
                      </button>
                    </div>
                    <div>
                      {this.props.dailyChecklist.data &&
                      this.props.dailyChecklist.data.data ? (
                        <div className="w-full">
                          {this.props.dailyChecklist.data.data.map((item) => (
                            <>
                              <div
                                key={item._id}
                                className="w-full shadow-md py-2 border-1 p-2"
                              >
                                <div className="w-2/3">
                                  <p className="text-lg">{item.text}</p>
                                </div>
                                <div className="w-1/6">
                                  <button
                                    className="bg-red-500 p-1 text-white rounded"
                                    onClick={() => handleDelete(item._id)}
                                  >
                                    Delete
                                  </button>
                                </div>
                              </div>
                            </>
                          ))}
                        </div>
                      ) : (
                        <div>This pool has not set any tasks yet...</div>
                      )}
                    </div>
                  </div>
                </Modal>
              </AccordionItemPanel>
            </AccordionItem>
            <AccordionItem>
              <AccordionItemHeading>
                <AccordionItemButton>
                  <button className="inline-flex text bg-red-700 p-2 rounded text-white">
                    Chemical Log Management
                  </button>
                </AccordionItemButton>
              </AccordionItemHeading>
              <AccordionItemPanel>
                <div className="bg-white p-2 m-2">
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
                            updateCheck={(index) => onAddingItem(index)}
                          />
                          <span className="ml-2 text-gray-700">
                            {item.time}
                          </span>
                        </label>
                      </div>
                    ))}
                  </div>
                  <div className="w-full">
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
                  </div>
                </div>
              </AccordionItemPanel>
            </AccordionItem>
          </Accordion>

          <div className="max-w-2xl pt-4 mx-auto">
            {/* <CKEditor
              editor={ClassicEditor}
              data={text}
              onChange={(e, editor) => {
                const data = editor.getData();
                this.setState({ text: data });
              }}
            /> */}
            <div className="text-left">
              <RichEditor />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
class Checkboxes extends Component {
  render() {
    function setChecked() {
      return this.props.updateCheck(this.props.index);
    }

    const handleChange = async (event) => {
      await this.props.updateCheck(this.props.index);
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
