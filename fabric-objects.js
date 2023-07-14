import { fabric } from 'fabric';

const canvas = new fabric.Canvas("app");

const sr = new fabric.ShapeRect({
  left: 100,
  top: 100,
  width: 100,
  height: 100,
  strokeWidth: 5,
  stroke: "#000",
  rx: 10, // border radius
});

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

sr.set("fill", gradient);
canvas.add(sr);

const o = sr.toDatalessObject();

fabric.util.enlivenObjects([o], (objs) => {
  console.log(objs[0]);
  canvas.add(objs[0]);
}, "");


