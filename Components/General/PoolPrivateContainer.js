import { Pool } from "@material-ui/icons";
import React, { Component } from "react";

class PoolPrivateContainer extends Component {
  render() {
    console.log(this.props);

    return (
      <>
        <div className="bg-white mx-auto shadow-lg rounded my-4 py-8 px-8 text-2xl">
          <div className=" font-bold">Forms Submitted</div>
          <div className="my-2">
            <br />
            <div className="text-md">Morning Paperwork</div> <br />
            <div className="text-md bold">
              <hr />{" "}
            </div>{" "}
            <div className="text-sm">Morning Inventory Checklist:</div>
            {this.props.foundMorningChecklist ? (
              <div className="text-green-500 text-sm">Submitted!</div>
            ) : (
              <div className="text-red-500 text-sm">
                No Record for Today Found
              </div>
            )}{" "}
            <br />
            <div className="text-sm">Morning Task Checklist:</div>
            {this.props.foundOpeningTaskChecklist ? (
              <div className="text-green-500 text-sm">Submitted!</div>
            ) : (
              <div className="text-red-500 text-sm">
                No Record for Today Found
              </div>
            )}
            <br />
            <div className="text-md bold">Evening Paperwork</div> <br />
            <div className="text-md bold">
              <hr className="mb-2" />
            </div>{" "}
            <div className="text-sm">Evening Inventory Checklist:</div>{" "}
            {this.props.foundEveningChecklist ? (
              <div className="text-green-500 text-sm">Submitted!</div>
            ) : (
              <div className="text-red-500 text-sm">
                No Record for Today Found
              </div>
            )}
            <div className="text-sm">Evening Task Checklist:</div>
            {this.props.foundEveningTaskChecklist ? (
              <div className="text-green-500 text-sm">Submitted!</div>
            ) : (
              <div className="text-red-500 text-sm">
                No Record for Today Found
              </div>
            )}
            <div className="text-md bold">Daily / Weekly Paperwork</div> <br />
            <div className="text-md bold">
              <hr className="mb-2" />
            </div>{" "}
            <div className="text-sm">Daily Operations AM:</div>{" "}
            {this.props.dailyOperationsAm ? (
              <div className="text-green-500 text-sm">Submitted!</div>
            ) : (
              <div className="text-red-500 text-sm">
                No Record for Today Found
              </div>
            )}
            <div className="text-sm">Daily Operations PM:</div>{" "}
            {this.props.dailyOperationsPm ? (
              <div className="text-green-500 text-sm">Submitted!</div>
            ) : (
              <div className="text-red-500 text-sm">
                No Record for Today Found
              </div>
            )}
            <div className="text-sm">Chemical Logs:</div>{" "}
            {this.props.chemLog ? (
              <div className="text-green-500 text-sm">Submitted!</div>
            ) : (
              <div className="text-red-500 text-sm">
                No Record for Today Found
              </div>
            )}
          </div>
        </div>
      </>
    );
  }
}

export default PoolPrivateContainer;
