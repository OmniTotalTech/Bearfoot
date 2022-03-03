import React from 'react';

const StepFourPCR = (props) => {
    // Rescurer Information Step 4
    const [injuryList, setInjuryList] = React.useState([]);
    //Type of victim
    const [active, setActive] = React.useState(false);
    const [distressed, setDistressed] = React.useState(false);
    const [passive, setPassive] = React.useState(false);
    const [spinal, setSpinal] = React.useState(false);
    //type of rescue
    const [activeFront, setActiveFront] = React.useState(false);
    const [activeRear, setActiveRear] = React.useState(false);
    const [passiveFront, setPassiveFront] = React.useState(false);
    const [passiveRear, setPassiveRear] = React.useState(false);
    const [passiveSubmerged, setPassiveSubmerged] = React.useState(false);
    const [surfaceSpinal, setSurfaceSpinal] = React.useState(false);
    const [submergedSpinal, setSubmergedSpinal] = React.useState(false);

    let sampleAnnagram = ["S", "A", "M", "P", "L", "E"];


    return (
        <div className="container">
            <label className="text-lg px-2">S.A.M.P.L.E:</label>
            {sampleAnnagram.map((item) => (
                <div>
                    <input
                        className="mx-2 border-2 shadow-xl my-2"
                        type="text"
                        placeholder={item}
                        onChange={(e) => setSample(e.target.value, item)}
                    />
                </div>
            ))}

            <div className="px-2">
                <div>
                    <label className="text-2xl my-2">Active:</label>
                    <input
                        className="mx-2"
                        type="checkbox"
                        value={active}
                        onChange={(e) => setActive(e.target.checked)}
                    />
                    <div className="grid grid-cols-1">
                        <div>
                            <label className="text-sm">Front:</label>
                            <input
                                className="mx-2"
                                type="checkbox"
                                value={activeFront}
                                onChange={(e) => setActiveFront(e.target.checked)}
                            />
                        </div>
                        <div>
                            <label className="text-sm">Rear:</label>
                            <input
                                className="mx-2"
                                type="checkbox"
                                value={activeRear}
                                onChange={(e) => setActiveRear(e.target.checked)}
                            />
                        </div>
                    </div>
                </div>
                <br /> <label className="text-2xl my-2">Distressed:</label>
                <input
                    className="mx-2"
                    type="checkbox"
                    value={distressed}
                    onChange={(e) => setDistressed(e.target.checked)}
                />{" "}
                <br /> <label className="text-2xl my-2">Passive:</label>
                <input
                    className="mx-2"
                    type="checkbox"
                    value={passive}
                    onChange={(e) => setPassive(e.target.checked)}
                />
                <div className="grid grid-cols-1">
                    <div>
                        <input
                            className="mx-2"
                            type="checkbox"
                            value={passiveFront}
                            onChange={(e) => setPassiveFront(e.target.checked)}
                        />
                        <label className="text-sm">Front</label>

                    </div>
                    <div>
                        <input
                            className="mx-2"
                            type="checkbox"
                            value={passiveRear}
                            onChange={(e) => setPassiveRear(e.target.checked)}
                        />
                        <label className="text-sm">Rear</label>
                    </div>


                    <div>
                        <input
                            className="mx-2"
                            type="checkbox"
                            value={passiveSubmerged}
                            onChange={(e) => setPassiveSubmerged(e.target.checked)}
                        />
                        <label className="text-sm">Submerged</label>

                    </div>
                </div>

                <label className="text-2xl my-2">Spinal:</label>
                <input
                    className="mx-2"
                    type="checkbox"
                    value={spinal}
                    onChange={(e) => setSpinal(e.target.checked)}
                />
                <div className="grid grid-cols-1">
                    <div>
                        <label className="text-sm">Surface:</label>
                        <input
                            className="mx-2"
                            type="checkbox"
                            value={surfaceSpinal}
                            onChange={(e) => setSurfaceSpinal(e.target.checked)}
                        />
                    </div>
                    <div>
                        <label className="text-sm">Submerged:</label>
                        <input
                            className="mx-2"
                            type="checkbox"
                            value={submergedSpinal}
                            onChange={(e) => setSubmergedSpinal(e.target.checked)}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default StepFourPCR;