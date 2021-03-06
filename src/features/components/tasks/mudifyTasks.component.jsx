import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import styles from "./tasks.component.scss";
import { ApiService } from "../../../common/services/api.service";
import {
  START_FETCH_TASK_STATUS_UPDATE,
  FETCH_TASK_STATUS_UPDATE_SUCCESS,
  FETCH_TASK_STATUS_UPDATE_FAIL
} from "../../../common/state/task/task.actions";
import { FETCH } from "../../../common/actions";

const MudifyTasksComponent = props => ({
  render() {
    const task = this.props.task || {};
    const cancel = this.props.onCancelTaskSelection;

    return (
      <div className={"mudify-task-component"}>
        <div className="panel panel-info">
        <button type="button" onClick={cancel} className="close" ><span >&times;</span></button>
          <div className="panel-heading">
            <h3 className="panel-title ">{`Task Update: ${
              task.description
            }`}</h3>
          </div>

          <div className="panel-body">
            <div className="card-block-rounded">
              <div className="form-group">
                <label className="text-lowercase h4">
                  current status: {task.status}
                </label>
                <form onSubmit={e => this.updatStatus(e, task)}>
                  <select
                    className="form-control custom-select mb-2 mr-sm-2 mb-sm-0"
                    ref="status"
                    autoFocus
                  >
                    <option value="to do">to do</option>
                    <option value="in progress">in progress</option>
                    <option value="done">done</option>
                    <option value="cancel">cancel</option>
                  </select>
                  <h4 className="card-subtitle mb-2">
                    due date: {task.due_date}
                  </h4>

                  <button type="submit" className="btn btn-danger">
                    update task
                  </button>
                  <button type="button" onClick={cancel} className="btn btn-info btn col-xs-offset-1"> 
                    Back
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  },
  updatStatus(e, task) {
    e.preventDefault();
    const o = new ApiService().getOptions("updateTask");
    const { url, params } = o;
    const status = this.refs.status.value;
    const id = task.id;
    const data = { id: id, status: status };
    params.body = JSON.stringify(data);

    const payload = {
      url,
      params: params,
      startActionType: START_FETCH_TASK_STATUS_UPDATE,
      successActionType: FETCH_TASK_STATUS_UPDATE_SUCCESS,
      failActionType: FETCH_TASK_STATUS_UPDATE_FAIL
    };
    this.props.dispatch({ type: FETCH, payload: payload });
  }
});
function mapStateToProps(state) {
  return {
    isLoading: state.tasksReducer.loading
  };
}

export default withRouter(connect(mapStateToProps)(MudifyTasksComponent));
