var couponOrderProxy = require('../../proxy/couponOrder.proxy');

// List Orders Page
var getAllOrders = function (req, res) {
  couponOrderProxy.getOrders().then(function (orders) {
    res.render('pages/orders');
  });
};
exports.getOrders = getAllOrders;

// CouponCode's Orders Page
var getOrdersByCouponCode = function (req, res, next) {
  //unimplemented
  var couponCode = req.params.couponCode;
  var rebated = req.query.rebated;

  couponOrderProxy.getOrdersByCouponCode(couponCode, rebated)
    .then(function (orders) {
      if (orders.length !== 0) {
        res.status(200);
        res.render('modify/orderDetails',
          {
            OrderList: orders
          });
      } else {
        res.status(404);
        res.render('partials/noFoundError',
          {
            errorData: couponCode
          });
      }
    }).catch(next);
};
exports.getOrdersByCouponCode = getOrdersByCouponCode;