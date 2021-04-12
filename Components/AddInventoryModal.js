import React, { Component } from "react";
import Modal from "react-modal";
import TitleAndInput from "./TitleAndInput";
import api from "../utils/api";
import moment from "moment";

export default class AddInventoryModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalOpen: false,
      isModalOpen2: false,
      name: "",
      desc: "",
      unitType: "",
      lowAmt: 0,
      inStockAmt: 0,
      name0: "",
      desc0: "",
      unitType0: "",
      inStockAmt0: 0,
      lowAmt0: 0,
      customArray: [],
      preApprove: false,
    };
  }

  openModal() {
    this.setState({ isModalOpen: true });
    console.log(this.props);
  }
  openModal2() {
    this.setState({ isModalOpen2: true });
    console.log(this.props);
  }
  async submitForm(e, props) {
    console.log(props);
    let date = new Date();
    const nowDate = moment(date);
    const formattedDate = nowDate.format("YYYY-MM-DD");
    const body = {
      assigned_backup: props.pool.pool_secondary_drivers,
      starting_list: this.state.customArray,
      date: formattedDate,
      pool_id: props.pool._id,
      assigned_driver: props.pool.pool_primary_driver._id,
    };
    console.log(body);
    await api
      .post("/adminOrderDetails/", body)
      .then((response) => {
        console.log(response);
        this.closeModal3();
      })
      .catch((error) => {
        const errorMsg = error.message;
      });
  }
  async closeModal() {
    this.setState({
      isModalOpen: false,
      isModalOpen2: false,
      name: "",
      desc: "",
      unitType: "",
      lowAmt: 0,
      inStockAmt: 0,
      name0: "",
      desc0: "",
      unitType0: "",
      inStockAmt0: 0,
      lowAmt0: 0,
      preApprove: false,
    });
  }
  async closeModal2() {
    this.setState({
      isModalOpen: false,
      isModalOpen2: false,
      name: "",
      desc: "",
      unitType: "",
      lowAmt: 0,
      inStockAmt: 0,
      name0: "",
      desc0: "",
      unitType0: "",
      inStockAmt0: 0,
      lowAmt0: 0,
      preApprove: false,
    });
  }
  async closeModal3() {
    this.setState({
      isModalOpen: false,
      isModalOpen2: false,
      name: "",
      desc: "",
      unitType: "",
      lowAmt: 0,
      inStockAmt: 0,
      name0: "",
      desc0: "",
      unitType0: "",
      inStockAmt0: 0,
      lowAmt0: 0,
      preApprove: false,

      customArray: [],
    });
  }
  async handleDelete() {
    this.setState({
      isModalOpen: false,
      isModalOpen2: false,
      name: "",
      desc: "",
      unitType: "",
      lowAmt: 0,
      inStockAmt: 0,
      name0: "",
      desc0: "",
      unitType0: "",
      inStockAmt0: 0,
      lowAmt0: 0,

      customArray: [],
      preApprove: false,
    });
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
    this.setState({
      name: "",
      desc: "",
      unitType: "",
      inStockAmt: 0,
      lowAmt: 0,
    });
    this.setState({ isModalOpen: false });
    this.props.fetchPoolById();
  }
  async handleSubmit2(event, props) {
    event.preventDefault();
    const { name0, desc0, unitType0, inStockAmt0, lowAmt0 } = this.state;

    const body = {
      name: name0,
      desc: desc0,
      unitType: unitType0,
      lowAmt: lowAmt0,

      inStockAmt: inStockAmt0,
    };

    this.setState({
      customArray: this.state.customArray.concat(body),
    });
    this.setState({
      name0: "",
      desc0: "",
      unitType0: "",
      inStockAmt0: 0,
      lowAmt0: 0,
    });

    console.log(this.state);
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
      // {
      //   placeholder: "Current count of available units",
      //   title: "In Stock Amount",
      //   value: "inStockAmt",
      //   isNumber: true,
      // },
    ];

    const inputs2 = [
      {
        placeholder: "Name",
        title: "Name",
        value: "name0",
      },
      {
        placeholder: "Description",
        title: "Description",
        value: "desc0",
      },
      {
        placeholder: "rolls, individual, group, etc...",
        title: "Unit Type",
        value: "unitType0",
      },

      {
        placeholder:
          "Amount that is set up to be the minimum acceptable units for operation",
        title: "Minimum Needed",
        value: "lowAmt0",
        isNumber: true,
      },
    ];

    const onChange = (e, value) => {
      this.setState({ [value]: e });
    };

    const inputsMap = (array) => {
      // let localValue = this.state.
      return array.map((item, i) => (
        <>
          {console.log("value", this.state[item.value])}

          <TitleAndInput
            key={i}
            item={item}
            value={this.state[item.value]}
            onChange={(value, item) => onChange(value, item)}
          />
          <br />
        </>
      ));
    };

    const runPreapprove = () => {
      this.setState({ preApprove: true });
    };

    const handleStatedDelete = (i) => {
      console.log(this.state.customArray);
      let tempArray = this.state.customArray;
      console.log(tempArray[i]);

      tempArray.splice(i, 1);

      this.setState({ customArray: tempArray });
    };

    return (
      <div>
        <div>
          <button
            className="text bg-red-700 p-2 mx-1 rounded text-white"
            onClick={() => {
              this.openModal();
            }}
          >
            Add Inventory Item
          </button>
          <button
            className="text bg-red-700 p-2 mx-1 rounded text-white"
            onClick={() => {
              this.openModal2();
            }}
          >
            Add a Special Delivery
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
                    <h2 className=" max-w-sm mx-auto">New Item:</h2>
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
          <Modal
            {...this.props}
            ariaHideApp={false}
            isOpen={this.state.isModalOpen2}
            style={{ width: "100%" }}
          >
            <button
              className="text bg-gray-600 p-2 rounded text-white"
              onClick={() => {
                this.closeModal2();
              }}
            >
              close
            </button>

            <form onSubmit={() => this.handleSubmit2(event, this.props)}>
              <div className="mx-auto container max-w-2xl shadow-md mx-4">
                <div className="bg-white space-y-6 mt-4">
                  <div className=" space-y-4 md:space-y-0 w-full p-4 text-black items-center">
                    <h2 className=" max-w-sm mx-auto">New Special Order:</h2>
                    {inputsMap(inputs2)}
                    <div className="w-full p-4 text-right text-gray-500">
                      <button
                        onClick={() => this.handleDelete()}
                        className="inline-flex text bg-red-700 p-2 rounded text-white m-1"
                      >
                        Cancel
                      </button>
                      <button
                        className="inline-flex text bg-red-700 p-2 rounded text-white m-1"
                        type="submit"
                      >
                        Add to Order List
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </form>
            <div className="container">
              {this.state.customArray.length > 0 ? (
                <>
                  {console.log(this.state.customArray)}
                  <div className="p-4">
                    <span className="text-2xl">Items you are asking for:</span>
                    {this.state.customArray.map((item, i) => (
                      <div className="border p-2">
                        <div className="text-xl">Name: {item.name}</div>
                        <div className="text-lg">Description: {item.desc}</div>
                        <div className="text-md">Unit Type:{item.unitType}</div>
                        <div className="text-md">Low Amount:{item.lowAmt}</div>
                        <div className="text-sm">
                          <button
                            onClick={() => handleStatedDelete(i)}
                            className="bg-red-500 text-white rounded px-2 py-1 my-2"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    ))}
                    {this.state.preApprove ? (
                      <>
                        <p>please check items before continuing</p>
                        <button
                          className="text-white bg-red-500 px-4 py-2"
                          onClick={() => this.submitForm(event, this.props)}
                        >
                          Submit New Order .
                        </button>
                      </>
                    ) : (
                      <button
                        className="text-white bg-red-500 px-4 py-2"
                        onClick={() => runPreapprove()}
                      >
                        You are About to Submit. Are You Sure?
                      </button>
                    )}
                  </div>
                </>
              ) : null}
            </div>
          </Modal>
        </div>
      </div>
    );
  }
}
