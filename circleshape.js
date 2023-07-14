import { fabric } from 'fabric';

const canvas = new fabric.Canvas("app");

function circleShape() {
  fabric.ShapeCircle = fabric.util.createClass(fabric.Circle, {
    type: "ShapeCircle",
    initialize: function (options) {
      options || (options = {});
      this.strokeUniform = true;
      this.noScaleCache = false;
      this.callSuper("initialize", options);
    },
    toObject: function () {
      return fabric.util.object.extend(this.callSuper("toObject"), {
        name: this.get("name"),
      });
    },
  });

  fabric.ShapeCircle.fromObject = function (object, callback) {
    callback && callback(new fabric.ShapeCircle(object));
  };

  fabric.ShapeCircle.generate = function (options) {
    return new fabric.ShapeCircle({
      radius: 50,
      fill: 'transparent',
      ...options,
    });
  };

  const shapeCircle = fabric.ShapeCircle.generate({
    stroke: 'red',
    strokeWidth: 5
  });
  canvas.add(shapeCircle);
}

circleShape(); // Create a circle shape and add it to the canvas
