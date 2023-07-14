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
    // ml: new fabric.Control({
    //   // 左中控制点
    //   x: -0.5,
    //   y: 0,
    //   actionHandler: function (eventData, transform, x, y) {
    //     const tobj = transform.target;
    //     const angle = fabric.util.degreesToRadians(tobj.angle);
    //     const cosAngle = Math.cos(angle);
    //     const sinAngle = Math.sin(angle);
    //     const cvs = tobj.canvas.getElement();
    //     const showW = parseFloat(cvs.style.width);
    //     const realW = cvs.width;
    //     const ratioW = realW / showW;
    //     const showH = parseFloat(cvs.style.height);
    //     const realH = cvs.height;
    //     const ratioH = realH / showH;
    //     const mX = ratioW * eventData.movementX;
    //     const mY = ratioH * eventData.movementY;
    
    //     const rotatedMovementX = mX * cosAngle + mY * sinAngle;
    
    //     tobj
    //       .set({
    //         left: tobj.left + rotatedMovementX,
    //         width: tobj.width - rotatedMovementX,
    //         rx: tobj.rx - rotatedMovementX,
    //         objectCaching: false,
    //       })
    //       .setCoords();
    
    //     return true;
    //   },
    // }),
    



    // mt: new fabric.Control({
    //   // 上中控制点
    //   x: 0,
    //   y: -0.5,
    //   actionHandler: function (eventData, transform, x, y) {
    //     const tobj = transform.target;
    //     const angle = fabric.util.degreesToRadians(tobj.angle);
    //     const cosAngle = Math.cos(angle);
    //     const sinAngle = Math.sin(angle);
    //     const cvs = tobj.canvas.getElement();
    //     const showW = parseFloat(cvs.style.width);
    //     const realW = cvs.width;
    //     const ratioW = realW / showW;
    //     const showH = parseFloat(cvs.style.height);
    //     const realH = cvs.height;
    //     const ratioH = realH / showH;
    //     const mX = ratioW * eventData.movementX;
    //     const mY = ratioH * eventData.movementY;
    
    //     const rotatedMovementX = mX * cosAngle + mY * sinAngle;
    //     const rotatedMovementY = mY * cosAngle - mX * sinAngle;
    
    //     tobj
    //       .set({
    //         top: tobj.top - rotatedMovementY,
    //         height: tobj.height - rotatedMovementY,
    //         ry: tobj.ry + rotatedMovementY,
    //         objectCaching: false,
    //       })
    //       .setCoords();
    
    //     return true;
    //   },
    // }),
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
    
        const rotatedMovementY =
          mY * cosAngle - mX * sinAngle;
    
        // 更新图像大小
        tobj
          .set({
            ry: tobj.ry - rotatedMovementY,
            objectCaching: false,
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
    
        const rotatedMovementX =
          -mX * cosAngle - mY * sinAngle;
    
        // 更新图像大小
        tobj
          .set({
            rx: tobj.rx - rotatedMovementX,
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
        //更新图像大小
        tobj
          .set({
            ry: tobj.ry + rotatedMovementY,
            objectCaching: false,
          })
          .setCoords();

        return true;
      },
    }),

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

        // 更新图像大小
        tobj
          .set({
            rx: tobj.rx + rotatedMovementX,
            objectCaching: false,
          })
          .setCoords();
        return true;
      },
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
    
        // 计算旋转后的拖拽向量
        const rotatedMovementX = mX * cosAngle + mY * sinAngle;
        const rotatedMovementY = mY * cosAngle - mX * sinAngle;
    
        // 根据宽高的变化调整 rx 和 ry 的值
        const aspectRatio = tobj.rx / tobj.ry;
        let newRx, newRy;
    
        if (Math.abs(rotatedMovementY) > Math.abs(rotatedMovementX)) {
          newRy = tobj.ry + rotatedMovementY;
          newRx = newRy * aspectRatio;
        } else { 
          newRx = tobj.rx + rotatedMovementX;
          newRy = newRx / aspectRatio;
        }
    
        // 更新图像的 rx 和 ry
        tobj
          .set({
            rx: newRx,
            ry: newRy,
            objectCaching: false,
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
            left: tobj.left + rotatedMovementX,
            top: tobj.top + rotatedMovementY,
            width: tobj.width - rotatedMovementX,
            height: tobj.height - rotatedMovementY,
            rx: tobj.rx - rotatedMovementX,
            ry: tobj.ry - rotatedMovementY,
            objectCaching: false,
          })
          .setCoords();
    
        return true;
      },
    }),

    // br: new fabric.Control({
    //   // 右下控制点
    //   x: 0.5,
    //   y: 0.5,
    //   actionHandler: function (eventData, transform, x, y) {
    //     const tobj = transform.target;
    //     const angle = fabric.util.degreesToRadians(tobj.angle);
    
    //     const cosAngle = Math.cos(angle);
    //     const sinAngle = Math.sin(angle);
    //     const cvs = tobj.canvas.getElement();
    //     const showW = parseFloat(cvs.style.width);
    //     const realW = cvs.width;
    //     const ratioW = realW / showW;
    //     const showH = parseFloat(cvs.style.height);
    //     const realH = cvs.height;
    //     const ratioH = realH / showH;
    //     const mX = ratioW * eventData.movementX;
    //     const mY = ratioH * eventData.movementY;
    
    //     // 计算旋转后的拖拽向量
    //     const rotatedMovementX = mX * cosAngle + mY * sinAngle;
    //     const rotatedMovementY = mY * cosAngle - mX * sinAngle;
    
    //     // 根据宽高的变化调整 rx 和 ry 的值
    //     const aspectRatio = tobj.rx / tobj.ry;
    //     let newRx, newRy;
    
    //     if (Math.abs(rotatedMovementY) > Math.abs(rotatedMovementX)) {
    //       newRy = tobj.ry + rotatedMovementY;
    //       newRx = newRy * aspectRatio;
    //     } else { 
    //       newRx = tobj.rx + rotatedMovementX;
    //       newRy = newRx / aspectRatio;
    //     }
    
    //     // 更新图像的 rx 和 ry
    //     tobj
    //       .set({
    //         rx: newRx,
    //         ry: newRy,
    //         objectCaching: false,
    //       })
    //       .setCoords();
    
    //     return true;
    //   },
    // }),
    


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
            left: tobj.left + rotatedMovementX,
            width: tobj.width - rotatedMovementX,
            height: tobj.height + rotatedMovementY,
            rx: tobj.rx - rotatedMovementX,
            ry: tobj.ry + rotatedMovementY,
            objectCaching: false,
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

        // 根据宽高的变化调整 rx 和 ry 的值
        const aspectRatio = tobj.rx / tobj.ry;
        let newRx, newRy;
    
        if (Math.abs(rotatedMovementY) > Math.abs(rotatedMovementX)) {
          newRy = tobj.ry - rotatedMovementY;
          newRx = newRy * aspectRatio;
        } else { 
          newRx = tobj.rx + rotatedMovementX;
          newRy = newRx / aspectRatio;
        }
    
        tobj
          .set({
            left: tobj.left - rotatedMovementY * sinAngle,
            top: tobj.top + rotatedMovementY * cosAngle,
            rx: newRx,
            ry: newRy,
            objectCaching: false,
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

fabric.ShapeEllipse.fromObject = function (object, callback) {
  callback && callback(new fabric.ShapeEllipse(object));
};

const sr = new fabric.ShapeEllipse({
  strokeWidth: 5,
  stroke: "#000",
  rx: 50, // 椭圆的水平半径
  ry: 50, // 椭圆的垂直半径
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
