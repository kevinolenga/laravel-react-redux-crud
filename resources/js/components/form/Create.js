import React, { Component } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

export default class Create extends Component {
    constructor(props){
        super(props);
        this.state = {
            open: false,
            task: {
                name: '',
                status: 'Новый',
                priority: 'Средний',
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


    handleClickOpen() {
        this.setState({open: true});
    }

    handleClose() {
        this.setState({open: false});
    }

    handleOnSubmit(event){
        event.preventDefault();

        if(this.validate()){
            this.props.onAddTask(this.state.task);
            this.setState({open: false});
            this.setState({
                task: {
                    name: '',
                    status: 'Новый',
                    priority: 'Средний',
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
            <div>
                <button className="btn btn-primary" onClick={this.handleClickOpen.bind(this)}>
                    Добавить задачу
                </button>

                <Dialog open={this.state.open} onClose={this.handleClose.bind(this)} maxWidth="sm" fullWidth aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">Новая задача</DialogTitle>
                    <DialogContent>
                        <form onSubmit={this.handleOnSubmit.bind(this)}>
                            <div className="form-group">
                                <label htmlFor="taskName">Название задачи</label>
                                <input type="text" name="name" className={`form-control ${this.state.errorName.class}`} id="taskName" placeholder="Название задачи" onChange={this.onChangeInput.bind(this)} />
                                <div className="invalid-feedback">
                                    {this.state.errorName.text}
                                </div>
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
            </div>
        );
    }
}
