import React from "react";
import { connect } from "react-redux";
import { VideoComponent } from "./videoComponent";

/// @param props.filters properties for each extension (true = display that extension)
class Gallery extends React.Component {
  state = {
    items: []
  };

  getItems = async () => {
    let itemCount = await this.props.contract.methods.getNumberofItems().call();
    console.log(itemCount, "items should be available on blockchain");
    for (let i = 0; i < itemCount; i++) {
      const result = await this.props.contract.methods.getItemByIndex(i).call();
      const url = result[0];
      const caption = result[1];
      const item = { id: i, url, caption };
      // add one new item and re-render gallery
      this.setState({ items: [...this.state.items, item] });
    }
  };

  componentDidMount(props) {
    // console.log(this.constructor.name, "componentDidMount: this.props = ", this.props);
    this.getItems();
  }

  sort(sortBy) {
    if (sortBy === "ext") {
      const sortedArray = this.state.items.sort((a, b) => {
        return a.url
          .substring(a.url.lastIndexOf(".") + 1)
          .localeCompare(b.url.substring(b.url.lastIndexOf(".") + 1));
      });
      this.setState({ items: sortedArray });
    }
  }

  render() {
    const galleryItems = this.state.items.map((item, index) => {
      const filename = item.url.substring(item.url.lastIndexOf("/") + 1);
      const ext = filename
        .substring(filename.lastIndexOf(".") + 1)
        .toLowerCase();
      // if extension of image is enabled -> render it
      if (this.props.filters[ext]) {
        return (
          <div className="column" key={item.id}>
            <div className="ui card">
              {ext === "mp4" ? (
                <div align="center">
                  <VideoComponent url={item.url} />
                </div>
              ) : (
                <div className="image">
                  <img src={item.url} alt={item.caption} />
                </div>
              )}
              <div className="content">
                <div className="header">{ext}</div>
                <div className="description">{item.caption}</div>
              </div>
            </div>
          </div>
        );
      } else return "";
    });

    return (
      <div>
        <div className="ui container">
          <button className="ui button" onClick={() => this.sort("ext")}>
            Sort by extension
          </button>
        </div>
        <div className="ui divider" />
        <div>
          <div className="ui stackable four column grid">{galleryItems}</div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    filters: state.filters
  };
};

export default connect(mapStateToProps)(Gallery);
