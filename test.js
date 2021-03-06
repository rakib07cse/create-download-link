var assert = require('chai').assert;
var createDownloadLink = require('./index.js');

describe('When you invoke create-download-link,', function() {
  before(function() {
    var opt = {
      data: 'nice data',
      title: 'nice title',
      filename: 'filename.txt'
    };
    this.anchor = createDownloadLink(opt);
  });

  describe('the link', function() {
    it('should be of type anchor', function() {
      assert.equal(this.anchor.nodeName, 'A');
    });
    it('should have the correct attributes', function() {
      assert.equal(this.anchor.getAttribute('href'),
          'data:application/octet-stream,nice%20data');
      assert.equal(this.anchor.getAttribute('download'),
          'filename.txt');
    });
    it('should have a title', function() {
      assert.equal(this.anchor.childNodes.length, 1);
      assert.equal(this.anchor.firstChild.nodeValue, 'nice title');
    });
  });
  describe('creation', function() {
    it('should fail if data is missing', function() {
      var opt = {
        title: 'nice title',
        filename: 'filename.txt'
      };
      assert.throw(function() {
        createDownloadLink(opt);
      }, Error, 'No data provided to create-download-link');
    });
    it('should fail if title is missing', function() {
      var opt = {
        data: 'nice data',
        filename: 'filename.txt'
      };
      assert.throw(function() {
        createDownloadLink(opt);
      }, Error, 'No title provided to create-download-link');
    });
    it('should fail if filename is missing', function() {
      var opt = {
        data: 'nice data',
        title: 'nice title'
      };
      assert.throw(function() {
        createDownloadLink(opt);
      }, Error, 'No filename provided to create-download-link');
    });
  });
});
