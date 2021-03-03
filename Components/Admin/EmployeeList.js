import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

function EmployeeList(props) {
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 6,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 5,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 4,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 2,
    },
  };

  const handleNavigation = (id) => {
    props.navigation.navigate("EditUser", { id: id }), props.closeModal();
  };
  return (
    <Carousel
      swipeable={true}
      draggable={true}
      showDots={true}
      responsive={responsive}
      ssr={false} // means to render carousel on server-side.
      infinite={true}
      // autoPlay={this.props.deviceType !== "mobile" ? true : false}
      autoPlaySpeed={1000}
      keyBoardControl={true}
      customTransition="all .2"
      transitionDuration={200}
      containerClass="carousel-container"
      removeArrowOnDeviceType={["tablet", "mobile"]}
      // deviceType={this.props.deviceType}
      dotListClass="custom-dot-list-style"
      itemClass="carousel-item-padding-40-px"
    >
      {props.employees.map((employee) => (
        <div
          className="container mx-auto max-w-3xl "
          onClick={() => handleNavigation(employee._id)}
        >
          {console.log(employee)}
          <div className="bg-gray-100 p-4 border-t-2 bg-opacity-5 rounded-t">
            <div className="max-w-sm mx-auto md:w-full md:mx-0">
              <div className="pace-x-4">
                {employee.profileImage != "" ? (
                  <div>
                    <img
                      src={
                        "https://bearfoot-app-images.s3.us-east-2.amazonaws.com/profile-images/" +
                        employee.profileImage
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
                <h1 className="text-gray-600">Name: {employee.name}</h1>
              </div>
            </div>
          </div>
          <div className="bg-white space-y-6 text-left">
            <div className="space-y-4 md:space-y-0 w-full  text-gray-500">
              <label className="text-md text-gray-700">
                Email: {employee.email}
              </label>
              <div>user email</div>
            </div>
          </div>
        </div>
      ))}
    </Carousel>
  );
}

export default EmployeeList;
