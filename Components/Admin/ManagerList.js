import React from "react";

function ManagerList(props) {
  return props.employees.map((employee) => (
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
          <div>user email</div>
        </div>
      </div>
    </div>
  ));
}

export default ManagerList;
