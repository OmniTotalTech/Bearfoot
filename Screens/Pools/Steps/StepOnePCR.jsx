import React from 'react';

const StepOnePCR = (props) => {

    const [localState, setLocalState] = React.useState(
        {
            name: "",
            email: "",
            age: 0,
            sex: "",
            address: "",
            city: "",
            state: "",
            zip: "00000"
        }
    )

    const HandleLocalState = (e, key) => {
        let val = e.target.value;
        let state = localState;

        state[key] = val;
        console.log(state);
        setLocalState(state);
    }


    return (
        <>
            <div className="container p-4 mx-auto ">
                <div className='w-full mx-2'>
                    <label className="text-md">Name</label>
                    <br />
                    <input
                        className='p-2 w-11/2 mx-2'
                        type="text"
                        onChange={(e) => HandleLocalState(e, "name")}
                    />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 my-4 ">
                    <div className='w-full mx-2'>
                        <label className="text-md">Phone</label>
                        <br />
                        <input
                            className='p-2 w-11/2 mx-2'
                            type="tel"
                            placeholder="123-456-7890"
                            pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                            onChange={(e) => HandleLocalState(e, "phone")}
                        />
                    </div>
                    <div className='w-full mx-2'>
                        <label className="text-md">Email</label>
                        <br />
                        <input
                            className='p-2 w-11/2 mx-2'
                            type="text"
                            placeholder="example@email.com"

                            onChange={(e) => HandleLocalState(e, "email")}
                        />
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 my-4">
                    <div className='w-full mx-2'>
                        <label className="text-md">Age</label>
                        <br />
                        <input
                            className='p-2 w-11/2 mx-2'
                            type="text"

                            onChange={(e) => HandleLocalState(e, "age")}
                        />
                    </div>
                    <div className='w-full mx-2'>
                        <label className="text-md">Sex</label>
                        <br />
                        <input
                            type="text"
                            className='p-2 w-11/2 mx-2'
                            placeholder="Male, Female, Other"
                            onChange={(e) => HandleLocalState(e, "sex")}
                        />
                    </div>
                    <div className='w-full mx-2'>
                        <label className="text-md">Address</label>
                        <br />
                        <input
                            className='p-2 w-11/2 mx-2'
                            type="text"
                            onChange={(e) => HandleLocalState(e, "address")}
                        />
                    </div>
                    <div className='w-full mx-2'>
                        <label className="text-md">City</label>
                        <br />
                        <input
                            type="text"
                            className='p-2 w-11/2 mx-2'
                            onChange={(e) => HandleLocalState(e, "city")}
                        />
                    </div>
                    <div className='w-full mx-2'>
                        <label className="text-md">State</label>
                        <br />
                        <input
                            type="text"
                            className='p-2 w-11/2 mx-2'
                            placeholder="Ex: TX, AL, MD"
                            onChange={(e) => HandleLocalState(e, "state")}
                        />
                    </div>
                    <div className='w-full mx-2'>
                        <label className="text-md">Zip</label>
                        <br />
                        <input
                            type="number"
                            className='p-2 w-11/2 mx-2'
                            placeholder="00000"
                            onChange={(e) => HandleLocalState(e, "zip")}
                        />
                    </div>
                </div>
            </div>
        </>
    )
}

export default StepOnePCR