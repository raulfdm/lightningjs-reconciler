import ReactReconciler from "react-reconciler";

import lng from "@lightningjs/core";

const rootHostContext = {};
const childHostContext = {};

// the configuration of our app
const hostConfig = {
  now: Date.now,
  // Maintaining some info if needed by the rerenderer impl.
  getRootHostContext: () => {
    return rootHostContext;
  },

  // This is where we would want to diff between oldProps and newProps and decide whether to update or not.
  // In our implementation, we just set it to true for simplicity.
  prepareUpdate: (domElement, oldProps, newProps) => {
    console.log("prepareUpdate");

    return true;
  },
  // TODO
  prepareForCommit: () => {
    console.log("prepareForCommit");
  },
  // TODO
  resetAfterCommit: () => {
    console.log("resetAfterCommit");
  },
  // Only will be trigger if prepareUpdate returns true
  commitUpdate: (domElement, updatePayload, type, oldProps, newProps) => {
    console.log("commitUpdate");

    Object.keys(newProps).forEach((propName) => {
      const propValue = newProps[propName];
      if (propName === "children") {
        if (typeof propValue === "string" || typeof propValue === "number") {
          domElement.textContent = propValue;
        }
      } else {
        const propValue = newProps[propName];
        domElement.setAttribute(propName, propValue);
      }
    });
  },

  commitTextUpdate: () => {
    console.log("commitTextUpdate");
  },
  // TODO
  getChildHostContext: () => {
    return childHostContext;
  },
  // ??? I'm not sure about that
  shouldSetTextContent: (type, props) => {
    return (
      typeof props.children === "string" || typeof props.children === "number"
    );
  },
  /**
   * This is where react-reconciler wants to create an instance of UI element
   * in terms of the target. Since our target here is the DOM, we will
   * create document.createElement and type is the argument that contains
   * the type string like div or img or h1 etc. The initial values of domElement
   * attributes can be set in this function from the newProps argument
   *
   * type => button, div, a, (any HTML element) OR whatever we pass as jsx <name></name>
   * newProps => whatever props I'm passing to the JSX element (e.g. onClick, children, className, etc.)
   * rootContainerInstance => where to render (e.g. <div id="root"></div>)
   * _currentHostContext => rootHostContext object
   * workInProgress => Fiber instance with all fiber stuff (e.g. child, elementType, duration, id, etc.)
   */

  createInstance: (
    type,
    newProps,
    rootContainerInstance,
    _currentHostContext,
    workInProgress
  ) => {
    function Comp() {}
    Comp.prototype = Object.create(lng.Component);
    console.log({ type, rootContainerInstance, newProps });

    Comp._template = {
      ...newProps,
    };

    // console.log(Comp);
    // We need to create the element itself

    // const domElement = document.createElement(type);

    // // getting the keys of the props passed to JSX
    // const propKeys = Object.keys(newProps);

    // for (const prop of propKeys) {
    //   const propValue = newProps[prop];

    //   if (prop === "children") {
    //     if (typeof propValue === "string" || typeof propValue === "number") {
    //       // inject as text content any string or number
    //       domElement.textContent = propValue;
    //     }
    //   } else if (prop === "onClick") {
    //     domElement.addEventListener("click", propValue);
    //   } else if (prop === "className") {
    //     domElement.setAttribute("class", propValue);
    //   } else {
    //     domElement.setAttribute(prop, propValue);
    //   }
    // }

    // // return the FORMED element (e.g. actual DOM)
    return new Comp();
  },
  // CAN'T SEE IN THE LOGS
  createTextInstance: () => {
    console.log("createTextInstance");
  },
  // This function gets called for initial UI tree creation.
  appendInitialChild: (parent, child) => {
    console.log("appendInitialChild", { parent, child });
    // parent.appendChild(child);
  },
  // CAN'T SEE IN THE LOGS
  appendChild: () => {
    console.log("appendChild");
  },
  // After ALL appending child into parent is done, it's time to append to
  // ROOT
  appendChildToContainer: (parent, child) => {
    // parent.appendChild(child);
    console.log("appendChildToContainer", { parent, child });
  },
  // CAN'T SEE IN THE LOGS
  appendAllChildren: () => {
    console.log("appendAllChildren");
  },
  removeChildFromContainer: () => {
    console.log("removeChildFromContainer");
  },
  clearContainer: () => {
    console.log("clearContainer");
  },
  finalizeInitialChildren: () => {
    console.log("finalizeInitialChildren");
  },
  removeChild(parentInstance, child) {
    console.log("removeChild");
    // parentInstance.removeChild(child);
  },

  supportsMutation: true, //indicates to RRECON that the target supports mutation (e.g. appendChild, removeChild)
};

// an instance of react reconciler configured
const ReactReconcilerInst = ReactReconciler(hostConfig);

// The renderer itself (e.g. ReactDOM)
export const MyCustomRenderer = {
  // The function to actually render
  // reactElement = <App />, domElement = document.querySelector('#root)
  render: (reactElement, domElement, callback) => {
    // Create a root Container if it doesnt exist
    if (!domElement._rootContainer) {
      domElement._rootContainer = ReactReconcilerInst.createContainer(
        domElement,
        false
      );
    }

    console.log(reactElement);

    // update the root Container
    return ReactReconcilerInst.updateContainer(
      reactElement,
      domElement._rootContainer,
      null,
      callback
    );
  },
};
