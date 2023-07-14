import { fabric } from "fabric";

const canvas = new fabric.Canvas("app");

fabric.ShapeEllipse = fabric.util.createClass(fabric.Ellipse, {
  type: "ShapeEllipse",
  initialize: function (points, options) {
    options || (options = {});
    this.callSuper("initialize", points, options);
  },
  toObject: function () {
    return fabric.util.object.extend(this.callSuper("toObject"), {
      name: this.get("name"),
    });
  },
  controls: {
    mr: new fabric.Control({
      // 右中控制点
      x: 0.5,
      y: 0,
      actionHandler: function (eventData, transform, x, y) {
        const tobj = transform.target;
        const angle = fabric.util.degreesToRadians(tobj.angle);
        const cosAngle = Math.cos(angle);
        const sinAngle = Math.sin(angle);
        const cvs = tobj.canvas.getElement();
        const showW = parseFloat(cvs.style.width);
        const realW = cvs.width;
        const ratioW = realW / showW;
        const showH = parseFloat(cvs.style.height);
        const realH = cvs.height;
        const ratioH = realH / showH;
        const mX = ratioW * eventData.movementX;
        const mY = ratioH * eventData.movementY;

        const rotatedMovementX = mX * cosAngle + mY * sinAngle;

        tobj
          .set({
            rx: tobj.rx + rotatedMovementX,
            objectCaching: false,
          })
          .setCoords();
        return true;
      },
      cursorStyleHandler: fabric.controlsUtils.rotationStyleHandler,
    }),

    ml: new fabric.Control({
      // 左中控制点
      x: -0.5,
      y: 0,
      actionHandler: function (eventData, transform, x, y) {
        const tobj = transform.target;
        const angle = fabric.util.degreesToRadians(tobj.angle);
        const cosAngle = Math.cos(angle);
        const sinAngle = Math.sin(angle);
        const cvs = tobj.canvas.getElement();
        const showW = parseFloat(cvs.style.width);
        const realW = cvs.width;
        const ratioW = realW / showW;
        const showH = parseFloat(cvs.style.height);
        const realH = cvs.height;
        const ratioH = realH / showH;
        const mX = ratioW * eventData.movementX;
        const mY = ratioH * eventData.movementY;

        const rotatedMovementX = mX * cosAngle + mY * sinAngle;

        tobj
          .set({
            rx: tobj.rx - rotatedMovementX,
            left: tobj.left + rotatedMovementX * cosAngle,
            top: tobj.top + rotatedMovementX * sinAngle,
            objectCaching: false,
          })
          .setCoords();
        return true;
      },
      cursorStyleHandler: fabric.controlsUtils.rotationStyleHandler,
    }),

    mt: new fabric.Control({
      // 上中控制点
      x: 0,
      y: -0.5,
      actionHandler: function (eventData, transform, x, y) {
        const tobj = transform.target;
        const angle = fabric.util.degreesToRadians(tobj.angle);
        const cosAngle = Math.cos(angle);
        const sinAngle = Math.sin(angle);
        const cvs = tobj.canvas.getElement();
        const showW = parseFloat(cvs.style.width);
        const realW = cvs.width;
        const ratioW = realW / showW;
        const showH = parseFloat(cvs.style.height);
        const realH = cvs.height;
        const ratioH = realH / showH;
        const mX = ratioW * eventData.movementX;
        const mY = ratioH * eventData.movementY;

        const rotatedMovementY = mY * cosAngle - mX * sinAngle;

        tobj
          .set({
            ry: tobj.ry - rotatedMovementY,
            top: tobj.top + rotatedMovementY * cosAngle,
            left: tobj.left - rotatedMovementY * sinAngle,
            objectCaching: false,
          })
          .setCoords();
        return true;
      },
      cursorStyleHandler: fabric.controlsUtils.rotationStyleHandler,
    }),

    mb: new fabric.Control({
      // 下中控制点
      x: 0,
      y: 0.5,
      actionHandler: function (eventData, transform, x, y) {
        const tobj = transform.target;
        const angle = fabric.util.degreesToRadians(tobj.angle);
        const cosAngle = Math.cos(angle);
        const sinAngle = Math.sin(angle);
        const cvs = tobj.canvas.getElement();
        const showW = parseFloat(cvs.style.width);
        const realW = cvs.width;
        const ratioW = realW / showW;
        const showH = parseFloat(cvs.style.height);
        const realH = cvs.height;
        const ratioH = realH / showH;
        const mX = ratioW * eventData.movementX;
        const mY = ratioH * eventData.movementY;

        const rotatedMovementY = mY * cosAngle - mX * sinAngle;

        tobj
          .set({
            ry: tobj.ry + rotatedMovementY,
            objectCaching: false,
          })
          .setCoords();
        return true;
      },
      cursorStyleHandler: fabric.controlsUtils.rotationStyleHandler,
    }),

    tl: new fabric.Control({
      // 左上控制点
      x: -0.5,
      y: -0.5,
      actionHandler: function (eventData, transform, x, y) {
        const tobj = transform.target;
        const angle = fabric.util.degreesToRadians(tobj.angle);
        const cosAngle = Math.cos(angle);
        const sinAngle = Math.sin(angle);
        const cvs = tobj.canvas.getElement();
        const showW = parseFloat(cvs.style.width);
        const realW = cvs.width;
        const ratioW = realW / showW;
        const showH = parseFloat(cvs.style.height);
        const realH = cvs.height;
        const ratioH = realH / showH;
        const mX = ratioW * eventData.movementX;
        const mY = ratioH * eventData.movementY;

        const rotatedMovementX = mX * cosAngle + mY * sinAngle;
        const rotatedMovementY = mY * cosAngle - mX * sinAngle;

        tobj
          .set({
            rx: tobj.rx - rotatedMovementX,
            ry: tobj.ry - rotatedMovementY,
            left: tobj.left + rotatedMovementX * cosAngle,
            top: tobj.top + rotatedMovementY * sinAngle,
            objectCaching: false,
          })
          .setCoords();
        return true;
      },
      cursorStyleHandler: fabric.controlsUtils.rotationStyleHandler,
    }),

    tr: new fabric.Control({
      // 右上控制点
      x: 0.5,
      y: -0.5,
      actionHandler: function (eventData, transform, x, y) {
        const tobj = transform.target;
        const angle = fabric.util.degreesToRadians(tobj.angle);
        const cosAngle = Math.cos(angle);
        const sinAngle = Math.sin(angle);
        const cvs = tobj.canvas.getElement();
        const showW = parseFloat(cvs.style.width);
        const realW = cvs.width;
        const ratioW = realW / showW;
        const showH = parseFloat(cvs.style.height);
        const realH = cvs.height;
        const ratioH = realH / showH;
        const mX = ratioW * eventData.movementX;
        const mY = ratioH * eventData.movementY;

        const rotatedMovementX = mX * cosAngle + mY * sinAngle;
        const rotatedMovementY = mY * cosAngle - mX * sinAngle;

        tobj
          .set({
            rx: tobj.rx + rotatedMovementX,
            ry: tobj.ry - rotatedMovementY,
            objectCaching: false,
          })
          .setCoords();
        return true;
      },
      cursorStyleHandler: fabric.controlsUtils.rotationStyleHandler,
    }),

    bl: new fabric.Control({
      // 左下控制点
      x: -0.5,
      y: 0.5,
      actionHandler: function (eventData, transform, x, y) {
        const tobj = transform.target;
        const angle = fabric.util.degreesToRadians(tobj.angle);
        const cosAngle = Math.cos(angle);
        const sinAngle = Math.sin(angle);
        const cvs = tobj.canvas.getElement();
        const showW = parseFloat(cvs.style.width);
        const realW = cvs.width;
        const ratioW = realW / showW;
        const showH = parseFloat(cvs.style.height);
        const realH = cvs.height;
        const ratioH = realH / showH;
        const mX = ratioW * eventData.movementX;
        const mY = ratioH * eventData.movementY;

        const rotatedMovementX = mX * cosAngle + mY * sinAngle;
        const rotatedMovementY = mY * cosAngle - mX * sinAngle;

        tobj
          .set({
            rx: tobj.rx - rotatedMovementX,
            ry: tobj.ry + rotatedMovementY,
            left: tobj.left + rotatedMovementX * cosAngle,
            objectCaching: false,
          })
          .setCoords();
        return true;
      },
      cursorStyleHandler: fabric.controlsUtils.rotationStyleHandler,
    }),

    br: new fabric.Control({
      // 右下控制点
      x: 0.5,
      y: 0.5,
      actionHandler: function (eventData, transform, x, y) {
        const tobj = transform.target;
        const angle = fabric.util.degreesToRadians(tobj.angle);
        const cosAngle = Math.cos(angle);
        const sinAngle = Math.sin(angle);
        const cvs = tobj.canvas.getElement();
        const showW = parseFloat(cvs.style.width);
        const realW = cvs.width;
        const ratioW = realW / showW;
        const showH = parseFloat(cvs.style.height);
        const realH = cvs.height;
        const ratioH = realH / showH;
        const mX = ratioW * eventData.movementX;
        const mY = ratioH * eventData.movementY;

        const rotatedMovementX = mX * cosAngle + mY * sinAngle;
        const rotatedMovementY = mY * cosAngle - mX * sinAngle;

        tobj
          .set({
            rx: tobj.rx + rotatedMovementX,
            ry: tobj.ry + rotatedMovementY,
            objectCaching: false,
          })
          .setCoords();
        return true;
      },
      cursorStyleHandler: fabric.controlsUtils.rotationStyleHandler,
    }),
  },
});

fabric.ShapeEllipse.fromObject = function (object, callback) {
  return fabric.Object._fromObject("ShapeEllipse", object, callback);
};

const ellipse = new fabric.ShapeEllipse({
  name: "Ellipse",
  left: 100,
  top: 100,
  fill: "red",
  rx: 50,
  ry: 30,
  angle: 0,
  selectable: true,
  hasControls: true,
  hasBorders: true,
  lockRotation: true,
  lockScalingX: false,
  lockScalingY: false,
  objectCaching: false,
});

canvas.add(ellipse);
canvas.setActiveObject(ellipse);
canvas.renderAll();
