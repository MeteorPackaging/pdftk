PDFTk
=====

Server-side Meteor wrapper for PDFtk, the [PDF toolkit](https://www.pdflabs.com/tools/pdftk-the-pdf-toolkit/), a tool for manipulating PDF documents.

From the [pdftk man page](http://linux.die.net/man/1/pdftk):

> If PDF is electronic paper, then pdftk is an electronic stapler-remover, hole-punch, binder, secret-decoder-ring, and X-Ray-glasses. Pdftk is a simple tool for doing everyday things with PDF documents. Keep one in the top drawer of your desktop and use it to:

> * Merge PDF Documents or Collate PDF Page Scans
> * Split PDF Pages into a New Document
> * Rotate PDF Documents or Pages
> * Decrypt Input as Necessary (Password Required)
> * Encrypt Output as Desired
> * Fill PDF Forms with X/FDF Data and/or Flatten Forms
> * Generate FDF Data Stencils from PDF Forms
> * Apply a Background Watermark or a Foreground Stamp
> * Report PDF Metrics such as Metadata and Bookmarks
> * Update PDF Metadata
> * Attach Files to PDF Pages or the PDF Document
> * Unpack PDF Attachments
> * Burst a PDF Document into Single Pages
> * Uncompress and Re-Compress Page Streams
> * Repair Corrupted PDF (Where Possible)


## Requirements

You need to have PDFTK installed on the system. Downloads for all operating systems are available at <https://www.pdflabs.com/tools/pdftk-server/>.
For Linux, you can also run `sudo apt-get install pdftk` (make sure you get the latest version).

## Quick Start

Add the package with `meteor add pdftk:pdftk`. In your server code, you can run wrappers like this:

```js
PDFTK.stamp('/path/to/in.pdf', '/path/to/stamp.pdf', '/path/to/pdfstamp/out.pdf', function (error, stdout, stderr) {
  if (error) console.log('Error:', error);
  else {
    // success
  }
})
```

Note that you need to pass absolute paths to the files because the current directory when running `meteor` is going to be
`.meteor/local/build/programs/server/` when debugging, and something similar in production.


## Command wrappers

Consult the [man page](https://www.pdflabs.com/docs/pdftk-man-page/) for command details.

* [`cat`](https://www.pdflabs.com/docs/pdftk-man-page/#dest-op-cat)`(pdf, start, end, callback)` (aliased: `pages`)
* [`stamp`](https://www.pdflabs.com/docs/pdftk-man-page/#dest-op-stamp)`(pdf, stamp, output, callback)`
* [`multistamp`](https://www.pdflabs.com/docs/pdftk-man-page/#dest-op-multistamp)`(pdf, stamp, output, callback)`
* [`fillform`](https://www.pdflabs.com/docs/pdftk-man-page/#dest-op-fill-form)`(pdf, xfdf, output, callback)`

Pull requests are welcome for more wrappers. If you need to execute a custom command, or one that's not wrapped, run:

* `PDFTK.execute(args, callback)`


## Documentation

More information about PDFTK:
* [Wikipedia](https://en.wikipedia.org/wiki/Pdftk)
* [man page](https://www.pdflabs.com/docs/pdftk-man-page/)
* [CLI examples](https://www.pdflabs.com/docs/pdftk-cli-examples/)

## Contributing

Contributors are very welcome. Some guidelines below:

* **Questions**: It's okay to ask a question on Github Issues if you're
  having trouble since the volume is manageable. Just prefix your Github Issue with
  'Question: ' so we can differentiate easily. Also, please make sure you've read through
  PDFTk documentation and tried a few things before asking. Also, please provide a cloneable
  Github repository if the issue is complex. For more complex questions sometimes it's hard
  to get all of the context required to solve a problem by just looking at text.

* **New Features**: If you'd like to work on a feature for the PDFTk wrapper,
  start by creating a 'Feature Design: Title' issue. This will let people bat it
  around a bit before you send a full blown pull request. Also, you can create
  an issue to discuss a design even if you won't be working on it.

* **Answer Questions!**: If you can help another user please do!


## TODO

1. Fix Fibers issue with testing
2. Wrap more commands


## Contributors

* Pascal Richier, [@pascoual](http://github.com/pascoual)
* Aaron Adams, [@aadamsx](http://github.com/aadamsx)
* Dan Dascalescu, [@dandv](http://github.com/dandv)


## License

MIT
