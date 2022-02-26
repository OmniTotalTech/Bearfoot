import React, {useEffect, useState} from 'react';
import api from "../utils/api";

const DailyOperationsPick = (props) => {

  const [subPools, setSubPools] = React.useState([]);
  const [selectedSubPool, setSelectedSubPool] = React.useState(undefined);


    useEffect(() => {
        GetSubPools(props.route.params.id)
    },[])

  const GetSubPools =  async (id) => {

    return await api
        .get("/subPools/" + id)
        .then((response) => {
            console.log(response.data)
          setSubPools(response.data)
        })
        .catch((error) => {
          const errorMsg = error.message;
        })

  }

    function handleChange(e) {
      console.log(e.target.value)
        setSelectedSubPool(e.target.value)
    }

    const SubPoolSelection = (props) => {

      return (
          <>


              {/* Begining of div Container */}
              <div className="container mx-auto bg-white">

              {/* map through, or give default message */}
              {subPools && subPools.length > 0 ? (
                  <div className={"w-full"}>
                      <p className="text-xl">
                        Selecting a pool will take you to it's <span className="bold">Daily Operation</span> edit page.
                      </p>
                      <h1 style={{fontSize: 32}}>
                          Pool Assignment:
                      </h1>
                      {/*Select Statement sets the local state with the entire pool object received from api*/}
                      <select onChange={handleChange} value={selectedSubPool} className="selectpicker">
                            <option value={subPools[0]._id}>Select a Sub Pool</option>
                          {subPools.map((pool,index) => (
                                      <option  value={pool._id.toString()}>{pool.subPoolName}</option>
                          ))}

                      </select>
                      {/*  Dont show button unless you have it defined */}
                      {selectedSubPool == undefined ? (<></>) :(
                          <button onClick={() =>
                              props.navigation.navigate("DailyOperations", {
                                  id: selectedSubPool,
                                  isNew: true,
                              })
                          }
                                  className="bg-red-500 text-white rounded px-4 py-2">
                              <p>
                                  Edit Daily Operations
                              </p>
                          </button>
                      ) }
                  </div>
              ) : (
                  <div>
                      <p className="text-danger">Sorry, we could not get any pools for this location.</p>
                  </div>
              )}


              </div>
          {/*  End of Div Container  */}

          </>
      )
  }


    return (
        <>
        <SubPoolSelection {...props} />

        </>
    )
}

export default DailyOperationsPick;

// import React, { Component } from "react";
// import api from "../utils/api";
// import moment from "moment";
// import BackButton from "../Components/BackButton";
// export default class DailyOperationsPick extends Component {
//   state = { isAm: false, isPm: false, isFound: false, preLoadedData: {} };
//
//   render() {
//     const goToSave = async (item) => {
//       this.props.navigation.navigate("DailyOperationsEdit", {
//         id: this.props.route.params.id,
//         isAm: this.state.isAm,
//         isPm: this.state.isPm,
//         itemd: item,
//       });
//     };
//     const resetState = () => {
//       let init = {
//         isAm: false,
//         isPm: false,
//         isFound: false,
//         preLoadedData: {},
//         searched: false,
//       };
//       this.setState({ ...init });
//     };
//     const handleSetTime = async (text) => {
//       var date = new Date();
//       var dateObj = date;
//       var momentObj = moment(dateObj);
//       var momentString = momentObj.format("YYYY-MM-DD"); // 2016-07-15
//
//       if (text == "am") {
//         this.setState({ isAm: true, isPm: false });
//
//         await api
//           .get(
//             "/records/search/" +
//               this.props.route.params.id +
//               "/" +
//               "dailyOperationsAM/" +
//               momentString
//           )
//           .then((response) => {
//             console.log(response);
//             if (response.data.length > 0) {
//               this.setState({
//                 isFound: true,
//                 searched: true,
//                 resData: response.data,
//                 preLoadedData: response.data,
//               });
//             } else {
//               this.setState({
//                 isFound: false,
//                 searched: true,
//                 resData: null,
//                 preLoadedData: null,
//               });
//             }
//           })
//           .catch((error) => {
//             const errorMsg = error.message;
//           });
//       } else {
//         this.setState({ isAm: false, isPm: true });
//
//         await api
//           .get(
//             "/records/search/" +
//               this.props.route.params.id +
//               "/" +
//               "dailyOperationsPM/" +
//               momentString
//           )
//           .then((response) => {
//             console.log(response);
//             if (response.data.length > 0) {
//               this.setState({
//                 isFound: true,
//                 searched: true,
//                 resData: response.data,
//                 preLoadedData: response.data,
//               });
//             } else {
//               this.setState({
//                 isFound: false,
//                 searched: true,
//                 resData: null,
//                 preLoadedData: null,
//               });
//             }
//           })
//           .catch((error) => {
//             const errorMsg = error.message;
//           });
//       }
//     };
//     return (
//       <div>
//         <BackButton navigation={this.props.navigation} />
//
//         <p className="text-lg mx-auto text-center mt-4">
//           Select Time Slot for Today to Complete a Report:
//         </p>
//         <div className="w-full mx-auto grid grid-cols-2 spacing-1 my-2 text-center">
//           <div>
//             <button
//               className="bg-red-500 text-white w-2/3 rounded "
//               onClick={() => handleSetTime("am")}
//             >
//               Am
//             </button>
//           </div>
//           <div>
//             <button
//               className="bg-red-500 text-white px-4  rounded w-2/3 "
//               onClick={() => handleSetTime("pm")}
//             >
//               Pm
//             </button>
//           </div>
//           {this.state.isFound ? (
//             <div className="w-screen">
//               <div className="container mx-auto p-4 text-center w-full">
//                 Found Records
//               </div>
//               <div className="container mx-auto p-4 text-center w-full">
//                 {this.state.resData ? (
//                   this.state.resData.map((item) => (
//                     <>
//                       <div>{item.time}</div>{" "}
//                       {/* <div>{moment(`${item.date}`, "YYYY-MM-DD")}</div> */}
//                       <div>
//                         {item.recordType == "dailyOperationsPM" ? (
//                           <div>PM - Daily Operations</div>
//                         ) : (
//                           <div>AM - Daily Operations</div>
//                         )}
//                       </div>
//                       <button
//                         className="bg-red-500 text-white rounded px-4 p-2"
//                         onClick={() => {
//                           goToSave(item);
//                           resetState();
//                         }}
//                       >
//                         Edit
//                       </button>
//                     </>
//                   ))
//                 ) : (
//                   <div></div>
//                 )}
//               </div>
//             </div>
//           ) : this.state.searched ? (
//             <div className="w-screen">
//               <div className="container mx-auto p-4 text-center w-full">
//                 No records were found for today. Start a new Daily Operation?
//                 <br />
//                 <button
//                   onClick={() =>
//                     this.props.navigation.navigate("DailyOperations", {
//                       id: this.props.route.params.id,
//                       isNew: true,
//                       isAm: this.state.isAm,
//                       isPm: this.state.isPm,
//                     })
//                   }
//                   className="bg-red-500 text-white rounded px-4 py-2"
//                 >
//                   Create New
//                 </button>
//               </div>
//             </div>
//           ) : (
//             <div></div>
//           )}
//         </div>
//       </div>
//     );
//   }
// }
