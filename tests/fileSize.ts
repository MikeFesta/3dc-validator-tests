import { expect } from 'chai';
import { Validator } from '@mikefesta/3dc-validator';

describe('file size report passing', function () {
  const v = new Validator();

  before('load model', async function () {
    try {
      await v.model.loadFromFileSystem('models/blender-default-cube-passing.glb');
    } catch (err) {
      throw new Error('Unable to load test model');
    }
  });

  describe('no file size checks', function () {
    before('load schema', async function () {
      try {
        await v.schema.loadFromFileSystem('schemas/file-size/file-size-no-check.json');
      } catch (err) {
        throw new Error('Unable to load test schema. ' + (err as Error).message);
      }
      await v.generateReport();
    });
    it('should report not tested, but have the file size in the message', function () {
      expect(v.reportReady).to.be.true;
      expect(v.report.fileSize.tested).to.be.false;
      expect(v.report.fileSize.message).to.equal('File size: 2kb');
    });
  });

  describe('max file size', function () {
    before('load schema', async function () {
      try {
        await v.schema.loadFromFileSystem('schemas/file-size/file-size-no-min-pass.json');
      } catch (err) {
        throw new Error('Unable to load test schema. ' + (err as Error).message);
      }
      await v.generateReport();
    });
    it('should report being under the max file size', function () {
      expect(v.reportReady).to.be.true;
      expect(v.report.fileSize.tested).to.be.true;
      expect(v.report.fileSize.pass).to.be.true;
      expect(v.report.fileSize.message).to.equal('2kb <= 5120kb');
    });
  });

  describe('min file size', function () {
    before('load schema', async function () {
      try {
        await v.schema.loadFromFileSystem('schemas/file-size/file-size-no-max-pass.json');
      } catch (err) {
        throw new Error('Unable to load test schema. ' + (err as Error).message);
      }
      await v.generateReport();
    });
    it('should report being over the min file size', function () {
      expect(v.reportReady).to.be.true;
      expect(v.report.fileSize.tested).to.be.true;
      expect(v.report.fileSize.pass).to.be.true;
      expect(v.report.fileSize.message).to.equal('2kb >= 1kb');
    });
  });

  describe('file size within range', function () {
    before('load schema', async function () {
      try {
        await v.schema.loadFromFileSystem('schemas/file-size/file-size-within-range-pass.json');
      } catch (err) {
        throw new Error('Unable to load test schema. ' + (err as Error).message);
      }
      await v.generateReport();
    });
    it('should report being within range (min-max)', function () {
      expect(v.reportReady).to.be.true;
      expect(v.report.fileSize.tested).to.be.true;
      expect(v.report.fileSize.pass).to.be.true;
      expect(v.report.fileSize.message).to.equal('1kb <= 2kb <= 5120kb');
    });
  });
});

describe('file size report failing', function () {
  const v = new Validator();

  before('load model', async function () {
    try {
      await v.model.loadFromFileSystem('models/blender-default-cube-failing.glb');
    } catch (err) {
      throw new Error('Unable to load test model');
    }
  });

  describe('max file size', function () {
    before('load schema', async function () {
      try {
        await v.schema.loadFromFileSystem('schemas/file-size/file-size-no-min-fail.json');
      } catch (err) {
        throw new Error('Unable to load test schema. ' + (err as Error).message);
      }
      await v.generateReport();
    });
    it('should report being over the max file size', function () {
      expect(v.reportReady).to.be.true;
      expect(v.report.fileSize.tested).to.be.true;
      expect(v.report.fileSize.pass).to.be.false;
      expect(v.report.fileSize.message).to.equal('File too large: 12kb > 1kb');
    });
  });

  describe('min file size', function () {
    before('load schema', async function () {
      try {
        await v.schema.loadFromFileSystem('schemas/file-size/file-size-no-max-fail.json');
      } catch (err) {
        throw new Error('Unable to load test schema. ' + (err as Error).message);
      }
      await v.generateReport();
    });
    it('should report being under the min file size', function () {
      expect(v.reportReady).to.be.true;
      expect(v.report.fileSize.tested).to.be.true;
      expect(v.report.fileSize.pass).to.be.false;
      expect(v.report.fileSize.message).to.equal('File too small: 12kb < 1024kb');
    });
  });

  describe('file size out of range', function () {
    before('load schema', async function () {
      try {
        await v.schema.loadFromFileSystem('schemas/file-size/file-size-within-range-fail.json');
      } catch (err) {
        throw new Error('Unable to load test schema. ' + (err as Error).message);
      }
      await v.generateReport();
    });
    it('should report being out of range (min-max)', function () {
      expect(v.reportReady).to.be.true;
      expect(v.report.fileSize.tested).to.be.true;
      expect(v.report.fileSize.pass).to.be.false;
      expect(v.report.fileSize.message).to.equal('File too large: 12kb > 2kb');
    });
  });
});
