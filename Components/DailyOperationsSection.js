import React, { Component, useEffect } from "react";

function DailyOperationsSection(props) {



    let hours = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"]
    let minutes = ["00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31", "32", "33", "34", "35", "36", "37", "38", "39", "40", "41", "42", "43", "44", "45", "46", "47", "48", "49", "50", "51", "52", "53", "54", "55", "56", "57", "58", "59"]






    const  handleSubmit = (e) => {


        let dataObject = {
                shiftNotes: props.shiftNotes,
                poolClosures: props.poolClosures,
                headGuards: props.headGuards,
                facilityManagers: props.facilityManagers
            }


        props.handleSubmit(e,dataObject)
    }

    const handleStateUpdate = (type,state,index,key,value) => {
        switch (type) {
            case ("newFacilityManager"):
                let fm = {
                    name: "",
                    timeData: {
                        startTimeH: "",
                        startTimeM: "",
                        startTimeAP: "",
                        endTimeH: "",
                        endTimeM: "",
                        endTimeAP: ""
                    },
                }
                props.handleStateUpdate("addFM",fm);
                break;
            case ("newHeadGuard"):
                let hg = state.headGuards;
                hg = {
                    name: "",
                    timeData: {
                        startTimeH: "",
                        startTimeM: "",
                        startTimeAP: "",
                        endTimeH: "",
                        endTimeM: "",
                        endTimeAP: ""
                    },
                }
                    props.handleStateUpdate("addHG",hg);
                break;
            case ("newPoolClosure"):
                let pc = state.poolClosures;
                pc = {
                    reason: "",
                    timeData: {
                        timeNoticedH: "",
                        timeNoticedM: "",
                        timeNoticedAP: "",
                        timeCleanedH:"",
                        timeCleanedM:"",
                        timeCleanedAP:"",
                        isOpenH: "",
                        isOpenM: "",
                        isOpenAP: "",
                        isClosedH: "",
                        isClosedM: "",
                        isClosedAP: "",
                    },
                    ph: "",
                    chlorine: "",
                    reasonArray: [],
                    isOpen: false,
                    isClosed: false
                }

                props.handleStateUpdate("addPC",pc);
                break;
            case "facilityManager":
                let s = state
                s[key] = value

                console.log(s);

                break;
            case "facilityManagerT":
                s = state
                s.timeData[key] = value

                console.log(s);
                fm = props.state.facilityManagers;
                fm[index] = s;
               // props.setState({facilityManagers:fm})

                break;
            case "headGuard":
                s = state
                s[key] = value

                break;
            case "headGuardT":
                s = state
                s.timeData[key] = value

                console.log(s);
                hg = props.state.headGuards;
                hg[index] = s;
                // props.setState({facilityManagers:fm})

                break;
            case "reasonArray":

                s = state;

                if(value == true){
                    s.reasonArray.push(key)
                }

                if(value != true){
                    let ifFound = s.reasonArray.indexOf(key,0)
                    if(ifFound != null | undefined){
                        s.reasonArray.splice(ifFound,1)
                    }
                }

                break;
            case "timeData":
                s = state;
                s.timeData[key] = value;


                break;
                // props.handleStateUpdate("updateFM",s,index);
            case "textInput":
                s = state;
                s[key] = value;

                break;
            default:
                break;
        }
    }
    const reasonData = [
        {
            name: "Weather",
            formValue: "closedweather",
            choices: [
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
            choices: [
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
            choices: [
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
            choices: [
                {
                    name: "Closed?",
                    formValue: "isClosed",
                    type: ""
                },
                {
                    name: "Open?",
                    formValue: "isOpen",
                    type: ""
                },

            ]
        }

    ];

    const handleInput = (e, index, key) => {
        let pc = poolClosures;

        pc[index][key] = e.target.value;

        props.setPoolClosures(pc);
    }

    const handleCheck = (name,val, i) => {
        // console.log(poolClosures[i])
        // setPoolClosures(poolClosures[i].name)

        let pc = poolClosures
        let pcra = poolClosures[i].reasonArray;

        if(pcra.length > 0)
        {
            if(val == false) pcra = pcra.filter(e => e !== name)
            else pcra.push(name);
        } else {
            if(val == true) pcra.push(name);
        }


        pc[i].reasonArray = pcra
        props.setPoolClosures(pc);
    }
    const ClosureInputContainer = (props) => {

        return (
            <div className="mb-4 px-4 w-full">

                <div className="bg-red-600 text-white text-md font-bold p-2">
                    <span style={{fontSize: 32, shadow: "large"}}> {reasonData[0].name}</span>
                    <div className="grid grid-cols-4">
                        {reasonData[0].choices.map((item) => (
                            <>
                                <div>
                                    <label className="color-label">{item.name}</label>
                                    <br />
                                    <input
                                        defaultChecked={props.state.reasonArray.includes(item.name)}
                                        value={item.name}
                                        onChange={(e) => handleStateUpdate( "reasonArray",props.state, props.index,e.target.value,e.target.checked)}
                                        type={"checkbox"}
                                        className="checkbox font-weight-normal" />
                                </div>
                            </>
                        ))}
                    </div>
                </div>
                <div className="bg-red-600 text-white text-md font-bold p-2">
                    <span style={{fontSize: 32, shadow: "large"}}> {reasonData[1].name}</span>
                    <div className="grid grid-cols-4">
                        {reasonData[1].choices.map((item) => (
                            <>
                                <div>
                                    <label className="color-label">{item.name}</label>
                                    <br />
                                    <input
                                        // defaultChecked={props.poolClosures[props.index]?.reasonArray.includes(item.name)}
                                        defaultChecked={props.state.reasonArray.includes(item.name)}
                                        type={"checkbox"}
                                        className="checkbox font-weight-normal"
                                        value={item.name}
                                        onChange={(e) => handleStateUpdate( "reasonArray",props.state, props.index,e.target.value,e.target.checked)}
                                    />
                                </div>
                            </>
                        ))}
                    </div>
                </div>
                <div className="bg-red-600 text-white text-md font-bold p-2">
                    <span style={{fontSize: 32, shadow: "large"}}> {reasonData[2].name}</span>
                    <div className="grid grid-cols-2 text-black">
                        {reasonData[2].choices.map((item, i) => (

                            <>
                                {item.type == "timeInput" ? (
                                    <>
                                        <div>
                                            <label className="text-white">{item.name}</label>
                                            <GeneralHoursInputContainer poolClosures={props.state.poolClosures} state={props.state} type={"timeData"} setFunc={HoursFunction} index={props.index} item={item}  />

                                        </div>
                                    </>
                                ) : (
                                    <div>
                                        <label className="text-white">{item.name}</label>
                                        <br />
                                        <input
                                            // defaultValue={props.poolClosures[props.index][item.formValue]}
                                            // defaultValue={props.poolClosures[props.index].timeData[formValueM]}
                                            onChange={(e) => handleStateUpdate( "textInput",props.state, props.index,props.item.formValue,e.target.value)}
                                            // defaultValue={props.poolClosures[props.index].timeData[formValueH]}
                                            defaultValue={props.state[`${props.item.formValue}`]}
                                        />
                                    </div>
                                )}

                            </>
                        ))}
                    </div>
                </div>
                <div className="bg-red-600 text-white text-md font-bold p-2">
                    <span style={{fontSize: 32, shadow: "large"}}> {reasonData[3].name}</span>
                    <div className="grid grid-cols-2 text-black">
                        {reasonData[3].choices.map((item, i) => (
                            <>

                                <div>
                                    <label className="text-white">{item.name}</label>
                                    <GeneralHoursInputContainer
                                        poolClosures={props.poolClosures}
                                        state={props.state}
                                        type={"timeData"}
                                        setFunc={HoursFunction}
                                        index={props.index}
                                        item={item}
                                    />
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
                            <br />
                            <div className="grid grid-cols-1">

                                <div className="w-full">
                                    <select
                                        onChange={(e) => handleStateUpdate( "timeData",props.state, props.index,props.item.formValue+"H",e.target.value)}
                                        defaultValue={props.state.timeData[`${props.item.formValue}H`]}

                                        // onChange={(e) => {
                                        //     props.setFunc(props.type, (`${props.item.formValue}H`), e.target.value,props.index)
                                        //     }}
                                        // defaultValue={props.item.timeNoticedH}
                                        className="selectpicker w-1/2 p-2">
                                        {hours.map((item,i) => <option key={i} value={item}>{item}</option>)}
                                    </select>
                                    <select
                                        // defaultValue={props.poolClosures[props.index].timeData[formValueM]}
                                        onChange={(e) => handleStateUpdate( "timeData",props.state, props.index,props.item.formValue+"M",e.target.value)}
                                        // defaultValue={props.poolClosures[props.index].timeData[formValueH]}
                                        defaultValue={props.state.timeData[`${props.item.formValue}M`]}
                                        className="selectpicker w-1/2 p-2">
                                        {minutes.map((item,i) => <option key={i} value={item}>{item}</option>)}
                                    </select>
                                </div>
                                <div className="w-100">
                                    <select className="selectpicker"
                                            // defaultValue={props.poolClosures[props.index].timeData[formValueAP]}
                                        // defaultValue={props.poolClosures[props.index].timeData[formValueM]}
                                            onChange={(e) => handleStateUpdate( "timeData",props.state, props.index,props.item.formValue+"AP",e.target.value)}
                                        // defaultValue={props.poolClosures[props.index].timeData[formValueH]}
                                            defaultValue={props.state.timeData[`${props.item.formValue}AP`]}
                                    >
                                        <option value={"AM"}>AM</option>
                                        <option value={"PM"}>PM</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </>
        )
    }

    const HoursInputContainer = (props) => {
        // const [h, setH] = React.useState({name: "",startTime: "", endTime: ""})
        return (
            <>
                <div className="mb-4">
                    <p style={{ fontSize: 20 }} className="py-2 mx-4">Name: </p>
                    <input
                        defaultValue={props.state.name}
                        // name={`${props.}`}
                        onChange={(e) => handleStateUpdate( props.type,props.state, props.index,"name",e.target.value)}
                        className="w-100 input-group-text border-primary border-4  mx-4 "
                    />

                    <div className="grid grid-cols-2 px-4 py-1 gap-x-1">
                        <div>
                            <p style={{ fontSize: 18 }} className="text-lg">Start Time:</p>
                            <br />
                            <div className="grid grid-cols-1">

                                <div className="w-full">

                                    <select defaultValue={props.state.timeData.startTimeH}
                                            onChange={(e) => handleStateUpdate( props.type+"T",props.state, props.index,"startTimeH",e.target.value)}
                                            className="selectpicker w-1/2 p-2">
                                        <option value={"0"}>Hours</option>
                                        {hours.map((item,i) => <option key={i} value={item}>{item}</option>)}
                                    </select>
                                    <select defaultValue={props.state.timeData.startTimeM}
                                            onChange={(e) => handleStateUpdate( props.type+"T",props.state, props.index,"startTimeM",e.target.value)}
                                            className="selectpicker w-1/2 p-2">
                                        <option value={"00"}>Minutes</option>
                                        {minutes.map((item,i) => <option  key={i}  value={item}>{item}</option>)}
                                    </select>
                                </div>
                                <div className="w-100">
                                    <select
                                        defaultValue={props.state.timeData.startTimeAP}
                                        onChange={(e) => handleStateUpdate( props.type+"T",props.state, props.index,"startTimeAP",e.target.value)}
                                        className="selectpicker w-1/2 p-2"
                                    >
                                        <option value={"AM"}>AM</option>
                                        <option value={"PM"}>PM</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div>
                            <p style={{ fontSize: 18 }} className="text-lg">End Time:</p>
                            <br />
                            <div className="grid grid-cols-1">

                                <div className="w-full">

                                    <select defaultValue={props.state.timeData.endTimeH}
                                            onChange={(e) => handleStateUpdate( props.type+"T",props.state, props.index,"endTimeH",e.target.value)}
                                             className="selectpicker w-1/2 p-2">
                                        <option value={"0"}>Hours</option>
                                        {hours.map((item,i) => <option  key={i}  value={item}>{item}</option>)}
                                    </select>
                                    <select defaultValue={props.state.timeData.endTimeM}
                                            onChange={(e) => handleStateUpdate( props.type+"T",props.state, props.index,"endTimeM",e.target.value)}
                                            className="selectpicker w-1/2 p-2">
                                        <option value={"00"}>Minutes</option>
                                        {minutes.map((item,i) => <option  key={i}  value={item}>{item}</option>)}
                                    </select>
                                </div>
                                <div className="w-100">
                                    <select defaultValue={props.state.timeData.endTimeAP}
                                            onChange={(e) => handleStateUpdate( props.type+"T",props.state, props.index,"endTimeAP",e.target.value)}
                                            className="selectpicker w-1/2 p-2">
                                        <option value={"AM"}>AM</option>
                                        <option value={"PM"}>PM</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <hr className="border-dark" />
            </>
        )
    }

    const HoursFunction = (type, arg, val,index) => {
        let fm = props.facilityManagers;
        let hg = props.headGuards
        let pc = props.poolClosures


        switch(type){
            case "facilityManager":
                if(arg=="name"){
                    fm[index][arg] = val;
                } else {
                    fm[index].timeData[arg] = val;
                }
                props.setFacilityManagers(fm);
                break;
            case "headGuard":

                if(arg == "name"){
                    hg[index][arg] = val;
                } else {
                    hg[index].timeData[arg] = val;
                }


                props.setHeadGuards(hg);
                break;
            case "timeData":

                pc[index].timeData[arg] = val;
                props.setPoolClosures(pc);

                break;


            default:
                break;
        }


    }

    return (
        <>
            <div className="container mx-auto bg-white">
                <div className="bg-red-500 text-white text-xl font-bold p-4">
                    Daily Operations
                </div>
                    <div>
                        <label className={"text-xl p-2"}>Shift Notes: </label>
                        <br />
                        <textarea
                            onChange={(e) => handleStateUpdate( "textInput",props.state, props.index,"shiftNotes",e.target.value)}
                            defaultValue={props.state.shiftNotes}
                            rows={3}  className="swal2-textarea border-danger border-4 w-5/6 mx-4 my-2" />

                    </div>
                <div>
                    <form>
                    <div className="bg-red-600 text-white text-lg font-bold p-2">
                        Facility Managers
                    </div>

                    <button onClick={(e) => {e.preventDefault(),handleStateUpdate("newFacilityManager",props.state)}} className="btn bg-red-500 btn-lg px-4 py-2 text-white bold mx-4 my-2">
                        Add a shift +
                    </button>

                    {props.state.facilityManagers.map((item, i) => <HoursInputContainer key={i} state={props.state.facilityManagers[i]}  type="facilityManager" setFunc={HoursFunction} index={i} item={item} />)}

                    <div className="bg-red-600 text-white text-lg font-bold p-2">
                        Head Guards
                    </div>

                        <button onClick={(e) => {e.preventDefault(),handleStateUpdate("newHeadGuard",props.state)}} className="btn bg-red-500 btn-lg px-4 py-2 text-white bold mx-4 my-2">
                        Add a shift +
                    </button>

                    {props.state.headGuards.map((item, i) => <HoursInputContainer key={i} state={props.state.headGuards[i]}  type="headGuard" setFunc={HoursFunction} index={i} item={item}  />)}

                    <div className="bg-red-600 text-white text-lg font-bold p-2">
                        Pool Closures
                    </div>

                    <button onClick={(e) => {e.preventDefault(),handleStateUpdate("newPoolClosure",props.state)}} className="btn bg-red-500 btn-lg px-4 py-2 text-white bold mx-4 my-2">
                        Add a Pool Closure +
                    </button>

                    {props.state.poolClosures.map((item, i) => (
                        <ClosureInputContainer
                            key={i}
                            state={props.state.poolClosures[i]}
                            index={i}
                            item={item}
                        type={item.formValue}

                        handleCheck={(name,val) => handleCheck(name,val,i)}
                        />
                    ))}


                    </form>
                </div>
                <button
                    onClick={(e) => handleSubmit(e)}
                    className="bg-red-700 hover:bg-red-600 text-white font-semibold py-2 px-4 border border-red-400 rounded shadow"
                >
                    Submit
                </button>
            </div>
        </>
    );
}

export default DailyOperationsSection

