import React from 'react'
import moment from "moment";
import api from "../utils/api";

const ChecklistAdmin = (props) => {

    const [taskText, setTaskText] = React.useState("")
    console.log(props)

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


        let url = `dailyChecklist/${id}/updateData/patchData`;
        await api
            .put
            (url, {data: d})
            .then((response) => {
                console.log(response.data);
                openFetch();

            })
            .catch((error) => {
                const errorMsg = error.message;
                console.log(errorMsg)
            });


    }
    function ChecklistMap(props) {

        console.log(props.data)
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
                                                handleDelete(item._id, "opening")
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
            {props.dailyChecklist.length > 0 ? (
                <div className="mx-auto container max-w-2xl mx-4">
                    <div className="bg-white space-y-6 mt-4 w-full">
                        {/*<p className="text-lg">*/}
                        {/*    Last updated:*/}
                        {/*    {moment(props.dailyChecklist.data.lastUpdated).format('lll')}*/}
                        {/*</p>*/}
                        {/*<p className="text-lg">*/}
                        {/*    Last updated by:*/}
                        {/*    {props.dailyChecklist.data.lastUpdatedBy}*/}
                        {/*</p>*/}
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
                                        props.handleSubmitChecklist("opening", taskText);
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
            ):(
                <div className="mx-auto container max-w-2xl mx-4">
                    <div className="bg-white space-y-6 mt-4 w-full">
                    {/*    <p className="text-lg">*/}
                    {/*        Last updated:*/}
                    {/*        {moment(props.dailyChecklist.data.lastUpdated).format('lll')}*/}
                    {/*    </p>*/}
                    {/*    <p className="text-lg">*/}
                    {/*        Last updated by:*/}
                    {/*        {props.dailyChecklist.data.lastUpdatedBy}*/}
                    {/*    </p>*/}
                    {/*    <div className="text-md">Add a New Task</div>*/}
                    {/*    <textarea*/}
                    {/*        rows={6}*/}
                    {/*        value={this.state.taskText}*/}
                    {/*        className={"w-full border border-4"}*/}
                    {/*        onSubmit={() => this.setState({ taskText: "" })}*/}
                    {/*        onChange={(e) => handleChecklistInput(e)}*/}
                    {/*    />*/}

                    {/*    {this.state.taskText && this.state.taskText.length > 4 ? (*/}
                    {/*        <div>*/}
                    {/*            {" "}*/}
                    {/*            <button*/}
                    {/*                onClick={() => {*/}
                    {/*                    handleSubmitChecklist("opening");*/}
                    {/*                    this.setState({ disableButton: true });*/}
                    {/*                }}*/}
                    {/*                className="bg-red-500 text-white px-4 py-2 rounded my-5 text-lg"*/}
                    {/*            >*/}
                    {/*                Add{" "}*/}
                    {/*            </button>*/}
                    {/*        </div>*/}
                    {/*    ) : (*/}
                    {/*        <div className="my-4">Enter More Data First... </div>*/}
                    {/*    )}*/}
                    {/*</div>*/}
                    {/*<div>*/}
                    {/*    {props.dailyChecklist.data &&*/}
                    {/*    props.dailyChecklist.data.data ? (*/}
                    {/*        <div className="w-full">*/}
                    {/*            <ChecklistMap data={props.dailyChecklist.data.data}/>*/}
                    {/*            {props.dailyChecklist.data.data.map((item, i) => (*/}
                    {/*                <>*/}
                    {/*                    <div className={"bg-red-500"}>*/}
                    {/*                        <h1 className="header-title w-full px-4  w-full text-white ">{i + 1} )</h1>*/}
                    {/*                        <br />*/}
                    {/*                        <p className="px-2 text-2xl text-white">{item.text}</p>*/}

                    {/*                    </div>*/}
                    {/*                    <div*/}
                    {/*                        key={item._id}*/}
                    {/*                        className="w-full shadow-md py-2 border-1 p-2 bg-black text-white"*/}
                    {/*                    >*/}

                    {/*                        <div className="grid grid-cols-2 text-center">*/}
                    {/*                            <div>*/}
                    {/*                                <button*/}
                    {/*                                    className="bg-gray-500 p-1 mx-2 text-white rounded w-full px-4 py-2 w-full "*/}

                    {/*                                >*/}
                    {/*                                    Down*/}
                    {/*                                </button>*/}
                    {/*                            </div>*/}

                    {/*                            <div>*/}
                    {/*                                <button*/}
                    {/*                                    className="bg-blue-500 p-1 text-white rounded w-full px-4 py-2 w-full "*/}

                    {/*                                >*/}
                    {/*                                    Up*/}
                    {/*                                </button>*/}
                    {/*                            </div>*/}
                    {/*                        </div>*/}
                    {/*                        <div className="w-1/6">*/}
                    {/*                            <button*/}
                    {/*                                className="bg-red-500 px-4 py-2 mx-4 my-2 text-white rounded"*/}
                    {/*                                onClick={() =>*/}
                    {/*                                    handleDelete(item._id, "opening")*/}
                    {/*                                }*/}
                    {/*                            >*/}
                    {/*                                Delete*/}
                    {/*                            </button>*/}
                    {/*                        </div>*/}
                    {/*                    </div>*/}
                    {/*                </>*/}
                    {/*            ))}*/}
                    {/*        </div>*/}
                    {/*    ) : (*/}
                    {/*        <div>This pool has not set any tasks yet...</div>*/}
                    {/*    )}*/}
                    </div>
                </div>
            )}

        </>
    )
    
}


                    {/*            {props.dailyChecklist.data.data.map((item, i) => (*/}
                    {/*                <>*/}
                    {/*                    <div className={"bg-red-500"}>*/}
                    {/*                        <h1 className="header-title w-full px-4  w-full text-white ">{i + 1} )</h1>*/}
                    {/*                        <br />*/}
                    {/*                        <p className="px-2 text-2xl text-white">{item.text}</p>*/}

                    {/*                    </div>*/}
                    {/*                    <div*/}
                    {/*                        key={item._id}*/}
                    {/*                        className="w-full shadow-md py-2 border-1 p-2 bg-black text-white"*/}
                    {/*                    >*/}

                    {/*                        <div className="grid grid-cols-2 text-center">*/}
                    {/*                            <div>*/}
                    {/*                                <button*/}
                    {/*                                    className="bg-gray-500 p-1 mx-2 text-white rounded w-full px-4 py-2 w-full "*/}

                    {/*                                >*/}
                    {/*                                    Down*/}
                    {/*                                </button>*/}
                    {/*                            </div>*/}

                    {/*                            <div>*/}
                    {/*                                <button*/}
                    {/*                                    className="bg-blue-500 p-1 text-white rounded w-full px-4 py-2 w-full "*/}

                    {/*                                >*/}
                    {/*                                    Up*/}
                    {/*                                </button>*/}
                    {/*                            </div>*/}
                    {/*                        </div>*/}
                    {/*                        <div className="w-1/6">*/}
                    {/*                            <button*/}
                    {/*                                className="bg-red-500 px-4 py-2 mx-4 my-2 text-white rounded"*/}
                    {/*                                onClick={() =>*/}
                    {/*                                    handleDelete(item._id, "opening")*/}
                    {/*                                }*/}
                    {/*                            >*/}
                    {/*                                Delete*/}
                    {/*                            </button>*/}
                    {/*                        </div>*/}
                    {/*                    </div>*/}
                    {/*                </>*/}
                    {/*            ))}*/}
                    {/*        </div>*/}
export default ChecklistAdmin