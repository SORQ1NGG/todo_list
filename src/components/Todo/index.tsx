import React, {useRef, useState, useEffect} from 'react'// @ts-ignoreimport styles from './style.module.scss'import { ITodoAppReducer, TodoAction } from '../../reducer/TodoAppReducer'interface ITodos extends ITodoAppReducer {    onRemoved: (id: string) => void;    onEdited: (title: string) => void;    dispatch: React.Dispatch<TodoAction>;    todo: ITodoAppReducer;}export const Todo: React.FC<ITodos> = (props) => {    const { id, title, todo, onRemoved, onEdited, dispatch } = props    const [isEditMode, setIsEditMode] = useState('list');    const [value, setValue] = useState(title)    const editTitleInputRef = useRef<HTMLInputElement>(null)    const [drag, setDrag] = useState({        active: false,        x: '',    });    const [dims, setDims] = useState({        w: 700,    });    const boxStyle = {        width: `${dims.w}px`,    };    const startResize = (e: any) => {        setDrag({            active: true,            x: e.clientX,        });    };    const resizeFrame = (e: any) => {        const { active, x } = drag;        if (active) {            const xDiff = Math.abs(+x - e.clientX);            const newW = x > e.clientX ? dims.w - xDiff : dims.w + xDiff;            setDrag({ ...drag, x: e.clientX });            setDims({ w: newW });        }    };    const stopResize = (e: any) => {        setDrag({ ...drag, active: false });    };    const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {        setValue(e.target.value)    }    const handleToggle = (id: string) => {        dispatch({            type: "TOGGLE_TODO",            payload: { id: id }        })    }    const handleKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (e) => {        if (e.key === 'Enter') {            onEdited(value)            setIsEditMode('onEdited')            setIsEditMode('list')        }    }    useEffect(() => {        if (isEditMode) {            editTitleInputRef?.current?.focus()        }    },[isEditMode])    return (        <div className={styles.t} onMouseMove={resizeFrame} onMouseUp={stopResize}>            <div style={boxStyle}>                <div                    className={styles.todo}                    style={{ backgroundColor: todo.isComplete ? 'green' : 'cornflowerblue' }}                >                    {isEditMode === 'list'                        ? <>                            <input                                readOnly                                checked={todo.isComplete}                                type='checkbox'                                className={styles.todoCheckbox}                                onClick={() => handleToggle(id)}                                onKeyDown={handleKeyDown}                            />                            <span className={styles.todoTitle}>{title}</span>                            <button                                className={styles.todoEdit}                                onClick={() => {                                    setIsEditMode('onEdited')                                }}                            >                                Edit                            </button>                            <button                                className={styles.todoRemove}                                onClick={() => {                                    onRemoved(id)}}                            >                                Remove                            </button>                            <button                                className={styles.todoRemove}                                onMouseDown={startResize}                            >                                Size                            </button>                        </>                        : <>                            <input                                value={value}                                onChange={handleChange}                                className={styles.todoInputEdit}                                ref={editTitleInputRef}                                onKeyDown={handleKeyDown}                            />                            <button                                className={styles.todoEditSave}                                onClick={() => {                                    onEdited(value)                                    setIsEditMode('list')                                }}                            >                                Save                            </button>                            <button                                className={styles.todoEditCancel}                                onClick={() => {                                    setIsEditMode('list')                                }}                            >                                Cancel                            </button>                        </>                    }                </div>            </div>        </div>    )}