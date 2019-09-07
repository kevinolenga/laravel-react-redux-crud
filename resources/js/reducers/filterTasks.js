export default function filterTasks(state = [], action){
    if(action.type === 'TASK_FILTER'){
        return action.filter;
    }
    return state;
}