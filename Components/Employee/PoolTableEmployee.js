import React, { Component } from "react";
import ReactTable from "react-table";
import "react-table/react-table.css";

class PoolTableEmployee extends Component {
  render() {
    const navToPool = (id) => {
      console.log(id);
      this.props.navigation.navigate("PoolDetail", id);
    };
    const navToArea = (id) => {
        this.props.navigation.navigate("AdminAreaDetail",id);
    }

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
        Header: "Area Name",
        accessor: "area_name",
        Cell: (porps) => {
          return (
              <>
                  {this.props.user.role < 4 ? (
                      <div>
                        <p
                            className="rounded text-md mx-auto px-2 font-bold "
                        >
                          {porps.original.area_name}
                        </p>
                      </div>
                  ) :  (
                      <div>
                        <button
                            className="bg-red-500 text-white rounded text-md mx-auto px-2 font-bold "
                            onClick={(e) => {
                              navToArea(porps.original.area_id);
                            }}
                        >
                          {porps.original.area_name}
                        </button>
                      </div>
                  )}
              </>

          );
        },
      },
    ];

    return (
      <div>
        <ReactTable
          className="-striped -highlight"
          data={this.props.data.data}
          filterable
          defaultFilterMethod={filterCaseInsensitive}
          columns={columns}
          defaultPageSize={this.props.data.data > 35 ? 50 : 25}
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
