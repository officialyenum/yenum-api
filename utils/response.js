const response = (
  res,
  status = "error",
  message = "an error occured",
  data = undefined,
  code = 500
) => {
  res.status(code).json({
    status: status,
    message: message,
    data: data,
  });
};

module.exports = response;
