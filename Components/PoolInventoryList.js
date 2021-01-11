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
        accessor: "low_amount",
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
        Cell: (porps) => {
          return (
            <div>
              <button
                className="bg-red-500 text-white rounded text-md mx-auto px-2 font-bold "
                disabled
                onClick={(e) => {
                  console.log(e.target.value);
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
