import React, { Component } from "react";
import { getImages } from "../services/imageService";
class InquiryForm extends Component {
  state = {
    images: [],
  };
  async componentDidMount() {
    // const { data: images } = await getImages();
    // this.setState({ images });
  }

  renderItems = () => {
    const images = this.state.images;
    if (images.length !== 0) return images.map((i) => <p>{i.filename}</p>);
  };

  render() {
    return <React.Fragment>{this.renderItems()}</React.Fragment>;
  }
}

export default InquiryForm;
