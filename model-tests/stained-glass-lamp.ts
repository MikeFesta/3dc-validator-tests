import { expect } from 'chai';
import { Validator } from '@mikefesta/3dc-validator';

describe('stained glass lamp', function () {
  const v = new Validator();

  before('load model', async function () {
    try {
      this.timeout(5000); // This 40mb file takes over 2 seconds to load
      await v.model.loadFromFileSystem('models/stained-glass-lamp.glb');
    } catch (err) {
      throw new Error('Unable to load test model: stained-glass-lamp.glb');
    }
  });

  describe('file size', function () {
    it('should be 38428kb', function () {
      expect(v.model.fileSizeInKb.loaded).to.be.true;
      expect(v.model.fileSizeInKb.value).to.equal(38428);
    });
  });

  describe('material count', function () {
    it('should have 13 materials', function () {
      expect(v.model.materialCount.loaded).to.be.true;
      expect(v.model.materialCount.value).to.equal(13);
    });
  });

  describe('triangle count', function () {
    it('should have 35132 triangles', function () {
      expect(v.model.triangleCount.loaded).to.be.true;
      expect(v.model.triangleCount.value).to.equal(35132);
    });
  });

  describe('validation against single-item-web-ar', function () {
    before('load schema', async function () {
      try {
        await v.schema.loadFromFileSystem('schemas/publishing-targets/single-item-web-ar.json');
      } catch (err) {
        throw new Error('Unable to load test schema: single-item-web-ar.json');
      }
      await v.generateReport();
    });
    it('should fail file size', function () {
      expect(v.reportReady).to.be.true;
      expect(v.report.fileSize.tested).to.be.true;
      expect(v.report.fileSize.pass).to.be.false;
    });
    it('should pass triangle count', function () {
      expect(v.reportReady).to.be.true;
      expect(v.report.triangleCount.tested).to.be.true;
      expect(v.report.triangleCount.pass).to.be.true;
    });
    it('should pass material count', function () {
      expect(v.reportReady).to.be.true;
      expect(v.report.materialCount.tested).to.be.true;
      expect(v.report.materialCount.pass).to.be.true;
    });
    it('should have power of 2 texture dimensions', function () {
      expect(v.reportReady).to.be.true;
      expect(v.report.texturesPowerOfTwo.tested).to.be.true;
      expect(v.report.texturesPowerOfTwo.pass).to.be.true;
    });
  });
});
