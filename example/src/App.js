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

const json = {
    glossary: {
        title: 'example glossary',
        GlossDiv: {
            title: 'S',
            GlossList: {
                GlossEntry: {
                    ID: 'SGML',
                    SortAs: 'SGML',
                    GlossTerm: 'Standard Generalized Markup Language',
                    Acronym: 'SGML',
                    Abbrev: 'ISO 8879:1986',

                    GlossDef: {
                        para: 'A meta-markup language, used to create markup languages such as DocBook.',
                        GlossSeeAlso: ['GML', 'XML'],
                        GlossSeeAlso2: [234234, 58945483, 121321],
                    },
                    GlossSee: 'markup',
                },
            },
        },
        testArray0: ['asdfasdf', 'alkdsfjlajsdfl', 'aldsfjlkafd'],
        testArray1: ['alksdfladf', 234234243, '234234234234', 234234234],
        testArray2: ['alksdfladf', 234234243, '234234234234'],
    },
};

const JSONList = () => {
    const listComponentProps = {
        list: [
            { id: 1606453217589, value: JSON.stringify(json), checked: false },
            { id: 1606453479822, value: json, checked: true },
        ],
    };

    return <VACList name="JSON List" data={listComponentProps} />;
};

const List = () => {
    const [model, setModel] = useState([
        { id: 1606453217589, value: 'Todo 1', checked: false },
        { id: 1606453479822, value: 'Todo 2', checked: true },
        { id: 1606453479983, value: 'Todo 3', checked: false },
    ]);

    const checkItem = (id) => {
        const list = model.map((data) =>
            data.id === id ? { ...data, checked: !data.checked } : data
        );

        setModel(list);
    };

    const deleteItem = (id) => {
        const list = model.filter((data, index) => data.id !== id);

        setModel(list);
    };

    const each = ({ id, value, checked }, index) => ({
        key: id,
        id,
        value,
        checked,
        onCheck: () => checkItem(id),
        onDelete: () => deleteItem(id),
    });

    const listComponentProps = {
        list: model,
        each,
    };

    return <VACList name="Dummy List" data={listComponentProps} />;
};

const Input = () => {
    const [value, setValue] = useState('default value');

    const inputComponentProps = {
        user: 'someone',
        value,

        onChange: (event) => {
            const value = event.currentTarget.value;
            setValue(value);
        },
        onSubmit: (event) => console.log('submit :', value),
    };

    return <VACInput name="Dummy Input" data={inputComponentProps} />;
};

const SpinBox = () => {
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

const InputUI = () => {
    const [value, setValue] = useState('default value');

    const propsObject = {
        value,
        onChange: (event) => setValue(event.target.value),
        onSend: (event) => console.log(value),
    };

    return (
        <VAC
            name="Props: Input"
            useValue="value"
            onChange="onChange"
            data={propsObject}
        />
    );
};

const App = () => {
    return (
        <div style={{ width: '700px', padding: '1px', margin: '-3px 0 0' }}>
            {/* name */}
            <VAC name="Sample" />
            <VAC data="no name was entered" />

            {/* data */}
            <VAC name="Props: data" data={{ value: 'test value' }} />
            <VAC
                name="Props: data"
                data={{ onDelete: (event) => console.log('delete!!') }}
            />
            <VAC
                name="Props: data"
                data={{
                    value: 'test value',
                    onDelete: (event) => console.log('delete!!'),
                }}
            />
            <div>
                <VAC name="Props: data" data={'string'} />
                <VAC data={123} />
                <VAC data={null} />
                <VAC data={false} />
                <VAC data={[1, 2, 3]} />
                <VAC data={() => console.log('function!')} />
            </div>

            {/* list */}
            <VAC
                name="Props: list"
                useList="exampleList"
                data={{
                    exampleList: [
                        {
                            value: 'test value 1',
                            onDelete: (event) => console.log('delete 1'),
                        },
                        {
                            value: 'test value 2',
                            onDelete: (event) => console.log('delete 2'),
                        },
                        {
                            value: 'test value 3',
                            onDelete: (event) => console.log('delete 3'),
                        },
                    ],
                }}
            />
            <VAC
                name="Props: list"
                data={{
                    exampleList: [
                        {
                            value: 'test value 1',
                            onDelete: (event) => console.log('delete 1'),
                        },
                        {
                            value: 'test value 2',
                            onDelete: (event) => console.log('delete 2'),
                        },
                        {
                            value: 'test value 3',
                            onDelete: (event) => console.log('delete 3'),
                        },
                    ],
                }}
            />
            <VAC
                name="Props: list"
                useList="exampleList"
                data={{
                    // list component props
                    value: 'list component value',
                    onRefresh: () => console.log('refresh list'),
                    // list
                    exampleList: [
                        {
                            value: 'test value 1',
                            onDelete: (event) => console.log('delete 1'),
                        },
                        {
                            value: 'test value 2',
                            onDelete: (event) => console.log('delete 2'),
                        },
                        {
                            value: 'test value 3',
                            onDelete: (event) => console.log('delete 3'),
                        },
                    ],
                }}
            />
            <VAC
                name="Props: list"
                useList="exampleList"
                useEach="exampleEach"
                data={{
                    // each
                    exampleEach: (data, index) => ({
                        label: data.value,
                        onCheck: (event) => console.log('check', index, data),
                    }),
                    // list
                    exampleList: [
                        {
                            value: 'test value 1',
                        },
                        {
                            value: 'test value 2',
                        },
                        {
                            value: 'test value 3',
                        },
                    ],
                }}
            />

            {/* Input */}
            <VAC
                name="Props: Input"
                useValue="value"
                data={{
                    value: 'test value',
                }}
            />
            <VAC
                name="Props: Input"
                useDefaultValue="value"
                data={{
                    value: 'default value',
                }}
            />
            <InputUI />

            {/* Event Callback */}
            <VAC
                name="Props: Event Callback"
                onChange="onChange"
                onKeyUp="onKeyUp"
                data={{
                    onChange: (event) => console.log('change!'),
                    onKeyUp: (event) => console.log('key up!'),
                    // not used as props of textarea
                    onKeyDown: (event) => console.log('key down!'),
                    onSend: (event) => console.log('send!'),
                }}
            />

            <VAC
                name="Props: Custom Event"
                customEvent={{
                    // handler called when the 'increase' button is clicked.
                    // callback: data.increase.
                    // data: data property of VAC Debugger
                    increase: (event, callback, data) =>
                        callback(data.value + 1),
                }}
                data={{
                    value: 1,
                    increase: (result) => console.log(result),
                    onDecrease: (event) => console.log('decrease!'),
                }}
            />

            <VAC
                name="Props: trace"
                data={{ propA: 'test value', propB: 12345, propC: true }}
                trace="propA, propC"
            />
            <VAC
                name="Props: listTrace"
                useList="list"
                trace="propB"
                listTrace="propA, propC"
                data={{
                    // list props
                    propA: 'test value',
                    propB: 12345,
                    propC: true,
                    // list item props
                    list: [
                        { propA: 'test value', propB: 12345, propC: true },
                        { propA: 'test value', propB: 12345, propC: true },
                        { propA: 'test value', propB: 12345, propC: true },
                    ],
                }}
            />

            <Component />
            <List />
            <Input />
            <SpinBox />
            <JSONList />
        </div>
    );
};

export default App;
