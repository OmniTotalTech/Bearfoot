import React, { Component } from "react";
import api from "../../utils/api";
<<<<<<< HEAD
import BackButton from "../../Components/BackButton";


class DeliveryDetail extends Component {

  state = { driverArray: [] }
  async componentDidMount() {

    let driverArry = []
    driverArry = await this.driverOptions(this.props.route.params.item.pool_id);
    console.log(driverArry)
    this.setState({ driverArray: driverArry })
  }

  async driverOptions(ids) {
    let arr = []
    console.log(ids)
    arr.push(ids.pool_primary_driver)
    let res = []

    if (ids.pool_secondary_drivers?.length > 0) {
      ids.pool_secondary_drivers.forEach((item) => arr.push(item))

    }

    await api.put(`/adminOrderDetails/user/searchAll/admin`, arr)
      .then((response) => res = response.data)
      .catch((err) => console.log(err))

    return res;

  }

  async OptionComponent(item) {



  }

  async handleAssignment() {

    let sd = this.state.selectedDriver;

    if (sd == null | undefined) {
      sd = this.state.driverArray[0]._id
    }

    let body = {
      "accepted_by": sd
    }
    console.log(this.props.route.params)
    await api.patch(`/orderDetails/${this.props.route.params.item._id}`, body)
      .then((response) => {
        this.props.navigation.navigate("SuccessScreenAll");
      })
      .catch((err) => console.log(err))

  }
=======

class DeliveryDetail extends Component {
  componentDidMount() {
    console.log(this.props.route.params.item);
  }

>>>>>>> a8ccdac77f8b7a47ef2a0db5e9b084921f0b02be
  render() {
    return (
      <>
        <div className="container bg-white p-4 m-4 overflow-scroll mx-auto">
<<<<<<< HEAD
          <BackButton navigation={this.props.navigation} />

=======
>>>>>>> a8ccdac77f8b7a47ef2a0db5e9b084921f0b02be
          {this.props.route.params.item.accepted_by != null ? (
            <>
              <div className="container mx-auto text-center rounded-br-lg">
                <div className="bg-white mt-4 rounded-br-lg rounded-bl-lg rounded-tr-lg ">
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/a/ad/Placeholder_no_text.svg"
                    alt="..."
                    style={{ height: "250px", width: "250px" }}
                    className="shadow rounded-full w-full mx-auto"
                  />
                  <div className="text-xl bold  p-2">
                    {this.props.route.params.item.accepted_by.name}
                  </div>
                  <div className="text-lg  p-2">
                    {this.props.route.params.item.accepted_by.phone}
                  </div>
                  <div className="text-lg  p-2">
                    {this.props.route.params.item.accepted_by.email}
                  </div>
                </div>
              </div>
<<<<<<< HEAD
              <select>
                <optgroup label="Choose One">
                  {this.state.driverArray.map((item) => (
                    <>
                      {console.log(item)}
                      <option> {item.name}</option>
                    </>
                  ))}
                </optgroup>
                <button className="btn btn-lg bg-red-500 px-4 py-2 text-white">Assign as Driver</button>

              </select>
            </>
          ) : (
            <>
              <div>No drivers are responsible for this delivery. Would you like to add one?</div>

              <select onChange={(e) => this.setState({ selectedDriver: e.target.value })}>
                <optgroup label="Choose One">
                  {this.state.driverArray.map((item) => (
                    <>
                      {console.log(item)}
                      <option value={item._id}> {item.name}</option>
                    </>
                  ))}
                </optgroup>

              </select>
              {this.state.driverArray.length > 0 ? (
                <button onClick={() => this.handleAssignment()} className="btn btn-lg bg-red-500 px-4 py-2 text-white">Assign as Driver</button>

              ) : (<></>)}

            </>
=======
            </>
          ) : (
            <div>None Currently Assigned</div>
>>>>>>> a8ccdac77f8b7a47ef2a0db5e9b084921f0b02be
          )}
          <div className="container mx-auto">
            {" "}
            <div className="text-lg">Delivery Item List</div>
            {this.props.route.params.item.starting_list.map((item) => (
              <>
                <div className="flex flex-row w-full items-center border">
                  <div className="p-2  w-2/3 mr-1">{item.name}</div>
                  <div className="grid grid-cols-1 divide-x divide-gray-400 w-1/3 ">
                    <div className="text-center px-4 mx-4 text-red-500 text-sm">
                      {item.lowAmt} - low amount
                    </div>
                    <div className="text-center px-2 text-sm">
                      {item.inStockAmt} - in stock
                    </div>
                  </div>
                </div>
              </>
            ))}
          </div>

          <div className="bg-white mt-4 rounded-br-lg rounded-bl-lg rounded-tr-lg ">
            <div className="text-4xl">Final Comments:</div>

            <div className="text-lg  p-2">
              {this.props.route.params.item.final_commments}
            </div>
            <div className="text-4xl">Pool Info:</div>

            <div className="text-2xl bold  p-2">
              {this.props.route.params.item.pool_id.pool_name}
            </div>
            <div className="text-lg  p-2">
              {this.props.route.params.item.pool_id.pool_address} ,
              {this.props.route.params.item.pool_id.pool_state}
              <br />
              {this.props.route.params.item.pool_id.pool_zip}
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default DeliveryDetail;
