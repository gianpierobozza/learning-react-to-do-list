import React, { useState } from 'react'
import { defaultListTitle } from './Globals.js'

const ToDoShare = ({setTitle, setToDoList}) => {

    const [isOpened, setIsOpened] = useState(false);

    const [shareInput, setShareInput] = useState('');

    function toggle() {
        setIsOpened(wasOpened => !wasOpened);
    }

    function shareList() {
        const title = sessionStorage.getItem('toDoListTitle');
        const titleInStorage = title != null ? title : defaultListTitle;
        const data = JSON.parse(sessionStorage.getItem('toDoListData'));
        const dataInStorage = data != null ? data : [];
        const list = {
            'listTitle': titleInStorage,
            'listData': dataInStorage
        };
        const listToString = JSON.stringify(list);
        const base64List = Buffer.from(listToString).toString('base64');
        setShareInput(base64List);
        navigator.clipboard.writeText(base64List);
        var tooltip = document.getElementById('shareTooltip');
        tooltip.innerHTML = 'Copied to Clipboard!';
    }

    function importList() {
        if (shareInput !== '' && shareInput !== null) {
            const base64List = Buffer.from(shareInput, 'base64');
            const stringToList = JSON.parse(base64List);
            if (importIsValidList(stringToList)) {
                sessionStorage.setItem('toDoListTitle', stringToList['listTitle']);
                setTitle(stringToList['listTitle']);
                if (stringToList['listData'].length > 0) {
                    if (isListValidToDoList(stringToList)) {
                        console.log('set list in storage');
                        sessionStorage.setItem('toDoListData', JSON.stringify(stringToList['listData']));
                        setToDoList(stringToList['listData']);
                    }
                } else {
                    sessionStorage.setItem('toDoListData', JSON.stringify([]));
                    setToDoList(stringToList['listData']);
                }
                
            }
        }
    }

    function importIsValidList(stringToList) {
        return stringToList.hasOwnProperty('listTitle') && stringToList.hasOwnProperty('listData') && Array.isArray(stringToList['listData']);
    }

    function isListValidToDoList(stringToList) {
        var isValid = true;
        for (const [index, element] of stringToList['listData'].entries()) {
            if (!(element.hasOwnProperty('id') && element.hasOwnProperty('task') && element.hasOwnProperty('complete'))) {
                isValid = false;
                break;
            }
        };
        return isValid;
    }

    function textAreaOnChange(e) {
        setShareInput(e.currentTarget.value);
    }

    function tooltipOnMouseOut() {
        var tooltip = document.getElementById('shareTooltip');
        tooltip.innerHTML = 'Copy to clipboard...';
    }

    return (
        <div className='todo-share'>
            <div className='toggle-area' onClick={toggle}>
                Share &amp; Import&nbsp;
                {!isOpened && (<span>&darr;</span>)}
                {isOpened && (<span>&uarr;</span>)}
            </div>
            {isOpened && (
                <div>
                    <div className='share-tooltip'>
                        <button className='clear button' onMouseOut={tooltipOnMouseOut} style={{margin: '20px'}} onClick={shareList}>
                            <span className='share-tooltiptext' id='shareTooltip'>Copy to clipboard...</span>
                            Share
                        </button>
                    </div>
                    <textarea className='share-text' value={shareInput} onChange={textAreaOnChange} placeholder='Paste list...' rows='1'/>
                    <button className='clear button' style={{margin: '20px'}} onClick={importList}>Import</button>
                </div>
            )}
        </div>
    );
};

export default ToDoShare;
