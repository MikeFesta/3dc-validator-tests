import { expect } from 'chai';
import { Validator } from '@mikefesta/3dc-validator';

describe('validator', function () {
  const v = new Validator();

  describe('version', function () {
    it('should match the current version', function () {
      expect(v.version).to.equal('1.0.0-rc.8');
    });
  });
});
