import React, { Component } from "react";
import ReactTable from "react-table";

export default class PoolInventoryList extends Component {
  //   navToArea = () => {
  //     this.props.navigation.navigate("AdminAreaDetail");
  //   };

  render() {
    console.log(this.props);
    // const data = this.props.data.data;
    const columns = [
      {
        Header: "Day",
        accessor: "day_of_week",
        style: {
          //textAlign: "right",
        },
        // width: 100,
      },
      {
        Header: "Status",
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
                disabled
                onClick={(e) => {
                  this.navToArea(porps.original.id);
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

    return (
      <div>
        <ReactTable
          className="-striped -highlight"
          //   data={data}
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
