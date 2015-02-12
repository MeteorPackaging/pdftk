Package.describe({
  name: 'pdftk:pdftk',
  version: '0.7.0',
  summary: 'Wrapper for PDFTK: PDF file merge, split, encrypt, decrypt, rotate, watermark, stamp and more',
  git: 'https://github.com/MeteorPackaging/pdftk',
  documentation: 'README.md'
});

Package.onUse(function (api) {
  api.versionsFrom(['METEOR@0.9.3', 'METEOR@1.0']);
  api.addFiles('pdftk-wrapper.js', 'server');
  api.export('PDFTK');
});

Package.onTest(function(api) {
  api.use('tinytest', 'server');
  api.use('pdftk:pdftk', 'server');  // yes, our package tests have to explicitly use our package - https://github.com/meteor/meteor/issues/1620
  api.addFiles([
    'tests/pdftk_pdftk-tests.js',
    'tests/in.pdf', 'tests/stamp.pdf', 'tests/out-stamp.pdf'
  ], 'server');
});
