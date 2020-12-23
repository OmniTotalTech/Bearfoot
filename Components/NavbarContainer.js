import React, { Component } from "react";
import { TouchableOpacity } from "react-native";
class NavbarContainer extends Component {
  render() {
    return (
      <div
        className=" w-full shadow-xl  mx-auto p-2"
        style={{
          backgroundImage: "linear-gradient(to bottom right,#333333,#222222)",
          backgroundColor: "black",
          shadow: "5px 5px 10px #000000",
        }}
      >
        <div className="grid grid-cols-2 gap-1">
          <div className="mx-2 ">
            <button
              className="text-white cursor-pointer text-xl leading-none float-left   border  border-transparent rounded block  text-center outline-none focus:outline-none align-center"
              type="button"
            >
              <div className="justify-center pr-2 ">
                <img
                  src="https://demos.creative-tim.com/tailwindcss-starter-project/_next/static/images/team-1-800x800-fa5a7ac2c81a43925586ea85f2fea332.jpg"
                  alt="..."
                  style={{ height: "50px", width: "50px" }}
                  className="shadow rounded-full float-left align-middle border-none object-contain"
                />
              </div>
            </button>
            <div className="text-white text-sm truncate">
              {this.props.user.name}
            </div>
          </div>

          <div className="float-right text-right">
            <a
              className="text-sm  font-bold leading-relaxed inline-block mr-4 py-2 whitespace-no-wrap uppercase text-white"
              href="#pablo"
            >
              BearFoot Pools
            </a>
            <TouchableOpacity>
              <p className="text text-white text-lg mr-4">Logout</p>
            </TouchableOpacity>
          </div>
        </div>
      </div>
    );
  }
}

export default NavbarContainer;
