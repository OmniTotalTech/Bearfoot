import React, { Component } from "react";
import ReactTable from "react-table";
import "react-table/react-table.css";
import Modal from "react-modal";

class AreaTable extends Component {
  state = { currentBool: false, modalData: {} };

  componentDidMount() {}

  navToArea = (props) => {
    console.log(props.original);
    const id = props.original._id;
    this.props.navigation.navigate("AdminAreaDetail", {
      id: id,
      areaName: props.original.areaName,
      organization: props.original.areaOrganization,
    });
  };

  controlModal = async (props) => {
    let currentBool = this.state.currentBool;

    await this.setOpenData(props);
    this.setState({ currentBool: !currentBool });

    console.log(this.state);
  };

  setOpenData = (item) => {
    console.log(item);
    console.log(item._id);
    this.setState({ modalData: item });
  };

  render() {
    const data = this.props.area.data.foundArea;
    const columns = [
      {
        Header: "Name",
        accessor: "areaName",
        style: {
          //textAlign: "right",
        },
        // width: 100,
      },
      {
        Header: "Time Zone",
        accessor: "areaTimeZone",
        maxWidth: 200,
        minWidth: 100,
      },
      {
        Header: "Actions",
        filterable: false,
        sortable: false,
        resizable: false,
        Cell: (porps) => {
          console.log(porps);
          return (
            <>
              <div className="grid grid-cols-2">
                <button
                  className="bg-red-500 text-white rounded text-md mx-auto px-3 py-1 font-bold mx-4 md:w-11/12 w-3/4"
                  onClick={(e) => {
                    this.navToArea(porps);
                  }}
                >
                  View
                </button>
                <button
                  onClick={() => {
                    this.controlModal(porps.original);
                  }}
                  className="bg-red-500 text-white rounded text-md mx-auto px-3 py-1 font-bold mx-4  md:w-11/12 w-3/4"
                >
                  Delete
                </button>
              </div>
            </>
          );
        },
      },
    ];

    return (
      <div>
        <ReactTable
          className="-striped -highlight"
          data={data}
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
        <Modal isOpen={this.state.currentBool} style={{ width: "100%" }}>
          <button
            className="text bg-gray-600 p-2 rounded text-white"
            onClick={() => {
              this.setState({ currentBool: !this.state.currentBool });
            }}
          >
            close
          </button>
          <div className="container">
            <div className="text-lg my-4 p-2">
              Are you <span className="font-bold italic">ABSOLUTELY SURE </span>
              you want to delete? A record of this deletion will be made, and
              the related pools underneath, and will not be able to use any
              data.
            </div>
            <div className="p-8">
              <span className="text-2xl font-bold">
                This pool will be disabled:
              </span>
              <div>
                Name :{" "}
                {this.state.modalData.areaName ? (
                  this.state.modalData.areaName
                ) : (
                  <div>No Name</div>
                )}
              </div>
              <div>
                Organization :{" "}
                {this.state.modalData.areaOrganization ? (
                  this.state.modalData.areaOrganization
                ) : (
                  <div>No Organization</div>
                )}
              </div>
            </div>
          </div>
          <div>
            <button className="text-white bg-red-500 rounded py-2 px-4 my-4 text-xl">
              Proceed
            </button>
          </div>
        </Modal>
      </div>
    );
  }
}

export default AreaTable;
