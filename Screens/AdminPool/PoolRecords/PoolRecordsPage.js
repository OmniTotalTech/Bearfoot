import React, { Component } from "react";
import ReactTable from "react-table";

class PoolRecordsPage extends Component {
  render() {
    let selections = [
      {
        value: "morningInventory",
        text: "Morning Inventory Count",
      },
      {
        value: "eveningInventory",
        text: "Evening Inventory Count",
      },
      {
        value: "morningChecklist",
        text: "Morning Checklist",
      },
      {
        value: "eveningChecklist",
        text: "Evening Checklist",
      },
      {
        value: "dailyOperation",
        text: "Daily Operations",
      },
      {
        value: "chemLogs",
        text: "Chemical Logs",
      },
    ];

    const columns = [
      {
        Header: "Type Of Record",
        accessor: "accepted_by.name",
        style: {
          //textAlign: "right",
        },
        // width: 100,
      },
      {
        Header: "Date",
        accessor: "status",
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
                  this.navToDelivery(porps.original);
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
        <div className="container p-2 m-2 max-w-lg mx-auto">
          <div className="grid grid-cols-2 p-1">
            {selections.map((item) => (
              <div>
                <label className="inline-flex items-center mx-2">
                  <input
                    type="checkbox"
                    className="form-checkbox text-pink-600"
                  />
                  <span className="ml-2">{item.text}</span>
                </label>
              </div>
            ))}
          </div>
        </div>

        <div className="container max-w-2xl mx-auto">
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
        </div>
      </>
    );
  }
}

export default PoolRecordsPage;
