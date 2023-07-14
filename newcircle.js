import { fabric } from "fabric";

const canvas = new fabric.Canvas("app");

fabric.ShapeCircle = fabric.util.createClass(fabric.Circle, {
  type: "ShapeCircle",
  initialize: function (points, options) {
    options || (options = {});
    this.callSuper("initialize", points, options);
  },
  toObject: function () {
    return fabric.util.object.extend(this.callSuper("toObject"), {
      name: this.get("name"),
    });
  },
  _render: function (ctx) {
    this.callSuper("_render", ctx);
    const radius = this.width / 2;
    ctx.font = "12px Arial";
    ctx.fillStyle = "#000";
    ctx.fillText(`Width: ${radius * 2}`, -radius, radius + 15);
    ctx.fillText(`Height: ${radius * 2}`, -radius, radius + 30);
  },
  _dimensionAffectingProps:
    fabric.Circle.prototype._dimensionAffectingProps
      ? fabric.Circle.prototype._dimensionAffectingProps.concat("width")
      : ["width"],
  _set: function (key, value) {
    this.callSuper("_set", key, value);
    if (key === "radius") {
      this.set("width", value * 2);
      this.set("height", value * 2);
    }
  },
});

fabric.ShapeCircle.fromObject = function (object, callback) {
  callback && callback(new fabric.ShapeCircle(object));
};

const sr = new fabric.ShapeCircle({
  left: 100,
  top: 100,
  radius: 50,
  strokeWidth: 5,
  stroke: "#000",
});

// Create linear gradient
const gradient = new fabric.Gradient({
  type: "linear",
  coords: {
    x1: 0,
    y1: 0,
    x2: sr.width,
    y2: sr.height,
  },
  colorStops: [
    { offset: 0, color: "white" },
    { offset: 1, color: "gray" },
  ],
});

// Apply gradient to the shape's fill
sr.set("fill", gradient);

canvas.add(sr);

const o = sr.toDatalessObject();

fabric.util.enlivenObjects(
  [o],
  (objs) => {
    console.log(objs[0]);
    canvas.add(objs[0]);
  },
  ""
);
