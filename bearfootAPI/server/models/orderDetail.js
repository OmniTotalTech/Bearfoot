const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create a schema
const orderDetailSchema = new Schema({
  status: {
    type: String,
  },
  time_to_complete: {
    type: String,
  },
  date: {
    type: String,
  },
  day_of_week: {
    type: String,
  },
  assigned_driver: {
    type: String,
  },
  assigned_backup: {
    type: String,
  },
  accepted_by: {
    type: String,
  },
  accepted_time: {
    type: String,
  },
  arrived_to_stock_time: {
    type: String,
  },
  arrived_at_location_time: {
    type: String,
  },
  final_commments: {
    type: String,
  },
  starting_list: {
    type: String,
  },
  any_empty: {
    type: Boolean,
  },
  pool_id: {
    type: String,
  },
});

// Create a model
const OrderDetail = mongoose.model("orderDetail", orderDetailSchema);

// Export the model
module.exports = OrderDetail;
