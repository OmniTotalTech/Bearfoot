import React, { Component } from "react";
import Modal from "react-modal";
import TitleAndInput from "./TitleAndInput";
export default class AddInventoryModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalOpen: false,
      name: "",
      desc: "",
      unitType: "",
      lowAmt: 0,
      inStockAmt: 0,
    };
  }

  openModal() {
    this.setState({ isModalOpen: true });
    console.log(this.props);
  }
  async closeModal() {
    this.setState({ isModalOpen: false });
  }

  handleSubmit(event, props) {
    event.preventDefault();
    const { name, desc, unitType, lowAmt, inStockAmt } = this.state;
    console.log(props);
    const body = {
      name: name,
      desc: desc,
      unitType: unitType,
      lowAmt: lowAmt,
      inStockAmt: inStockAmt,
    };
    props.addItem(props.inventory.data._id, body);

    this.setState({ isModalOpen: false });
    this.props.fetchPoolById();
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
        value: "desc",
      },
      {
        placeholder: "unitType",
        title: "unitType",
        value: "unitType",
      },

      {
        placeholder:
          "Amount that is set up to be the minimum acceptable units for operation",
        title: "lowPointAmt",
        value: "lowAmt",
        isNumber: true,
      },
      {
        placeholder: "Current count of available units",
        title: "In Stock Amount",
        value: "inStockAmt",
        isNumber: true,
      },
    ];

    const onChange = (e, value) => {
      this.setState({ [value]: e });
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
          <Modal
            {...this.props}
            ariaHideApp={false}
            isOpen={this.state.isModalOpen}
            style={{ width: "100%" }}
          >
            <button
              className="text bg-gray-600 p-2 rounded text-white"
              onClick={() => {
                this.closeModal();
              }}
            >
              close
            </button>

            <form onSubmit={() => this.handleSubmit(event, this.props)}>
              <div className="mx-auto container max-w-2xl shadow-md mx-4">
                <div className="bg-white space-y-6 mt-4">
                  <div className=" space-y-4 md:space-y-0 w-full p-4 text-black items-center">
                    <h2 className=" max-w-sm mx-auto">Item</h2>
                    {inputsMap(inputs)}
                    <div className="w-full p-4 text-right text-gray-500">
                      <button
                        className="inline-flex text bg-red-700 p-2 rounded text-white"
                        type="submit"
                      >
                        Submit a New Item
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
