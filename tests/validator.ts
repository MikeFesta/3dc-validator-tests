import { expect } from 'chai';
import { Validator } from '@mikefesta/3dc-validator';

describe('Validator', function () {
  const v = new Validator();

  describe('Version', function () {
    it('should match the current version', function () {
      expect(v.version).to.equal('1.0.0-alpha.6');
    });
  });
});
