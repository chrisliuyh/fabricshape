import { fabric } from "fabric";

fabric.ShapeArrow = fabric.util.createClass(fabric.Line, {
    type: 'ShapeArrow',
    initialize: function (element, options) {
        options || (options = {});
        this.callSuper('initialize', element, options);
    },
      toObject: function() {
        return fabric.util.object.extend(this.callSuper('toObject'), {
            name: this.name,
            width: this.width,
            height: this.height,
            angle: this.angle
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
        ctx.moveTo(this.strokeWidth * 2, 0);
        ctx.lineTo(-this.strokeWidth * 3, -this.strokeWidth * 3);
        ctx.lineTo(-this.strokeWidth * 3, this.strokeWidth * 3);
        // ctx.lineTo(-15, -15);
        // ctx.lineTo(-15, 15);
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
                const cvs = tobj.canvas.getElement()
                const showW = parseFloat(cvs.style.width)
                const realW = cvs.width
                const ratioW = realW / showW
                const showH = parseFloat(cvs.style.height)
                const realH = cvs.height
                const ratioH = realH / showH
                const mX = ratioW * eventData.movementX
                const mY = ratioH * eventData.movementY

                const rotatedMovementX = mX * cosAngle + mY * sinAngle;
                const rotatedMovementY = mY * cosAngle - mX * sinAngle;

                tobj.set({
                    width: tobj.width + rotatedMovementX,
                    height: tobj.height + rotatedMovementY,
                    objectCaching: false
                }).setCoords();

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
                const cvs = tobj.canvas.getElement()
                const showW = parseFloat(cvs.style.width)
                const realW = cvs.width
                const ratioW = realW / showW
                const showH = parseFloat(cvs.style.height)
                const realH = cvs.height
                const ratioH = realH / showH
                const mX = ratioW * eventData.movementX
                const mY = ratioH * eventData.movementY
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

                return true;
            },
            cursorStyleHandler: fabric.controlsUtils.rotationStyleHandler
        }),
        // mtr: new fabric.Control({
        //     // Rotation control point
        //     x: 0,
        //     y: -0.5,
        //     offsetY: -40,
        //     withConnection: true,
        //     actionName: "rotate",
        //     actionHandler: fabric.controlsUtils.rotationWithSnapping,
        // }),
    },
});
fabric.ShapeArrow.fromObject = function(object, callback) {
    const points = [object.x1, object.y1, object.x2, object.y2];
    const options = fabric.util.object.clone(object);

    // 创建新的 ShapeArrow 对象
    const shapeArrow = new fabric.ShapeArrow(points, options);

    // 设置宽高和角度
    shapeArrow.set({
        width: object.width,
        height: object.height,
        angle: object.angle
    });

    callback && callback(shapeArrow);
};
  

// fabric.ShapeArrow.fromObject = function (object, callback) {
//     const points = [object.x1, object.y1, object.x2, object.y2];
//     const arrowWidth = object.strokeWidth * 5; // 调整箭头的宽度，根据需要调整比例
//     const arrowLength = arrowWidth * 8.5; // 调整箭头的长度，根据需要调整比例

//     const angle = Math.atan2(points[3] - points[1], points[2] - points[0]);
//     const xDiff = Math.cos(angle) * arrowLength;
//     const yDiff = Math.sin(angle) * arrowLength;

//     const arrowPoints = [
//       points[2] - xDiff,
//       points[3] - yDiff,
//       points[2],
//       points[3],
//       points[2] - xDiff,
//       points[3] + yDiff
//     ];

//     const newObject = new fabric.ShapeArrow(arrowPoints, object);
//     newObject.set({
//       strokeWidth: object.strokeWidth,
//       stroke: object.stroke,
//       fill: object.fill
//     });

//     callback && callback(newObject);
//   };


fabric.ShapeArrow.generate = function (options) {
    return new fabric.ShapeArrow([50, 50, 200, 200], {
        stroke: 'red',
        strokeWidth: 5,
        ...options
    });
};

var canvas = new fabric.Canvas("app");
window.canvas = canvas;
const shapeRect = fabric.ShapeArrow.generate({
    stroke: 'red',
    strokeWidth: 5
});
// canvas.add(shapeRect);

window.shapeRect = shapeRect;

const o = shapeRect.toDatalessObject();

fabric.util.enlivenObjects([o], (objs) => {
    console.log(objs[0]);
    canvas.add(objs[0]);
}, "");
// fabric.ShapeArrow.fromObject = function (object, callback) {
//     callback && callback(new fabric.ShapeArrow([object.left, object.top, object.left + object.width, object.top + object.height], object));
// };
// fabric.ShapeArrow.generate = function (options) {
//     return new fabric.ShapeArrow([20, 50, 320, 50], {
//         stroke: 'red',
//         strokeWidth: 5,
//         ...options
//     });
// };

// var canvas = new fabric.Canvas("app");
// const shapeRect = fabric.ShapeArrow.generate({
//     stroke: 'red',
//     strokeWidth: 5
// });
// canvas.add(shapeRect);




