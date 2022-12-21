# Khronos 3D Commerce Asset Validator Tests

### SPDX-License-Identifier: Apache-2.0

## About

---

This repository should be used to test the 3DC-Validator (https://github.com/MikeFesta/3dc-validator).

By default, the latest version of 3dc-validator in npm is tested, but you can choose a specific version by updating the dev dependency in package.json.

## File types in this repository

---

- blender/\*_/_.blend - Blender source files for some test models
- blender/\*\*/textures - Texture files that go with the blender source files
- models/\*.glb - Binary 3D files in glTF format
- products/\*.json - Product information for models (optional)
- schemas/\*.json - 3D Commerce schema definition files
- tests/\*.ts - Mocha+Chai unit tests written in Typescript

## Use

---

```
npm install
npm run test
```

## Use in Development

---

As-is, this code will only test 3dc-validator releases that have been published to NPM. In order to test code in development, you should replace the folder in node_modules/@mikefesta/3dc-validator with a symbolic link to your local development copy of the same code.

```
npm install
cd node_modules/@mikefesta
rm -r 3dc-validator
ln -s {your-local-copy-of-3dc-validator} .
cd ../../
npm run test
```

**Note:** If you run npm install in the future, it will delete the symbolic link and re-download the original code from npm, so you'll have to repeat the above steps.

## Version Updates

---

When the 3dc-validator version changes, there are several places in this codebase that should be updated to reflect the latest version.
A bash script makes it easier to rename all occurrences across the project.

```
./set-version.sh {new-version-number}
```

**Note:** By default, the file will lack execute privileges. To fix that, run `chmod +x set-version.sh`
