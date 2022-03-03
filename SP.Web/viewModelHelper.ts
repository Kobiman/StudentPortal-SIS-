import { App } from "./app";

export class ViewModelHelper {
  addPropertyChangeNotification = (object) => {
    debugger
    var elements: any = [];
    elements = document.querySelectorAll("[binding]");
    elements.forEach(function (element) {
      var propToBind = element.getAttribute("binding").split(".");
      if (propToBind[0] === object.constructor.name) {
        new Properties().addScopeProp(object, propToBind, elements);
        if (element.type === "text" || element.type === "textarea") {
          element.onkeyup = function () {
                debugger
            object[propToBind[1]] = element.value;
          };
          element.onchange = function () {
                debugger
            object[propToBind[1]] = element.value;
          };
        } else if (element.type === "checkbox") {
          element.onchange = function () {
            object[propToBind[1]] = element.checked;
          };
        } else {
          element.onchange = function () {
            object[propToBind[1]] = element.value;
          };
        }
      }
    });

    return object;
  };

  notificationPropertyChange = (object, elements) => {
    elements.forEach(function (element) {
      let propToBind = element.getAttribute("binding").split(".");
      new Properties().addScopeProp(object, propToBind, elements);
      if (element.type === "text" || element.type === "textarea") {
        element.onkeyup = function () {
          object[propToBind] = element.value;
        };
      } else if (element.type === "checkbox") {
        element.onchange = function () {
          object[propToBind] = element.checked;
        };
      } else {
        element.onchange = function () {
          object[propToBind] = element.value;
        };
      }
    });
    return object;
  };

  addEventListener(self, tag) {
    const elements = document.querySelectorAll(`[${tag}]`);
    elements.forEach(function (element) {
      element.addEventListener("click", (evt: Event) => {
        evt.preventDefault();
        var route = element.getAttribute(tag);
        App.navigate(route);
      });
    });
  }

  showErrors(results) {
    const elements = document.querySelectorAll("[errors]");
    elements.forEach(function (element) {
      element.innerHTML = "";
    });
    results.forEach(function (r) {
      elements.forEach(function (element) {
        r.errors.forEach(function (e) {
          if (element.getAttribute("errors") === r.propertyName) {
            element.innerHTML += `<p class="error">${e.error}</p>`;
          }
        });
      });
    });
  }
}

export class Properties {
  addScopeProp = (object, prop, elements) => {
    if (!object.hasOwnProperty(prop)) {
      var value;
      Object.defineProperty(object, prop, {
        set: function (newValue) {
          value = newValue;
          elements.forEach(function (element) {
            let propName = prop.split(".");
            if (propName[0] === object.constructor.name) {
              if (element.getAttribute("binding") === propName[1]) {
                if (element.type && (element.type === "text" || element.type === "textarea")) {
                  element.value = newValue;
                } else if (!element.type) {
                  element.innerHTML = newValue;
                }
              }
            }
          });
        },
        get: function () {
          return value;
        },
        enumerable: true,
      });
    }
  };
}
