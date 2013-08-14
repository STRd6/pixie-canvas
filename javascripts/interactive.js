// Generated by CoffeeScript 1.6.3
(function() {
  var ErrorReporter, bindUpdates, createEditor;

  createEditor = function(code, destination) {
    var annotationElement, contentElement, editorElement, exampleSection, runtimeElement;
    exampleSection = $("<li>", {
      "class": "example"
    });
    annotationElement = $("<div>", {
      "class": "annotation"
    });
    editorElement = $("<textarea>", {
      "class": "annotation",
      text: code
    });
    contentElement = $("<div>", {
      "class": "content"
    });
    runtimeElement = $("<canvas width=400 height=200>");
    contentElement.append(runtimeElement);
    annotationElement.append(editorElement);
    exampleSection.append(annotationElement);
    exampleSection.append(contentElement);
    destination.after(exampleSection);
    return bindUpdates(editorElement, runtimeElement);
  };

  bindUpdates = function(editorElement, canvasElement) {
    var canvas;
    canvas = canvasElement.pixieCanvas();
    return editorElement.on("keyup", function() {
      var code, e, report, source;
      report = ErrorReporter(editorElement);
      source = editorElement.val();
      try {
        code = CoffeeScript.compile(source);
        try {
          canvas.clear();
          eval(code);
          return report.clear();
        } catch (_error) {
          e = _error;
          return report(e);
        }
      } catch (_error) {
        e = _error;
        return report(e);
      }
    });
  };

  ErrorReporter = function(editor) {
    var reporter;
    reporter = function(error) {
      var errorParagraph;
      if (editor.next().is("p.error")) {
        return editor.next().text(error);
      } else {
        errorParagraph = $("<p>", {
          "class": "error",
          text: error.toString()
        });
        return editor.after(errorParagraph);
      }
    };
    reporter.clear = function() {
      if (editor.next().is("p.error")) {
        return editor.next().remove();
      }
    };
    return reporter;
  };

  $("blockquote > pre > code").each(function() {
    var blockQuoteElement, code, codeElement, sectionElement;
    codeElement = $(this);
    blockQuoteElement = codeElement.parent().parent();
    code = codeElement.text();
    sectionElement = blockQuoteElement.parent().parent();
    blockQuoteElement.remove();
    return createEditor(code, sectionElement);
  });

  $('#container').on('keyup', 'textarea', function() {
    $(this).height(0);
    return $(this).height(this.scrollHeight);
  }).find('textarea').keyup();

}).call(this);
