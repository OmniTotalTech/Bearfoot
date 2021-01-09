import React, { Component } from "react";
import TitleAndInput from "./TitleAndInput";

export default class InventoryModal extends Component {
  state = { showAdd: false, name: "", desc: "", unitType: "", lowPointAmt: 0 };

  render() {
    console.log(this.props);
    const toggleShowAdd = () => {
      this.setState({ showAdd: !this.state.showAdd });
    };
    const inputs = [
      {
        placeholder: "Name",
        title: "Name",
        value: "name",
      },
      {
        placeholder: "description",
        title: "Description",
        value: "description",
      },
      {
        placeholder: "unitType",
        title: "unitType",
        value: "unitType",
      },
      {
        placeholder: "lowPointAmt",
        title: "lowPointAmt",
        value: "lowPointAmt",
      },
    ];

    const onChange = (e, value) => {
      this.setState({ name: e });
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
      <>
        <div className="w-full mb-8">
          <button
            className=" text bg-red-700  p-2 rounded text-white "
            onClick={() => toggleShowAdd()}
          >
            Add Inventory Item
          </button>
        </div>
        {this.state.showAdd ? (
          <div className="mx-auto container max-w-2xl shadow-md mx-4">
            <div className="bg-white space-y-6 mt-4">
              <div className=" space-y-4 md:space-y-0 w-full p-4 text-black items-center">
                <h2 className=" max-w-sm mx-auto">Item</h2>
                {inputsMap(inputs)}
                <div className="w-full p-4 text-right text-gray-500">
                  <button
                    className="inline-flex text bg-red-700 p-2 rounded text-white"
                    type="submit"
                    onClick={() => this.props.addItem()}
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div></div>
        )}
      </>
    );
  }
}
