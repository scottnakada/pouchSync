'use strict';

describe('Service: myPouchDB', function () {

  // load the service's module
  beforeEach(module('yoPouchSyncApp'));

  // instantiate service
  var myPouchDB;
  beforeEach(inject(function (_myPouchDB_) {
    myPouchDB = _myPouchDB_;
  }));

  it('should do something', function () {
    expect(!!myPouchDB).toBe(true);
  });

});
