'use strict';

const AWS = require('aws-sdk');
const FileFetcher = require('../api/fileFetcher');
const s3 = new AWS.S3();
const fileFetcher = new FileFetcher(process.env.BUCKETNAME, s3);
const {errorResponse, successResponse, Fail} = require('../utils/response');

exports.getNutrition = async (event, context) => {
  const queryStringParameters = event.queryStringParameters;

  if (!queryStringParameters || !queryStringParameters.country) {
    return errorResponse(Fail.MissingCountryName, context.awsRequestId);
  }

  return fileFetcher
      .fetch(process.env.CSVFILENAME, queryStringParameters.country)
      .then((res) => successResponse(res))
      .catch((err) => errorResponse(err.message, context.awsRequestId));
};
