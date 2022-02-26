import React, { Component } from "react";
import ReactTable from "react-table";
import "react-table/react-table.css";
import StatusButton from "../General/StatusButton";

class DeliveryTable extends Component {
  navToDelivery = (id) => {
    console.log(id);
    this.props.navigation.navigate("DeliveryDetails", { item: id });
  };

  navToEditUser = (id) => {
    this.props.navigation.navigate("EditUser", { id: id.accepted_by._id });
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
  }

  render() {
    const switchStatement = (status) => {
      switch (status) {
        case 0:
          return "not accepted";
        case 1:
          return "Inventory Stage";
        case 2:
          return "En Route to Pool";
        case 3:
          return "Dropping off";
        case 4:
          return "Waiting on driver finalization";
        case 5:
          return "Complete!";
      }
    };
    const data = this.props.data.data;
    const columns = [
      {
        Header: "Pool:",
        accessor: "pool_id.pool_name",
        style: {
          //textAlign: "right",
        },
        // width: 100,
      },
      {
        Header: "Accepted By?",
        accessor: "accepted_by.name",
        Cell: (porps) => {
          return (
            <div>
              {porps.original.accepted_by == null ? (
                "No one has accepted yet..."
              ) : (
                <div>
                  <button
                    className="bg-red-500 text-white rounded text-md mx-auto px-2 font-bold "
                    onClick={(e) => this.navToEditUser(porps.original)}
                  >
                    {porps.original.accepted_by.name}
                  </button>
                </div>
              )}
            </div>
          );
        },
      },
      // width: 100,

      {
        Header: "Status",
        accessor: "status",
        Cell: (porps) => {
          return <div>{switchStatement(porps.original.status)}</div>;
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

    return (
      <div>
        <ReactTable
          className="-striped -highlight"
          data={data}
          filterable
          defaultFilterMethod={this.filterCaseInsensitive}
          previousText={<button style={{ backgroundColor: "black" }} className="btn p-8"><p className="text-white">Previous Page</p></button>}
          nextText={<button style={{ backgroundColor: "red" }} className="btn p-8"><p className="text-white">Next Page</p></button>}
          columns={columns}
          defaultPageSize={data?.length > 35 ? 50 : 25}
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

export default DeliveryTable;
