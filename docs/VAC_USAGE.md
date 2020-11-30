# VAC Usage

- [Props](#props)
  - [name](#name)
  - [data](#data)
  - [hidden](#hidden)
  - [maxWidth, maxHeight](#maxwidth-maxheight)
  - [useList](#uselist)
  - [useEach](#useeach)
  - [useValue, useDefaultValue](#usevalue-usedefaultvalue)
  - [on~ (Property prefixed with `on`)](#on-property-prefixed-with-on)
  - [customEvent](#customevent)
- [Components](#components)
  - [VACList](#vaclist)
  - [VACInput](#vacinput)

## Props

### name

> [type] string

set `VAC Debugger` name.

```jsx
<VAC name={Sample} />
```

![props_name1_s1](./assets/img/props_vac_name1_s1.png?raw=true)

If `VAC Debugger` has other properties and `name` is omitted, `name area` is not exposed.

```jsx
<VAC data={"no name was entered"} />
```

![props_name2_s1](./assets/img/props_vac_name2_s1.png?raw=true)

### data

> [type] any

`props object` of component.

```jsx
<VAC name="Props: data" data={{ value: "test value" }} />
```

![props_data1_s1](./assets/img/props_vac_data1_s1.png?raw=true)

If `props` has callback functions, each button that calls the callback function is created.

```jsx
<VAC
  name="Props: data"
  data={{ onDelete: (event) => console.log("delete!!") }}
/>
```

![props_data2_s1](./assets/img/props_vac_data2_s1.png?raw=true)

```jsx
<VAC
  name="Props: data"
  data={{
    value: "test value",
    onDelete: (event) => console.log("delete!!"),
  }}
/>
```

![props_data3_s1](./assets/img/props_vac_data3_s1.png?raw=true)

If the type of `data` is not object, it is output to log.

```jsx
<VAC name="Props: data" data={'string'} />
<VAC data={123} />
<VAC data={null} />
<VAC data={false} />
<VAC data={[1, 2, 3]} />
<VAC data={() => console.log('function!')} />
```

![props_data4_s1](./assets/img/props_vac_data4_s1.png?raw=true)

### hidden

> [type] boolean

Prevent rendering.

```jsx
<VAC name="Props: data" data={'string'} hidden />
// or
<VAC name="Props: data" data={'string'} hidden={true} />
```

### maxWidth, maxHeight

> [type] number | string

Set max width and max height.
If height is larger than max height, scrolling is activated.

```jsx
<VAC name="Props: data" data={'string'} maxWidth="100" />
// or
<VAC name="Props: data" data={'string'} maxHeight={100} />
```

### useList

> [type] string

Property name of array to be displayed as `list area`. If `useList` is used, the `list area` is exposed.

```jsx
<VAC
  name="Props: list"
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

![props_list1_s1](./assets/img/props_vac_list1_s1.png?raw=true)

Without `useList`:

![props_list2_s1](./assets/img/props_vac_list2_s1.png?raw=true)

> If property is function type, it is excluded from output.

Props other than the property used in the `useList` are displayed in `props area`.

```jsx
<VAC
  name="Props: list"
  useList="exampleList"
  data={{
    // list component props
    value: "list component value",
    onRefresh: () => console.log("refresh list"),
    // list
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

![props_list3_s1](./assets/img/props_vac_list3_s1.png?raw=true)

### useEach

> [type] string

Property name of callback function that returns new props for each list item by using element of `list`.

```jsx
<VAC
  name="Props: list"
  useList="exampleList"
  useEach="exampleEach"
  data={{
    // each (index and element of exampleList)
    exampleEach: (data, index) => ({
      label: data.value,
      onCheck: (event) => console.log("check", index, data),
    }),
    // raw list
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

![props_list4_s1](./assets/img/props_vac_list4_s1.png?raw=true)

### useValue, useDefaultValue

> [type] string

Property name to be used for `value` and `defaultValue` of textarea element. If `useValue` or `useDefaultValue` is used, `textarea` is exposed.

```jsx
<VAC
  name="Props: Input"
  useValue="value"
  data={{
    value: "test value",
  }}
/>
```

![props_input1_s1](./assets/img/props_vac_input1_s1.png?raw=true)

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
  // value state
  const [value, setValue] = useState("default value");

  // view(VAC) component props object
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
    // real VAC
    // <InputVAC {...propsObject} />
  );
};
```

![props_input2_s1](./assets/img/props_vac_input2_s1.png?raw=true)

> `VAC` is a stateless component.

### on~ (Property prefixed with `on`)

> [type] string

Property name to be used for event callback function of textarea.
Therefore, the property name must be valid as `textarea` props.

```jsx
<VAC
  name="Props: Event Callback"
  onChange="onChange"
  onKeyUp="onKeyUp"
  data={{
    // used as props of textarea
    onChange: (event) => console.log("change!"),
    onKeyUp: (event) => console.log("key up!"),
    // not used as props of textarea
    onKeyDown: (event) => console.log("key down!"),
    onSend: (event) => console.log("send!"),
  }}
/>
```

![props_input3_s1](./assets/img/props_vac_input3_s1.png?raw=true)

### customEvent

> [type] { [key:string]: Function }

Enter handler that virtually implements the function inside component.

```jsx
<VAC
  name="Props: Custom Event"
  customEvent={{
    // handler called when 'increase' button is clicked.
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

![props_custom_s1](./assets/img/props_vac_custom_event1_s1.png?raw=true)

How is it different from event?

```jsx
// real component
// event
<button onClick={onDecrease}>event</button>

// customEvent
<button onClick={(event) => increase(value + 1)}>event</button>
```

> When developing `VAC`, it is not recommended to use `customEvent` to avoid being dependent on certain function. This is because the parent component of `VAC` uses the `customEvent` to define functions inside the `VAC`.

## Components

### VACList

List preset.

- `useList` : "list"
- `useEach` : "each"

```jsx
import VAC, { VACList } from "react-vac";

<VAC useList="list" useEach="each" />
// same
<VACList />
```

### VACInput

Input preset.

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
import VAC, { VACInput } from "react-vac";

<VAC
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
// same
<VACInput />
```
