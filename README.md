# react-vac (prototype)

> This component is a debugging tool that helps you develop components without View(JSX). It provides an optimal solution for [VAC Pattern](#development-process-for-view-asset-component) development.

![vac pattern](./docs/readme_assets/vac_pattern_s1.png?raw=true)

[![NPM](https://img.shields.io/npm/v/react-vac.svg)](https://www.npmjs.com/package/react-vac) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install react-vac --save-dev
```

or

```bash
yarn add react-vac --dev
```

## Demo

[Todo List developed using VAC Debugger](https://coxcore.github.io/react-vac/demo/todo/vac/)

## Usage

`VAC Debugger` analyzes `Props Object` and then constructs UI for debugging.

See [VAC Debugger Usage](./docs/VAC_USAGE.md) for more details.

![basic usage](./docs/readme_assets/example_vac_basic_s2.png?raw=true)

```jsx
import { VAC } from "react-vac";

const ExampleView = () => {
  // props object of VAC
  const viewComponentProps = {
    // properties
    value: "test value",
    someValue: { foo: "var" },

    // callbacks
    onClick: (event) => console.log("click!"),
    onSomeEvent: (event) => console.log("onSomeEvent!"),
  };

  // VAC Debugger
  return <VAC name="Dummy View" data={viewComponentProps} />;

  // real VAC
  // return <ViewComponent {...viewComponentProps} />
};
```

## Development Process (for View Asset Component)

View Asset Component(`VAC`) is a rendering component to manage JSX and Style, and is isolated from UI functionality or business logic.

#### VAC Features

- It only performs processes related to rendering, such as iterative creation, conditional exposure, and style control.
- It is a stateless component that does not change its View by itself. Only controlled by props of component.
- It does not do any additional processing when binding the callback function to the component's element event.

#### Step1

Create a component to develop, then define a `Props Object` and enter it into the `data` property of `VAC Debugger`.

```jsx
const SpinBoxUI = () => {
  // props object of VAC
  const spinBoxViewProps = {};

  // VAC Debugger
  return <VAC name="SpinBoxView" data={spinBoxViewProps} />;

  // VAC to be developed
  // return <SpinBoxView {...spinBoxViewProps} />;
};
```

#### Step2

Develop UI functions or business logic in the component. And in the `Props Object`, define properties and callback functions that are needed in `VAC`.

```jsx
const SpinBoxUI = () => {
  const [value, setValue] = useState(0);

  const add = (n) => {
    setValue(value + n);
  };

  // props object of VAC
  const spinBoxViewProps = {
    value,
    onIncrease: () => add(1),
    onDecrease: () => add(-1),
  };

  // VAC Debugger
  return <VAC name="SpinBoxView" data={spinBoxViewProps} />;
};
```

![basic example](./docs/readme_assets/example_vac_spinbox_s2.png?raw=true)

#### Step3

Develop `VAC` by checking the properties defined in the `Props Object`.

```jsx
const SpinBoxView = ({ value, onIncrease, onDecrease }) => (
  <div>
    <button onClick={onDecrease}> - </button>
    <span>{value}</span>
    <button onClick={onIncrease}> + </button>
  </div>
);
```

#### Step4

Apply `VAC` to the component.

```jsx
const SpinBoxUI = () => {
  const [value, setValue] = useState(0);

  const add = (n) => {
    setValue(value + n);
  };

  // props object of VAC
  const spinBoxViewProps = {
    value,
    onIncrease: () => add(1),
    onDecrease: () => add(-1),
  };

  // VAC
  return <SpinBoxView {...spinBoxViewProps} />;

  // VAC Debugger
  //return <VAC name="SpinBoxView" data={spinBoxViewProps} />;
};
```

## Examples

- [VAC](https://github.com/coxcore/examples-react-ts/blob/todo-list/src/components/TodoContainer.tsx#L31)
- [VACInput](https://github.com/coxcore/examples-react-ts/blob/todo-list/src/components/TodoInput.tsx#L34)
- [VACList](https://github.com/coxcore/examples-react-ts/blob/todo-list/src/components/TodoList.tsx#L39)

## License

MIT © [Park U-yeong](https://github.com/coxcore)
