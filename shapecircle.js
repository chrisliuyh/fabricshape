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
  controls: {
    mr: new fabric.Control({
      //右中控制点
      x: 0.5,
      y: 0,
      actionHandler: function (eventData, transform, x, y) {
        const tobj = transform.target;
        const angle = fabric.util.degreesToRadians(tobj.angle);
        const cosAngle = Math.cos(angle);
        const sinAngle = Math.sin(angle);
        const rotatedMovementX =
          eventData.movementX * cosAngle + eventData.movementY * sinAngle;

        // 更新图像大小
        tobj
          .set({
            width: tobj.width + rotatedMovementX,
          })
          .setCoords();
          canvas.requestRenderAll();
        return true;
      },
    }),
    br: new fabric.Control({
      // 右下控制点
      x: 0.5,
      y: 0.5,
      actionHandler: function (eventData, transform, x, y) {
        const tobj = canvas.getActiveObject();
        const angle = fabric.util.degreesToRadians(tobj.angle); // 将角度转换为弧度

        const cosAngle = Math.cos(angle);
        const sinAngle = Math.sin(angle);

        // 计算旋转后的拖拽向量
        const rotatedMovementX =
          eventData.movementX * cosAngle + eventData.movementY * sinAngle;
        const rotatedMovementY =
          eventData.movementY * cosAngle - eventData.movementX * sinAngle;

        // 更新图像大小
        tobj
          .set({
            width: tobj.width + rotatedMovementX,
            height: tobj.height + rotatedMovementY,
          })
          .setCoords();
        return true;
      },
    }),
    ml: new fabric.Control({
      // 左中控制点
      x: -0.5,
      y: 0,
      actionHandler: function (eventData, transform, x, y) {
        const tobj = canvas.getActiveObject();
        const angle = fabric.util.degreesToRadians(tobj.angle); // 将角度转换为弧度

        const cosAngle = Math.cos(angle);
        const sinAngle = Math.sin(angle);

        // 计算旋转后的拖拽向量
        const rotatedMovementX =
          eventData.movementX * cosAngle + eventData.movementY * sinAngle;

        // 更新图像大小
        tobj
          .set({
            width: tobj.width - rotatedMovementX,
            left: tobj.left + rotatedMovementX * cosAngle,
            top: tobj.top + rotatedMovementX * sinAngle,
          })
          .setCoords();
        return true;
      },
    }),
    bl: new fabric.Control({
      // 左下控制点
      x: -0.5,
      y: 0.5,
      actionHandler: function (eventData, transform, x, y) {
        const tobj = canvas.getActiveObject();
        const angle = fabric.util.degreesToRadians(tobj.angle); // 将角度转换为弧度

        const cosAngle = Math.cos(angle);
        const sinAngle = Math.sin(angle);

        // 计算旋转后的拖拽向量
        const rotatedMovementX =
          eventData.movementX * cosAngle + eventData.movementY * sinAngle;
        const rotatedMovementY =
          eventData.movementY * cosAngle - eventData.movementX * sinAngle;
        //更新图像大小
        tobj
          .set({
            width: tobj.width - rotatedMovementX,
            height: tobj.height + rotatedMovementY,
            left: tobj.left + rotatedMovementX * cosAngle,
            top: tobj.top + rotatedMovementX * sinAngle,
          })
          .setCoords();

        return true;
      },
    }),
    tl: new fabric.Control({
      // 左上控制点
      x: -0.5,
      y: -0.5,
      actionHandler: function (eventData, transform, x, y) {
        const tobj = canvas.getActiveObject();
        const angle = fabric.util.degreesToRadians(tobj.angle); // 将角度转换为弧度

        const cosAngle = Math.cos(angle);
        const sinAngle = Math.sin(angle);

        // 计算旋转后的拖拽向量
        const rotatedMovementX =
          eventData.movementX * cosAngle + eventData.movementY * sinAngle;
        const rotatedMovementY =
          -eventData.movementX * sinAngle + eventData.movementY * cosAngle;
        //更新图像大小
        tobj
          .set({
            width: tobj.width - rotatedMovementX,
            height: tobj.height - rotatedMovementY,
            left:
              tobj.left +
              rotatedMovementX * cosAngle -
              rotatedMovementY * sinAngle,
            top:
              tobj.top +
              rotatedMovementX * sinAngle +
              rotatedMovementY * cosAngle,
          })
          .setCoords();

        return true;
      },
    }),
    tr: new fabric.Control({
      // 右上控制点
      x: 0.5,
      y: -0.5,
      actionHandler: function (eventData, transform, x, y) {
        const tobj = canvas.getActiveObject();
        const angle = fabric.util.degreesToRadians(tobj.angle); // 将角度转换为弧度

        const cosAngle = Math.cos(angle);
        const sinAngle = Math.sin(angle);

        // 计算旋转后的拖拽向量
        const rotatedMovementX =
          eventData.movementX * cosAngle + eventData.movementY * sinAngle;
        const rotatedMovementY =
          eventData.movementY * cosAngle - eventData.movementX * sinAngle;
        //更新图像大小
        tobj
          .set({
            width: tobj.width + rotatedMovementX,
            height: tobj.height - rotatedMovementY,
            left: tobj.left - rotatedMovementY * sinAngle,
            top: tobj.top + rotatedMovementY * cosAngle,
          })
          .setCoords();

        return true;
      },
    }),
    mt: new fabric.Control({
      // 上中控制点
      x: 0,
      y: -0.5,
      actionHandler: function (eventData, transform, x, y) {
        const tobj = transform.target;
        const rotatedMovementY = eventData.movementY;

        tobj
          .set({
            radius: tobj.radius - rotatedMovementY,
            objectCaching: false,
          })
          .setCoords();
        return true;
      },
    }),
    mb: new fabric.Control({
      // 下中控制点
      x: 0,
      y: 0.5,
      actionHandler: function (eventData, transform, x, y) {
        const tobj = transform.target;
        const rotatedMovementY = eventData.movementY;

        tobj
          .set({
            radius: tobj.radius + rotatedMovementY,
          })
          .setCoords();
        return true;
      },
    }),
    mtr: new fabric.Control({
      // 旋转点
      x: 0,
      y: -0.5,
      offsetY: -40,
      withConnection: true,
      actionName: "rotate",
      actionHandler: fabric.controlsUtils.rotationWithSnapping,
    }),
  },
});

fabric.ShapeCircle.fromObject = function (object, callback) {
  callback && callback(new fabric.ShapeCircle(object));
};

const sr = new fabric.ShapeCircle({
  left: 100,
  top: 100,
  width: 100,
  height: 100,
  strokeWidth: 5,
  radius:50,
  stroke: "#000",
  rx: 10, // border radius
});

// 创建线性渐变
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

// 应用渐变到形状的内部填充
sr.set("fill", gradient);
window.canvas = canvas;
// canvas.add(sr);

const o = sr.toDatalessObject();

fabric.util.enlivenObjects(
  [o],
  (objs) => {
    console.log(objs[0]);
    canvas.add(objs[0]);
  },
  ""
);
