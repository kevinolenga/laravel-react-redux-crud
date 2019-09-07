import React, { Component, Fragment } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

export default class Index extends Component {
    constructor(props){
        super(props);
        this.state = {
            open: false,
            task: {
                id: '',
                name: '',
                status: '',
                priority: '',
                date_end: '',
                date_actual: ''
            },
            errorName: {
                class: '',
                text: '',
            },
        };
    }

    onChangeInput(event){
        this.setState({
            task:{
                ...this.state.task,
                [event.target.name]: event.target.value
            }
        });
    }

    handleClickOpen(taskId) {
        let task = this.props.tasks.find(item => item.id == taskId);
        this.setState({
            task
        });
        this.setState({open: true});
    }

    handleClose() {
        this.setState({open: false});
    }

    handleOnSubmit(event){
        event.preventDefault();
        if(this.validate()){
            this.props.onUpdateTask(this.state.task);
            this.setState({open: false});
            this.setState({
                task: {
                    id: '',
                    name: '',
                    status: '',
                    priority: '',
                    date_end: '',
                    date_actual: ''
                },
                errorName: {
                    class: '',
                    text: '',
                },
            });
        }
    }

    handleDeleteTask(taskId){
        this.props.onDeleteTask(taskId);
    };

    validate(){
        if(!this.state.task.name){
            this.setState({
                errorName: {
                    class: 'is-invalid',
                    text: 'Описание задачи обязательно к заполнению'
                }
            });
            return false;
        }

        return true;
    }

    render() {
        return (
            <Fragment>
                {
                    this.props.tasks.map((task) => {
                        return (
                            <tr key={task.id}>
                                <td onClick={() => this.handleClickOpen(task.id)}>{task.name}</td>
                                <td>{task.status}</td>
                                <td>{task.priority}</td>
                                <td>{task.date_end}</td>
                                <td>{task.date_actual}</td>
                                <td>
                                    <button className="btn btn-danger" onClick={() => this.handleDeleteTask(task.id)}>
                                        Удалить
                                    </button>
                                </td>
                            </tr>
                        );
                    })
                }
                <Dialog open={this.state.open} onClose={this.handleClose.bind(this)} maxWidth="sm" fullWidth aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">Редактирование задачи</DialogTitle>
                    <DialogContent>
                        <form onSubmit={this.handleOnSubmit.bind(this)}>
                            <div className="form-group">
                                <label htmlFor="taskName">Название задачи</label>
                                <input type="text" name="name" className={`form-control ${this.state.errorName.class}`} id="taskName" placeholder="Название задачи" onChange={this.onChangeInput.bind(this)} value={this.state.task.name} />
                                <div className="invalid-feedback">
                                    {this.state.errorName.text}
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="taskStatus">Статус</label>
                                <select name="status" className="form-control" id="taskStatus" onChange={this.onChangeInput.bind(this)} value={this.state.task.status} multiple={false}>
                                    <option value="Новый">Новый</option>
                                    <option value="В работе">В работе</option>
                                    <option value="Завершен">Завершен</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label htmlFor="taskPriority">Приоритет</label>
                                <select name="priority" className="form-control" id="taskPriority" onChange={this.onChangeInput.bind(this)} value={this.state.task.priority} multiple={false}>
                                    <option value="Низкий">Низкий</option>
                                    <option value="Средний">Средний</option>
                                    <option value="Высокий">Высокий</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label htmlFor="taskDateEnd">Плановая дата окончания</label>
                                <input type="date" name="date_end" defaultValue={this.state.task.date_end} onChange={this.onChangeInput.bind(this)} id="taskDateEnd" className="form-control" />
                            </div>
                            <div className="form-group">
                                <div className="row justify-content-between">
                                    <div className="col-auto">
                                        <button type="submit" className="btn btn-success">
                                            Сохранить
                                        </button>
                                    </div>
                                    <div className="col-auto">
                                        <button type="button" className="btn btn-light" onClick={this.handleClose.bind(this)}>
                                            Отмена
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </DialogContent>
                </Dialog>
            </Fragment>
        );
    }
}
