import React, { Component } from "react";
import Modal from "react-modal";
import TitleAndInput from "./TitleAndInput";

export default class AddInventoryModal extends Component {
  state = {
    isModalOpen: false,
    name: "",
    desc: "",
    unitType: "",
    lowPointAmt: 0,
  };

  openModal() {
    this.setState({ isModalOpen: true });
  }
  closeModal() {
    this.setState({ isModalOpen: false });
  }

  render() {
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
      <div>
        <div>
          <button
            className="text bg-red-700 p-2 rounded text-white"
            onClick={() => {
              this.openModal();
            }}
          >
            Add Inventory Item
          </button>
          <Modal isOpen={this.state.isModalOpen} style={{ width: "100%" }}>
            <button
              className="text bg-gray-600 p-2 rounded text-white"
              onClick={() => {
                this.closeModal();
              }}
            >
              close
            </button>

            <form>
              <div className="mx-auto container max-w-2xl shadow-md mx-4">
                <div className="bg-white space-y-6 mt-4">
                  <div className=" space-y-4 md:space-y-0 w-full p-4 text-black items-center">
                    <h2 className=" max-w-sm mx-auto">Item</h2>
                    {inputsMap(inputs)}
                    <div className="w-full p-4 text-right text-gray-500">
                      <button
                        className="inline-flex text bg-red-700 p-2 rounded text-white"
                        type="submit"
                        onClick={
                          ((e) => e.preventDefault(), this.props.addItem())
                        }
                      >
                        Submit
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </Modal>
        </div>
      </div>
    );
  }
}
