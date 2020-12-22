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
import { fetchMyAdminAreas } from "../../redux/actions/area";

class AdminAreaHome extends Component {
  componentDidMount() {
    this.props.fetchArea();
  }

  render() {
    console.log(this.props.area.data);

    return (
      <ScrollView>
        <div className="container mx-auto">
          <div className="container">
            <div className="w-full mx-auto">
              <AreaTable
                navigation={this.props.navigation}
                area={this.props.area}
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
    fetchArea: () => dispatch(fetchMyAdminAreas()),
  };
};

export default connect(mapStateToProps, mapDisptachToProps)(AdminAreaHome);
