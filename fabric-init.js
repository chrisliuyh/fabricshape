import { fabric } from "fabric";


function rectShape(){
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

}

function triangleShape(){
  fabric.ShapeTriangle = fabric.util.createClass(fabric.Triangle, {
    type: "ShapeTriangle",
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

      tl: new fabric.Control({
        // 左上控制点
        x: -0.5,
        y: -0.5,
        actionHandler: function (eventData, transform, x, y) {
          const tobj = transform.target;
          const angle = fabric.util.degreesToRadians(tobj.angle);

          const cosAngle = Math.cos(angle);
          const sinAngle = Math.sin(angle);
          const tanAngle = Math.tan(angle);
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

          // 根据高度那变化调整宽度
          const newHeight = tobj.height - rotatedMovementY;
          const aspectRatio = tobj.width / tobj.height;
          const newWidth = newHeight / aspectRatio;

          // 更新图像大小和位置
          tobj
            .set({
              width: newWidth,
              height: newHeight,
              // left: tobj.left + rotatedMovementY * cosAngle, 
              // top: tobj.top + rotatedMovementY * cosAngle,
              left: tobj.left + rotatedMovementY * cosAngle,
              top: tobj.top + rotatedMovementY * cosAngle,
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

          // 根据宽度变化调整高度
          const newWidth = tobj.width + rotatedMovementX;
          const aspectRatio = tobj.width / tobj.height;
          const newHeight = newWidth / aspectRatio;

          // 更新图像大小和位置
          tobj
            .set({
              width: newWidth,
              height: newHeight,
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

          // 根据宽度变化调整高度
          const newWidth = tobj.width - rotatedMovementX;
          const aspectRatio = tobj.width / tobj.height;
          const newHeight = newWidth / aspectRatio;

          // 更新图像大小和位置
          tobj
            .set({
              width: newWidth,
              height: newHeight,
              left: tobj.left + rotatedMovementX * cosAngle,
              top: tobj.top + rotatedMovementX * sinAngle,
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

          // 计算旋转后的拖拽向量
          const rotatedMovementX = mX * cosAngle + mY * sinAngle;
          const rotatedMovementY = mY * cosAngle - mX * sinAngle;

          // 根据高度变化调整宽度
          const newHeight = tobj.height - rotatedMovementY;
          const aspectRatio = tobj.width / tobj.height;
          const newWidth = newHeight * aspectRatio;

          // 更新图像大小和位置
          tobj
            .set({
              width: newWidth,
              height: newHeight,
              left: tobj.left - rotatedMovementY * sinAngle,
              top: tobj.top + rotatedMovementY * cosAngle,
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

  fabric.ShapeTriangle.fromObject = function (object, callback) {
    callback && callback(new fabric.ShapeTriangle(object));
  };
}

function lineShape(){
  fabric.ShapeLine = fabric.util.createClass(fabric.Path, {
    type: "ShapeLine",
    initialize: function (points, options) {
      options || (options = {});
      this.callSuper("initialize", points, options);
    },
    toObject: function () {
      return fabric.util.object.extend(this.callSuper("toObject"), {
        name: this.get("name"),
        path: this.path,
      });
    },
    controls: {
      ml: new fabric.Control({
        x: -0.5,
        y: 0,
        actionHandler: function (eventData, transform, x, y) {
          const curObj = transform.target;
  
          const angle = fabric.util.degreesToRadians(curObj.angle);
          const cosAngle = Math.cos(angle);
          const sinAngle = Math.sin(angle);
  
          const mX = eventData.movementX;
          const mY = eventData.movementY;
  
          const rotatedMovementX = mX * cosAngle - mY * sinAngle;
  
          curObj.path[1][1] -= rotatedMovementX;
          curObj.left += rotatedMovementX;
  
          curObj.dirty = true;
          curObj.width = curObj.path[1][1];
          curObj.pathOffset.x = curObj.width / 2;
  
          curObj.set({
            width: curObj.width,
            objectCaching: false,
          }).setCoords();
  
          return true;
        },
      }),
  
  
      mr: new fabric.Control({
        // 右中控制点
        x: 0.5,
        y: 0,
        actionHandler: function (eventData, transform, x, y) {
          const curObj = transform.target;
  
          const angle = fabric.util.degreesToRadians(curObj.angle);
          const cosAngle = Math.cos(angle);
          const sinAngle = Math.sin(angle);
          const cvs = curObj.canvas.getElement()
          const showW = parseFloat(cvs.style.width)
          const realW = cvs.width
          const ratioW = realW / showW
          const showH = parseFloat(cvs.style.height)
          const realH = cvs.height
          const ratioH = realH / showH
          const mX = ratioW * eventData.movementX
          const mY = ratioH * eventData.movementY
          const rotatedMovementX = mX * cosAngle + mY * sinAngle;
  
          const newWidth = curObj.path[1][1] + rotatedMovementX;
  
          if (newWidth >= 20) {
            curObj.path[1][1] = newWidth;
            curObj.dirty = true;
            curObj.width = curObj.path[1][1];
            curObj.pathOffset.x = curObj.width / 2;
  
            // 更新图像大小
            curObj.set({
              width: curObj.width,
              objectCaching: false,
            }).setCoords();
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
  
  fabric.ShapeLine.fromObject = function (object, callback) {
    callback && callback(new fabric.ShapeLine(object.path, object));
  };
}

function circleShape(){
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
              left: tobj.left + rotatedMovementX,
              width: tobj.width - rotatedMovementX,
              rx: tobj.rx - rotatedMovementX,
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
              top: tobj.top + rotatedMovementY,
              height: tobj.height - rotatedMovementY,
              ry: tobj.ry - rotatedMovementY,
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
}

function arrowShape(){
  fabric.ShapeArrow = fabric.util.createClass(fabric.Path, {
    type: "ShapeArrow",
    initialize: function (points, options) {
      options || (options = {});
      this.callSuper("initialize", points, options);
    },
    toObject: function () {
      return fabric.util.object.extend(this.callSuper("toObject"), {
        name: this.get("name"),
        path: this.path,
      });
    },
    controls: {
      mr: new fabric.Control({
        // 右中控制点
        x: 0.5,
        y: 0,
        actionHandler: function (eventData, transform, x, y) {
          const curObj = transform.target;

          var newWidth = curObj.path[1][1] + eventData.movementX;

          if (newWidth >= 25) {
            const angle = fabric.util.degreesToRadians(curObj.angle);
            const cosAngle = Math.cos(angle);
            const sinAngle = Math.sin(angle);
            const cvs = curObj.canvas.getElement()
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

            curObj.path[1][1] = newWidth + rotatedMovementX;
            curObj.path[3][1] = curObj.path[1][1] - 20;
            curObj.path[4][1] = curObj.path[1][1];
            curObj.path[5][1] = curObj.path[1][1] - 20;
            curObj.path[6][1] = curObj.path[1][1];
            curObj.dirty = true;
            curObj.width = curObj.path[1][1];
            curObj.pathOffset.x = curObj.width / 2;

            // 更新图像大小
            curObj.set({
              width: curObj.width,
              objectCaching: false,
            }).setCoords();
          }
          return true;
        },
      }),

      ml: new fabric.Control({
        // 左中控制点
        x: -0.5,
        y: 0,
        actionHandler: function (eventData, transform, x, y) {
          const curObj = transform.target;

          const newWidth = curObj.path[0][1] + eventData.movementX;
          // curObj.path[2][1] = newWidth;
          curObj.path[0][1] = newWidth;

          console.log(curObj.path[0][1])

          curObj.dirty = true;
          curObj.width = newWidth;
          curObj.pathOffset.x = curObj.width / 2;

          // 更新图像大小
          curObj.set({
            width: curObj.width,
            objectCaching: false,
          }).setCoords();

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

  fabric.ShapeArrow.fromObject = function (object, callback) {
    callback && callback(new fabric.ShapeArrow(object.path, object));
  };
}

export function initShape(){
  rectShape();
  triangleShape();
  lineShape();
  circleShape();
  arrowShape();
}

