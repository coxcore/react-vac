import React, { useState } from 'react';

// import VAC from 'react-vac'
import VAC, { VACList, VACInput } from 'react-vac';

const Component = () => {
    const works = () => {
        console.log('do something');
    };

    // props of component to be developed
    const viewComponentProps = {
        // properties
        value: 'test value',
        someValue: { foo: 'var' },

        // callbacks
        onClick: (event) => console.log('click!'),
        onSomeEvent: (event) => works(),
    };

    // view debugging
    return (
        <VAC name="Dummy View" data={viewComponentProps} />
        // <ViewComponent {...viewComponentProps} />
    );
};

const List = () => {
    const model = [
        { id: 1606453217589, value: 'Todo 1', checked: false },
        { id: 1606453217589, value: 'Todo 1', checked: false },
        { id: 1606453217589, value: 'Todo 1', checked: false },
    ];

    const each = ({ id, value, checked }, index) => ({
        key: id,
        id,
        value,
        checked,
        onCheck: () => console.log(id),
        onDelete: () => console.log(id),
    });

    const listComponentProps = {
        list: model,
        each,
    };

    return <VACList name="Dummy List" data={listComponentProps} />;
};

const Input = () => {
    const [value, setValue] = useState('test');

    const inputComponentProps = {
        id: 'testid',
        value,

        onChange: (event) => {
            const value = event.currentTarget.value;
            console.log(value);
            setValue(value);
        },
        onSubmit: (event) => console.log('submit :', value),
    };

    return <VACInput name="Dummy Input" data={inputComponentProps} />;
};

const SpinBox = () => {
    const [value, setValue] = useState(0);

    const inputComponentProps = {
        // properties
        value,

        // callbacks
        onIncrease: () => setValue(value + 1),
        onDecrease: () => setValue(value - 1),
    };

    return <VAC name="SpinBox" data={inputComponentProps} />;
};

const App = () => {
    return (
        <div style={{ width: '700px', padding: '1px' }}>
            <Component />
            <List />
            <Input />
            <SpinBox />
        </div>
    );
};

export default App;
