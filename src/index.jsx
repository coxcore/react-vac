import React from 'react';

// VAC Prototype

const VAC = ({
    name,
    data,
    trace = null,
    listTrace = null,
    customEvent = EMPTY_DATA,
    hidden = false,
    maxWidth = null,
    maxHeight = null,
    useValue = null,
    useDefaultValue = null,
    useList = null,
    useEach = null,
    ...modeEvents
}) => {
    if (hidden || (!name && data === undefined)) {
        return null;
    }

    const dataIsArray = Array.isArray(data);
    const validData = typeof data === 'object' && !dataIsArray && data !== null;

    const {
        [useList]: propList,
        [useEach]: propEach = EMPTY_FNC,
        [useValue]: propValue,
        [useDefaultValue]: propDefaultValue,
        ...propsData
    } = validData ? data : EMPTY_DATA;

    const targetList = dataIsArray ? data : propList;

    const [callbacksMap, callbackNames] = genCallbacks(modeEvents, propsData);

    const validList = Array.isArray(targetList);

    const lengthInfo =
        !dataIsArray && validList ? ` (length : ${targetList.length})` : '';

    const validName = typeof name === 'string' && name !== '';

    const viewName = `${validName ? name : ''}${lengthInfo}`;
    const viewData = validData ? propsData : data;
    const viewPrefix =
        !dataIsArray && validList ? 'List Props' : validData ? 'Props' : 'Log';
    const viewTrace = getTraceList(trace);

    const validViewName = Boolean(viewName);

    const propMaxWidth = Number(maxWidth) || null;
    const propMaxHeight = Number(maxHeight) || null;

    const viewContainerStyle = propMaxWidth
        ? {
              ...style.container,
              display: 'inline-block',
              maxWidth: propMaxWidth,
          }
        : style.container;
    const viewScrollStyle = propMaxHeight
        ? { ...style.scroll, maxHeight: propMaxHeight }
        : style.scroll;

    const useLine = (validName && !validList) || (validList && validViewName);

    const eachView = validList
        ? getEachView(propEach, getTraceList(listTrace))
        : null;

    return (
        <div style={viewContainerStyle}>
            {validViewName && <h5 style={style.title}>{viewName}</h5>}
            <div style={viewScrollStyle}>
                <View
                    data={viewData}
                    trace={viewTrace}
                    customEvent={customEvent}
                    prefix={viewPrefix}
                    useLine={useLine}
                    value={propValue}
                    defaultValue={propDefaultValue}
                    callbacksMap={callbacksMap}
                    callbackNames={callbackNames}
                />
                {loop(View, targetList, eachView, emptyList, !validList)}
            </div>
        </div>
    );
};

const View = ({
    data,
    trace,
    value,
    defaultValue,
    prefix = '',
    useLine = false,
    customEvent = EMPTY_DATA,
    callbacksMap = EMPTY_DATA,
    callbackNames = EMPTY_DATA,
}) => {
    const dataType = typeof data;
    const validData = data !== null && dataType === 'object';

    const jsonData = validData ? jsonFilter(data, trace) : data;
    const json = JSON.stringify(jsonData) || (data === '' ? '' : String(data));

    const checkCallback = ([name, callback]) =>
        typeof callback === 'function' && !callbackNames[name];

    const setCustomEvent = ([name, callback]) => {
        const handler = customEvent[name];
        const fnc =
            typeof handler === 'function'
                ? (event) => handler(event, callback, data)
                : callback;

        return [name, fnc];
    };

    const callbacks =
        validData &&
        Object.entries(data).filter(checkCallback).map(setCustomEvent);

    const valueType = typeof value;
    const defaultValueType = typeof defaultValue;
    const validValue = valueType === 'string' || valueType === 'number';
    const validDefaultValue =
        defaultValueType === 'string' || defaultValueType === 'number';
    const validOnChange = callbackNames.onChange;
    const validInput = validOnChange || validDefaultValue;
    const hasInputEvent = Object.keys(callbacksMap).length > 0;

    const showTextarea = validValue || validDefaultValue || hasInputEvent;
    const showEvents = callbacks && callbacks.length > 0;
    const showJson = json !== '{}';

    const hasContents = showTextarea || showEvents || showJson;
    const showLine = useLine && hasContents;

    const viewPrefix = prefix !== '' && `[${prefix}]: `;

    return (
        <div style={style.ui}>
            {showLine && <hr style={style.hr} />}
            {showTextarea && (
                <textarea
                    style={style.textarea}
                    value={value}
                    defaultValue={defaultValue}
                    disabled={!validInput}
                    readOnly={!validInput}
                    {...callbacksMap}
                />
            )}
            {showEvents && (
                <p style={style.buttons}>{loop(Btn, callbacks, eachBtn)}</p>
            )}
            {showJson && (
                <p style={style.json}>
                    {viewPrefix}
                    {json}
                </p>
            )}
        </div>
    );
};

const Btn = ({ label, onClick }) => (
    <button style={style.button} onClick={onClick}>
        {label}
    </button>
);

const eachBtn = ([label, onClick]) => ({
    label,
    onClick,
});

const getEachView = (each, trace) => (itemData, index) => ({
    data: each(itemData, index),
    trace,
    prefix: index,
    useLine: true,
});

