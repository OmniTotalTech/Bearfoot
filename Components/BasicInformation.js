import React, { Component } from "react";
import TitleAndInput from "./TitleAndInput";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import parse from "html-react-parser";
import RichEditor from "./Admin/RichEditor";
import Modal from "react-modal";
import api from "../utils/api";
import Checkbox from "@material-ui/core/Checkbox";

import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from "react-accessible-accordion";
export default class BasicInformation extends Component {
  constructor(props) {
    super(props);
  }

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
  }

  render() {
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
        })
        .catch((error) => {
          const errorMsg = error.message;
          console.log(errorMsg);
        });
      await api
        .get("/chemTimes/" + this.props.id)
        .then((response) => {
          this.setState({ timeArray: response.data.data.chemTimeData });
        })
        .catch((error) => {
          const errorMsg = error.message;
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

    // const forLoopAm = () => {
    //   let times = [];
    //   for (var i = 0; i < 12; i++) {
    //     times.concat({ value: i, aorp: "am" });
    //   }
    //   console.log(times);
    //   return times;
    // };

    const onChange = (e, value) => {
      this.setState({ [value]: e });
    };
    const handleDelete = (id) => {
      console.log(id);
    };

    const inputsMap = (array) => {
      console.log(this.state);
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

    const handleSubmitChecklist = async (type) => {
      console.log("submitted", this.state.taskText);
      console.log(type);
      let body = {
        pool_id: this.props.id,
        checklistType: type,
        text: this.state.taskText,
      };
      await api
        .post("/dailyChecklist/", body)
        .then((response) => {
          console.log(response);
          this.props.fetchDailyChecklist(this.props.id, type);
        })
        .catch((error) => {
          const errorMsg = error.message;
        });
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
                <div className="mx-auto container max-w-2xl shadow-md mx-4">
                  <div className="bg-white space-y-6 mt-4">
                    <div className=" space-y-4 md:space-y-0 w-full p-4 text-black ">
                      <h2 className=" max-w-sm mx-auto">Basic Info</h2>
                      {inputsMap(inputs)}
                      {/* <p>{parse(text)}</p> */}
                    </div>
                  </div>
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
                    <div className="text-center">
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
                    Please Choose the Hours to check the chemical logs
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
