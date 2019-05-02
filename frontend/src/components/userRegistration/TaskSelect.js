import Select from "react-select";
import tasks from "../../resourses/tasks";
import React, {Component} from 'react';

class TaskSelect extends Component {

    render() {

        if (this.props.role==='operator') {
            return (
                <div className="organizationInputContainer">
                    <Select
                        isMulti
                        joinValues
                        options={tasks}
                        placeholder={'Select tasks...'}
                        value={this.props.tasks}
                        onChange={this.props.handleTaskChange}
                        className={'registerFormSelect'}
                    />
                    {this.props.errors.tasks && (<div className="invalidFeedback">{this.props.errors.tasks}</div>)}

                </div>
            )
        }
        else return null

    };
}

export default TaskSelect