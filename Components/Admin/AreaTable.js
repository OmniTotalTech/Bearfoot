import React, { Component } from "react";
import ReactTable from "react-table";
import "react-table/react-table.css";

class AreaTable extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     area: [],
  //   };
  //   console.log(this.props);
  // }

  componentDidMount() {
    // const url = "https://jsonplaceholder.typicode.com/posts";
    // fetch(url, {
    //   method: "GET",
    // })
    //   .then((response) => response.json())
    //   .then((posts) => {
    //     this.setState({ posts: posts });
    //   });
  }

  // deletePoste(id) {
  //   const index = this.state.posts.findIndex((post) => {
  //     return post.id === id;
  //   });
  //   this.state.posts.splice(index, 1);
  //   this.setState({ posts: this.state.posts });
  // }

  navToArea = (props) => {
    console.log(props.original._id);
    const id = props.original._id;
    this.props.navigation.navigate("AdminAreaDetail", id);
  };

  render() {
    console.log(this.props);
    const data = this.props.area.data.foundArea;
    const columns = [
      {
        Header: "Name",
        accessor: "areaName",
        style: {
          //textAlign: "right",
        },
        // width: 100,
      },
      {
        Header: "Time Zone",
        accessor: "areaTimeZone",
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
                  this.navToArea(porps);
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

export default AreaTable;
