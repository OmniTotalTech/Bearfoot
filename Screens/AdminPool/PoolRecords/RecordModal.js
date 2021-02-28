import React from "react";
import { Component } from "react";
import Modal from "react-modal";
import DailyChecklistDisabled from "../../../Components/DailyChecklistDisabled";
import api from "../../../utils/api";
class RecordModal extends Component {
  render() {
    const handleClose = () => {
      this.props.handleClose();
    };
    console.log(this.props);

    return (
      <div>
        <button
          className="bg-red-500 text-white p-4 rounded"
          onClick={handleClose}
        >
          Close
        </button>
        {viewControl(
          this.props.type,
          this.props.data.data,
          this.props._id,
          this.props
        )}
      </div>
    );
  }
}

const viewControl = (type, data, id, props) => {
  switch (type) {
    case "MorningChecklist":
      return <InventoryModal data={data} props={props} />;
    case "EveningChecklist":
      return <InventoryModal data={data} props={props} />;
    case "OpeningTaskChecklist":
      return <TaskModal data={data} />;
    case "ClosingTaskChecklist":
      return <TaskModal data={data} />;
    case "DailyOperations":
      return <InventoryModal data={data} />;
    case "ChemicalLog":
      return <InventoryModal data={data} />;
  }
};

const InventoryModal = (data, props) => {
  console.log(data);
  return (
    <div>
      {data.data.length > 0 ? (
        data.data.map((item, i) => (
          <>
            <div>
              <p className="text-lg">{item._id}</p>
              <p>{item.inStockAmt}</p>
            </div>
            <hr />
          </>
        ))
      ) : (
        <div></div>
      )}
    </div>
  );
};

const TaskModal = (data) => {
  console.log(data);

  return (
    <div className="container mx-auto overflow-scroll">
      <div className="text-2xl">Opening Checklist : </div>
      <DailyChecklistDisabled data={data} />
    </div>
  );
};
export default RecordModal;
