import React, { Component } from "react";
import {
  SafeAreaView,
  Text,
  View,
  TouchableHighlight,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from "react-native";

import QueryBuilderIcon from "@material-ui/icons/QueryBuilder";
import DeliveryStatusIcon from "../../Components/DeliveryStatusIcon";
import AreaTable from "../../Components/Admin/AreaTable";
import { connect } from "react-redux";
import { fetchAreaPools } from "../../redux/actions/area";
import PoolTable from "../../Components/Admin/PoolTable";

class AdminAreaDetail extends Component {
  componentDidMount() {
    this.props.fetchAreaPools(this.props.route.params);
  }
  render() {
    console.log(this.props.route.params);

    return (
      <ScrollView>
        <div className="container mx-auto">
          <div className="container">
            <div className="w-full mx-auto">
              <PoolTable
                navigation={this.props.navigation}
                data={this.props.area.pools}
              />
            </div>
          </div>
        </div>
      </ScrollView>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    area: state.area,
  };
};

const mapDisptachToProps = (dispatch) => {
  return {
    fetchAreaPools: (id) => dispatch(fetchAreaPools(id)),
  };
};

export default connect(mapStateToProps, mapDisptachToProps)(AdminAreaDetail);
