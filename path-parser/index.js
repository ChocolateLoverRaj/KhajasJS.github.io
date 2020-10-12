"use strict";

class App extends React.Component {
  onSingleLineChange(e) {
    this.setState({
      paths: e.target.value.split(';')
    });
  }

  tidy() {
    const newPaths = [];
    this.state.paths.forEach(path => {
      const trimmedPath = path.trim();

      if (trimmedPath) {
        newPaths.push(trimmedPath);
      }

      this.setState({
        paths: newPaths
      });
    });
  }

  onAddPathClick() {
    const newPaths = [...this.state.paths, ''];
    this.setState({
      paths: newPaths
    });
  }

  constructor() {
    super();
    this.state = {
      paths: ['C:\\program files\\openshot', 'C:\\program files\\npm', 'C:\\python\\']
    };
  }

  render() {
    return [/*#__PURE__*/React.createElement("h1", {
      key: "h1"
    }, "Path Parser"), /*#__PURE__*/React.createElement("p", {
      key: "s"
    }, "An editor for windows PATH variable."), /*#__PURE__*/React.createElement("label", {
      key: "w"
    }, "Single Line Paths", /*#__PURE__*/React.createElement("input", {
      className: "w",
      value: this.state.paths.join(';'),
      onChange: this.onSingleLineChange.bind(this)
    })), /*#__PURE__*/React.createElement("button", {
      key: "tidy",
      onClick: this.tidy.bind(this)
    }, "Tidy"), /*#__PURE__*/React.createElement("p", {
      key: "p"
    }, "Individual Paths"), ...this.state.paths.map((path, index, paths) => {
      const canMoveLeft = index > 0;
      const canMoveRight = index < paths.length - 1;

      const swap = function swap(p1, p2) {
        const newPaths = [...paths];
        const temp = newPaths[p1];
        newPaths[p1] = newPaths[p2];
        newPaths[p2] = temp;
        this.setState({
          paths: newPaths
        });
      };

      const moveLeft = swap.bind(this, index, index - 1);
      const moveRight = swap.bind(this, index, index + 1);

      const changeHandler = e => {
        const newPaths = paths.concat([]);
        newPaths[index] = e.target.value;
        this.setState({
          paths: newPaths
        });
      };

      const removeHandler = () => {
        const newPaths = [...paths];
        newPaths.splice(index, 1);
        this.setState({
          paths: newPaths
        });
      };

      return /*#__PURE__*/React.createElement("div", {
        key: `p${index}`,
        className: "flex w"
      }, /*#__PURE__*/React.createElement("button", {
        key: "moveLeft",
        disabled: !canMoveLeft,
        onClick: moveLeft
      }, "\u2191"), /*#__PURE__*/React.createElement("button", {
        key: "moveRight",
        disabled: !canMoveRight,
        onClick: moveRight
      }, "\u2193"), /*#__PURE__*/React.createElement("input", {
        key: "input",
        className: "individual",
        value: path,
        onChange: changeHandler
      }), /*#__PURE__*/React.createElement("button", {
        key: "remove",
        onClick: removeHandler
      }, "Remove"));
    }), /*#__PURE__*/React.createElement("button", {
      key: "add",
      onClick: this.onAddPathClick.bind(this)
    }, "Add Path")];
  }

}

const display = container => {
  ReactDOM.render( /*#__PURE__*/React.createElement(App, null), container);
};

const appContainer = document.getElementById('app');

if (appContainer) {
  display(appContainer);
} else {
  document.addEventListener('load', () => {
    const appContainer = document.getElementById('app');
    display(appContainer);
  });
}
