import React, { Component } from "react";

export default class DailyChecklist extends Component {
  render() {
    return (
      <div>
        <div className="container mx-auto h-full overflow-scroll bg-gray-100">
          <div className="w-full shadow-lg border-b-2 py-4">
            <form>
              {this.props.data && this.props.data.data.length > 0 ? (
                this.props.data.data.map((item, i) => (
                  <>
                    {i+1}):
                    <div className="px-4 bg-gray-200 p-4">
                      <input
                        size={16}
                        type="checkbox"
                        onChange={() => this.props.handleChange(item, i)}
                        name="horns"
                      />
                        <label for="horns" className="mx-2 text-xl">
                          {item.text}
                        </label>
                    </div>
                  </>
                ))
              ) : (
                <div>
                  This pool facility has not set any tasks for this time frame.
                </div>
              )}

              {this.props.data && this.props.data.data.length > 0 ? (
                <div className="text-center pt-4">
                  <button
                    onClick={this.props.onSubmit}
                    className="bg-red-700 hover:bg-red-600 text-white font-semibold py-2 px-4 border border-red-400 rounded shadow"
                  >
                    Submit
                  </button>
                </div>
              ) : (
                <div></div>
              )}
            </form>
          </div>
        </div>
      </div>
    );
  }
}