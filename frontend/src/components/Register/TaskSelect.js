import Select from "react-select";
import tasks from "../../resourses/tasks";
import classnames from "classnames";
import React from "react";

const Task = ({...props}) => {
    console.log(props)

        return (
            <div className="form-group">
                <Select
                    isMulti
                    joinValues
                    options={tasks}
                    placeholder={'Select tasks...'}
                    value={props.role}
                    onChange={props.handleChangeTask}
                    className={classnames('form-control form-control-lg', {
                        'is-invalid': props.errors.tasks
                    })}
                />
                {props.errors.tasks && (<div className="invalid-feedback">{props.errors.tasks}</div>)}

            </div>
        )
};

export default Task