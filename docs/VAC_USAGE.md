# VAC Debugger Usage

- [Props](#props)
  - [name](#name)
  - [data](#data)
  - [hidden](#hidden)
  - [trace](#trace)
  - [listTrace](#listtrace)
  - [maxWidth, maxHeight](#maxwidth-maxheight)
  - [useList](#uselist)
  - [useEach](#useeach)
  - [useName](#usename)
  - [useValue, useDefaultValue](#usevalue-usedefaultvalue)
  - [on~ (Property prefixed with `on`)](#on-property-prefixed-with-on)
  - [customEvent](#customevent)
- [Components](#components)
  - [VACList](#vaclist)
  - [VACInput](#vacinput)
- [Functions](#functions)
  - [withPreset](#withpreset)

## Props

Prop names follow the rules below.

- `use~`: Props to use for list elements or input elements in `VAC Debugger`
- `on~`: Event callback to use for input elements in `VAC Debugger`
- etc: Props for `VAC Debugger`

### name

> [type] string

Set `VAC Debugger` name.

```jsx
<VAC name={"Sample"} />
```

![props_name1_s1](./assets/img/props_vac_name1_s2.png?raw=true)

If `VAC Debugger` has other properties and `name` is omitted, `name area` is not exposed.

```jsx
<VAC data={"No name was entered"} />
```

![props_name2_s1](./assets/img/props_vac_name2_s2.png?raw=true)

### data

> [type] any

`Props Object` of component.

```jsx
<VAC name="Props: data" data={{ value: "test value" }} />
```

![props_data1_s1](./assets/img/props_vac_data1_s2.png?raw=true)

If props has callback functions, each button that calls the callback function is created.

```jsx
<VAC
  name="Props: data"
  data={{ onDelete: (event) => console.log("delete!!") }}
/>
```

![props_data2_s1](./assets/img/props_vac_data2_s2.png?raw=true)

```jsx
<VAC
  name="Props: data"
  data={{
    value: "test value",
    onDelete: (event) => console.log("delete!!"),
  }}
/>
```

![props_data3_s1](./assets/img/props_vac_data3_s2.png?raw=true)

If the type of `data` is not object, it is output to log.

```jsx
<VAC name="Props: data" data={'string'} />
<VAC data={123} />
<VAC data={null} />
<VAC data={false} />
<VAC data={[1, 2, 3]} />
<VAC data={() => console.log('function!')} />
```

![props_data4_s1](./assets/img/props_vac_data4_s2.png?raw=true)

### hidden

> [type] boolean

Prevent rendering.

```jsx
<VAC name="Props: hidden" data={'string'} hidden />
// or
<VAC name="Props: hidden" data={'string'} hidden={true} />
```

### trace

> [type] string, [version] ^0.1.0

Props to show in `props area`. If there is more than one prop, separate them with commas or spaces.

```jsx
<VAC
  name="Props: trace"
  trace="propA, propC"
  data={{ propA: "test value", propB: 12345, propC: true }}
/>
```

![props_trace1_s1](./assets/img/props_vac_trace1_s2.png?raw=true)

### listTrace

> [type] string, [version] ^0.1.0

Item props of list to show in `list area`. If there is more than one prop, separate them with commas or spaces.

```jsx
<VAC
  name="Props: listTrace"
  useList="list"
  trace="propB"
  listTrace="propA, propC"
  data={{
    // List props
    propA: "test value",
    propB: 12345,
    propC: true,
    // List item props
    list: [
      { propA: "test value", propB: 12345, propC: true },
      { propA: "test value", propB: 12345, propC: true },
      { propA: "test value", propB: 12345, propC: true },
    ],
  }}
/>
```

![props_trace1_s1](./assets/img/props_vac_trace2_s2.png?raw=true)

### maxWidth, maxHeight

> [type] number | string

Set max width and max height.
If height is larger than max height, scrolling is activated.

```jsx
<VAC name="Props: maxWidth" data={'string'} maxWidth="100" />
// or
<VAC name="Props: maxHeight" data={'string'} maxHeight={100} />
```

### useList

> [type] string

Property name of array to be displayed as `list area`. If `useList` is used, the `list area` is exposed.

```jsx
<VAC
  name="Props: List"
  useList="exampleList"
  data={{
    exampleList: [
      {
        value: "test value 1",
        onDelete: (event) => console.log("delete 1"),
      },
      {
        value: "test value 2",
        onDelete: (event) => console.log("delete 2"),
      },
      {
        value: "test value 3",
        onDelete: (event) => console.log("delete 3"),
      },
    ],
  }}
/>
```

![props_list1_s1](./assets/img/props_vac_list1_s2.png?raw=true)

Without `useList`:

![props_list2_s1](./assets/img/props_vac_list2_s2.png?raw=true)

> If property is function type, it is excluded from output.

Props other than the property used in the `useList` are displayed in `props area`.

```jsx
<VAC
  name="Props: List"
  useList="exampleList"
  data={{
    // List component props
    value: "list component value",
    onRefresh: () => console.log("refresh list"),
    // List
    exampleList: [
      {
        value: "test value 1",
        onDelete: (event) => console.log("delete 1"),
      },
      {
        value: "test value 2",
        onDelete: (event) => console.log("delete 2"),
      },
      {
        value: "test value 3",
        onDelete: (event) => console.log("delete 3"),
      },
    ],
  }}
/>
```

![props_list3_s1](./assets/img/props_vac_list3_s2.png?raw=true)

### useEach

> [type] string

Property name of callback function that returns new props for each list item by using element of `list`.

```jsx
<VAC
  name="Props: List"
  useList="exampleList"
  useEach="exampleEach"
  data={{
    // each (index and element of exampleList)
    exampleEach: (data, index) => ({
      label: data.value,
      onCheck: (event) => console.log("check", index, data),
    }),
    // Raw list
    exampleList: [
      {
        value: "test value 1",
      },
      {
        value: "test value 2",
      },
      {
        value: "test value 3",
      },
    ],
  }}
/>
```

![props_list4_s1](./assets/img/props_vac_list4_s2.png?raw=true)

`VAC Debugger` assumes `VAC` creates props of each item component in list using the callback specified in `useEach`.
So the relevant processing must be implemented in `VAC`.

```jsx
// VAC
const ViewComponent = ({ list, each }) => (
  <ul>
    {list &&
      list.length > 0 &&
      list.map((item) => {
        // Convert {value} to {label, onClick} using `each`
        const { label, onClick } = each(item);

        return (
          <li>
            <button onClick={onClick}>{label}</button>
          </li>
        );
      })}
  </ul>
);
```

> Use [`react-loop-item`](https://www.npmjs.com/package/react-loop-item#each-optional) to help develop this feature in `VAC`.

### useName

> [type] string, [version] ^0.3.0

Set the 'name' property of the form element(textarea, buttons).

```jsx
<VAC
  useName="key"
  onChange="onChange"
  data={{
    key: "testInput",
    onChange: (event) => {
      // Output: testInput - {event.target.value}
      console.log(event.target.name, "-", event.target.value);
    },
  }}
/>
```

### useValue, useDefaultValue

> [type] string

Property name to be used for `value` and `defaultValue` of textarea element. If target of `useValue` or `useDefaultValue` is valid, `textarea` is exposed.

```jsx
<VAC
  name="Props: Input"
  useValue="value"
  data={{
    value: "test value",
  }}
/>
```

![props_input1_s1](./assets/img/props_vac_input1_s2.png?raw=true)

> Do not use `useValue` and `useDefaultValue` together.

`React` should use `value` with `onChange`.

```jsx
<VAC
  name="Props: Input"
  useValue="value"
  onChange="onChangeInput"
  data={{
    value: "test value",
    onChangeInput: (event) => console.log(event.target.value),
  }}
/>
```

How to access `textarea` value :

```jsx
const InputUI = () => {
  // Value state
  const [value, setValue] = useState("default value");

  // View(VAC) component props object
  const propsObject = {
    value,
    onChange: (event) => setValue(event.target.value),
    onSend: (event) => console.log(value),
  };

  return (
    // VAC debugger
    <VAC
      name="Props: Input"
      useValue="value"
      onChange="onChange"
      data={propsObject}
    />
    // Real VAC
    // <InputVAC {...propsObject} />
  );
};
```

![props_input2_s1](./assets/img/props_vac_input2_s2.png?raw=true)

> `VAC` is a stateless component.

### on~ (Property prefixed with `on`)

> [type] string

Property name to be used for event callback function of textarea. Therefore, the property name must be valid as `textarea` props.

If target of the props is valid, `textarea` is exposed.

```jsx
<VAC
  name="Props: Event Callback"
  onChange="onChange"
  onKeyUp="onKeyUp"
  data={{
    // Used as props of textarea
    onChange: (event) => console.log("change!"),
    onKeyUp: (event) => console.log("key up!"),
    // Not used as props of textarea
    onKeyDown: (event) => console.log("key down!"),
    onSend: (event) => console.log("send!"),
  }}
/>
```

![props_input3_s1](./assets/img/props_vac_input3_s2.png?raw=true)

### customEvent

> [type] { [key:string]: Function }

Enter handler that virtually implements the function inside component.

```jsx
<VAC
  name="Props: Custom Event"
  customEvent={{
    // Handler called when 'increase' button is clicked.
    // callback: data.increase.
    // data: data property of VAC Debugger
    increase: (event, callback, data) => callback(data.value + 1),
  }}
  data={{
    value: 1,
    increase: (result) => console.log(result),
    onDecrease: (event) => console.log("decrease!"),
  }}
/>
```

![props_custom_s1](./assets/img/props_vac_custom_event1_s2.png?raw=true)

How is it different from event?

```jsx
// Real component
// Event
<button onClick={onDecrease}>event</button>

// CustomEvent
<button onClick={(event) => increase(value + 1)}>event</button>
```

> When developing `VAC`, it is not recommended to use `customEvent` to avoid being dependent on certain function. This is because the parent component of `VAC` uses the `customEvent` to define functions inside the `VAC`.

## Components

### VACList

List preset.

- `useList` : "list"
- `useEach` : "each"

```jsx
import { VAC, VACList } from "react-vac";

<VAC useList="list" useEach="each" />
// Same
<VACList />
```

### VACInput

Input preset.

- `useName` : "name"
- `useValue` : "value"
- `useDefaultValue` : "defaultValue"
- `onChange` : "onChange"
- `onFocus` : "onFocus"
- `onBlur` : "onBlur"
- `onSelect` : "onSelect"
- `onKeyDown` : "onKeyDown"
- `onKeyUp` : "onKeyUp"
- `onKeyPress` : "onKeyPress"

```jsx
import { VAC, VACInput } from "react-vac";

<VAC
  useName="name"
  useValue="value"
  useDefaultValue="defaultValue"
  onChange="onChange"
  onFocus="onFocus"
  onBlur="onBlur"
  onSelect="onSelect"
  onKeyDown="onKeyDown"
  onKeyUp="onKeyUp"
  onKeyPress="onKeyPress"
/>
// Same
<VACInput />
```

## Functions

### withPreset

> [type] (string, VACProps) => VAC, [version] ^1.2.0

Returns a `VAC debugger` with preset `props`.

```js
import { withPreset } from "react-vac";

// withPreset("preset name", {preset props})
const VACBasicList = withPreset("@BasicList", {
  useList: "datas", // List prop name
  useEach: "getProp", // Each prop name
  maxWith: 600, // Max width
});

const BasicList = () => {
  // Preset vac
  const listViewProps = {
    datas: [{ title: "first title" }, { title: "second title" }],
    getProps: (data, index) => ({ idx: index, value: title }),
  };

  return (
    <>
      <VACBasicList name="ListView" data={listViewProps} />
      {/*
      <VAC name="ListView" data={listViewProps} useList="datas" useEach="getProp" maxWidth="600" />
      */}
    </>
  );

  // Real component
  // return <ListView {...listViewProps} />;
};
```

> The default supported `VACList` and `VACInput` are also created in the same way.
