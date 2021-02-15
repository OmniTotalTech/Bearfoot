import React, { Component } from "react";

export default class DailyChecklist extends Component {
  render() {
    return (
      <div>
        <div className="container mx-auto max-w-lg h-full overflow-scroll bg-gray-100">
          <div className="w-full shadow-lg border-b-2 py-4">
            {this.props.data ? (
              this.props.data.data.map((item) => (
                <>
                  <div>
                    <input
                      type="checkbox"
                      onChange={this.props.handleChange}
                      name="horns"
                    />
                    <label for="horns" className="mx-2">
                      {item.text}
                    </label>
                  </div>
                </>
              ))
            ) : (
              <div></div>
            )}
            <div className="text-center pt-4">
              <button className="bg-red-700 hover:bg-red-600 text-white font-semibold py-2 px-4 border border-red-400 rounded shadow">
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
