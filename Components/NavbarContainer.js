import React, { Component } from "react";
import { TouchableOpacity } from "react-native";
import store from "../store";
import * as RootNavigation from "../Routes/RootNavigation";

import { LOGOUT } from "../redux/types/auth";
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
              className="text-white cursor-pointer text-xl leading-none float-left   border  border-transparent block  text-center outline-none focus:outline-none align-center"
              type="button"
            >
              <div
                onClick={() => RootNavigation.navigate("EditSelf")}
                className="justify-center pr-2 "
              >
                {this.props.user.profileImage != "" ? (
                  <div>
                    <img
                      src={
                        "https://bearfoot-app-images.s3.us-east-2.amazonaws.com/profile-images/" +
                        this.props.user.profileImage
                      }
                      alt="..."
                      style={{ height: "50px", width: "50px" }}
                      className="shadow rounded-full float-left align-middle border-none object-contain"
                    />
                  </div>
                ) : (
                  <div>
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/a/ad/Placeholder_no_text.svg"
                      alt="..."
                      style={{ height: "50px", width: "50px" }}
                      className="shadow rounded-full float-left align-middle border-none object-contain"
                    />
                  </div>
                )}
              </div>
            </button>
            <div className="text-white text-sm truncate">
              {this.props.user ? (
                <div>{this.props.user.name}</div>
              ) : (
                <div></div>
              )}
            </div>
          </div>

          <div className="float-right text-right">
            <a className="text-sm  font-bold leading-relaxed inline-block mr-4 py-2 whitespace-no-wrap uppercase text-white">
              BearFoot Pools
            </a>
            <p
              onClick={() => store.dispatch({ type: LOGOUT })}
              className="text text-white text-lg mr-4"
            >
              Logout
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default NavbarContainer;
