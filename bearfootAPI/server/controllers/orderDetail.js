const OrderDetail = require("../models/orderDetail");

module.exports = {
  getAll: async (req, res, next) => {
    const foundOrderDetails = await OrderDetail.find({});
    res.json({ foundOrderDetails });
  },

  newOrder: async (req, res, next) => {
    const {
      status,
      time_to_complete,
      date,
      day_of_week,
      assigned_driver,
      assigned_backup,
      accepted_by,
      accepted_time,
      arrived_to_stock_time,
      arrived_at_location_time,
      final_comments,
      starting_list,
      any_empty,
      pool_id,
    } = req.body;

    const newOrder = new OrderDetail({
      status: status,
      time_to_complete: time_to_complete,
      date: date,
      day_of_week: day_of_week,
      assigned_driver: assigned_driver,
      assigned_backup: assigned_backup,
      accepted_by: accepted_by,
      accepted_time: accepted_time,
      arrived_to_stock_time: arrived_to_stock_time,
      arrived_at_location_time: arrived_at_location_time,
      final_comments: final_comments,
      starting_list: starting_list,
      any_empty: any_empty,
      pool_id: pool_id,
    });

    await newOrder.save();
    res.status(201).json({ newOrder });
  },
};
