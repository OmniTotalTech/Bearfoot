import React, { Component } from "react";
import ReactTable from "react-table";
import { fetchRecords } from "../../../redux/actions/records";
import { connect } from "react-redux";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import Modal from "react-modal";
import RecordModal from "./RecordModal";
class PoolRecordsPage extends Component {
  state = {
    searchArray: [],
    loading: false,
    value: "all",
    showModal: false,
    modalData: [],
    recordId: null,
  };

  render() {
    const handleChange = async (event) => {
      this.setState({ loading: true });
      console.log("id", this.props.route.params.id);
      this.setState({ value: event.target.value });

      this.props.fetchRecords(this.props.route.params.id, event.target.value);
    };

    const handleModalOpen = (data) => {
      this.setState({ recordId: data._id });
      this.setState({ modalData: data });
      this.setState({ showModal: true });
    };

    let selections = [
      {
        value: "MorningChecklist",
        text: "Morning Inventory Count",
      },
      {
        value: "EveningChecklist",
        text: "Evening Inventory Count",
      },
      {
        value: "OpeningTaskChecklist",
        text: "Morning Checklist",
      },
      {
        value: "ClosingTaskChecklist",
        text: "Evening Checklist",
      },
      {
        value: "DailyOperation",
        text: "Daily Operations",
      },
      {
        value: "ChemicalLog",
        text: "Chemical Logs",
      },
    ];

    const columns = [
      {
        Header: "Type Of Record",
        accessor: "recordType",
        style: {
          //textAlign: "right",
        },
        // width: 100,
      },
      {
        Header: "Date",
        accessor: "date",
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
        Cell: (porps) => {
          return (
            <div>
              <button
                className="bg-red-500 text-white rounded text-md mx-auto px-2 font-bold "
                onClick={(e) => {
                  console.log("here is");
                  console.log(porps.original);
                  handleModalOpen(porps.original);
                  this.setState({ showModal: true });
                }}
              >
                View
              </button>
            </div>
          );
        },
        width: 100,
        maxWidth: 100,
        minWidth: 100,
      },
    ];

    let data = [];

    return (
      <>
        <div className="overflow-scroll">
          <div className="container p-2 m-2 max-w-lg mx-auto">
            <div className="grid grid-cols-2 p-1">
              <FormControl component="fieldset">
                <FormLabel component="legend">Search Reports</FormLabel>
                <RadioGroup
                  aria-label="Search Reports"
                  name="reports1"
                  value={this.state.value}
                  onChange={handleChange}
                >
                  {selections.map((item) => (
                    <FormControlLabel
                      value={item.value}
                      control={<Radio />}
                      label={item.text}
                    />
                  ))}
                </RadioGroup>
              </FormControl>
            </div>
          </div>

          <div className="container max-w-2xl mx-auto">
            <ReactTable
              className="-striped -highlight"
              data={this.props.records.data}
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
                type={this.state.value}
                data={this.state.modalData}
              />
            </Modal>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    records: state.records,
  };
};

const mapDisptachToProps = (dispatch) => {
  return {
    fetchRecords: (id, type) => dispatch(fetchRecords(id, type)),
  };
};

export default connect(mapStateToProps, mapDisptachToProps)(PoolRecordsPage);
