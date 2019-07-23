const fs = require('fs');
const sinon = require('sinon');
const expect = require('chai').expect;
const FileFetcher = require('../../src/api/fileFetcher');
const {Fail} = require('../../src/utils/response');

describe('Testing FileFetcher Class', () => {
  it('should initialize', () => {
    const fileFetcher = new FileFetcher('name', 's3');

    expect(fileFetcher.bucketName).to.equal('name');
  });

  it('should find a country', async () => {
    const s3 = {
      getObject: sinon.stub().returns({
        createReadStream: sinon.stub()
            .returns(fs.createReadStream('./diet.csv')),
      }),
    };

    const fileFetcher = new FileFetcher('name', s3);
    const res = await fileFetcher.fetch('fileName', 'ghana');

    expect(res).to.be.an('object');
  });

  it('should fail to find non-existed country', async () => {
    const s3 = {
      getObject: sinon.stub().returns({
        createReadStream: sinon.stub()
            .returns(fs.createReadStream('./diet.csv')),
      }),
    };

    const fileFetcher = new FileFetcher('name', s3);
    try {
      await fileFetcher.fetch('fileName', 'dope');
    } catch (e) {
      expect(e.message).to.equal(Fail.CountryNotFound);
    }
  });

  it('should fail - no country input', async () => {
    try {
      const fileFetcher = new FileFetcher(undefined, {});
      fileFetcher.fetch(undefined, {});
    } catch (e) {
      expect(e.message).to.equal(Fail.MissingBucketName);
    }
  });
});
