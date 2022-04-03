import { Pool } from "@material-ui/icons";
import React, { Component } from "react";
import moment from "moment";
class PoolPublicContainer extends Component {
  render() {
    return (
      <>
        {console.log(this.props.pool.individualPool)}
        {" "}
        <div className="bg-white max-w-2xl mx-auto shadow-lg rounded my-4 py-8 px-8 text-2xl">
          Pool Information
          <h3 className="text-orange text-xl font-semibold ">
            {this.props.pool.individualPool.pool_name}
          </h3>
          <h4 className="text-orange text-lg font-semibold ">
            {this.props.pool.individualPool.pool_address}, {this.props.pool.individualPool.pool_zip}
          </h4>
          <h4 className="text-orange text-lg font-semibold ">
            {this.props.pool.individualPool.pool_props}
          </h4>
          <p className="text-grey-dark font-thin text-sm leading-normal ">
            {this.props.pool.individualPool.pool_desc}
          </p>
          <p className="font-semibold text-md">Last Updated:</p>
          <p className="text-xs">
            {moment(this.props.pool.individualPool.lastUpdated).format('lll')}
          </p>
          <p className="text-xs">
            {this.props.pool.individualPool.lastUpdatedby ? (this.props.pool.individualPool.lastUpdatedby) : ("Updated automatically by the system.")}
          </p>
        </div>
          {this.props.accordionData.length > 0 ? (
            this.props.accordionData.map((item, i) => (
                <div className="px-2 py-4 mx-auto container  bg-white ">

                <div>
                <h1 className="text-xl">
                  {i + 1} ) {item.headerText}
                </h1>
                <h1>{item.bodyText}</h1>
                <div>
                  {this.props.accordionData[i].images != null &&
                    this.props.accordionData[i].images.length > 0 ? (
                    this.props.accordionData[i].images.map((item) => (
                      <img
                        src={item.image}
                        alt="..."
                        className="shadow object-contain h-32  align-middle border-none object-contain"
                      />
                    ))
                  ) : (
                    <div>

                    </div>
                  )}
                </div>
              </div>
                </div>
            ))
          ) : (
            <div></div>
          )}
      </>
    );
  }
}

export default PoolPublicContainer;
