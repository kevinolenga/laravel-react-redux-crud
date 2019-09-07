export default function tasks(state = [], action) {
    switch (action.type) {
        case 'TASKS_FETCH_DATA':
            return action.tasks;
        case 'TASKS_DELETE':
            return state.filter(item => item.id !== action.taskId);
        case 'TASKS_ADD':
            return [
                ...state,
                action.data
            ];
        case 'TASKS_UPDATE':
            const index = state.findIndex(item => item.id === action.data.id);
            if(index > -1){
                return state.map(item => {
                    if(item.id === action.data.id) return action.data;
                    return item;
                });
            }else{
                return [
                    ...state,
                    action.data
                ];
            }
        default:
            return state;
    }
};