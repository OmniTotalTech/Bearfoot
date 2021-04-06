import React, { Component } from "react";
import ReactTable from "react-table";
import api from "../../utils/api";
import { fetchSensitiveRecords } from "../../redux/actions/records";
import { connect } from "react-redux";
import Modal from "react-modal";
import RecordModal from "./PoolRecords/RecordModal";

class AdminSensitiveReports extends Component {
  state = {
    showModal: false,
    modalData: {},
    emailArray: [],
    dataArrayState: [],
  };
  async componentDidMount() {
    await this.props.fetchSensitiveRecords();
  }

  render() {
    const handleModalOpen = (data) => {
      this.setState({ recordId: data._id });
      this.setState({ modalData: data });
      this.setState({ showModal: true });
    };

    const pushToLocalState = (body) => {
      if (this.state.dataArrayState.length < 1) {
        this.setState({ dataArrayState: body });
      }
      console.log(this.state);
    };

    const handleUpdateState = (dataArray) => {
      console.log(dataArray);
      let finalStructure = [];
      dataArray.forEach((element) => {
        let body = {
          idText: renderValues(Object.keys(element).toString()),
          keyText: renderKeys(Object.values(element)),
        };
        finalStructure.push(body);
      });
      pushToLocalState(finalStructure);

      console.log(this.state);

      return finalStructure;
    };

    const switchStatement = (status) => {
      switch (status) {
        case false:
          return "not accepted";
        case true:
          return "Inventory Stage";
      }
    };

    const anotherSwitchStatement = (status) => {
      switch (status) {
        case "incidentReport":
          return "Incident Report";
        case "patientCare":
          return "Patient Care";
      }
    };

    const columns = [
      {
        Header: "Report Type",
        accessor: "pool_id.recordType",
        style: {
          //textAlign: "right",
        },
        Cell: (porps) => {
          return <div>{anotherSwitchStatement(porps.original.recordType)}</div>;
        },
        // width: 100,
      },
      {
        Header: "Pool:",
        accessor: "pool_id.pool_name",
        style: {
          //textAlign: "right",
        },
        // width: 100,
      },

      {
        Header: "Submitted by:",
        accessor: "user_id.name",
        style: {
          //textAlign: "right",
        },
        Cell: (porps) => {
          return (
            <div>
              <button className="bg-red-500 px-2 py-1 rounded text-white">
                {porps.original.user_id.name}
              </button>
            </div>
          );
        }, // width: 100,
      },
      {
        Header: "Date:",
        accessor: "date",
        style: {
          //textAlign: "right",
        },
        // width: 100,
      },

      // width: 100,

      {
        Header: "Approved",
        accessor: "isApproved",
        Cell: (porps) => {
          return <div>{switchStatement(porps.original.isApproved)}</div>;
        },
        // width: 100,
      },
      {
        Header: "Actions",
        filterable: false,
        sortable: false,
        resizable: false,
        Cell: (porps) => {
          return (
            <button
              onClick={() => {
                this.setState({ showModal: true }),
                  handleModalOpen(porps.original);
              }}
              className="text-white px-4 rounded bg-red-500"
            >
              View
            </button>
          );
        },
        width: 100,
        maxWidth: 100,
        minWidth: 100,
      },
    ];

    let renderValues = (item) => {
      if (item.includes("patient")) {
        return item.replace("patient", "Patient ");
      }

      if (item.includes("witness")) {
        return item.replace("witness", "Witness ");
      }

      if (item.includes("detailed")) {
        return item.replace("detailed", "Detailed ");
      }

      switch (item) {
        case "ems":
          return "Was the ems called?";
        case "hospital":
          return "Were they take to a hospital?";
        case "hospitalName":
          return "Where were they taken?";
        case "legalAdult":
          return "Is the patient a legal adult?";
        case "location":
          return "Where on the property did this happen?";
        case "injured":
          return "Was the patient injured?";
        case "reportFilerName":
          return "Report Filer";
        case "filerSignature":
          return "Filer Signature";
        case "managerName":
          return "Report Filer";
        case "manFilerSignature":
          return "Manager Signature";
        case "supName":
          return "Report Filer";
        case "supFilerSignature":
          return "Supervisor Signature";
        default:
          return null;
      }
    };
    let renderKeys = (item) => {
      switch (typeof item[0]) {
        case "boolean":
          if (item[0]) {
            return "Yes";
          } else {
            return "No";
          }
        case "string":
          if (item[0].includes("data:image/png;base64")) {
            return item[0];
          }
        default:
          return item[0];
      }
    };

    return (
      <div className="container mx-auto">
        Admin Sensitive Records
        <div>
          <ReactTable
            className="-striped -highlight"
            data={
              this.props.records.adminData.length > 0
                ? this.props.records.adminData
                : []
            }
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
          <Modal
            {...this.props}
            ariaHideApp={false}
            isOpen={this.state.showModal}
            style={{ width: "100%" }}
          >
            <RecordModal
              handleClose={() => this.setState({ showModal: false })}
              _id={this.state.recordId}
              updateState={(arr) => handleUpdateState(arr)}
              type={
                this.state.modalData.recordType
                  ? this.state.modalData.recordType
                  : null
              }
              data={this.state.modalData}
              dataArrayState={this.state.dataArrayState}
            />
          </Modal>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
    records: state.records,
  };
};

const mapDisptachToProps = (dispatch) => {
  return { fetchSensitiveRecords: () => dispatch(fetchSensitiveRecords()) };
};

export default connect(
  mapStateToProps,
  mapDisptachToProps
)(AdminSensitiveReports);
