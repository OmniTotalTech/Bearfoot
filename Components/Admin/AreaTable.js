import React, { Component } from "react";
import ReactTable from "react-table";
import "react-table/react-table.css";
import Modal from "react-modal";
import { connect } from "react-redux";
import api from "../../utils/api";

class AreaTable extends Component {
  state = {
    currentBool: false,
    modalData: {},
    toSecondPart: false,
    finalizing: false,
  };

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
    const handleDeletePool = async () => {
      this.setState({ toSecondPart: false, finalizing: true });
      await api
        .delete("/area/" + this.state.modalData._id)
        .then((res) => {
          console.log(res.data);
          this.setState({ currentBool: false });
          this.props.navigation.navigate("SuccessScreen");
        })
        .catch((err) => {
          console.log(err);
        });
    };

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
        Header: "Org. Name",
        accessor: "areaOrganization",
        style: {
          //textAlign: "right",
        },
        // width: 100,
      },
      {
        Header: "Time Zone",
        accessor: "areaTimeZone",
        maxWidth: 200,
        minWidth: 50,
      },
      {
        Header: "Actions",
        filterable: false,
        sortable: false,
        resizable: false,
        minWidth: 100,

        Cell: (porps) => {
          console.log(porps);
          return (
            <>
              <div className="grid grid-cols-2">
                <button
                  className="bg-red-500 text-white rounded text-md mx-auto mx-0.5 font-bold  md:w-11/12 w-3/4"
                  onClick={(e) => {
                    this.navToArea(porps);
                  }}
                >
                  View
                </button>
                {this.props.user.role > 4 ? (
                  <button
                    onClick={() => {
                      this.controlModal(porps.original);
                    }}
                    className="bg-red-500 text-white rounded text-md mx-auto mx-0.5 font-bold  md:w-11/12 w-3/4"
                  >
                    Delete
                  </button>
                ) : (
                  <div></div>
                )}
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
          data={this.props.area.data.result}
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
              this.setState({
                currentBool: !this.state.currentBool,
                toSecondPart: false,
              });
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
            {this.state.finalizing ? (
              <button
                onClick={() => console.log(this.state.modalData._id)}
                className="text-white bg-red-500 rounded py-2 px-4 my-4 text-xl"
              >
                Deleting...Please wait...
              </button>
            ) : this.state.toSecondPart ? (
              <>
                <p>
                  This is the last chance to review before you finalize
                  deletion. Proceed Accordingly.
                </p>
                <button
                  onClick={() => handleDeletePool()}
                  className="text-white bg-red-500 rounded py-2 px-4 my-4 text-xl"
                >
                  Delete Area
                </button>
              </>
            ) : (
              <>
                <p>
                  If you move to delete this pool, all records and connections
                  will be broken.{" "}
                </p>
                <button
                  onClick={() => this.setState({ toSecondPart: true })}
                  className="text-white bg-red-500 rounded py-2 px-4 my-4 text-xl"
                >
                  Proceed
                </button>
              </>
            )}
          </div>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
  };
};

export default connect(mapStateToProps)(AreaTable);
