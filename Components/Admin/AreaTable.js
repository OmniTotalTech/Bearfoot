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

  render() {
    console.log(data);
    const data = this.props.area.data.foundArea;
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
        Header: "Name",
        accessor: "area_name",
        style: {
          textAlign: "right",
        },
        // width: 100,
      },
      {
        Header: "Time Zone",
        accessor: "area_time_zone",
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

export default AreaTable;
