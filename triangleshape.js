import { fabric } from 'fabric';

const canvas = new fabric.Canvas("app");

function triangleShape() {
  fabric.ShapeTriangle = fabric.util.createClass(fabric.Triangle, {
    type: "ShapeTriangle",
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

  fabric.ShapeTriangle.fromObject = function (object, callback) {
    callback && callback(new fabric.ShapeTriangle(object));
  };

  fabric.ShapeTriangle.generate = function (options) {
    return new fabric.ShapeTriangle({
      width: 100,
      height: 100,
      fill: 'transparent',
      ...options,
    });
  };

  const shapeTriangle = fabric.ShapeTriangle.generate({
    stroke: 'blue',
    strokeWidth: 5,
    rx:20,
  });
  canvas.add(shapeTriangle);
}

triangleShape();
