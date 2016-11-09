/**
 * Created by ekinr on 2016/11/7.
 */

var showError = function (status, err, next){
  err.api = true;
  err.status = status;
  next(err);
}
exports.useMobileAsCode = function (req, res, next) {
  var code = req.body.mobile;
  var username = req.params.username;
  
  // Username can not be null
  if(!username) {
    var err = new Error('No Username Provided');
    showError(406, err, next);
  }

  if(code) {

    // Only allow valid China mobile number
    if(/1[34578]\d{9}$/.test(code)) {
      req.couponCode = code;
      req.userName = username;

      next();
    }
    else {
      var err = new Error('Invalid Mobile Provided');
      showError(406, err, next);

    }
   
  }
  else {
    var err = new Error('No Mobile Provided');
    showError(406, err, next);
  }
};

exports.useMobileAndUsernameToCreateCouponCode = function (req, res, next) {
  var mobile = req.body.mobile;
  var username = req.body.username;
  var couponID = req.params.couponID;
  
  // Username can not be null
  if(!username) {
    var err = new Error('No Username Provided');
    err.status = 406;
    err.api = true;
    next(err);
  }
  
  // couponId and mobile should match or both undefined
  if(couponID !== mobile) {
    var err = new Error('No Matched Mobile And CouponID / Both Undefined');
    err.status = 406;
    err.api = true;
    next(err);
  }
  if(mobile) {
    // Only allow valid China mobile number
    if(/1[34578]\d{9}$/.test(mobile)) {
      req.couponCode = mobile;
      req.userName = username;
      next();
    }
    else {
      var err = new Error('Invalid Mobile Provided');
      err.status = 406;
      err.api = true;
      next(err);
    }
   
  }
  else {
    var err = new Error('No Mobile Provided');
    err.status = 406;
    err.api = true;
    next(err);
  }
};