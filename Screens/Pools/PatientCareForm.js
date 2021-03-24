import React from "react";
import SignaturePad from "react-signature-canvas";

const PatientCareForm = (props) => {
  const [patronName, setPatronName] = React.useState("");
  const [patronEmail, setPatronEmail] = React.useState("");
  const [patronPhone, setPatronPhone] = React.useState("");
  const [eventDescription, setEventDescription] = React.useState("");
  const [resDescription, setResDescription] = React.useState("");
  const [trimmedDataURL, setTrimmedDataURL] = React.useState();

  let sigPad = {};
  let trim = () => {
    setTrimmedDataURL(sigPad.getTrimmedCanvas().toDataURL("image/png"));
  };
  console.log(props);

  return (
    <>
      <div className="overflow-scroll">
        <div className="container p-4 text-2xl mx-auto text-center">
          Patient Care form
        </div>
        {props.activeStep == 1 ? (
          <div className="container p-4 max-w-2xl mx-auto">
            <div>
              <label className="text-2xl">Patron Name</label>
              <br />
              <input
                type="text"
                value={patronName}
                onChange={() => setPatronName(e.target.value)}
              />
            </div>
            <br />
            <div>
              <label className="text-md">Patron Phone</label>
              <br />
              <input
                type="number"
                value={patronPhone}
                onChange={() => setPatronPhone(e.target.value)}
              />
            </div>
            <br />
            <div>
              <label className="text-md">Patron Email</label>
              <br />
              <input
                type="text"
                value={patronEmail}
                onChange={() => setPatronEmail(e.target.value)}
              />
            </div>
            <br />
          </div>
        ) : props.activeStep == 2 ? (
          <div className="container p-4 mx-auto max-w-2xl">
            <div>
              <label className="text-md">Event Description</label>
              <br />
              <div className="w-11/12">
                <textarea
                  type="textarea"
                  className="w-full"
                  value={eventDescription}
                  onChange={() => setEventDescription(e.target.value)}
                />
              </div>
            </div>
            <div>
              <label className="text-md">Resolution Description</label>
              <br />
              <div className="w-11/12">
                <textarea
                  type="textarea"
                  className="w-full"
                  value={resDescription}
                  onChange={() => setResDescription(e.target.value)}
                />
              </div>
            </div>
          </div>
        ) : (
          <>
            <div className="p-4">
              <div className="container max-w-md mx-auto">
                <label className="text-lg">Patron Signature</label>
              </div>
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
                  ref={(ref) => {
                    sigPad = ref;
                  }}
                />
              </div>
            </div>

            <div className="p-4">
              <div className="container max-w-md mx-auto">
                <label className="text-lg">Employee Signature</label>
              </div>
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
                  ref={(ref) => {
                    sigPad = ref;
                  }}
                />
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default PatientCareForm;
