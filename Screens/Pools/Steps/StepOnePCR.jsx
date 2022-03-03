import React from 'react';

const StepOnePCR = (props) => {
    ///Patient information set Step 1
    const [patientName, setPatientName] = React.useState("");
    const [patientEmail, setPatientEmail] = React.useState("");
    const [patientPhone, setPatientPhone] = React.useState("");
    const [patientAge, setPatientAge] = React.useState("");
    const [patientSex, setPatientSex] = React.useState("");
    const [patientAddress, setPatientAddress] = React.useState("");
    const [patientCity, setPatientCity] = React.useState("");
    const [patientState, setPatientState] = React.useState("");
    const [patientZip, setPatientZip] = React.useState("");

    return (
        <>
            <div className="container p-4 mx-auto">
                <div>
                    <label className="text-md">Patron Name</label>
                    <br />
                    <input
                        type="text"
                        value={patientName}
                        onChange={(e) => setPatientName(e.target.value)}
                    />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 my-4">
                    <div>
                        <label className="text-md">Phone</label>
                        <br />
                        <input
                            type="tel"
                            placeholder="123-456-7890"
                            pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                            value={patientPhone}
                            onChange={(e) => setPatientPhone(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="text-md">Email</label>
                        <br />
                        <input
                            type="text"
                            placeholder="example@email.com"
                            value={patientEmail}
                            onChange={(e) => setPatientEmail(e.target.value)}
                        />
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 my-4">
                <div>
                    <label className="text-md">Age</label>
                    <br />
                    <input
                        type="text"
                        value={patientAge}
                        onChange={(e) => setPatientAge(e.target.value)}
                    />
                </div>
                <div>
                    <label className="text-md">Sex</label>
                    <br />
                    <input
                        type="text"
                        placeholder="Male, Female, Other"
                        value={patientSex}
                        onChange={(e) => setPatientSex(e.target.value)}
                    />
                </div>
                <div>
                    <label className="text-md">Address</label>
                    <br />
                    <input
                        type="text"
                        value={patientAddress}
                        onChange={(e) => setPatientAddress(e.target.value)}
                    />
                </div>
                <div>
                    <label className="text-md">City</label>
                    <br />
                    <input
                        type="text"
                        value={patientCity}
                        onChange={(e) => setPatientCity(e.target.value)}
                    />
                </div>
                <div>
                    <label className="text-md">State</label>
                    <br />
                    <input
                        type="text"
                        placeholder="Ex: TX, AL, MD"
                        value={patientState}
                        onChange={(e) => setPatientState(e.target.value)}
                    />
                </div>
                <div>
                    <label className="text-md">Zip</label>
                    <br />
                    <input
                        type="text"
                        placeholder="00000"
                        value={patientZip}
                        onChange={(e) => setPatientZip(e.target.value)}
                    />
                </div>
                </div>
            </div>
        </>
    )
}

export default StepOnePCR