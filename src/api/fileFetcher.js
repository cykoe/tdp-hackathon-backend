'use strict';

const csv = require('csv-parser');
const {Fail} = require('../utils/response');

class FileFetcher {
  constructor(bucketName, s3) {
    this.bucketName = bucketName;
    this.s3 = s3;
  }

  fetch(fileName, country) {
    if (!fileName) throw new Error(Fail.MissingBucketName);
    const params = {Bucket: this.bucketName, Key: fileName};
    return new Promise((resolve, reject) => {
      this.s3
          .getObject(params)
          .createReadStream()
          .pipe(csv())
          .on('data', (data) => {
            const countryName = data[Object.keys(data)[0]];
            if (
              countryName.trim().toLowerCase() === country.trim().toLowerCase()
            ) {
              return resolve(data);
            }
          })
          .on('end', () => {
            reject(new Error(Fail.CountryNotFound));
          });
    });
  }
}

module.exports = FileFetcher;
