import React, { Component } from "react";
import { connect } from "react-redux";
import ImageUploader from "react-images-upload";
import api from "../utils/api";
import { loadUser } from "../redux/actions/auth";
class EditSelf extends Component {
  constructor(props) {
    super(props);
    this.state = { pictures: [] };
    this.onDrop = this.onDrop.bind(this);
    this.handleUpload = this.handleUpload.bind(this);
  }

  componentDidMount() {
    this.props.loadUser();
  }
  onDrop(picture) {
    this.setState({
      pictures: this.state.pictures.concat(picture),
    });
  }

  async handleUpload() {
    const formData = new FormData();
    formData.append("image", this.state.pictures[0]);

    await api
      .post("upload", formData)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
    this.setState({ pictures: [] });
    this.props.loadUser();
  }
  render() {
    return (
      <>
        <div className="container mx-auto max-w-lg p-4 overflow-scroll">
          <p className="text-2xl"> Hello, {this.props.user.name}</p>

          <div>
            <p className="text-xl bold"> Name:</p>
          </div>
          <input className="mx-4 p-2" defaultValue={this.props.user.name} />
          <div className="mt-2">
            <p className="text-xl bold">Phone:</p>
          </div>
          <input
            className="mx-4 p-2"
            disabled
            defaultValue={this.props.user.phone}
          />
          <div className="mt-2">
            <p className="text-xl bold">Profile Image:</p>
          </div>
          {this.props.user.profileImage === "" ? (
            <div>
              You have not set a profile picture... would you like to now?
              <ImageUploader
                singleImage={true}
                withIcon={true}
                buttonText="Choose images"
                onChange={this.onDrop}
                imgExtension={[".jpg", ".gif", ".png", ".gif"]}
                maxFileSize={5242880}
                withPreview={true}
                withLabel={true}
              />
              {this.state.pictures == null ? (
                <div></div>
              ) : (
                <div className="w-full mx-auto text-center">
                  <button
                    onClick={this.handleUpload}
                    className="bg-red-500 text-white px-4 py-2 rounded  mx-auto"
                  >
                    Upload Image
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div>
              Current Profile Picure:
              <img
                src={
                  "https://bearfoot-app-images.s3.us-east-2.amazonaws.com/profile-images/" +
                  this.props.user.profileImage
                }
              />
              <ImageUploader
                singleImage={true}
                withIcon={true}
                buttonText="Choose images"
                onChange={this.onDrop}
                imgExtension={[".jpg", ".gif", ".png", ".gif"]}
                maxFileSize={5242880}
                withPreview={true}
                withLabel={true}
              />
              {this.state.pictures.length < 1 ? (
                <div></div>
              ) : (
                <div className="w-full mx-auto text-center">
                  <button
                    onClick={this.handleUpload}
                    className="bg-red-500 text-white px-4 py-2 rounded  mx-auto"
                  >
                    Upload Image
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
  };
};

const mapDisptachToProps = (dispatch) => {
  return { loadUser: () => dispatch(loadUser()) };
};

export default connect(mapStateToProps, mapDisptachToProps)(EditSelf);
