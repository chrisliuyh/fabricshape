import { fabric } from 'fabric';

const canvas = new fabric.Canvas("app");

function lineShape() {
  fabric.ShapeLine = fabric.util.createClass(fabric.Line, {
    type: "ShapeLine",
    initialize: function (points, options) {
      options || (options = {});
      this.callSuper("initialize", points, options);
    },
    toObject: function () {
      return fabric.util.object.extend(this.callSuper("toObject"), {
        name: this.get("name"),
      });
    },
    hasBorders: false, // Remove control borders
    controls: {
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
  
          // 更新图像大小
          tobj
            .set({
              width: tobj.width + rotatedMovementX,
              height: tobj.height + rotatedMovementY,
              objectCaching: false,
            })
            .setCoords();
          return true;
        },
      }),
  
      tr: new fabric.Control({
        x: -0.5,
        y: -0.5,
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
          const rotatedMovementY = -mX * sinAngle + mY * cosAngle;
          // 更新图像大小
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
    callback && callback(new fabric.ShapeLine([object.x1, object.y1, object.x2, object.y2], object));
  };

  fabric.ShapeLine.generate = function (options) {
    const obj = new fabric.ShapeLine([175, 175, 275, 175], {  
      stroke: 'red',
      strokeWidth: 10,
      ...options,
    });
    return obj;
  };

  const shapeLine = fabric.ShapeLine.generate();
  canvas.add(shapeLine);
}

lineShape();
