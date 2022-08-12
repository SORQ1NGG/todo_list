import React, { useState, useRef, useEffect } from 'react'// @ts-ignoreimport styles from './style.module.scss'export interface IAddTodo { // создаем интерфейс для добавления задачи    onAdd: (title: string) => void;}export const AddTodo: React.FC<IAddTodo> = (props) => {    const { onAdd } = props    const [value, setValue] = useState('') // храним наше значение в стейте    const editTitleInputRef = useRef<HTMLInputElement>(null) // хук для эффекта фокуса на наш инпут    const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => { // функция для доставания значения из нашего стейта        setValue(e.target.value)    }    const handleKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (e) => { // функция для добавления задачи через клавишу "Enter"        if (e.key === 'Enter' && value) { // если нажат Enter и есть значение в инпуте, то мы его добавляем в лист            onAdd(value) // добавления значения в лист            setValue('') // очищение значения после добавления задачи в лист        }    }    useEffect(() => { // добавления эффекта фокуса на инпут после каждого рендера, но единожды, поэтому массив зависимостей оставляем пустым        if (editTitleInputRef.current) { // делаем проверку нашего инпута, если он присутствует, то добавляем к нему фокус            editTitleInputRef.current.focus()        }    },[])    return (        <div className={styles.addTodo}>            <input                placeholder='Type here...'                className={styles.addTodoInput}                value={value}                onChange={handleChange}                ref={editTitleInputRef}                onKeyDown={handleKeyDown}            />            <button                className={styles.addTodoButton}                onClick={() => {                setValue('')                if (value) {                    onAdd(value)                }            }}            >                Add            </button>        </div>    )}