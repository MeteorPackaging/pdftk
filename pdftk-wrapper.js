var execFile = Npm.require('child_process').execFile;

if (PDFTK === undefined)
  PDFTK = {};

/**
 * Execute the PDFTK installed in the system
 * @param  {Array}    args - command-line arguments to pdftk
 * @param  {Function} callback - callback function that receives error, stdout, and stderr
 */
PDFTK.execute = Meteor.wrapAsync(function execute(args, callback) {
  execFile('pdftk', args, {encoding: 'binary', maxBuffer: 1024 * 1000}, function pdftkCallback(error, stdout, stderr) {
    if (error) {
      if (error.code === "ENOENT")
        callback('Could not find pdftk executable');
      else
        callback(error);
    } else {
      callback(null, new Buffer(stdout, 'binary'), new Buffer(stderr, 'binary'));
    }
  });
});

/**
 * Assemble pages from the input PDF(s) to create a new PDF. Read more at https://www.pdflabs.com/docs/pdftk-man-page/#dest-op-cat
 * @param {String}      pdf - Path to input PDF file
 * @param {String}      start
 * @param {String}      end
 * @param {Function}    callback
 * @return {Npm.buffer} Node.js Buffer with the result of executing the pdftk command
 */
PDFTK.pages = PDFTK.cat = function pages(pdf, start, end, callback) {
  var range = (start || 1) + '-' + (end || 'end');
  return PDFTK.execute([pdf, 'cat', range, 'output -'], callback);
};

/**
 * Fills the single input PDF's form fields with the data from an FDF or XFDF file. Read more at https://www.pdflabs.com/docs/pdftk-man-page/#dest-op-fill-form
 * @param {String}      pdf - path to the input PDF file
 * @param {String}      xfdf - path to the (X)FDF file
 * @param {String}      output - path to the output PDF file
 * @param {Function}    callback
 * @return {Npm.buffer} Node.js Buffer with the result of executing the pdftk command
 */
PDFTK.fillForm = function fillForm(pdf, xfdf, output, callback) {
  return PDFTK.execute([pdf, 'fill_form', xfdf, 'output', output], callback);
};

/**
 * Stamp the input PDF with the `stamp` file and produce an `output` PDF. Read more at https://www.pdflabs.com/docs/pdftk-man-page/#dest-op-stamp
 * @param {String}      pdf - path to the input PDF file
 * @param {String}      stamp - path to the stamp PDF file
 * @param {String}      output - path to the output PDF file
 * @param {Function}    callback
 * @return {Npm.buffer} Node.js Buffer with the result of executing the pdftk command
 */
PDFTK.stamp = function stamp(pdf, stamp, output, callback) {
  return PDFTK.execute([pdf, 'stamp', stamp, 'output', output], callback);
};

/**
 * Stamp the input PDF with each page of the `stamp` file and produce an `output` PDF. Read more at https://www.pdflabs.com/docs/pdftk-man-page/#dest-op-multistamp
 * @param {String}      pdf - path to the input PDF file
 * @param {String}      stamp - path to the stamp PDF file
 * @param {String}      output - path to the output PDF file
 * @param {Function}    callback
 * @return {Npm.buffer} Node.js Buffer with the result of executing the pdftk command
 */
PDFTK.multistamp = function multistamp(pdf, stamp, output, callback) {
  return PDFTK.execute([pdf, 'multistamp', stamp, 'output', output], callback);
};
