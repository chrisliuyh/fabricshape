import { html, css, LitElement } from "lit";
import { fabric } from "fabric";

class MyCanvas extends LitElement {
  static styles = css`
    #canvas-container {
      position: relative;
      background-color: yellow;
      width: 500px;
      height: 500px;
    }
  `;

  render() {
    return html`
      <div id="canvas-container">
        <canvas id="canvas" width="500" height="500"></canvas>
      </div>
    `;
  }

  firstUpdated() {
    const canvasElement = this.shadowRoot.getElementById("canvas");
    const canvas = new fabric.Canvas(canvasElement);
    const imageURL = "./src/assets/lit.svg"; // 替换为您的图片 URL

    // 创建自定义滤镜类 Redify
    fabric.Image.filters.Redify = fabric.util.createClass(
      fabric.Image.filters.BaseFilter,
      {
        type: "Redify",
        applyTo2d: function (options) {
          var imageData = options.imageData,
            data = imageData.data,
            len = data.length;

          for (var i = 0; i < len; i += 4) {
            data[i + 1] = 0;
            data[i + 2] = 0;
          }
        },
      }
    );
    fabric.Image.filters.Redify.fromObject =
      fabric.Image.filters.BaseFilter.fromObject;

    fabric.Image.fromURL(imageURL, (img) => {
      // 创建滤镜实例
      const redifyFilter = new fabric.Image.filters.Redify();

      // 将滤镜应用到图像
      img.filters = [redifyFilter];

      // 应用滤镜
      img.applyFilters();

      // 将图像添加到画布中
      canvas.add(img);
      canvas.requestRenderAll();
    });

    var circle = new fabric.Circle({
      left: 100,
      top: 100,
      radius: 50,
    });

    var gradient = new fabric.Gradient({
      type: "linear",
      gradientUnits: "pixels", // or 'percentage'
      coords: { x1: 0, y1: 0, x2: 0, y2: circle.height },
      colorStops: [
        { offset: 0, color: "#000" },
        { offset: 1, color: "#fff" },
      ],
    });
    var textWithStroke = new fabric.Text("Text with a stroke", {
      top: 100,
      left: 100,
      stroke: "#ff1318",
      strokeWidth: 1,
    });
    var loremIpsumDolor = new fabric.Text("Lorem ipsum dolor", {
      fontFamily: "Impact",
      stroke: "#c3bfbf",
      strokeWidth: 3,
    });
    canvas.on("mouse:down", function (options) {
      console.log(options.e.clientX, options.e.clientY);
    });
    var circle = new fabric.Rect({ width: 100, height: 50, fill: "green" });
    rect.on("selected", function () {
      console.log("selected a rectangle");
    });

    // var circle = new fabric.Circle({ radius: 75, fill: "blue" });
    // circle.on("selected", function () {
    //   console.log("selected a circle");
    // });
    canvas.add(textWithStroke, loremIpsumDolor);
    canvas.add(circle);
    circle.set("fill", gradient);
  }
}

customElements.define("my-canvas", MyCanvas);
