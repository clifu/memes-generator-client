import React from "react";
import "./MemeCreator.css";

class MemeCreator extends React.Component {
  state = {
    topTextOnImage: ""
  };

  handleTopChange = event => {
    this.setState({ topTextOnImage: event.target.value });
  };

  componentDidMount() {
    var img = new Image();

    const DrawPlaceholder = () => {
      img.src = "https://unsplash.it/400/400/?random";
      img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        DrawOverlay(img);
        DrawText();
        DynamicText(img);
      };
    };

    const DrawOverlay = img => {
      ctx.drawImage(img, 0, 0);
      ctx.fillStyle = "rgba(30, 144, 255, 0)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    };

    const DrawText = () => {
      ctx.fillStyle = "white";
      ctx.textBaseline = "middle";
      ctx.font = "50px 'Montserrat'";
      ctx.fillText(this.state.topTextOnImage, 50, 50);
    };

    const DynamicText = img => {
      document.getElementById("name").addEventListener("keyup", () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        DrawOverlay(img);
        DrawText();
        ctx.fillText(this.state.topTextOnImage, 50, 50);
      });
    };

    const handleImage = e => {
      var reader = new FileReader();
      var img = "";
      var src = "";
      reader.onload = event => {
        img = new Image();
        img.onload = () => {
          canvas.width = img.width;
          canvas.height = img.height;
          ctx.drawImage(img, 0, 0);
        };
        img.src = event.target.result;
        src = event.target.result;
        canvas.classList.add("show");
        DrawOverlay(img);
        DrawText();
        DynamicText(img);
      };
      reader.readAsDataURL(e.target.files[0]);
    };

    const convertToImage = () => {
      var link = document.createElement("a");
      link.download = "filename.png";
      link.href = canvas.toDataURL("png");
      link.click();
    };

    var imageLoader = document.getElementById("imageLoader");
    imageLoader.addEventListener("change", handleImage, false);
    var canvas = document.getElementById("imageCanvas");
    var ctx = canvas.getContext("2d");
    img.crossOrigin = "anonymous";
    DrawPlaceholder();
    document.getElementById("download").addEventListener("click", () => {
      convertToImage();
    });
  }

  render() {
    return (
      <div className="page-wrap">
        <div className="controls">
          <input
            className="controls__input"
            type="file"
            id="imageLoader"
            name="imageLoader"
          />
          <input
            className="controls__input"
            id="name"
            type="text"
            value={this.state.topTextOnImage}
            onChange={this.handleTopChange}
          />
        </div>
        <div id="canvas-wrap">
          <canvas
            style={{ display: "block", width: "400px", height: "400px" }}
            id="imageCanvas"
          >
            <canvas id="canvasID"></canvas>
          </canvas>
        </div>
        <button className="btn" id="download" type="button">
          Zapisz sobie memesa
        </button>
      </div>
    );
  }
}

export default MemeCreator;
