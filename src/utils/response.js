exports.errorResponse = (errorMessage, awsRequestId) => {
  return {
    statusCode: 404,
    body: JSON.stringify({
      success: false,
      message: errorMessage,
      reference: awsRequestId,
    }),
  };
};

exports.successResponse = (message, options) => {
  return {
    statusCode: 201,
    body: JSON.stringify({
      success: true,
      message,
    }),
    ...options,
  };
};

exports.Fail = {
  MissingCountryName: 'missing country name parameter.' +
    ' please add /?country=example in the url',
  CountryNotFound: 'country not found',
  MissingBucketName: 'filename must be specified',
};

