import React, {Componet} from 'react';
import './app.css';

import AppHeader from '../app-header/app-header';
import SearchPanel from '../search-panel/search-panel';


export default class App extends Componet{
    maxId = 100;
    state ={
        todoData: [
            this.createTodoItem('Have a cup of tea'),
            this.createTodoItem('Go to the gym'),
            this.createTodoItem('Clean up the room')
        ],
        term: '',
        filter: 'all'
    };
    
    //   
    createTodoItem(label){
        return{
            label,
            important: false,
            done: false,
            id: this.maxId++
        }
    }

    // Удаление задания
    deleteItem = (id) => {
        this.setState(({todoData}) => {
            const idx = todoData.findIndex((el) => el.id === id);
            todoData.splice(0, idx);
            const newArray = [
                ...todoData.splice(0, idx),
                ...todoData.splice(idx + 1)
            ];
            return {
                todoData: newArray
            };

        });
    };

    // Добавление задания
    addItem = (text) => {
        const newItem = this.createTodoItem(text);
        this.setState(({todoData}) => {
            const newArray = [
                ...todoData,
                newItem
            ];
            return{
                todoData: newArray
            };
        });
    };

    // Выделение важного задания
    onToggleImportant = (id) => {
        this.setState(({todoData}) => {
            return{
                todoData: this.toggleProperty(todoData, id, 'important')
            };
        });
    };

    //
    toggleProperty(arr, id, propName) {
        const idx = arr.findIndex((el) => el.id === id);
        const oldItem = arr[idx];
        const newItem = { ...oldItem,
        [propName]: !oldItem[propName]};
        return [
            ...arr.slice(0, idx),
            newItem,
            ...arr.slice(idx + 1)
        ];
    };

    // Поиск
    onSearchChange = (item) => {
        this.setState({item});
    };

    // Фильтр
    onFilterChange = (filter) => {
        this.setState({filter});
    }

    filter(items, filter){
        switch(filter){
            case 'all':
                return items;
            case 'active':
                return items.filter((item) => !item.done);
            case 'done':
                return items.filter((item) => item.done);
            default:
                return items;
        }
    }

    // Логика для поиска
    search(items, term){
        if(term.length === 0){
            return items;
        }
        return items.filter((items) => {
            return items.label.toLowerCase().indexOf(term.toLowerCase()) > -1;
        })      
    };

    // Для выполненых заданий
    onToggleDone = (id) => {
        this.setState(({todoData}) => {
            return {
                todoData: this.toggleProperty(todoData, id, 'done')
            };
        });
    }

    render(){
        const {todoData, term, filter} = this.state;
        const visibleItem = this.filter(this.search(todoData, term), filter);
        const doneCount = todoData.filter((el) => el.done).length;
        const todoCount = todoData.length - doneCount;

        return(
            <div className="todo-app">
                <AppHeader todo={doneCount} done={todoCount}/>
                <div className="search-panel d-flex">
                    <SearchPanel onSearchChange={this.onSearchChange}/>
                </div>
            </div>
        )
    }
};