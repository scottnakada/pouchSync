'use strict';

describe('Service: dataWrapper', function () {

  // load the service's module
  beforeEach(module('yoPouchSyncApp'));

  // instantiate service
  var dataWrapper;
  beforeEach(inject(function (_dataWrapper_) {
    dataWrapper = _dataWrapper_;
  }));

  it('should do something', function () {
    expect(!!dataWrapper).toBe(true);
  });

});
