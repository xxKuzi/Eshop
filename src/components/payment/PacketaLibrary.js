Packeta = window.Packeta || {};
Packeta.Viewport = {
  element: null,
  originalValue: null,
  set: function () {
    if (!Packeta.Viewport.element) {
      Packeta.Viewport.element = document.querySelector("meta[name=viewport]");
      if (Packeta.Viewport.element) {
        Packeta.Viewport.originalValue = Packeta.Viewport.element.getAttribute("content");
      } else {
        Packeta.Viewport.originalValue = "user-scalable=yes";
        Packeta.Viewport.element = document.createElement("meta");
        Packeta.Viewport.element.setAttribute("name", "viewport");
        (document.head || document.getElementsByTagName("head")[0]).appendChild(Packeta.Viewport.element);
      }
    }
    Packeta.Viewport.element.setAttribute("content", "width=device-width, initial-scale=1.0, minimum-scale=1.0, user-scalable=yes");
  },
  restore: function () {
    if (Packeta.Viewport.originalValue !== null) {
      Packeta.Viewport.element.setAttribute("content", Packeta.Viewport.originalValue);
    }
  },
};

Packeta.Util = {
  makeRequest: function (method, url, data, callback) {
    try {
      var xhr = new XMLHttpRequest();
      xhr.open(method, url);
      xhr.timeout = 5000;

      xhr.onload = function () {
        if (this.status >= 200 && this.status < 300) {
          callback(xhr.response, false);
        } else {
          callback(
            {
              status: this.status,
              statusText: xhr.statusText,
            },
            true,
          );
        }
      };

      xhr.onerror = function () {
        callback(
          {
            status: this.status,
            statusText: xhr.statusText,
          },
          true,
        );
      };

      xhr.ontimeout = function () {
        callback(
          {
            status: this.status,
            statusText: xhr.statusText,
          },
          true,
        );
      };

      if (method === "POST" && data) {
        xhr.send(data);
      } else {
        xhr.send();
      }
    } catch (error) {
      callback(
        {
          error: "XMLHttpRequest error: " + error,
        },
        true,
      );
    }
  },
};

