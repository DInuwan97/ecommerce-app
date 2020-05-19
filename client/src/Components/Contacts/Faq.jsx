import React, { Component } from 'react';

class Faq extends Component {
    render() {
        return (
            <div className="faq">
                <h3>FAQ</h3>
                <div className="container">
                    <div className="panel-group w3l_panel_group_faq" id="accordion" role="tablist" aria-multiselectable="true">
                        <div className="panel panel-default">
                            <div className="panel-heading" role="tab" id="headingOne">
                                <h4 className="panel-title asd">
                                    <a className="pa_italic" role="button" data-toggle="collapse" data-parent="#accordion" href="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                        <span className="glyphicon glyphicon-plus" aria-hidden="true" /><i className="glyphicon glyphicon-minus" aria-hidden="true" />Lorem ipsum dolor sit amet?
                  </a>
                                </h4>
                            </div>
                            <div id="collapseOne" className="panel-collapse collapse in" role="tabpanel" aria-labelledby="headingOne">
                                <div className="panel-body panel_text">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam suscipit et enim et bibendum. Donec id congue enim. Donec odio libero, hendrerit in nisl sed, consectetur tincidunt felis. Donec sagittis massa sed libero dapibus mollis. Donec nec nulla in mi luctus tincidunt nec in sapien. Sed dictum ligula in malesuada pretium. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Fusce at odio tortor. Pellentesque eleifend purus at laoreet euismod. Vivamus convallis urna id nunc dapibus tempor lobortis eu mi. Vivamus vitae quam finibus, eleifend ante eget, euismod augue.
                </div>
                            </div>
                        </div>
                        <div className="panel panel-default">
                            <div className="panel-heading" role="tab" id="headingTwo">
                                <h4 className="panel-title asd">
                                    <a className="pa_italic collapsed" role="button" data-toggle="collapse" data-parent="#accordion" href="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                        <span className="glyphicon glyphicon-plus" aria-hidden="true" /><i className="glyphicon glyphicon-minus" aria-hidden="true" />Lorem ipsum dolor sit amet?
                  </a>
                                </h4>
                            </div>
                            <div id="collapseTwo" className="panel-collapse collapse" role="tabpanel" aria-labelledby="headingTwo">
                                <div className="panel-body panel_text">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam suscipit et enim et bibendum. Donec id congue enim. Donec odio libero, hendrerit in nisl sed, consectetur tincidunt felis. Donec sagittis massa sed libero dapibus mollis. Donec nec nulla in mi luctus tincidunt nec in sapien. Sed dictum ligula in malesuada pretium. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Fusce at odio tortor. Pellentesque eleifend purus at laoreet euismod. Vivamus convallis urna id nunc dapibus tempor lobortis eu mi. Vivamus vitae quam finibus, eleifend ante eget, euismod augue.
                </div>
                            </div>
                        </div>
                        <div className="panel panel-default">
                            <div className="panel-heading" role="tab" id="headingThree">
                                <h4 className="panel-title asd">
                                    <a className="pa_italic collapsed" role="button" data-toggle="collapse" data-parent="#accordion" href="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                                        <span className="glyphicon glyphicon-plus" aria-hidden="true" /><i className="glyphicon glyphicon-minus" aria-hidden="true" />Lorem ipsum dolor sit amet?
                  </a>
                                </h4>
                            </div>
                            <div id="collapseThree" className="panel-collapse collapse" role="tabpanel" aria-labelledby="headingThree">
                                <div className="panel-body panel_text">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam suscipit et enim et bibendum. Donec id congue enim. Donec odio libero, hendrerit in nisl sed, consectetur tincidunt felis. Donec sagittis massa sed libero dapibus mollis. Donec nec nulla in mi luctus tincidunt nec in sapien. Sed dictum ligula in malesuada pretium. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Fusce at odio tortor. Pellentesque eleifend purus at laoreet euismod. Vivamus convallis urna id nunc dapibus tempor lobortis eu mi. Vivamus vitae quam finibus, eleifend ante eget, euismod augue.
                </div>
                            </div>
                        </div>
                        <div className="panel panel-default">
                            <div className="panel-heading" role="tab" id="headingFour">
                                <h4 className="panel-title asd">
                                    <a className="pa_italic collapsed" role="button" data-toggle="collapse" data-parent="#accordion" href="#collapseFour" aria-expanded="false" aria-controls="collapseFour">
                                        <span className="glyphicon glyphicon-plus" aria-hidden="true" /><i className="glyphicon glyphicon-minus" aria-hidden="true" />Lorem ipsum dolor sit amet?
                  </a>
                                </h4>
                            </div>
                            <div id="collapseFour" className="panel-collapse collapse" role="tabpanel" aria-labelledby="headingFour">
                                <div className="panel-body panel_text">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam suscipit et enim et bibendum. Donec id congue enim. Donec odio libero, hendrerit in nisl sed, consectetur tincidunt felis. Donec sagittis massa sed libero dapibus mollis. Donec nec nulla in mi luctus tincidunt nec in sapien. Sed dictum ligula in malesuada pretium. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Fusce at odio tortor. Pellentesque eleifend purus at laoreet euismod. Vivamus convallis urna id nunc dapibus tempor lobortis eu mi. Vivamus vitae quam finibus, eleifend ante eget, euismod augue.
                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        );
    }
}

export default Faq;