import React, { Component } from "react";
import ReactTable from "react-table";
import "react-table/react-table.css";

class PoolTable extends Component {
  render() {
    console.log(data);
    const data = this.props.pool.data.foundPool;
    const columns = [
      {
        Header: "ID",
        accessor: "_id",
        style: {
          textAlign: "right",
        },
        // width: 100,
      },
      {
        Header: "Pool Name",
        accessor: "pool_name",
        style: {
          textAlign: "right",
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
      // {
      //   Header: "Status",
      //   accessor: "body",
      // },
      // {
      //   Header: "Actions",
      //   filterable: false,
      //   sortable: false,
      //   resizable: false,
      //   Cell: (porps) => {
      //     return (
      //       <button
      //         style={{ background: "red", color: "#fefefe" }}
      //         onClick={(e) => {
      //           this.deletePoste(porps.original.id);
      //         }}
      //       >
      //         Delete
      //       </button>
      //     );
      //   },
      //   width: 100,
      //   maxWidth: 100,
      //   minWidth: 100,
      // },
    ];

    return (
      <div>
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

export default PoolTable;
