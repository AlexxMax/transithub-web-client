; (function() {
  var sw = document.createElement("script");
  sw.type = "text/javascript";
  sw.async = true;
  sw.src = "https://widget.sender.mobi/build/init.js";

  var s = document.getElementsByTagName("script") [0];
  s.parentNode.insertBefore(sw, s.nextSibling);

  window.senderCallback = (function() {
    SenderWidget.init({ companyId: "i44031135899" });
  })
}) ();
