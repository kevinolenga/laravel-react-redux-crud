import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { tasksFetchData, taskDelete, taskAdd, taskUpdate, taskFilter } from '../actions/tasks';
import Container from '@material-ui/core/Container';
import Create from './form/Create';
import Index from './form/Index';
import { getVisibleTasks } from '../selectors/filter';

class App extends Component {
    constructor(props){
        super(props);
        this.state = {
            options: [
                {
                    label: 'Всего',
                    value: 'SHOW_ALL',
                },
                {
                    label: 'Новых',
                    value: 'SHOW_NEW',
                },
                {
                    label: 'В работе',
                    value: 'SHOW_IN_WORK',
                },
                {
                    label: 'Завершено',
                    value: 'SHOW_COMPLETED',
                },

            ],
            'search': ''
        }
    }

    componentDidMount() {
        this.props.fetchData('/api/tasks');
    }

    handleFilterTasks(event){
        let statusType = event.target.getAttribute('data-type');
        let statusValue = event.target.getAttribute('data-value');
        this.props.onFilterTask(statusType, statusValue);
    }

    onChangeSearchInput(event){
        this.setState({
            search: event.target.value
        });
    }

    handleSearchSubmit(event){
        let searchType = event.target.getAttribute('data-type');
        let searchName = this.state.search;
        this.props.onFilterTask(searchType, searchName);
    }

    render() {
        return (
            <Container maxWidth="lg">
                <div className="card">
                    <div className="card-header">Раздел задачи</div>

                    <div className="card-body">
                        <div className="row justify-content-between">
                            <div className="col-auto">
                                <Create onAddTask={this.props.onAddTask} />
                            </div>
                            <div className="col-5">
                                <div className="input-group mb-3">
                                    <input type="text" className="form-control" value={this.state.search} onChange={this.onChangeSearchInput.bind(this)} placeholder="Введите описание задачи" />
                                    <div className="input-group-append">
                                        <button className="btn btn-outline-secondary" data-type="filterName" onClick={this.handleSearchSubmit.bind(this)}>Поиск</button>
                                    </div>
                                </div>
                            </div>
                            {this.state.options.map((option, index) => {
                                return (
                                    <div className="col-auto" key={index}>
                                        <button className="btn btn-secondary" data-value={option.value} data-type="filterStatus" onClick={this.handleFilterTasks.bind(this)}>
                                            {option.label}
                                        </button>
                                    </div>
                                );
                            })}
                        </div>
                        <hr/>
                        <div className="row">
                            <div className="col-12">
                                <table className="table table-bordered">
                                    <thead>
                                    <tr>
                                        <th>Описание</th>
                                        <th>Статус</th>
                                        <th>Приоритет</th>
                                        <th>Плановая дата окончания</th>
                                        <th>Фактическая дата окончания</th>
                                        <th>Действие</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                        <Fragment>
                                            <Index tasks={this.props.tasks} onDeleteTask={this.props.onDeleteTask} onUpdateTask={this.props.onUpdateTask} />
                                        </Fragment>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        );
    }
}

const mapStateToProps = state => {
    return {
        tasks: getVisibleTasks(state)
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchData: url => dispatch(tasksFetchData(url)),
        onAddTask: data => dispatch(taskAdd(data)),
        onDeleteTask: taskId => dispatch(taskDelete(taskId)),
        onUpdateTask: data => dispatch(taskUpdate(data)),
        onFilterTask: (type, value) => dispatch(taskFilter(type, value))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);