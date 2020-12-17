import * as React from "react";
import { Component } from "react";

export class VideoComponent extends Component {
  // videoContainer: HTMLDivElement;  // for TypeScript
  componentDidMount(props) {
    const video = document.createElement("video");
    video.autoplay = false;
    video.controls = true;
    video.width = "240";
    video.height = "240";
    video.align = "center";
    video.loop = false;
    video.muted = false; // true > fixes autoplay in chrome
    video.setAttribute("playsinline", "true"); // fixes autoplay in webkit (ie. mobile safari)

    const source = document.createElement("source");
    source.src = this.props.url;
    source.type = "video/mp4";
    video.appendChild(source);

    this.videoContainer.appendChild(video);
  }
  render() {
    return (
      <div
        ref={ref => {
          this.videoContainer = ref;
        }}
      />
    );
  }
}
