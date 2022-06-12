import React, { Component, useEffect } from "react";

function DailyOperationsSection(props){

    const [facilityManagers, setFacilityManagers] = React.useState([])
    const [headGuards, setHeadGuards] = React.useState([])
    const [poolClosures, setPoolClosures] = React.useState([])

    let hours = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"]
    let minutes = ["00","01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12","13","14","15","16","17","18","19","20","21","22","23","24","25","26","27","28","29","30","31","32","33","34","35","36","37","38","39","40","41","42","43","44","45","46","47","48","49","50","51","52","53","54","55","56","57","58","59"]


    useEffect(() => {

    },[])

    const handleStateUpdate = (type) => {

        switch(type) {
            case ("newFacilityManager"):
                let fm = facilityManagers;
                fm = [...fm, {name: "", startTime:"", endTime: ""}]

                setFacilityManagers(fm);
            case ("newHeadGuard"):
                let hg = headGuards;
                hg = [...hg, {name: "", startTime:"", endTime: ""}]

                setHeadGuards(hg);
            case ("newPoolClosure"):
                let pc = poolClosures;
                pc = [...pc, {reason: "", startTime:"", endTime: "", reasonArray: [], isOpen: "", isClosed: ""}]

                setPoolClosures(pc)
            default:
                null
        }
    }
    const reasonData = [
        {
            name: "Weather",
            formValue: "closedweather",
            choices : [
                {
                    name: "Lightning",
                    formValue: "lightning",
                },
                {
                    name: "Heavy Rain",
                    formValue: "heavyRain",
                },
                {
                    name: "Thunder",
                    formValue: "thunder",
                },
                {
                    name: "Other",
                    formValue: "other",
                },
            ]
        },
        {
            name: "Biological",
            formValue: "closedBio",
            choices : [
                {
                    name: "Vomit",
                    formValue: "vomit",
                },
                {
                    name: "fecal",
                    formValue: "fecal",
                },
            ]
        },
        {
            name: "General",
            formValue: "general",
            choices : [
                {
                    name: "Time Noticed",
                    formValue: "timeNoticed",
                    type: "timeInput"
                },
                {
                    name: "Time Cleaned",
                    formValue: "timeCleaned",
                    type: "timeInput"
                },
                {
                    name: "pH",
                    formValue: "ph",
                    type: "textInput"
                },
                {
                    name: "Chlorine",
                    formValue: "chlorine",
                    type: "textInput"
                },
            ]
        },
        {
            name: "Status",
            formValue: "status",
            choices : [
                {
                    name: "Closed?",
                    formValue: "isClosed"
                },
                {
                    name: "Open?",
                    formValue: "isOpen",
                },

            ]
        }

    ];
    const ClosureInputContainer = () => {
        return (
        <div className="mb-4 px-4 w-full">

            <div className="bg-red-600 text-white text-md font-bold p-2">
                {reasonData[0].name}
                <div className="grid grid-cols-4">
                {reasonData[0].choices.map((item) => (
                    <>
                        <div>
                            <label className="color-label">{item.name}</label>
                                <br/>
                            <input type={"checkbox"} className="checkbox font-weight-normal"/>
                        </div>
                    </>
                    ))}
                </div>
            </div>
            <div className="bg-red-600 text-white text-md font-bold p-2">
                {reasonData[1].name}
                <div className="grid grid-cols-4">
                    {reasonData[1].choices.map((item) => (
                        <>
                            <div>
                                <label className="color-label">{item.name}</label>
                                <br/>
                                <input type={"checkbox"} className="checkbox font-weight-normal"/>
                            </div>
                        </>
                    ))}
                </div>
            </div>
            <div className="bg-red-600 text-white text-md font-bold p-2">
                {reasonData[2].name}
                <div className="grid grid-cols-2 text-black">
                    {reasonData[2].choices.map((item,i) => (
                        <>
                            {reasonData[2].choices[i].type == "timeInput" ? (
                                <>
                                    <div>
                                        <label className="text-white">{item.name}</label>
                                        <GeneralHoursInputContainer/>
                                    </div>
                                </>
                            ): (
                                <div>
                                    <label className="text-white">{item.name}</label>
                                        <br/>
                                    <input type={"text"} className="input-group-text font-weight-normal"/>
                                </div>
                            )}

                        </>
                    ))}
                </div>
            </div>
            <div className="bg-red-600 text-white text-md font-bold p-2">
                {reasonData[3].name}
                <div className="grid grid-cols-2 text-black">
                    {reasonData[3].choices.map((item,i) => (
                        <>
                            <div>
                                <label className="text-white">{item.name}</label>
                                <GeneralHoursInputContainer/>
                            </div>
                        </>
                    ))}
                </div>
            </div>
        </div>)
        }
    const GeneralHoursInputContainer = (props) => {
        return (
            <>
                <div className="mb-4">

                    <div className="px-4 py-1">
                        <div>
                            <br/>
                            <div className="grid grid-cols-2">

                                <div className="w-full">

                                    <select className="selectpicker w-1/2">
                                        {hours.map((item) => <option>{item}</option>)}
                                    </select>
                                    <select className="selectpicker w-1/2">
                                        {minutes.map((item) => <option>{item}</option>)}
                                    </select>
                                </div>
                                <div className="w-100">
                                    <select className="selectpicker">
                                        <option>AM</option>
                                        <option>PM</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
                <hr className="border-dark"/>
            </>
        )
    }

    const HoursInputContainer = (props) => {
        return (
              <>
                  <div className="mb-4">
                      <p style={{fontSize: 20}} className="py-2">Name: </p>
                      <input className="w-100 input-group-text border-primary border-4  mx-4 "/>
                      <div className="grid grid-cols-2 px-4 py-1">
                          <div>
                              <p style={{fontSize:18}} className="text-lg">Start Time:</p>
                              <br/>
                              <div className="grid grid-cols-2">

                                  <div className="w-full">

                                      <select className="selectpicker w-1/2">
                                          {hours.map((item) => <option>{item}</option>)}
                                      </select>
                                      <select className="selectpicker w-1/2">
                                          {minutes.map((item) => <option>{item}</option>)}
                                      </select>
                                  </div>
                                  <div className="w-100">
                                      <select className="selectpicker">
                                          <option>AM</option>
                                          <option>PM</option>
                                      </select>
                                  </div>
                              </div>
                          </div>
                          <div>
                              <p style={{fontSize:18}} className="text-lg">End Time:</p>
                              <br/>
                              <div className="grid grid-cols-2">

                                  <div className="w-full">

                                      <select className="selectpicker w-1/2">
                                          {hours.map((item) => <option>{item}</option>)}
                                      </select>
                                      <select className="selectpicker w-1/2">
                                          {minutes.map((item) => <option>{item}</option>)}
                                      </select>
                                  </div>
                                  <div className="w-100">
                                      <select className="selectpicker">
                                          <option>AM</option>
                                          <option>PM</option>
                                      </select>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>
                  <hr className="border-dark"/>
              </>
            )
        }


    return (
      <>
        <div className="container mx-auto bg-white">
          <div className="bg-red-500 text-white text-xl font-bold p-4">
            Daily Operations
          </div>

            <label text="2xl">Shift Notes: </label>
            <br/>
            <textarea rows={3} className="swal2-textarea border-danger border-4 w-full mx-4"/>


          <div>

            <div className="bg-red-600 text-white text-lg font-bold p-2">
              Facility Managers
            </div>

              <button onClick={() => handleStateUpdate("newFacilityManager")} className="btn bg-red-500 btn-lg px-4 py-2 text-white bold mx-4 my-2">
                  Add a shift +
              </button>

              {facilityManagers.map((item,i) => <HoursInputContainer props={props} />)}

              <div className="bg-red-600 text-white text-lg font-bold p-2">
                  Head Guards
              </div>

              <button onClick={() => handleStateUpdate("newHeadGuard")} className="btn bg-red-500 btn-lg px-4 py-2 text-white bold mx-4 my-2">
                  Add a shift +
              </button>

              {headGuards.map((item,i) => <HoursInputContainer props={props} />)}

              <div className="bg-red-600 text-white text-lg font-bold p-2">
                  Pool Closures
              </div>

              <button onClick={() => handleStateUpdate("newPoolClosure")} className="btn bg-red-500 btn-lg px-4 py-2 text-white bold mx-4 my-2">
                  Add a Pool Closure +
              </button>

              {poolClosures.map((item,i) => <ClosureInputContainer props={props} />)}



          </div>
        </div>
      </>
    );
  }

  export default DailyOperationsSection

