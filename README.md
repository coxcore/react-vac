# react-vac (prototype)

> This component is a debugging tool that helps you develop components without View(JSX). It provides an optimal solution for [VAC Pattern](./docs/VAC_PATTERN.md) type development.

![vac pattern](./docs/assets/img/vac_pattern_s1.png?raw=true)

[![NPM](https://img.shields.io/npm/v/react-vac.svg)](https://www.npmjs.com/package/react-vac) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install react-vac --save-dev
```

or

```bash
yarn add react-vac --dev
```

## Usage

![basic usage](./docs/assets/img/example_vac_basic_s1.png?raw=true)

```jsx
import React, { Component } from "react";
import VAC from "react-vac";

const Component = () => {
  const works = () => {
    console.log("do something");
  };

  // props of component to be developed
  const viewComponentProps = {
    // properties
    value: "test value",
    someValue: { foo: "var" },

    // callbacks
    onClick: (event) => console.log("click!"),
    onSomeEvent: (event) => works(),
  };

  // view debugging
  return (
    <VAC name="Dummy View" data={viewComponentProps} />
    // <ViewComponent {...viewComponentProps} />
  );
};

export default Component;
```

[Learn More>](./docs/VAC_USAGE.md)

## Examples

![basic example](./docs/assets/img/example_vac_spinbox_s1.png?raw=true)

```jsx
import React, { useState } from "react";
import VAC from "react-vac";

const SpinBoxUI = () => {
  const [value, setValue] = useState(0);

  const spinBoxProps = {
    // properties
    value,

    // callbacks
    onIncrease: () => setValue(value + 1),
    onDecrease: () => setValue(value - 1),
  };

  return <VAC name="SpinBox" data={spinBoxProps} />;
};
```

[Show More>](./docs/VAC_EXAMPLES.md)

## License

MIT © [Park U-yeong](https://github.com/coxcore)
