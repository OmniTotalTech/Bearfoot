import React, { Component } from "react";

class TitleAndInput extends Component {
  render() {
    const { item } = this.props;

    const updateState = (e) => {
      this.props.onChange(e.target.value, item.value);
    };
<<<<<<< HEAD
=======
    console.log(this.props);
>>>>>>> a8ccdac77f8b7a47ef2a0db5e9b084921f0b02be

    return (
      <div className="md:w-2/3 max-w-sm mx-auto">
        <label className="text-sm text-gray-700">{item.title}</label>
        <div className="w-full inline-flex border">
          {item.isNumber ? (
            <input
              className="w-11/12 focus:outline-none focus:text-gray-700 p-2"
              placeholder={item.placeholder}
              type="number"
              pattern="[0-9]*"
              value={this.props.value}
              defaultValue={item.defaultValue}
              onChange={(e) => updateState(e)}
            />
          ) : item.isZip ? (
            <input
              className="w-11/12 focus:outline-none focus:text-gray-700 p-2"
              placeholder={item.placeholder}
              value={this.props.value}
<<<<<<< HEAD
              defaultValue={item.defaultValue}
=======
>>>>>>> a8ccdac77f8b7a47ef2a0db5e9b084921f0b02be
              onChange={(e) => updateState(e)}
            />
          ) : (
            <input
              className="w-11/12 focus:outline-none focus:text-gray-700 p-2"
              placeholder={item.placeholder}
              defaultValue={item.defaultValue}
              value={this.props.value}
              onChange={(e) => updateState(e)}
            />
          )}
        </div>
      </div>
    );
  }
}

export default TitleAndInput;
