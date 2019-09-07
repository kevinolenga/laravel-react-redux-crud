export function tasksFetchDataSuccess(tasks){
    return {
        type: 'TASKS_FETCH_DATA',
        tasks
    }
}

export function tasksFetchData($url){
    return (dispatch) => {
        axios.get($url)
            .then(response => {
                return dispatch(tasksFetchDataSuccess(response.data.data));
            })
            .catch((error) => {
                console.log('Ошибка');
            });
    }
}

export function taskAdd(data){
    return (dispatch) => {

        axios.post('/api/tasks', data)
            .then(response => {
                return dispatch({
                    type: 'TASKS_ADD',
                    data: response.data.data
                });
            })
            .catch(error => {
                console.log('Ошибка');
            });
    }
}

export function taskUpdate(data){
    return (dispatch) => {

        axios.put(`/api/tasks/${data.id}`, data)
            .then(response => {
                return dispatch({
                    type: 'TASKS_UPDATE',
                    data: response.data.data
                });
            })
            .catch(error => {
                console.log('Ошибка');
            });
    }
}

export function taskDelete(taskId){
    return (dispatch) => {

        axios.delete(`/api/tasks/${taskId}`)
            .then(response => {
                return dispatch({
                    type: 'TASKS_DELETE',
                    taskId
                });
            })
            .catch(error => {
                console.log('Ошибка');
            });
    }
}

export function taskFilter(type, value){
    return dispatch => {
        return dispatch({
            type: 'TASK_FILTER',
            filter: {
                type: type,
                value: value
            }
        });
    }
}