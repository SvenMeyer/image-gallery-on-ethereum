import React from "react";
import { connect } from "react-redux";
import { setFilter, setSort } from "../actions";

/// @param props.filters properties defines which extensions to show
/// @param props.sort defines sort order (by extension / by filename)
class Selector extends React.Component {
  filterSelection() {
    console.log("Component Selector : props.filters = ", this.props.filters);
    return Object.keys(this.props.filters).map((filterName, index) => {
      return (
        <div className="field" key={index}>
          <div className="ui checkbox">
            <input
              type="checkbox"
              name={filterName}
              checked={this.props.filters[filterName]}
              tabIndex={index}
              onChange={event => {
                this.props.setFilter(event.target.name, event.target.checked);
              }}
            />
            <label>{filterName}</label>
          </div>
        </div>
      );
    });
  }

  render() {
    return (
      <div className="ui form">
        <div className="inline fields">
          <label>Filter : </label>
          {this.filterSelection()}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    filters: state.filters,
    sort: state.sort
  };
};

export default connect(
  mapStateToProps,
  { setFilter, setSort }
)(Selector);
