import { expect } from 'chai';
import { Validator } from '@mikefesta/3dc-validator';

describe('no hard edges on beveled cube', function () {
  const v = new Validator();

  before('load beveled cube', async function () {
    try {
      await v.model.loadFromFileSystem('models/blender-default-cube-beveled.glb');
    } catch (err) {
      throw new Error('Unable to load test model: blender-default-cube-beveled.glb');
    }
  });
  describe('loaded', function () {
    it('should load the blender-default-cube-beveled', function () {
      expect(v.model.loaded).to.be.true;
    });
  });
  describe('hard edges', function () {
    before('load schema', async function () {
      try {
        await v.schema.loadFromFileSystem('schemas/edges/beveled-edges-required.json');
      } catch (err) {
        throw new Error('Unable to load test schema: beveled-edges-required.json');
      }
      await v.generateReport();
    });
    it('should be zero', function () {
      expect(v.model.hardEdgeCount.value as number).to.equal(0);
      expect(v.schema.requireBeveledEdges.value).to.be.true;
      expect(v.report.requireBeveledEdges.tested).to.be.true;
      expect(v.report.requireBeveledEdges.pass).to.be.true;
      expect(v.report.requireBeveledEdges.message).to.equal('0 hard edges (>= 90 degrees)');
    });
  });
});

describe('edges not beveled on default cube', function () {
  const v = new Validator();

  before('load beveled cube', async function () {
    try {
      await v.model.loadFromFileSystem('models/blender-default-cube-passing.glb');
    } catch (err) {
      throw new Error('Unable to load test model: blender-default-cube-passing.glb');
    }
  });
  describe('loaded', function () {
    it('should load the blender-default-cube-passing', function () {
      expect(v.model.loaded).to.be.true;
    });
  });
  describe('hard edges', function () {
    before('load schema', async function () {
      try {
        await v.schema.loadFromFileSystem('schemas/edges/beveled-edges-required.json');
      } catch (err) {
        throw new Error('Unable to load test schema: beveled-edges-required.json');
      }
      await v.generateReport();
    });
    it('should be zero', function () {
      expect(v.model.hardEdgeCount.value as number).to.equal(12);
      expect(v.schema.requireBeveledEdges.value).to.be.true;
      expect(v.report.requireBeveledEdges.tested).to.be.true;
      expect(v.report.requireBeveledEdges.pass).to.be.false;
      expect(v.report.requireBeveledEdges.message).to.equal('12 hard edges (>= 90 degrees)');
    });
  });
});
