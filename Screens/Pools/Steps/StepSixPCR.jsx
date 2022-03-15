import React from 'react';
import SignaturePad from "react-signature-canvas";

const StepSixPCR = () => {
    //Signatures Step 6
    const [reportFilerName, setReportFiler] = React.useState("");
    const [managerName, setManagerName] = React.useState("");
    const [manFilerSignature, setTrimmedDataURL2] = React.useState("");
    const [supName, setSupName] = React.useState("");
    const [supFilerSignature, setTrimmedDataURL3] = React.useState("");

    let sigPad = {};
    let sigPad2 = {};
    let sigPad3 = {};

    let trim = () => {
        setTrimmedDataURL2(sigPad.getTrimmedCanvas().toDataURL("image/png"));
    };
    let trim2 = () => {
        setTrimmedDataURL2(sigPad2.getTrimmedCanvas().toDataURL("image/png"));
    };
    let trim3 = () => {
        setTrimmedDataURL3(sigPad3.getTrimmedCanvas().toDataURL("image/png"));
    }
    return (
        <div className="container mx-auto p-4 m-4">
            <br />
            <div>
                <label className="text-md">Name of the person completing the report:</label>
                <br />
                <input
                    type="text"
                    value={reportFilerName}
                    onChange={(e) => setReportFiler(e.target.value)}
                />{" "}
                <br />
                <label className="text-md">Reporter Signature:</label>
                <br />
                <button onClick={() => sigPad.clear()} className="px-4 py-2 bg-red-500 btn btn-lg text-white">Clear Signature</button>

                <div className="bg-white max-w-md mx-auto">
                    <SignaturePad
                        style={{ width: 40 }}
                        canvasProps={{
                            maxWidth: 500,
                            minWidth: 100,
                            width: window.innerWidth,
                            height: 200,

                            backgroundColor: "#fff",
                        }}
                        onEnd={trim}
                        ref={(ref) => {
                            sigPad = ref;
                        }}
                    />
                </div>
            </div>{" "}
            <br />
            <div>
                <label className="text-md">Manager Name:</label>
                <br />
                <input
                    type="text"
                    value={managerName}
                    onChange={(e) => setManagerName(e.target.value)}
                />{" "}
                <br />
                <label className="text-md">Manager Signature:</label>
                <br />

                <button onClick={() => sigPad2.clear()} className="px-4 py-2 bg-red-500 btn btn-lg text-white">Clear Signature</button>

                <div className="bg-white max-w-md mx-auto">
                    <SignaturePad
                        style={{ width: 40 }}
                        canvasProps={{
                            maxWidth: 500,
                            minWidth: 100,
                            width: window.innerWidth,
                            height: 200,
                            backgroundColor: "#fff",
                        }}
                        onEnd={trim2}
                        ref={(ref) => {
                            sigPad2 = ref;
                        }}
                    />
                </div>
            </div>{" "}
            <br />
            <div>
                <label className="text-md">Supervisor Name:</label>
                <br />
                <input
                    type="text"
                    value={supName}
                    onChange={(e) => setSupName(e.target.value)}
                />{" "}
                <br />
                <label className="text-md">Supervisor Signature:</label>
                <br />
                <button onClick={() => sigPad3.clear()} className="px-4 py-2 bg-red-500 btn btn-lg text-white">Clear Signature</button>

                <div className="bg-white max-w-md mx-auto">
                    <SignaturePad
                        style={{ width: 40 }}
                        canvasProps={{
                            maxWidth: 500,
                            minWidth: 100,
                            width: window.innerWidth,
                            height: 200,
                            backgroundColor: "#fff",
                        }}
                        onEnd={trim3}
                        ref={(ref) => {
                            sigPad3 = ref;
                        }}
                    />
                </div>
            </div>{" "}
        </div>
    )

}

export default StepSixPCR