import React, { Component } from "react";
import ReactTable from "react-table";
import Modal from "react-modal";
import TitleAndInput from "./TitleAndInput";
import api from "../utils/api";
export default class PoolInventoryList extends Component {
  //   navToArea = () => {
  //     this.props.navigation.navigate("AdminAreaDetail");
  //   };

  state = {
    isModalOpen: false,
  };

  openModal() {
    this.setState({ isModalOpen: true });
  }
  closeModal() {
    this.setState({ isModalOpen: false });
  }
  async deleteItem(id) {
    let url = "inventory/" + this.props.poolId + "/" + id;
    console.log(url);
    await api
      .request({
        method: "DELETE",
        url: url,
      })
      .then((response) => {
        const data = response.data;
        console.log(data);
      })
      .catch((error) => {
        const errorMsg = error.message;
        console.log(errorMsg);
      });
    await this.props.fetchPoolById(this.props.poolId);
  }

  render() {
    console.log(this.props);
    // const data = this.props.data.data;
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
        placeholder:
          "Amount that is set up to be the minimum acceptable units for operation",
        title: "lowPointAmt",
        value: "lowAmt",
        isNumber: true,
      },
    ];

    const onChange = (e, value) => {
      this.setState({ name: e });
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

    const columns = [
      {
        Header: "Name",
        accessor: "name",
        style: {
          //textAlign: "right",
        },
        // width: 100,
      },
      {
        Header: "Description",
        accessor: "desc",
        style: {
          //textAlign: "right",
        },

        // width: 100,
      },
      {
        Header: "Low Amount",
        accessor: "lowAmt",
        style: {
          //textAlign: "right",
        },

        // width: 100,
      },
      {
        Header: "In Stock Count",
        accessor: "inStockAmt",
        style: {
          //textAlign: "right",
        },

        // width: 100,
      },
      {
        Header: "Unit Type",
        accessor: "unitType",
        style: {
          //textAlign: "right",
        },

        // width: 100,
      },
      {
        Header: "Actions",
        filterable: false,
        sortable: false,
        resizable: false,
        Cell: (props) => {
          return (
            <div>
              <button
                className="bg-red-500 text-white rounded text-md mx-auto px-2 font-bold "
                // disabled
                onClick={(e) => {
                  console.log(props.original);
                  this.deleteItem(props.original._id);
                  // this.navToArea(porps.original.id);
                }}
              >
                Delete
              </button>
            </div>
          );
        },
        width: 100,
        maxWidth: 100,
        minWidth: 100,
      },
    ];

    return (
      <div className="max-w-3xl mx-auto m-4">
        <ReactTable
          className="-striped -highlight"
          data={this.props.inventory}
          filterable
          columns={columns}
          defaultPageSize={10}
        >
          {(state, makeTable, instance) => {
            this.reactTable = state.pageRows.map((modem) => {
              return modem._original;
            });
            return <div>{makeTable()}</div>;
          }}
        </ReactTable>
      </div>
    );
  }
}
