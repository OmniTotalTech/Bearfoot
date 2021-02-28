import React, { Component } from "react";

export default class DailyChecklist extends Component {
  render() {
    return (
      <div>
        <div className="container mx-auto max-w-lg h-full overflow-scroll bg-gray-100">
          <div className="w-full shadow-lg border-b-2 py-4">
            <p className="text-lg"> Completed Tasks</p>
            {this.props.data && this.props.data.data.length > 0 ? (
              this.props.data.data.map((item, i) => (
                <>
                  <div>
                    <input
                      checked={true}
                      type="checkbox"
                      name="horns"
                      disabled
                    />
                    <label for="horns" className="mx-2">
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
          </div>
        </div>
      </div>
    );
  }
}
