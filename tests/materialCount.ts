import { expect } from 'chai';
import { Validator } from '@mikefesta/3dc-validator';

describe('material count passing report', function () {
  const v = new Validator();

  before('load model', async function () {
    try {
      await v.model.loadFromFileSystem('models/blender-default-cube-passing.glb');
    } catch (err) {
      throw new Error('Unable to load test model: blender-default-cube-passing.glb');
    }
  });

  describe('no material count checks', function () {
    before('load schema', async function () {
      try {
        await v.schema.loadFromFileSystem('schemas/material-count/material-count-no-check.json');
      } catch (err) {
        throw new Error('Unable to load test schema: material-count-no-check.json');
      }
      await v.generateReport();
    });
    it('should report not tested, but have the material count in the message', function () {
      expect(v.schema.maxMaterialCount.value).to.equal(-1);
      expect(v.model.materialCount.value).to.equal(1);
      expect(v.reportReady).to.be.true;
      expect(v.report.materialCount.tested).to.be.false;
      expect(v.report.materialCount.message).to.equal('1 material');
    });
  });

  describe('max material count', function () {
    before('load schema', async function () {
      try {
        await v.schema.loadFromFileSystem('schemas/material-count/material-count-pass.json');
      } catch (err) {
        throw new Error('Unable to load test schema: material-count-pass.json');
      }
      await v.generateReport();
    });
    it('should report being under the max material count', function () {
      expect(v.schema.maxMaterialCount.value).to.equal(5);
      expect(v.model.materialCount.value).to.equal(1);
      expect(v.reportReady).to.be.true;
      expect(v.report.materialCount.tested).to.be.true;
      expect(v.report.materialCount.pass).to.be.true;
      expect(v.report.materialCount.message).to.equal('1 <= 5');
    });
  });
});

describe('material count failing report', function () {
  const v = new Validator();

  before('load model', async function () {
    try {
      await v.model.loadFromFileSystem('models/blender-default-cube-failing.glb');
    } catch (err) {
      throw new Error('Unable to load test model: blender-default-cube-failing.glb');
    }
  });

  describe('max material count', function () {
    before('load schema', async function () {
      try {
        await v.schema.loadFromFileSystem('schemas/material-count/material-count-fail.json');
      } catch (err) {
        throw new Error('Unable to load test schema: material-count-fail.json');
      }
      await v.generateReport();
    });
    it('should report being over the max material count', function () {
      expect(v.schema.maxMaterialCount.value).to.equal(1);
      expect(v.model.materialCount.value).to.equal(3);
      expect(v.reportReady).to.be.true;
      expect(v.report.materialCount.tested).to.be.true;
      expect(v.report.materialCount.pass).to.be.false;
      expect(v.report.materialCount.message).to.equal('Too many materials: 3 > 1');
    });
  });
});
