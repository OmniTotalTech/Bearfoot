import React, { Component } from "react";
import ReactTable from "react-table";
import "react-table/react-table.css";
import Modal from "react-modal";
import { connect } from "react-redux";
import api from "../../utils/api";
<<<<<<< HEAD
import moment from "moment";

class AreaTable extends Component {
  constructor() {
    super();

    this.state = {
      currentBool: false,
      modalData: {},
      toSecondPart: false,
      finalizing: false,
      height: 0,
      width: 0
    };
    window.addEventListener("resize", this.update);
    this.mystyle = this.mystyle.bind(this);
  }


  mystyle = () => {

    var custom = {
      fontSize: this.state.width > 768 ? '16px' : '24px'
    }

    return custom
  }

  componentDidMount() {
    this.update();
  }
  update = () => {
    this.setState({
      height: window.innerHeight,
      width: window.innerWidth
    });
  };
  navToArea = (props) => {

=======

class AreaTable extends Component {
  state = {
    currentBool: false,
    modalData: {},
    toSecondPart: false,
    finalizing: false,
  };

  componentDidMount() {}

  navToArea = (props) => {
>>>>>>> a8ccdac77f8b7a47ef2a0db5e9b084921f0b02be
    console.log(props.original);
    const id = props.original._id;
    this.props.navigation.navigate("AdminAreaDetail", {
      id: id,
      areaName: props.original.areaName,
      organization: props.original.areaOrganization,
    });
  };
<<<<<<< HEAD
=======

>>>>>>> a8ccdac77f8b7a47ef2a0db5e9b084921f0b02be
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
<<<<<<< HEAD
  filterCaseInsensitive = (filter, row) => {
    const id = filter.pivotId || filter.id;
    const content = row[id];
    if (typeof content !== 'undefined') {
      // filter by text in the table or if it's a object, filter by key
      if (typeof content === 'object' && content !== null && content.key) {
        return String(content.key).toLowerCase().includes(filter.value.toLowerCase());
      } else {
        return String(content).toLowerCase().includes(filter.value.toLowerCase());
      }
    }

    return true;
  };
=======

>>>>>>> a8ccdac77f8b7a47ef2a0db5e9b084921f0b02be
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
<<<<<<< HEAD
        filterable: true,

        style: this.mystyle()

=======
        style: {
          //textAlign: "right",
        },
>>>>>>> a8ccdac77f8b7a47ef2a0db5e9b084921f0b02be
        // width: 100,
      },
      {
        Header: "Org. Name",
        accessor: "areaOrganization",
<<<<<<< HEAD
        filterable: true,
        style: this.mystyle()
=======
        style: {
          //textAlign: "right",
        },
>>>>>>> a8ccdac77f8b7a47ef2a0db5e9b084921f0b02be
        // width: 100,
      },
      {
        Header: "Time Zone",
        accessor: "areaTimeZone",
<<<<<<< HEAD
        filterable: true,
        style: this.mystyle(),
=======
>>>>>>> a8ccdac77f8b7a47ef2a0db5e9b084921f0b02be
        maxWidth: 200,
        minWidth: 50,
      },
      {
<<<<<<< HEAD
        Header: "Last Updated",
        accessor: "lastUpdated",
        Cell: (porps) => {
          console.log(porps)
          return (<>  {moment(porps.original.lastUpdated.toString()).format('lll')} </>)
        }
      },
      {
=======
>>>>>>> a8ccdac77f8b7a47ef2a0db5e9b084921f0b02be
        Header: "Actions",
        filterable: false,
        sortable: false,
        resizable: false,
        minWidth: 100,

        Cell: (porps) => {
<<<<<<< HEAD
=======
          console.log(porps);
>>>>>>> a8ccdac77f8b7a47ef2a0db5e9b084921f0b02be
          return (
            <>
              <div className="grid grid-cols-2">
                <button
<<<<<<< HEAD
                  style={this.mystyle()}
                  className={`bg-gray-500  text-white md:text-lg mx-1 rounded text-md mx-auto font-bold w-3/4`}
=======
                  className="bg-red-500 text-white rounded text-md mx-auto mx-0.5 font-bold  md:w-11/12 w-3/4"
>>>>>>> a8ccdac77f8b7a47ef2a0db5e9b084921f0b02be
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
<<<<<<< HEAD
      <div className="mb-8">
        <ReactTable
          className="-striped -highlight"
          data={this.props.area.data.result}
          defaultFilterMethod={this.filterCaseInsensitive}
          columns={columns}
          defaultPageSize={this.props.area.data.result?.length > 35 ? 50 : 25}
=======
      <div>
        <ReactTable
          className="-striped -highlight"
          data={this.props.area.data.result}
          filterable
          columns={columns}
          defaultPageSize={10}
>>>>>>> a8ccdac77f8b7a47ef2a0db5e9b084921f0b02be
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
