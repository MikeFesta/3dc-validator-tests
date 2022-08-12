import { expect } from 'chai';
import { Validator } from '@mikefesta/3dc-validator';

describe('generating passing report', function () {
  const v = new Validator();

  before('load report', async function () {
    try {
      await v.schema.loadFromFileSystem('schemas/pass.json');
    } catch (err) {
      throw new Error('Unable to load test schema: pass.json');
    }
    try {
      await v.model.loadFromFileSystem('models/blender-default-cube-passing.glb');
    } catch (err) {
      throw new Error('Unable to load test model: blender-default-cube-passing.glb');
    }
    await v.generateReport();
  });

  describe('ready', function () {
    it('should have the passing report ready', function () {
      expect(v.reportReady).to.be.true;
    });
  });
  describe('file size', function () {
    it('should pass for blender-default-cube-passing', function () {
      expect(v.report.fileSize.tested).to.be.true;
      expect(v.report.fileSize.pass).to.be.true;
    });
  });
  describe('triangle count', function () {
    it('should pass for blender-default-cube-passing', function () {
      expect(v.report.triangleCount.tested).to.be.true;
      expect(v.report.triangleCount.pass).to.be.true;
    });
  });
  describe('material count', function () {
    it('should pass for blender-default-cube-passing', function () {
      expect(v.report.materialCount.tested).to.be.true;
      expect(v.report.materialCount.pass).to.be.true;
    });
  });
  describe('texture dimensions are powers of 2', function () {
    it('should pass for blender-default-cube-passing', function () {
      expect(v.report.texturesPowerOfTwo.tested).to.be.true;
      expect(v.report.texturesPowerOfTwo.pass).to.be.true;
    });
  });
  describe('max dimensions', function () {
    it('should be less than 100x100x100', function () {
      expect(v.report.dimensionsMax.tested).to.be.true;
      expect(v.report.dimensionsMax.pass).to.be.true;
    });
  });
  describe('min dimensions', function () {
    it('should be greater than 0.01x0.01x0.01', function () {
      expect(v.report.dimensionsMin.tested).to.be.true;
      expect(v.report.dimensionsMin.pass).to.be.true;
    });
  });
});

describe('generating failing report', function () {
  const v = new Validator();

  before('load report', async function () {
    try {
      await v.schema.loadFromFileSystem('schemas/fail.json');
    } catch (err) {
      throw new Error('Unable to load test schema: fail.json');
    }
    try {
      await v.model.loadFromFileSystem('models/blender-default-cube-failing.glb');
    } catch (err) {
      throw new Error('Unable to load test model: blender-default-cube-failing.glb');
    }
    await v.generateReport();
  });
  describe('ready', function () {
    it('should have the failing report ready', function () {
      expect(v.reportReady).to.be.true;
    });
  });
  describe('file size', function () {
    it('should fail for blender-default-cube-failing', function () {
      expect(v.report.fileSize.tested).to.be.true;
      expect(v.report.fileSize.pass).to.be.false;
    });
  });
  describe('triangle count', function () {
    it('should fail for blender-default-cube-failing', function () {
      expect(v.report.triangleCount.tested).to.be.true;
      expect(v.report.triangleCount.pass).to.be.false;
    });
  });
  describe('texture dimensions are powers of 2', function () {
    it('should fail for blender-default-cube-failing', function () {
      expect(v.report.texturesPowerOfTwo.tested).to.be.true;
      expect(v.report.texturesPowerOfTwo.pass).to.be.false;
    });
  });
  describe('material count', function () {
    it('should fail for blender-default-cube-failing', function () {
      expect(v.report.materialCount.tested).to.be.true;
      expect(v.report.materialCount.pass).to.be.false;
    });
  });
  describe('max dimensions', function () {
    it('should fail for being larger than 10m width and depth', function () {
      expect(v.report.dimensionsMax.tested).to.be.true;
      expect(v.report.dimensionsMax.pass).to.be.false;
    });
  });
  describe('min dimensions', function () {
    it('should fail for height smaller than 1m', function () {
      expect(v.report.dimensionsMin.tested).to.be.true;
      expect(v.report.dimensionsMin.pass).to.be.false;
    });
  });
});