const genCallbacks = (events, props) => {
    const eventProps = {};
    const callbackNames = {};

    Object.entries(events).forEach(([event, fnc]) => {
        const type = typeof fnc;
        const isString = type === 'string';
        const isFnc = type === 'function';
        const callback = isFnc ? fnc : props[fnc];

        if (typeof callback === 'function') {
            isString && (callbackNames[fnc] = true);
            eventProps[event] = callback;
        }
    });

    return [eventProps, callbackNames];
};

const emptyList = <View data={'EMPTY LIST'} useLine />;

const getTraceList = (trace) =>
    trace && typeof trace === 'string'
        ? trace.trim().split(REG_SPLIT)
        : EMPTY_ARRAY;

const jsonFilter = (data, trace) => {
    if (!trace || !trace.length) {
        return data;
    }

    return trace.reduce((targetProps, key) => {
        targetProps[key] = data[key];
        return targetProps;
    }, {});
};

const EMPTY_DATA = {};
const EMPTY_ARRAY = [];
const EMPTY_FNC = (data) => data;
const REG_SPLIT = /[\s,]+/;
const INPUT_EVENTS = `
onKeyDown
onKeyUp
onKeyPress
onChange
onFocus
onBlur
onSelect
`
    .trim()
    .split(REG_SPLIT)
    .reduce((events, event) => {
        events[event] = event;
        return events;
    }, {});

export const VACList = (props) => (
    <VAC useList="list" useEach="each" {...props} />
);

export const VACInput = (props) => (
    <VAC
        useValue="value"
        useDefaultValue="defaultValue"
        {...INPUT_EVENTS}
        {...props}
    />
);

const loop = (
    Item,
    list = null,
    each = (data) => data,
    instead = null,
    hidden = false
) => {
    if (hidden) {
        return null;
    }

    const datas = Array.isArray(list) ? list : null;

    return Item && datas && datas.length > 0
        ? datas.map((data, index) => {
              const props = each(data, index);
              return <Item key={index} {...props} />;
          })
        : instead;
};

// dummy styles
const TITLE_COLOR = '#fffdba';
const BORDER_COLOR = '#354f63';
const BG_COLOR = '#0c2233';
const BTN_BG_COLOR = '#4ebded';
const JSON_COLOR = '#ffc478';
const JSON_BG_COLOR = '#05070d';
const FONT_SIZE = 14;

const style = {
    container: {
        display: 'block',
        padding: '10px 8px 8px',
        margin: '3px 0px',
        borderRadius: '7px',
        border: `1px solid ${BORDER_COLOR}`,
        fontFamily: 'SFMono-Regular,Consolas,Menlo,monospace',
        fontSize: `${FONT_SIZE}px`,
        fontWeight: 'normal',
        lineHeight: '1.5',
        letterSpacing: '-0.2px',
        wordSpacing: '-0.5px',
        backgroundColor: BG_COLOR,
    },
    title: {
        display: 'block',
        padding: '6px 0 2px 4px',
        margin: '-3px 0',
        fontFamily: 'initial',
        fontSize: `${FONT_SIZE + 3}px`,
        color: TITLE_COLOR,
    },
    scroll: {
        display: 'block',
        padding: '0',
        margin: '0',
        overflowY: 'auto',
    },
    ui: {
        display: 'block',
        padding: '0',
        margin: '0',
        textAlign: 'center',
    },
    hr: {
        display: 'inline-block',
        margin: '5px 0',
        padding: '0',
        width: '99%',
        height: '1px',
        border: 'none',
        backgroundColor: BORDER_COLOR,
    },
    textarea: {
        display: 'block',
        padding: '3px 5px',
        margin: '0px 2px 3px',
        width: '99.3%',
        boxSizing: 'border-box',
        borderRadius: '4px',
        border: `1px solid ${BORDER_COLOR}`,
        outline: 'none',
        color: '#444',
        backgroundColor: '#eee',
        fontFamily: '맑은고딕',
        fontSize: `${FONT_SIZE + 2}px`,
        lineHeight: '1.25',
        textAlign: 'left',
        overflow: 'auto',
        resize: 'none',
    },
    buttons: {
        display: 'block',
        padding: '0',
        margin: '0',
        textAlign: 'left',
    },
    button: {
        display: 'inline-block',
        padding: '5px 6px 3px',
        margin: '1px 1px 4px 2px',
        borderRadius: '3px',
        boxSizing: 'border-box',
        border: 'none',
        outline: 'none',
        fontSize: `${FONT_SIZE + 2}px`,
        fontWeight: 'bold',
        fontFamily: 'SFMono-Regular,Consolas,Menlo,monospace',
        color: JSON_BG_COLOR,
        textDecoration: 'none',
        lineHeight: '1.25',
        letterSpacing: '-0.2px',
        backgroundColor: BTN_BG_COLOR,
        overflow: 'visible',
    },
    json: {
        display: 'block',
        padding: `6px 10px`,
        margin: '0 0 2px',
        color: JSON_COLOR,
        backgroundColor: JSON_BG_COLOR,
        borderRadius: '6px',
        textAlign: 'left',
        wordBreak: 'break-all',
    },
};

export default VAC;
