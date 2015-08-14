'use strict';

describe('Service: pouchWrapper', function () {

  // load the service's module
  beforeEach(module('yoPouchSyncApp'));

  // instantiate service
  var pouchWrapper;
  beforeEach(inject(function (_pouchWrapper_) {
    pouchWrapper = _pouchWrapper_;
  }));

  it('should do something', function () {
    expect(!!pouchWrapper).toBe(true);
  });

});
