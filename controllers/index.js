const response = require("../utils/response");

exports.index = async (req, res) => {
    try {
        response(
          res,
          "success",
          "Welcome to Yenum\'s Api Endpoint",
          [],
          200
        );
    } catch (err) {
        response(res, "error", err, [], 500);
    }
};
