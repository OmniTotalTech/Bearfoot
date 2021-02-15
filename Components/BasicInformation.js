import React, { Component } from "react";
import TitleAndInput from "./TitleAndInput";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import parse from "html-react-parser";
import RichEditor from "./Admin/RichEditor";

import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from "react-accessible-accordion";
export default class BasicInformation extends Component {
  state = {
    pool_address: this.props.pool.pool_address,
    pool_state: this.props.pool.pool_state,
    pool_zip: this.props.pool.pool_zip,
    pool_name: this.props.pool.pool_name,
    pool_desc: this.props.pool.pool_desc,
  };

  render() {
    const { text } = this.state;
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

    const times = [
      "1am",
      "2am",
      "3am",
      "4am",
      "5am",
      "6am",
      "7am",
      "8am",
      "9am",
      "10am",
      "11am",
      "12am",
    ];

    const timesPM = [
      "1pm",
      "2pm",
      "3pm",
      "4pm",
      "5pm",
      "6pm",
      "7pm",
      "8pm",
      "9pm",
      "10pm",
      "11pm",
      "12pm",
    ];
    const onChange = (e, value) => {
      this.setState({ [value]: e });
    };

    const inputsMap = (array) => {
      console.log(array);
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
                        onClick={() => this.setState({ checklist: "opening" })}
                        className="text bg-red-700 p-2 mx-2 rounded text-white"
                      >
                        Opening
                      </button>
                      <button
                        onClick={() => this.setState({ checklist: "closing" })}
                        className="text bg-red-700 p-2 mx-2 rounded text-white"
                      >
                        Closing
                      </button>
                    </div>
                  </div>
                  <div className="w-full p-4 text-right text-gray-500">
                    <button
                      className="inline-flex text bg-red-700 p-2 rounded text-white"
                      type="submit"
                    >
                      Update
                    </button>
                  </div>
                </div>
              </AccordionItemPanel>
            </AccordionItem>
            <AccordionItem>
              <AccordionItemHeading>
                <AccordionItemButton>
                  <button className="inline-flex text bg-red-700 p-2 rounded text-white">
                    Basic Information
                  </button>{" "}
                </AccordionItemButton>
              </AccordionItemHeading>
              <AccordionItemPanel>
                <div>
                  <h2>Please Choose the Hours to check the chemical logs</h2>
                  <div className="text-center grid grid-cols-4">
                    {" "}
                    {times.map((item) => (
                      <div>
                        <label class="inline-flex items-center mt-3">
                          <input
                            type="checkbox"
                            class="form-checkbox h-5 w-5 text-orange-600"
                          />
                          <span class="ml-2 text-gray-700">{item}</span>
                        </label>
                      </div>
                    ))}
                    {timesPM.map((item) => (
                      <div>
                        <label class="inline-flex items-center mt-3">
                          <input
                            type="checkbox"
                            class="form-checkbox h-5 w-5 text-orange-600"
                          />
                          <span class="ml-2 text-gray-700">{item}</span>
                        </label>
                      </div>
                    ))}
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
