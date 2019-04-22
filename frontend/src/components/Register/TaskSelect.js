import Select from "react-select";
import tasks from "../../resourses/tasks";
import classnames from "classnames";
import React, {Component} from 'react';

class TaskSelect extends Component {
    constructor() {
        super();

    }
    render() {

        if (this.props.role==='operator') {
            return (
                <div className="form-group">
                    <Select
                        isMulti
                        joinValues
                        options={tasks}
                        placeholder={'Select tasks...'}
                        value={this.props.tasks}
                        onChange={this.props.handleChangeTask}
                        className={classnames('form-control form-control-lg', {
                            'is-invalid': this.props.errors.tasks
                        })}
                    />
                    {this.props.errors.tasks && (<div className="invalid-feedback">{this.props.errors.tasks}</div>)}

                </div>
            )
        }
        else return null

    };
}

export default TaskSelect