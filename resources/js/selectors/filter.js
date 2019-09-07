import { createSelector } from 'reselect'

const getVisibilityFilter = (state) => state.filterTasks;
const getTasks = (state) => state.tasks;

export const getVisibleTasks = createSelector(
    [ getVisibilityFilter, getTasks ],
    (filter, tasks) => {
        if(filter.type === 'filterStatus'){
            switch (filter.value) {
                case 'SHOW_ALL':
                    return tasks;
                case 'SHOW_NEW':
                    return tasks.filter(task => task.status === 'Новый');
                case 'SHOW_IN_WORK':
                    return tasks.filter(task => task.status === 'В работе');
                case 'SHOW_COMPLETED':
                    return tasks.filter(task => task.status === 'Завершен');
                default:
                    return tasks;
            }
        } else if(filter.type === 'filterName'){
            return tasks.filter(task => task.name.includes(filter.value));
        } else{
            return tasks;
        }
    }
);