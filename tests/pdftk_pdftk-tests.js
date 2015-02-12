var fs = Npm.require('fs');
var resolve = Npm.require('path').resolve;
var packageName = 'pdftk_pdftk';
var testsPath = resolve('assets', 'packages', 'local-test_' + packageName, 'tests');

Tinytest.addAsync('stamp', function (test, done) {
  PDFTK.stamp(resolve(testsPath, 'in.pdf'), resolve(testsPath, 'stamp.pdf'), 'out.pdf', function callback(error, stdout, stderr) {
    if (error) {
      console.error(error.message);
      test.fail({message: error.message});
    }
    else {
      var referenceFileContents = fs.readFileSync(resolve(testsPath, 'out-stamp.pdf'));
      var outFileContents = fs.readFileSync('out.pdf');
      fs.unlinkSync('out.pdf');
      test.equal(outFileContents, referenceFileContents, 'Stamping');
    }
    done();
  });
});
