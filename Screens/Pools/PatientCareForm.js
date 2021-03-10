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
        <div className="container p-4 text-2xl">Patient Care form</div>
        {props.activeStep == 1 ? (
          <div className="container p-4">
            <div>
              <label className="text-md">Patron Name</label>
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
          <div className="container p-4">
            <div>
              <label className="text-md">Event Description</label>
              <br />
              <input
                type="text"
                value={eventDescription}
                onChange={() => setEventDescription(e.target.value)}
              />
            </div>
            <div>
              <label className="text-md">Resolution Description</label>
              <br />
              <input
                type="text"
                value={resDescription}
                onChange={() => setResDescription(e.target.value)}
              />
            </div>
          </div>
        ) : (
          <div className="container p-4 bg-white">
            <label>Employee Signature</label>
            <SignaturePad
              style={{ width: 40 }}
              canvasProps={{
                maxWidth: 500,
                minWidth: 100,
                width: window.innerWidth,
                height: 300,
              }}
              ref={(ref) => {
                sigPad = ref;
              }}
            />
            <label>Patron Signature</label>
            <SignaturePad
              style={{ width: 40 }}
              canvasProps={{
                maxWidth: 500,
                minWidth: 100,
                width: window.innerWidth,
                height: 300,
              }}
              ref={(ref) => {
                sigPad = ref;
              }}
            />
          </div>
        )}
      </div>
    </>
  );
};

export default PatientCareForm;