Packeta.Widget = {
  baseUrl: "https://widget.packeta.com/",
  backupUrl: "https://backup.widget.packeta.com/",
  healthUrl: "https://widget.packeta.com/v6/api/hcs/api/healthcheck",
  errorUrl: "https://error-page-service-widget-errors.prod.packeta-com.codenow.com/",
  versions: {
    backup: "backup",
    base: "base",
    error: "error",
  },
  close: function () {},
  initIframe: function (apiKey, callback, opts, inElement) {
    Packeta.Widget.close();

    if (!opts) {
      opts = {};
    }
    if (!("version" in opts)) {
      opts.version = 3;
    }

    opts.apiKey = apiKey;

    var url = Packeta.Widget.baseUrl;

    if (opts.currentVersion === Packeta.Widget.versions.backup) {
      url = Packeta.Widget.backupUrl;
    }

    if (opts.currentVersion === Packeta.Widget.versions.error) {
      url = Packeta.Widget.errorUrl;
    }

    url = url + "v6/#/?";

    for (let param in opts) {
      url += "&" + param + "=" + encodeURIComponent(opts[param]);
    }

    var inline = typeof inElement != "undefined" && inElement !== null;
    var wrapper;
    if (inline) {
      wrapper = inElement;
    } else {
      Packeta.Viewport.set();
      wrapper = document.createElement("div");
      wrapper.setAttribute("style", "z-index: 999999; position: fixed; -webkit-backface-visibility: hidden; left: 0; top: 0; width: 100%; height: 100%; background: " + (opts.overlayColor || "rgba(0, 0, 0, 0.3)") + "; ");
      wrapper.addEventListener("click", function () {
        Packeta.Widget.close();
      });

      // fix for some older browsers which fail to do 100% width of position:absolute inside position:fixed element
      setTimeout(function () {
        var rect = iframe.getBoundingClientRect();
        var width = "width" in rect ? rect.width : rect.right - rect.left;
        if (Math.round(width) < window.innerWidth - 100) {
          // 10px = side padding sum, just as a safety measure
          iframe.style.width = window.innerWidth + "px";
          iframe.style.height = window.innerHeight + "px";
        }
      }, 0);
    }

    // always support Escape key immediatelly after the widget is displayed, even for inline
    wrapper.addEventListener("keyup", function (e) {
      if (e.keyCode == 27) {
        Packeta.Widget.close();
      }
    });

    var iframe = document.createElement("iframe");
    if (inline) {
      iframe.setAttribute("style", "border: hidden; width: 100%; height: 100%; ");
    } else {
      iframe.setAttribute("style", "border: hidden; position: absolute; left: 0; top: 0; width: 100%; height: 100%; padding: 10px 5px; box-sizing: border-box; ");
    }
    iframe.setAttribute("id", "packeta-widget");
    iframe.setAttribute("sandbox", "allow-scripts allow-same-origin allow-popups");
    iframe.setAttribute("allow", "geolocation");
    iframe.setAttribute("allowfullscreen", "true");
    iframe.setAttribute("src", url);

    wrapper.appendChild(iframe);
    if (!inline) {
      document.body.appendChild(wrapper);
    }

    if (wrapper.getAttribute("tabindex") === null) {
      wrapper.setAttribute("tabindex", "-1"); // make it focusable
    }
    wrapper.focus();

    var receiver = function (e) {
      // check if this is message from the Packeta Widget
      try {
        var message = typeof e.data === "object" ? e.data : JSON.parse(e.data);
        if (!message.packetaWidgetMessage) return;
      } catch (err) {
        return;
      }
      if (opts.layout && ["hd", "ac", "rs"].includes(opts.layout.toLocaleLowerCase())) {
        Packeta.Widget.close(message);
      } else if (opts.layout && ["cd", "cdmap", "cdreg"].includes(opts.layout.toLocaleLowerCase())) {
        Packeta.Widget.close(message.delivery);
      } else {
        Packeta.Widget.close(message.packetaPoint);
      }
    };
    window.addEventListener("message", receiver);

    Packeta.Widget.close = function (point) {
      window.removeEventListener("message", receiver);
      if (inline) {
        try {
          iframe.parentNode.removeChild(iframe);
        } catch (err) {
          // ignore
        }
      } else {
        document.body.removeChild(wrapper);
        Packeta.Viewport.restore();
      }
      callback(point || null);
      Packeta.Widget.close = function () {};
    };
  },
  pick: function (apiKey, callback, opts, inElement) {
    if (!opts) {
      opts = {};
    }

    opts.loader = "library";
    opts.referrer = window.location.origin;

    const vendorsKey = Object.keys(opts).find((key) => key.toLowerCase() === "vendors");

    if (vendorsKey && typeof opts[vendorsKey] === "object") {
      try {
        opts[vendorsKey] = opts[vendorsKey].map((item) => `${item.country || ""},` + `${item.group || ""},` + `${item.carrierId || ""},` + `${item.currency || ""},` + `${item.price || item.price === 0 ? item.price : ""},` + `${item.selected || ""}`).join("|");
      } catch (error) {
        opts[vendorsKey] = "";
      }
    }

    if (opts.layout && ["hd", "ac", "rs"].includes(opts.layout.toLocaleLowerCase())) {
      Packeta.Widget.baseUrl = "https://hd.widget.packeta.com/";
      Packeta.Widget.backupUrl = "https://backup.widget.packeta.com/";
      Packeta.Widget.healthUrl = "https://hd.widget.packeta.com/api/hcs/api/healthcheck";
    } else if (opts.layout && ["cd", "cdmap", "cdreg"].includes(opts.layout.toLocaleLowerCase())) {
      Packeta.Widget.baseUrl = "https://cardelivery.widget.packeta.com/";
      Packeta.Widget.backupUrl = "https://backup.widget.packeta.com/";
      Packeta.Widget.healthUrl = "https://cardelivery.widget.packeta.com/v6/api/hcs/api/healthcheck";
    } else {
      Packeta.Widget.baseUrl = "https://widget.packeta.com/";
      Packeta.Widget.backupUrl = "https://backup.widget.packeta.com/";
      Packeta.Widget.healthUrl = "https://widget.packeta.com/v6/api/hcs/api/healthcheck";
    }

    function runBase() {
      opts.currentVersion = Packeta.Widget.versions.base;
      Packeta.Widget.initIframe(apiKey, callback, opts, inElement);
    }

    function runBA() {
      opts.currentVersion = Packeta.Widget.versions.backup;
      Packeta.Widget.initIframe(apiKey, callback, opts, inElement);
    }

    function runError() {
      opts.currentVersion = Packeta.Widget.versions.error;
      Packeta.Widget.initIframe(apiKey, callback, opts, inElement);
    }

    Packeta.Util.makeRequest("GET", Packeta.Widget.healthUrl, null, function (data, error) {
      if (!error) {
        var result = data.toLocaleLowerCase() === "true";

        console.log("Widget health check result: " + result);

        if (result === true) {
          console.log("starting Widget");
          runBase();
        } else if (Packeta.Widget.backupUrl !== opts.referrer) {
          console.log("starting backup environment");
          runBA();
        } else {
          console.log("backup environment healthcheck failed");
          runError();
        }
      } else {
        console.log("Widget health check result: " + JSON.stringify(data));
        console.log("starting backup environment");
        if (Packeta.Widget.backupUrl !== opts.referrer) {
          runBA();
        } else {
          console.log("backup environment healthcheck failed");
          runError();
        }
      }
    });
  },
};
