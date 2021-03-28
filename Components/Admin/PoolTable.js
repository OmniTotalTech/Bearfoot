import React, { Component } from "react";
import ReactTable from "react-table";
import "react-table/react-table.css";
import api from "../../utils/api";
import moment from "moment";

class PoolTable extends Component {
  state = { completeArray: [] };

  async componentWillReceiveProps(nextProps) {
    const data = nextProps.data;

    let dataArray = [];
    let finalDataArray = [];
    console.log("willreceive", nextProps);

    for (var i = 0; i < data.length; i++) {
      console.log(data[i]._id);
      dataArray.push(data[i]._id);
    }

    console.log(dataArray);
    finalDataArray = await searchAPI(dataArray, data);
    console.log(finalDataArray);
    this.setState({ completeArray: finalDataArray });
  }

  render() {
    let data = this.props.data;
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
      {
        Header: "Forms Complete",
        accessor: "area_name",
        style: {
          textAlign: "right",
        },
        Cell: (porps) => {
          return (
            <div>
              {this.state.completeArray.includes(porps.original._id) ? (
                <button className="bg-green-500 text-white rounded text-md mx-auto px-2 font-bold ">
                  <div>Submitted!</div>
                </button>
              ) : (
                <div>
                  <button className="bg-red-500 text-white rounded text-md mx-auto px-2 font-bold ">
                    Missing
                  </button>
                </div>
              )}
            </div>
          );
        },
      },
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

const searchAPI = async (dataArray, data) => {
  let completedArray = [];
  const date = new Date();
  const nowDate = moment(date);
  const formattedDate = nowDate.format("YYYY-MM-DD");
  await api
    .post(
      "/records/admin/multiplePools/searchByDate/" + formattedDate,
      dataArray
    )
    .then((response) => {
      console.log(response.data.data);
      for (var i = 0; i < response.data.data.length; i++) {
        console.log(i);
        if (response.data.data[i].allCompleted) {
          console.log(response.data.data[i]);
          completedArray.push(response.data.data[i].pool_id);
        }
      }
      console.log(completedArray);
    })
    .catch((error) => {
      const errorMsg = error.message;
      completedArray = [];
    });
  console.log(completedArray);
  return completedArray;
};

export default PoolTable;
