import { fabric } from 'fabric';


window.cvs = canvas
fabric.ShapeRect = fabric.util.createClass(fabric.Rect, {
  type: "ShapeRect",
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
        const cvs = tobj.canvas.getElement()
        const showW = parseFloat(cvs.style.width)
        const realW = cvs.width
        const ratioW = realW / showW
        const showH = parseFloat(cvs.style.height)
        const realH = cvs.height
        const ratioH = realH / showH
        const mX = ratioW * eventData.movementX
        const mY = ratioH * eventData.movementY

        const rotatedMovementX =
          mX * cosAngle + mY * sinAngle;
        if (tobj.width + rotatedMovementX >= 0) {
          // 更新图像大小
          tobj
            .set({
              width: tobj.width + rotatedMovementX,
              objectCaching: false,
            })
            .setCoords();
        }

        return true;
      },
    }),
    ml: new fabric.Control({
      // 左中控制点
      x: -0.5,
      y: 0,
      actionHandler: function (eventData, transform, x, y) {
        const tobj = transform.target;
        const angle = fabric.util.degreesToRadians(tobj.angle); // 将角度转换为弧度

        const cosAngle = Math.cos(angle);
        const sinAngle = Math.sin(angle);
        const cvs = tobj.canvas.getElement()
        const showW = parseFloat(cvs.style.width)
        const realW = cvs.width
        const ratioW = realW / showW
        const showH = parseFloat(cvs.style.height)
        const realH = cvs.height
        const ratioH = realH / showH
        const mX = ratioW * eventData.movementX
        const mY = ratioH * eventData.movementY

        // 计算旋转后的拖拽向量
        const rotatedMovementX =
          mX * cosAngle + mY * sinAngle;
        if (tobj.width - rotatedMovementX >= 0) {
          // 更新图像大小
          tobj
            .set({
              width: tobj.width - rotatedMovementX,
              left: tobj.left + rotatedMovementX * cosAngle,
              top: tobj.top + rotatedMovementX * sinAngle,
              objectCaching: false,
            })
            .setCoords();
        }
        return true;
      },
    }),
    mt: new fabric.Control({
      // 上中控制点
      x: 0,
      y: -0.5,
      actionHandler: function (eventData, transform, x, y) {
        const tobj = transform.target;
        const angle = fabric.util.degreesToRadians(tobj.angle); // 将角度转换为弧度

        const cosAngle = Math.cos(angle);
        const sinAngle = Math.sin(angle);
        const cvs = tobj.canvas.getElement()
        const showW = parseFloat(cvs.style.width)
        const realW = cvs.width
        const ratioW = realW / showW
        const showH = parseFloat(cvs.style.height)
        const realH = cvs.height
        const ratioH = realH / showH
        const mX = ratioW * eventData.movementX
        const mY = ratioH * eventData.movementY

        // 计算旋转后的拖拽向量
        const rotatedMovementY =
          mY * cosAngle - mX * sinAngle;
        if (tobj.height - rotatedMovementY >= 0) {
          //更新图像大小
          tobj
            .set({
              height: tobj.height - rotatedMovementY,
              left: tobj.left - rotatedMovementY * sinAngle,
              top: tobj.top + rotatedMovementY * cosAngle,
              objectCaching: false,
            })
            .setCoords();
        }
        return true;
      },
    }),
    mb: new fabric.Control({
      // 下中控制点
      x: 0,
      y: 0.5,
      actionHandler: function (eventData, transform, x, y) {
        const tobj = transform.target;
        const angle = fabric.util.degreesToRadians(tobj.angle); // 将角度转换为弧度

        const cosAngle = Math.cos(angle);
        const sinAngle = Math.sin(angle);
        const cvs = tobj.canvas.getElement()
        const showW = parseFloat(cvs.style.width)
        const realW = cvs.width
        const ratioW = realW / showW
        const showH = parseFloat(cvs.style.height)
        const realH = cvs.height
        const ratioH = realH / showH
        const mX = ratioW * eventData.movementX
        const mY = ratioH * eventData.movementY

        // 计算旋转后的拖拽向量
        const rotatedMovementY =
          mY * cosAngle - mX * sinAngle;
        if (tobj.height + rotatedMovementY >= 0) {
          //更新图像大小
          tobj
            .set({
              height: tobj.height + rotatedMovementY,
              objectCaching: false,
            })
            .setCoords();
        }
        return true;
      },
    }),
    br: new fabric.Control({
      // 右下控制点
      x: 0.5,
      y: 0.5,
      actionHandler: function (eventData, transform, x, y) {
        const tobj = transform.target;
        const angle = fabric.util.degreesToRadians(tobj.angle); // 将角度转换为弧度

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

        // 计算旋转后的拖拽向量
        const rotatedMovementX = mX * cosAngle + mY * sinAngle;
        const rotatedMovementY = mY * cosAngle - mX * sinAngle;

        // 根据宽高的变化调整 width 和 height 的值
        const aspectRatio = tobj.width / tobj.height;
        let newWidth, newHeight;

        if (Math.abs(rotatedMovementY) > Math.abs(rotatedMovementX)) {
          newHeight = tobj.height + rotatedMovementY;
          newWidth = newHeight * aspectRatio;
        } else {
          newWidth = tobj.width + rotatedMovementX;
          newHeight = newWidth / aspectRatio;
        }
        if (tobj.height + rotatedMovementY >= 1 && tobj.width + rotatedMovementX >= 1) {
          // 更新图像大小
          tobj
            .set({
              width: newWidth,
              height: newHeight,
              objectCaching: false,
            })
            .setCoords();
        }

        return true;
      },
    }),
    bl: new fabric.Control({
      //左下
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

        const aspectRatio = tobj.width / tobj.height;
        const aspectAdjustedMovementX = rotatedMovementX * Math.abs(cosAngle);
        const aspectAdjustedMovementY = rotatedMovementY * Math.abs(sinAngle);

        let newWidth, newHeight;

        if (Math.abs(aspectAdjustedMovementY) > Math.abs(aspectAdjustedMovementX)) {
          newHeight = tobj.height + aspectAdjustedMovementY;
          newWidth = newHeight * aspectRatio;
        } else {
          newWidth = tobj.width - aspectAdjustedMovementX;
          newHeight = newWidth / aspectRatio;
        }

        const offsetX = newWidth - tobj.width;
        const offsetY = newHeight - tobj.height;

        const updatedLeft = tobj.left - offsetX * cosAngle;
        const updatedTop = tobj.top - offsetX * sinAngle;

        if (
          tobj.height + aspectAdjustedMovementY >= 1 &&
          tobj.width - aspectAdjustedMovementX >= 1
        ) {
          tobj
            .set({
              width: newWidth,
              height: newHeight,
              left: updatedLeft,
              top: updatedTop,
              objectCaching: false
            })
            .setCoords();
        }

        return true;
      }
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

        // 计算旋转后的拖拽向量
        const rotatedMovementX = mX * cosAngle + mY * sinAngle;
        const rotatedMovementY = -mX * sinAngle + mY * cosAngle;

        const aspectRatio = tobj.width / tobj.height;
        const aspectAdjustedMovementX = rotatedMovementX * Math.abs(cosAngle);
        const aspectAdjustedMovementY = rotatedMovementY * Math.abs(sinAngle);

        let newWidth, newHeight;

        if (Math.abs(aspectAdjustedMovementY) > Math.abs(aspectAdjustedMovementX)) {
          newHeight = tobj.height - aspectAdjustedMovementY;
          newWidth = newHeight * aspectRatio;
        } else {
          newWidth = tobj.width - aspectAdjustedMovementX;
          newHeight = newWidth / aspectRatio;
        }

        const offsetX = newWidth - tobj.width;
        const offsetY = newHeight - tobj.height;

        const updatedLeft = tobj.left - offsetX * cosAngle;
        const updatedTop = tobj.top - offsetY * cosAngle;

        if (newHeight >= 1 && newWidth >= 1) {
          // 更新图像大小和位置
          tobj
            .set({
              width: newWidth,
              height: newHeight,
              left: updatedLeft,
              top: updatedTop,
              objectCaching: false,
            })
            .setCoords();
        }

        return true;
      },
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

        // 计算旋转后的拖拽向量
        const rotatedMovementX = mX * cosAngle + mY * sinAngle;
        const rotatedMovementY = -mX * sinAngle + mY * cosAngle;

        const aspectRatio = tobj.width / tobj.height;
        const aspectAdjustedMovementX = rotatedMovementX * Math.abs(cosAngle);
        const aspectAdjustedMovementY = rotatedMovementY * Math.abs(sinAngle);

        let newWidth, newHeight;

        if (Math.abs(aspectAdjustedMovementY) > Math.abs(aspectAdjustedMovementX)) {
          newHeight = tobj.height - aspectAdjustedMovementY;
          newWidth = newHeight * aspectRatio;
        } else {
          newWidth = tobj.width + aspectAdjustedMovementX;
          newHeight = newWidth / aspectRatio;
        }

        const offsetX = newWidth - tobj.width;
        const offsetY = newHeight - tobj.height;

        const updatedLeft = tobj.left + offsetX * sinAngle;
        const updatedTop = tobj.top - offsetY * cosAngle;

        if (newHeight >= 1 && newWidth >= 1) {
          // 更新图像大小和位置
          tobj
            .set({
              width: newWidth,
              height: newHeight,
              left: updatedLeft,
              top: updatedTop,
              objectCaching: false,
            })
            .setCoords();
        }

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
fabric.ShapeRect.fromObject = function (object, callback) {
  callback && callback(new fabric.ShapeRect(object));
};



fabric.ShapeRect.generate = function (options) {
  return new fabric.ShapeRect({
    left: 100,
    top: 100,
    width: 100,
    height: 100,
    strokeWidth: 5,
    stroke: "white",
    rx: 10,
    ...options
  });
};

var canvas = new fabric.Canvas("app");
const Rect = fabric.ShapeRect.generate({
  left: 100,
  top: 100,
  width: 100,
  height: 100,
  strokeWidth: 5,
  stroke: "gray",
  rx: 10,
});
canvas.add(Rect);

// const sr = new fabric.ShapeRect({
//   left: 100,
//   top: 100,
//   width: 100,
//   height: 100,
//   strokeWidth: 5,
//   stroke: "#000",
//   rx: 10, // border radius
// });
// sr.set("fill", gradient);
// canvas.add(sr);

// const o = sr.toDatalessObject();

// fabric.util.enlivenObjects([o], (objs) => {
//   console.log(objs[0]);
//   canvas.add(objs[0]);
// }, "");
