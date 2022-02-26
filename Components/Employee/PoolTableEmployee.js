import React, { Component } from "react";
import ReactTable from "react-table";
import "react-table/react-table.css";

class PoolTableEmployee extends Component {
  render() {
    const navToPool = (id) => {
      console.log(id);
      this.props.navigation.navigate("PoolDetail", id);
    };
    const columns = [
      {
        Header: "Pool Name",
        accessor: "pool_name",
        style: {
          textAlign: "right",
        },
        Cell: (porps) => {
          return (
            <div>
              <button
                className="bg-red-500 text-white rounded text-md mx-auto px-2 font-bold "
                onClick={(e) => {
                  navToPool(porps.original._id);
                }}
              >
                {porps.original.pool_name}
              </button>
            </div>
          );
        },
        // width: 100,
      },
      {
        Header: "Address",
        accessor: "pool_address",
        style: {
          textAlign: "right",
        },
      },
      {
        Header: "State",
        accessor: "pool_state",
        style: {
          textAlign: "right",
        },
      },
      {
        Header: "Area Id",
        accessor: "area_id",
        style: {
          textAlign: "right",
        },
      },
      {
        Header: "Area Name",
        accessor: "area_name",
        style: {
          textAlign: "right",
        },
      },
    ];

    return (
      <div>
        <ReactTable
          className="-striped -highlight"
          data={this.props.data.data}
          filterable
          columns={columns}
<<<<<<< HEAD
          defaultPageSize={ this.props.data.data > 35 ? 50 : 25 }
=======
          defaultPageSize={10}
>>>>>>> a8ccdac77f8b7a47ef2a0db5e9b084921f0b02be
        >
          {(state, makeTable, instance) => {
            this.reactTable = state.pageRows.map((modem) => {
              return modem._original;
            });
            return (
              <div>
                {makeTable()}
                {/* <ExportToExcel posts={this.reactTable} /> */}
              </div>
            );
          }}
        </ReactTable>
      </div>
    );
  }
}

export default PoolTableEmployee;
