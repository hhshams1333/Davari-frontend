import React, { Component } from "react";

import FormList from "./common/formList";
class ChoosePanel extends Component {
  state = {};

  render() {
    const { items, formNeeded } = this.props;
    return (
      <div className="row justify-content-around">
        {items.map((item) => (
          <div className="col-md-6 my-1" key={item.content.length}>
            <div className="card h-100">
              <div className="row card-body">
                <div className="row">
                  <h4 className="card-title">{item.header}</h4>
                  <p className="card-text">{item.content}</p>
                </div>
                <div className="row align-self-end">
                  <FormList
                    formItems={item.formItems}
                    formLinks={item.buttons}
                    display={formNeeded}
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }
}

export default ChoosePanel;
//
