module.exports = {
  name: 'doit',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/apps/doit',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js'
  ]
};
