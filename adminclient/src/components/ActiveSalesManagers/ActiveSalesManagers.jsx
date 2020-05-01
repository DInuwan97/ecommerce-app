import React, { Component } from 'react'

export default class ActiveSalesManagers extends Component {
    render() {
        return (
            <div>
                    <div className="card">
        <div className="card-header">
          <h3 className="card-title">Projects</h3>

          <div className="card-tools">
            <button type="button" className="btn btn-tool" data-card-widget="collapse" data-toggle="tooltip" title="Collapse">
              <i className="fas fa-minus"></i></button>
            <button type="button" className="btn btn-tool" data-card-widget="remove" data-toggle="tooltip" title="Remove">
              <i className="fas fa-times"></i></button>
          </div>
        </div>
        <div className="card-body p-0">
          <table className="table table-striped projects">
              <thead>
                  <tr>
                      <th style={{width: '1%'}}>
                          #
                      </th>
                      <th style={{width: '20%'}}>
                          Project Name
                      </th>
                      <th style={{width: '30%'}}>
                          Team Members
                      </th>
                      <th>
                          Project Progress
                      </th>
                      <th style={{width: '8%'}} className="text-center">
                          Status
                      </th>
                      <th style={{width: '20%'}}>
                      </th>
                  </tr>
              </thead>
              <tbody>
                  <tr>
                      <td>
                          #
                      </td>
                      <td>
                          <a>
                              AdminLTE v3
                          </a>
                          <br/>
                          <small>
                              Created 01.01.2019
                          </small>
                      </td>
                      <td>
                          <ul className="list-inline">
                              <li className="list-inline-item">
                                  <img alt="Avatar" className="table-avatar" src="../../dist/img/avatar.png"/>
                              </li>
                              <li className="list-inline-item">
                                  <img alt="Avatar" className="table-avatar" src="../../dist/img/avatar2.png"/>
                              </li>
                              <li className="list-inline-item">
                                  <img alt="Avatar" className="table-avatar" src="../../dist/img/avatar3.png"/>
                              </li>
                              <li className="list-inline-item">
                                  <img alt="Avatar" className="table-avatar" src="../../dist/img/avatar04.png"/>
                              </li>
                          </ul>
                      </td>
                      <td className="project_progress">
                          <div className="progress progress-sm">
                              <div className="progress-bar bg-green" role="progressbar" aria-volumenow="57" aria-volumemin="0" aria-volumemax="100" style={{width: '57%'}}>
                              </div>
                          </div>
                          <small>
                              57% Complete
                          </small>
                      </td>
                      <td className="project-state">
                          <span className="badge badge-success">Success</span>
                      </td>
                      <td className="project-actions text-right">
                          <a className="btn btn-primary btn-sm" href="#">
                              <i className="fas fa-folder">
                              </i>
                              View
                          </a>
                          <a className="btn btn-info btn-sm" href="#">
                              <i className="fas fa-pencil-alt">
                              </i>
                              Edit
                          </a>
                          <a className="btn btn-danger btn-sm" href="#">
                              <i className="fas fa-trash">
                              </i>
                              Delete
                          </a>
                      </td>
                  </tr>
                  <tr>
                      <td>
                          #
                      </td>
                      <td>
                          <a>
                              AdminLTE v3
                          </a>
                          <br/>
                          <small>
                              Created 01.01.2019
                          </small>
                      </td>
                      <td>
                          <ul className="list-inline">
                              <li className="list-inline-item">
                                  <img alt="Avatar" className="table-avatar" src="../../dist/img/avatar.png"/>
                              </li>
                              <li className="list-inline-item">
                                  <img alt="Avatar" className="table-avatar" src="../../dist/img/avatar2.png"/>
                              </li>
                          </ul>
                      </td>
                      <td className="project_progress">
                          <div className="progress progress-sm">
                              <div className="progress-bar bg-green" role="progressbar" aria-volumenow="47" aria-volumemin="0" aria-volumemax="100"style={{width: '47%'}}>
                              </div>
                          </div>
                          <small>
                              47% Complete
                          </small>
                      </td>
                      <td className="project-state">
                          <span className="badge badge-success">Success</span>
                      </td>
                      <td className="project-actions text-right">
                          <a className="btn btn-primary btn-sm" href="#">
                              <i className="fas fa-folder">
                              </i>
                              View
                          </a>
                          <a className="btn btn-info btn-sm" href="#">
                              <i className="fas fa-pencil-alt">
                              </i>
                              Edit
                          </a>
                          <a className="btn btn-danger btn-sm" href="#">
                              <i className="fas fa-trash">
                              </i>
                              Delete
                          </a>
                      </td>
                  </tr>
                  <tr>
                      <td>
                          #
                      </td>
                      <td>
                          <a>
                              AdminLTE v3
                          </a>
                          <br/>
                          <small>
                              Created 01.01.2019
                          </small>
                      </td>
                      <td>
                          <ul className="list-inline">
                              <li className="list-inline-item">
                                  <img alt="Avatar" className="table-avatar" src="../../dist/img/avatar.png"/>
                              </li>
                              <li className="list-inline-item">
                                  <img alt="Avatar" className="table-avatar" src="../../dist/img/avatar2.png"/>
                              </li>
                              <li className="list-inline-item">
                                  <img alt="Avatar" className="table-avatar" src="../../dist/img/avatar3.png"/>
                              </li>
                          </ul>
                      </td>
                      <td className="project_progress">
                          <div className="progress progress-sm">
                              <div className="progress-bar bg-green" role="progressbar" aria-volumenow="77" aria-volumemin="0" aria-volumemax="100" style={{width: '77%'}}>
                              </div>
                          </div>
                          <small>
                              77% Complete
                          </small>
                      </td>
                      <td className="project-state">
                          <span className="badge badge-success">Success</span>
                      </td>
                      <td className="project-actions text-right">
                          <a className="btn btn-primary btn-sm" href="#">
                              <i className="fas fa-folder">
                              </i>
                              View
                          </a>
                          <a className="btn btn-info btn-sm" href="#">
                              <i className="fas fa-pencil-alt">
                              </i>
                              Edit
                          </a>
                          <a className="btn btn-danger btn-sm" href="#">
                              <i className="fas fa-trash">
                              </i>
                              Delete
                          </a>
                      </td>
                  </tr>
                  <tr>
                      <td>
                          #
                      </td>
                      <td>
                          <a>
                              AdminLTE v3
                          </a>
                          <br/>
                          <small>
                              Created 01.01.2019
                          </small>
                      </td>
                      <td>
                          <ul className="list-inline">
                              <li className="list-inline-item">
                                  <img alt="Avatar" className="table-avatar" src="../../dist/img/avatar.png"/>
                              </li>
                              <li className="list-inline-item">
                                  <img alt="Avatar" className="table-avatar" src="../../dist/img/avatar2.png"/>
                              </li>
                              <li className="list-inline-item">
                                  <img alt="Avatar" className="table-avatar" src="../../dist/img/avatar3.png"/>
                              </li>
                              <li className="list-inline-item">
                                  <img alt="Avatar" className="table-avatar" src="../../dist/img/avatar04.png"/>
                              </li>
                          </ul>
                      </td>
                      <td className="project_progress">
                          <div className="progress progress-sm">
                              <div className="progress-bar bg-green" role="progressbar" aria-volumenow="60" aria-volumemin="0" aria-volumemax="100" style={{width: '60%'}}>
                              </div>
                          </div>
                          <small>
                              60% Complete
                          </small>
                      </td>
                      <td className="project-state">
                          <span className="badge badge-success">Success</span>
                      </td>
                      <td className="project-actions text-right">
                          <a className="btn btn-primary btn-sm" href="#">
                              <i className="fas fa-folder">
                              </i>
                              View
                          </a>
                          <a className="btn btn-info btn-sm" href="#">
                              <i className="fas fa-pencil-alt">
                              </i>
                              Edit
                          </a>
                          <a className="btn btn-danger btn-sm" href="#">
                              <i className="fas fa-trash">
                              </i>
                              Delete
                          </a>
                      </td>
                  </tr>
                  <tr>
                      <td>
                          #
                      </td>
                      <td>
                          <a>
                              AdminLTE v3
                          </a>
                          <br/>
                          <small>
                              Created 01.01.2019
                          </small>
                      </td>
                      <td>
                          <ul className="list-inline">
                              <li className="list-inline-item">
                                  <img alt="Avatar" className="table-avatar" src="../../dist/img/avatar.png"/>
                              </li>
                              <li className="list-inline-item">
                                  <img alt="Avatar" className="table-avatar" src="../../dist/img/avatar04.png"/>
                              </li>
                              <li className="list-inline-item">
                                  <img alt="Avatar" className="table-avatar" src="../../dist/img/avatar5.png"/>
                              </li>
                          </ul>
                      </td>
                      <td className="project_progress">
                          <div className="progress progress-sm">
                              <div className="progress-bar bg-green" role="progressbar" aria-volumenow="12" aria-volumemin="0" aria-volumemax="100" style={{width: '12%'}}>
                              </div>
                          </div>
                          <small>
                              12% Complete
                          </small>
                      </td>
                      <td className="project-state">
                          <span className="badge badge-success">Success</span>
                      </td>
                      <td className="project-actions text-right">
                          <a className="btn btn-primary btn-sm" href="#">
                              <i className="fas fa-folder">
                              </i>
                              View
                          </a>
                          <a className="btn btn-info btn-sm" href="#">
                              <i className="fas fa-pencil-alt">
                              </i>
                              Edit
                          </a>
                          <a className="btn btn-danger btn-sm" href="#">
                              <i className="fas fa-trash">
                              </i>
                              Delete
                          </a>
                      </td>
                  </tr>
                  
              </tbody>
          </table>
        </div>

      </div>

    </div>
        )
    }
}
