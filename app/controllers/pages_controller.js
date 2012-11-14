var locomotive = require('locomotive')
  , md = require('markdown')
  , fs = require('fs')
  , path = require('path')
  , Controller = locomotive.Controller
  , PagesController = new Controller()

PagesController.main = function() {
  this.title = 'LeX'
  this.render()
}

PagesController.about = function() {
  self = this
  self.title = 'About LeX'
  fs.readFile(path.resolve(__dirname + '/../../README.md'), function(err, data) {
    if (err) throw err;

    // Render about page with README.md as content
    self.render({readme: md.markdown.toHTML(data.toString())})
  })
}

module.exports = PagesController
