import React from "react";
import api from "../../utils/api";

function ManagerList(props) {
  async function handleClick(group, id, poolId) {
    await api
      .patch("/pool/" + poolId + "/deliveries/" + group + "/assign/" + id)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        const errorMsg = error.message;
      });
    props.closeModal();
  }
  return props.employees ? (
    props.employees.map((employee) => (
      <div className="container mx-auto max-w-2xl">
        <div className="bg-gray-100 p-4 border-t-2 bg-opacity-5 rounded-t">
          <div className="max-w-sm mx-auto md:w-full md:mx-0">
            <div className="pace-x-4">
              <img
                className="w-10 h-10 object-cover rounded-full"
                alt="User avatar"
                src="https://upload.wikimedia.org/wikipedia/commons/a/ad/Placeholder_no_text.svg"
              />
              <h1 className="text-gray-600">Name: {employee.name}</h1>
            </div>
          </div>
        </div>

        <div className="bg-white space-y-6 text-left">
          <div className="space-y-4 md:space-y-0 w-full p-4 text-gray-500">
            <label className="text-md text-gray-700">
              Email: {employee.email}
            </label>
          </div>
        </div>
        <button
          onClick={() =>
            handleClick(props.assignGroup, employee._id, props.poolId)
          }
          className="text-white text-md bg-red-500 p-2 my-2 rounded"
        >
          Assign to {props.assignGroup}
        </button>
      </div>
    ))
  ) : (
    <div></div>
  );
}

export default ManagerList;
