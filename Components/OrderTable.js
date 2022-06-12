import React from "react";

export default function OrderTable(props) {
  return (
    <div>
      <div>
        <table class="table-fixed">
          <thead>
            <tr>
              <th class="w-1/4 ">Date</th>
              <th class="w-1/4 ">Status</th>
              <th class="w-1/4 ">Assigned Driver</th>
              <th class="w-1/4 ">Pool Id</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="text-center">{props.date}</td>
              <td className="text-center">{props.status}</td>
              <td className="text-center">858</td>
              <td className="text-center">858</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
