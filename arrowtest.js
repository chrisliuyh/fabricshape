import { fabric } from "fabric";

fabric.LineArrow = fabric.util.createClass(fabric.Line, {
  type: 'lineArrow',
  initialize: function (element, options) {
    options || (options = {});
    this.callSuper('initialize', element, options);
  },
  toObject: function () {
    return fabric.util.object.extend(this.callSuper('toObject'), {
      arrowLine: this.arrowLine
    });
  },
  _render: function (ctx) {
    this.callSuper('_render', ctx);
    ctx.save();
    var xDiff = this.width;
    var yDiff = this.height;
    var angle = Math.atan2(yDiff, xDiff);
    // Render the arrow
    ctx.translate(this.width / 2, this.height / 2);
    ctx.rotate(angle);
    ctx.beginPath();
    ctx.moveTo(10, 0);
    ctx.lineTo(-15, -15);
    ctx.lineTo(-15, 15);
    ctx.closePath();
    ctx.fillStyle = this.stroke;
    ctx.fill();
    ctx.restore();
  },

  controls: {
    br: new fabric.Control({
      x: 0.5,
      y: 0.5,
      actionHandler: function (eventData, transform, x, y) {
        const tobj = transform.target;
        const angle = fabric.util.degreesToRadians(tobj.angle);
        const cosAngle = Math.cos(angle);
        const sinAngle = Math.sin(angle);
        const mX = eventData.movementX;
        const mY = eventData.movementY;
        const rotatedMovementX = mX * cosAngle + mY * sinAngle;
        const rotatedMovementY = mY * cosAngle - mX * sinAngle;

        tobj.set({
          width: tobj.width + rotatedMovementX,
          height: tobj.height + rotatedMovementY,
          objectCaching: false
        }).setCoords();

        canvas.renderAll();

        return true;
      },
      cursorStyleHandler: fabric.controlsUtils.rotationStyleHandler
    }),
    tl: new fabric.Control({
      x: -0.5,
      y: -0.5,
      actionHandler: function (eventData, transform, x, y) {
        const tobj = transform.target;
        const angle = fabric.util.degreesToRadians(tobj.angle);
        const cosAngle = Math.cos(angle);
        const sinAngle = Math.sin(angle);
        const mX = eventData.movementX;
        const mY = eventData.movementY;
        const rotatedMovementX = mX * cosAngle + mY * sinAngle;
        const rotatedMovementY = -mX * sinAngle + mY * cosAngle;

        tobj.set({
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
          objectCaching: false
        }).setCoords();

        canvas.renderAll();

        return true;
      },
      cursorStyleHandler: fabric.controlsUtils.rotationStyleHandler
    }),
    mtr: new fabric.Control({
      // Rotation control point
      x: 0,
      y: -0.5,
      offsetY: -40,
      withConnection: true,
      actionName: "rotate",
      actionHandler: fabric.controlsUtils.rotationWithSnapping,
    }),
  },
});
fabric.LineArrow.fromObject = function (object, callback) {
    return new fabric.LineArrow([object.x1, object.y1, object.x2, object.y2], object);
  };
  
fabric.LineArrow.fromObject = function (object, callback) {
    const points = [object.x1, object.y1, object.x2, object.y2];
    const arrowWidth = object.strokeWidth * 5; // 调整箭头的宽度，根据需要调整比例
    const arrowLength = arrowWidth * 8.5; // 调整箭头的长度，根据需要调整比例
  
    const angle = Math.atan2(points[3] - points[1], points[2] - points[0]);
    const xDiff = Math.cos(angle) * arrowLength;
    const yDiff = Math.sin(angle) * arrowLength;
  
    const arrowPoints = [
      points[2] - xDiff,
      points[3] - yDiff,
      points[2],
      points[3],
      points[2] - xDiff,
      points[3] + yDiff
    ];
  
    const newObject = new fabric.LineArrow(arrowPoints, object);
    newObject.set({
      strokeWidth: object.strokeWidth,
      stroke: object.stroke,
      fill: object.fill
    });
  
    callback && callback(newObject);
  };


fabric.LineArrow.generate = function (options) {
  return new fabric.LineArrow([50, 50, 200, 200], {
    stroke: 'red',
    strokeWidth: 5,
    ...options
  });
};

var canvas = new fabric.Canvas("app");
const shapeRect = fabric.LineArrow.generate({
  stroke: 'red',
  strokeWidth: 5
});
canvas.add(shapeRect);

const o = shapeRect.toDatalessObject();

fabric.util.enlivenObjects([o], (objs) => {
  console.log(objs[0]);
  canvas.add(objs[0]);
}, "");
