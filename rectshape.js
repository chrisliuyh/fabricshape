import { fabric } from 'fabric';

const canvas = new fabric.Canvas("app");
function rectShape() {
  fabric.ShapeRect = fabric.util.createClass(fabric.Rect, {
    type: "ShapeRect",
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
          // 更新图像大小
        tobj
          .set({
            width: tobj.width + rotatedMovementX,
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
        const tobj = transform.target
        const angle = fabric.util.degreesToRadians(tobj.angle) // 将角度转换为弧度

        const cosAngle = Math.cos(angle)
        const sinAngle = Math.sin(angle)
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
          mX * cosAngle + mY * sinAngle
        const rotatedMovementY =
          mY * cosAngle - mX * sinAngle

        // 更新图像大小
        tobj
          .set({
            width: tobj.width + rotatedMovementX,
            height: tobj.height + rotatedMovementY,
            objectCaching: false
          })
          .setCoords()
        return true
      }
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

        // 更新图像大小
        tobj
          .set({
            width: tobj.width - rotatedMovementX,
            left: tobj.left + rotatedMovementX * cosAngle,
            top: tobj.top + rotatedMovementX * sinAngle,
            objectCaching: false,
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
        const rotatedMovementY =
          mY * cosAngle - mX * sinAngle;
        //更新图像大小
        tobj
          .set({
            width: tobj.width - rotatedMovementX,
            height: tobj.height + rotatedMovementY,
            left: tobj.left + rotatedMovementX * cosAngle,
            top: tobj.top + rotatedMovementX * sinAngle,
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
        const rotatedMovementY =
          -mX * sinAngle + mY * cosAngle;
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
        const rotatedMovementY =
          mY * cosAngle - mX * sinAngle;
        //更新图像大小
        tobj
          .set({
            width: tobj.width + rotatedMovementX,
            height: tobj.height - rotatedMovementY,
            left: tobj.left - rotatedMovementY * sinAngle,
            top: tobj.top + rotatedMovementY * cosAngle,
            objectCaching: false,
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
            height: tobj.height - rotatedMovementY,
            left: tobj.left - rotatedMovementY * sinAngle,
            top: tobj.top + rotatedMovementY * cosAngle,
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
            height: tobj.height + rotatedMovementY,
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

  fabric.ShapeRect.fromObject = function (object, callback) {
    callback && callback(new fabric.ShapeRect(object));
  };

  fabric.ShapeRect.generate = function (options) {
    const obj = new fabric.ShapeRect({
      width: 100,
      height: 100,
      fill: 'transparent', // 设置填充为透明
      ...options,
    });
    console.log(obj)
    return obj;
  };

  const shapeRect = fabric.ShapeRect.generate({
    stroke: 'red',
    strokeWidth: 5
  }); // 创建 ShapeRect 对象实例
  canvas.add(shapeRect); // 将对象添加到画布上
}

rectShape(); // 调用 rectShape 函数来执行相关操作
