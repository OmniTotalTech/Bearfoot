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
import BackButton from "../../../Components/BackButton";
class PoolRecordsPage extends Component {
  componentWillUnmount() {
    console.log("id", this.props.route.params.id);
    this.setState({ value: null });
    this.props.fetchRecords();
  }
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

    const formatTitles = (props) => {
      switch (props.recordType) {
        case "MorningChecklist":
          return "Morning Inventory";
        case "EveningChecklist":
          return "Evening Inventory";
        case "ClosingTaskChecklist":
          return "Closing  Inventory";
        case "OpeningTaskChecklist":
          return "Opening Inventory";
        case "dailyOperationsPM":
          return "PM - Daily Operations";
        case "dailyOperationsAM":
          return "AM - Daily Operations";
        case "ChemicalLog":
          return `Chem-Log(${props.specificPool.subPoolName})`;
      }
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
        value: "dailyOperationsAM",
        text: "Daily Operations - AM",
      },
      {
        value: "dailyOperationsPM",
        text: "Daily Operations - PM",
      },
      {
        value: "ChemicalLog",
        text: "Chemical Logs",
      },
    ];
    const filterCaseInsensitive = (filter, row) => {
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
    const columns = [
      {
        Header: "Type Of Record",
        accessor: "recordType",
        style: {
          //textAlign: "right",
          fontSize: 24
        },
        Cell: (porps) => {
          return <div className="text-md">{formatTitles(porps.original)}</div>;
        },
        // width: 100,
      },
      {
        Header: "Date",
        accessor: "date",
        style: {
          //textAlign: "right",
          fontSize: 24
        },

        // width: 100,
      },
      {
        Header: "Time Recorded",
        accessor: "time",
        style: {
          //textAlign: "right",
          fontSize: 24
        },

        // width: 100,
      },
      {
        Header: "Actions",
        filterable: false,
        sortable: false,
        width: 200,
        style: {
          //textAlign: "right",
          fontSize: 28
        },
        Cell: (porps) => {
          return (
            <div className="w-100">
              <button
                className="bg-red-500 w-100 text-white rounded btn btn-block  mx-auto px-4 font-bold "
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
        maxWidth: 100,
        minWidth: 100,
      },
    ];

    let data = [];

    return (
      <>
        <div className="overflow-scroll">
          {" "}
          <BackButton navigation={this.props.navigation} />
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
          <div className="container mx-auto">
            <ReactTable
              className="-striped -highlight"
              data={this.props.records.data}
              filterable
              defaultFilterMethod={filterCaseInsensitive}
              columns={columns}
              pageSize={this.props.records.length}
              defaultPageSize={50}
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
                navigation={this.props.navigation}
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
