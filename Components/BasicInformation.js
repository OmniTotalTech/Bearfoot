import React, { Component } from "react";
import TitleAndInput from "./TitleAndInput";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import parse from "html-react-parser";
import RichEditor from "./Admin/RichEditor";

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
          <div className="mx-auto container max-w-2xl shadow-md mx-4">
            <div className="bg-white space-y-6 mt-4">
              <div className=" space-y-4 md:space-y-0 w-full p-4 text-black ">
                <h2 className=" max-w-sm mx-auto">Basic Info</h2>
                {inputsMap(inputs)}
                {/* <p>{parse(text)}</p> */}
              </div>
            </div>
          </div>
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
            <div className="w-full p-4 text-right text-gray-500">
              <button
                className="inline-flex text bg-red-700 p-2 rounded text-white"
                type="submit"
              >
                Update
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
