import { combineReducers } from 'redux';
import tasks from './tasks';
import filterTasks from './filterTasks'

const root =  combineReducers({
    tasks,
    filterTasks
});

export default root;