import React from "react";
import { connect } from "react-redux";
import {Grid, Container, Form, Input, Button, FormButton} from "semantic-ui-react";
import axios from "axios";

import { setInputURL, setInputCaption } from "../actions";

class AddImage extends React.Component {
  getRandomImage = async () => {
    const randomImage = await axios.get("https://random.dog/woof.json");
    this.props.setInputURL(randomImage.data.url);
  };

  addImage = async (url, caption) => {
    console.log("adding image to blockchain : url = ", url, " , caption = ", caption);
    // write to blockchain
    const result = await this.props.contract.methods
      .addItem(url, caption)
      .send({ from: this.props.accounts[0] });
    console.log("result = ", result);
  };

  handleSubmit = event => {
    event.preventDefault();
    this.addImage(this.props.inputURL, this.props.inputCaption);
  };

  render() {
    return (
      <Container>
        <Form>
          <Grid stackable>
            <Grid.Row>
              <Grid.Column width={12}>
                <Input
                  label="Image URL"
                  fluid
                  focus
                  type="text"
                  tabIndex="1"
                  value={this.props.inputURL}
                  onChange={event => this.props.setInputURL(event.target.value)}
                />
              </Grid.Column>
              <Grid.Column width={4}>
                <Button
                  fluid
                  tabIndex="2"
                  onClick={event => {
                    this.props.setInputURL("Loading ...");
                    this.getRandomImage();
                  }}
                >
                  get random image
                </Button>
              </Grid.Column>
            </Grid.Row>

            <Grid.Row>
              <Grid.Column width={12}>
                <Input
                  label="Caption"
                  fluid
                  focus
                  type="text"
                  tabIndex="3"
                  value={this.props.inputCaption}
                  onChange={event =>
                    this.props.setInputCaption(event.target.value)
                  }
                />
              </Grid.Column>
            </Grid.Row>

            <Grid.Row>
              <Grid.Column width={4}>
                <FormButton
                  primary
                  fluid
                  tabIndex="4"
                  onClick={this.handleSubmit}
                >
                  add image
                </FormButton>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Form>
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {
    images: state.images,
    inputURL: state.inputURL,
    inputCaption: state.inputCaption
  };
};

export default connect(
  mapStateToProps,
  { setInputURL, setInputCaption }
)(AddImage);
