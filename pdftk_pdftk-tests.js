var fs = Npm.require('fs');

Tinytest.addAsync('stamp', function (test, done) {
  PDFTK.stamp('../../../../in.pdf', '../../../../stamp.pdf', '../../../../out.pdf', function (error, stdout, stderr) {
    if (error) test.fail(error);
    else {
      // FAILS with "Trying to report a test not in a fiber! You probably forgot to wrap a callback in bindEnvironment."
      var referenceFileContents = fs.readFileSync('../../../../tests/out-stamp');
      var outFileContents = fs.readFileSync('../../../../tests/out-stamp');
      test.equal(outFileContents, referenceFileContents, 'Stamping');
      done();
    }
  });
});
