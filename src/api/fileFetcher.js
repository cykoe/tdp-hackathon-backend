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
            delete data[Object.keys(data)[0]];
            if (
              countryName.trim().toLowerCase() === country.trim().toLowerCase()
            ) {
              const res = {};
              Object.keys(data).forEach((nutrient, i) => {
                const key = nutrient.toLowerCase().replace(/\s/g, '_');
                if (!i) {
                  res.countryName = countryName.trim().toLowerCase();
                  res.data = [{
                    key,
                    label: nutrient,
                    data: data[nutrient],
                  }];
                } else {
                  res.data.push({
                    key,
                    label: nutrient,
                    data: data[nutrient],
                  });
                }
              });
              return resolve(res);
            }
          })
          .on('end', () => {
            reject(new Error(Fail.CountryNotFound));
          });
    });
  }

  getCountries(fileName) {
    if (!fileName) throw new Error(Fail.MissingBucketName);
    const params = {Bucket: this.bucketName, Key: fileName};
    const countries = [];
    return new Promise((resolve, reject) => {
      this.s3
          .getObject(params)
          .createReadStream()
          .pipe(csv())
          .on('data', (data) => {
            const countryName = data[Object.keys(data)[0]];
            countries.push(countryName);
          })
          .on('end', () => {
            resolve(countries.slice(1));
          });
    });
  }
}

module.exports = FileFetcher;
