import React from "react";
import { Link } from "react-router-dom";
import { Menu } from "semantic-ui-react";

export default class HeaderMenu extends React.Component {
  state = { name: "home" };

  handleItemClick = (event, { name }) => this.setState({ activeItem: name });

  render() {
    const { activeItem } = this.state;

    return (
      <Menu>
        <Menu.Item
          as={Link}
          to="/"
          name="home"
          active={activeItem === "home"}
          onClick={this.handleItemClick}
        >
          Home
        </Menu.Item>

        <Menu.Item
          as={Link}
          to="/addimage"
          name="addimage"
          active={activeItem === "addimage"}
          onClick={this.handleItemClick}
        >
          add Image
        </Menu.Item>

        <Menu.Item
          as={Link}
          to="/gallery"
          name="gallery"
          active={activeItem === "gallery"}
          onClick={this.handleItemClick}
        >
          Gallery
        </Menu.Item>
      </Menu>
    );
  }
}
