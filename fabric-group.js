import { html, css, LitElement } from "lit";
import { fabric } from "fabric";
import { SVG } from "@svgdotjs/svg.js";

class MyGroup extends LitElement {
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

    const createRect = () => {
      var draw = SVG().size(100, 130);

      var rect = draw.rect(100, 50).move(20, 20).radius(10);

      var border = rect
        .clone()
        .fill("none")
        .stroke({
          color: "#000",
          width: 2,
          linecap: "round",
          linejoin: "round",
        });

      var gradient = draw.gradient("linear", function (add) {
        add.stop(0, "#f06", 0);
        add.stop(1, "#f06", 0.5);
      });
      var fillRect = rect.clone().fill(gradient);
      rect.lockUniScaling = true; // 禁止等比缩放

      draw.add(border);
      draw.add(fillRect);

      return draw;
    };

    var rectObject = createRect();

    const createCircle = () => {
      var draw = SVG().size(130, 130);

      var circle = draw.circle(100).move(150, 150);

      var border = circle
        .clone()
        .fill("none")
        .stroke({
          color: "#000",
          width: 2,
          linecap: "round",
          linejoin: "round",
        });

      var gradient = draw.gradient("linear", function (add) {
        add.stop(0, "#f06", 0);
        add.stop(1, "#f06", 0.5);
      });

      var fillCircle = circle.clone().fill(gradient);

      draw.add(border);
      draw.add(fillCircle);

      return draw;
    };

    var circleObject = createCircle();

    const createTriangle = () => {
      var draw = SVG().size(300, 130);

      var triangle = draw.polygon("0,50 25,0 50,50").move(300, 100);

      var borderColor = "#000";
      var borderWidth = 2;

      var gradient = draw.gradient("linear", function (add) {
        add.stop(0, "#f06", 0);
        add.stop(1, "#f06", 0.5);
      });

      triangle
        .fill(gradient)
        .stroke({ color: borderColor, width: borderWidth });

      return draw;
    };

    var triangleObject = createTriangle();

    const shape_arrow = () => {
        var draw = SVG().size(300, 130);

        var startX = 50; // 起始点 X 坐标
        var startY = 50; // 起始点 Y 坐标
        var endX = 250; // 终点 X 坐标
        var endY = 50; // 终点 Y 坐标
  
        var lineWidth = 2; // 线条宽度
        var lineColor = "#000"; // 线条颜色
  
        var arrowSize = 10; // 箭头大小
        var arrowColor = "#000"; // 箭头颜色
  
        var dashLength = 10; // 虚线段的长度
        var gapLength = 5; // 虚线段之间的间隔
  
        var totalLength = Math.sqrt(
          Math.pow(endX - startX, 2) + Math.pow(endY - startY, 2)
        ); // 线条的总长度
  
        var segments = Math.floor(totalLength / (dashLength + gapLength)); // 虚线段的数量
  
        var dx = (endX - startX) / segments; // 每个虚线段的 X 轴增量
        var dy = (endY - startY) / segments; // 每个虚线段的 Y 轴增量
  
        for (var i = 0; i < segments; i++) {
          var x1 = startX + dx * i;
          var y1 = startY + dy * i;
          var x2 = startX + dx * (i + 1) - dx / 2;
          var y2 = startY + dy * (i + 1) - dy / 2;
  
          var line = draw.line(x1, y1, x2, y2);
          line.stroke({ color: lineColor, width: lineWidth });
  
          draw.add(line);
        }
  
        // 添加箭头
        var arrow = draw.polygon(
          `${endX - arrowSize}, ${endY - arrowSize} ${endX}, ${endY} ${endX - arrowSize}, ${endY + arrowSize}`
        );
        arrow.fill(arrowColor);
  
        draw.add(arrow);
  
        return draw;
    };

    var arrowObject = shape_arrow();


    fabric.loadSVGFromString(circleObject.svg(), (obj) => {
      var svgObject = fabric.util.groupSVGElements(obj);
      canvas.add(svgObject);
      canvas.renderAll();
    });

    fabric.loadSVGFromString(rectObject.svg(), (obj) => {
      var svgObject = fabric.util.groupSVGElements(obj);
      canvas.add(svgObject);
      canvas.renderAll();
    });

    fabric.loadSVGFromString(triangleObject.svg(), (obj) => {
      var svgObject = fabric.util.groupSVGElements(obj);
      canvas.add(svgObject);
      canvas.renderAll();
    });

    fabric.loadSVGFromString(arrowObject.svg(), (obj) => {
      var svgObject = fabric.util.groupSVGElements(obj);
      canvas.add(svgObject);
      canvas.renderAll();
    });
  }
}

customElements.define("fabric-group", MyGroup);
