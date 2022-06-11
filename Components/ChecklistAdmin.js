import React from 'react'
import moment from "moment";
import api from "../utils/api";

const ChecklistAdmin = (props) => {

    const [taskText, setTaskText] = React.useState("")


    const handleDelete = async (index, data,id, openFetch, closeFetch) => {
        let d = data;
        d.splice(index,1)
        let url = `dailyChecklist/${id}/${props.type}/patchData`;
        await api
            .put
            (url, {data: d})
            .then((response) => {

                if(props.type == 'opening'){
                    openFetch();
                } else {
                    closeFetch()
                }

            })
            .catch((error) => {
                const errorMsg = error.message;
                console.log(errorMsg)
            });


        console.log(d);
    }
    const handleMovement = async (index, direction, data, id, openFetch, closeFetch) => {

        let d = data;
        let newIndex = index+direction

        let movingItem = d[index] // copy of item You are moving
        let itemToPlaceIntoNewPosition = d[newIndex] //copy of target destination

        d[index] = itemToPlaceIntoNewPosition;
        d[newIndex] = movingItem;


        d[index].position = index
        d[newIndex].position = newIndex



        console.log(d)

        let url = `dailyChecklist/${id}/${props.type}/patchData`;
        await api
            .put
            (url, {data: d})
            .then((response) => {

                if(props.type == 'opening'){
                    openFetch();
                } else {
                    closeFetch()
                }

            })
            .catch((error) => {
                const errorMsg = error.message;
                console.log(errorMsg)
            });


    }
    function ChecklistMap(props) {

        return(
            <>
                {props.data.map((item,i) => (
                    <>
                        <div className={"bg-red-500"}>
                            <h1 className="header-title w-full px-4  w-full text-white ">{i + 1} )</h1>
                            <br />
                            <p className="px-2 text-2xl text-white">{item.text}</p>
                                </div>
                                <div
                                    key={item._id}
                                    className="w-full shadow-md py-2 border-1 p-2 bg-black text-white"
                                >

                                    <div className="grid grid-cols-2 text-center">
                                        <div>
                                            {i != 0 ? (
                                                <button
                                                    onClick={() => handleMovement(i,-1,props.data, props.checklistId, props.fetchDailyChecklistOpening, props.fetchDailyChecklistClosing)}
                                                    className="bg-gray-500 p-1 mx-2 text-white rounded w-full px-4 py-2 w-full "

                                                >
                                                    Down
                                                </button>
                                                ):(
                                                    <></>
                                            )}

                                        </div>

                                        <div>
                                            {props.data.length != (i+1) ? (
                                                    <>
                                                        <button
                                                            onClick={() => handleMovement(i,1,props.data, props.checklistId, props.fetchDailyChecklistOpening, props.fetchDailyChecklistClosing)}
                                                            className="bg-blue-500 p-1 text-white rounded w-full px-4 py-2 w-full "

                                                        >
                                                            Up
                                                        </button>
                                                </>
                                            ):(
                                                    <>
                                                </>
                                            )}

                                        </div>
                                    </div>
                                    <div className="w-1/6">
                                        <button
                                            className="bg-red-500 px-4 py-2 mx-4 my-2 text-white rounded"
                                            onClick={() =>
                                                handleDelete(i,props.data,props.checklistId,props.fetchDailyChecklistOpening,props.fetchDailyChecklistClosing)
                                            }
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            </>
                ))}
            </>
        )
    }
    return (
        <>
                <div className="mx-auto container max-w-2xl mx-4">
                    <div className="bg-white space-y-6 mt-4 w-full">
                        <div className="text-md">Add a New Task</div>
                        <textarea
                            rows={6}
                            value={taskText}
                            className={"w-full border border-4"}
                            onChange={(e) => setTaskText(e.target.value)}
                        />

                        {taskText && taskText.length > 4 ? (
                            <div>
                                {" "}
                                <button
                                    onClick={() => {
                                        props.handleSubmitChecklist(props.type, taskText);
                                        setTaskText("")

                                        // this.setState({ disableButton: true });
                                    }}
                                    className="bg-red-500 text-white px-4 py-2 rounded my-5 text-lg"
                                >
                                    Add{" "}
                                </button>
                            </div>
                        ) : (
                            <div className="my-4">Enter More Data First... </div>
                        )}
                    </div>
                    <div>
                        {props.dailyChecklist ? (
                            <div className="w-full">
                                <ChecklistMap
                                    data={props.dailyChecklist}
                                    checklistId={props.checklistId}
                                    fetchDailyChecklistOpening={props.fetchDailyChecklistOpening}
                                    fetchDailyChecklistClosing={props.fetchDailyChecklistClosing}
                                />
                            </div>

                        ) : (
                            <div>This pool has not set any tasks yet...</div>
                        )}
                    </div>
                </div>
        </>
    )

}
export default ChecklistAdmin