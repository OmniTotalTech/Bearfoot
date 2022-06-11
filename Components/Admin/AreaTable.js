import React, { Component } from "react";
import ReactTable from "react-table";
import "react-table/react-table.css";
import Modal from "react-modal";
import { connect } from "react-redux";
import api from "../../utils/api";
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
        filterable: true,

        style: this.mystyle()

        // width: 100,
      },
      {
        Header: "Org. Name",
        accessor: "areaOrganization",
        filterable: true,
        style: this.mystyle()
        // width: 100,
      },
      {
        Header: "Last Updated",
        accessor: "lastUpdated",
        Cell: (porps) => {
          return (<>  {moment(porps.original.lastUpdated.toString()).format('lll')} </>)
        }
      },
      {
        Header: "Time Zone",
        accessor: "areaTimeZone",
        filterable: true,
        style: this.mystyle(),
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
          return (
            <>
              <div className="grid grid-cols-1 w-full">
                <button
                  style={this.mystyle()}
                  className={`bg-gray-500 my-2 text-white md:text-sm mx-1 rounded text-sm mx-auto font-bold w-full p-1`}
                  onClick={(e) => {
                    this.navToArea(porps);
                  }}
                >
                  <p>
                  View pools in <br/><span className={"text-red-500 text-md text-wrap"}> {porps.original.areaName}</span>
                  </p>
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
      <div className="mb-8">
        <ReactTable
          className="-striped -highlight"
          data={this.props.area.data.result}
          defaultFilterMethod={this.filterCaseInsensitive}
          columns={columns}
          defaultPageSize={this.props.area.data.result?.length > 35 ? 50 : 25}
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
