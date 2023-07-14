import { fabric } from 'fabric';

const canvas = new fabric.Canvas("app");

function arrowShape() {
    fabric.ShapeArrow = fabric.util.createClass(fabric.Path, {
        type: "ShapeArrow",
        initialize: function (path, options) {
            options || (options = {});
            this.callSuper("initialize", path, options);
            this.strokeUniform = true;
            this.noScaleCache = false;
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
                    const ml = curObj.controls.ml;

                    const angle = fabric.util.degreesToRadians(curObj.angle);
                    const cosAngle = Math.cos(angle);
                    const sinAngle = Math.sin(angle);
                    const cvs = curObj.canvas.getElement();
                    const showW = parseFloat(cvs.style.width);
                    const realW = cvs.width;
                    const ratioW = realW / showW;
                    const showH = parseFloat(cvs.style.height);
                    const realH = cvs.height;
                    const ratioH = realH / showH;
                    const mX = ratioW * eventData.movementX;
                    const mY = ratioH * eventData.movementY;

                    // const mlX = ml.x * curObj.scaleX + curObj.left;
                    // const mlY = ml.y * curObj.scaleY + curObj.top;
                    // const deltaX = mlX - curObj.left;
                    // const deltaY = mlY - curObj.top;
                    // const hypotenuse = Math.sqrt(Math.pow(deltaX, 2) + Math.pow(deltaY, 2));
                    // const angleOfRotation = Math.atan2(deltaY, deltaX);
                    // const rotatedAngle = angleOfRotation + Math.atan2(mY, mX);
                    // curObj.angle = fabric.util.radiansToDegrees(angleOfRotation);
                    // curObj.left = ml.x - hypotenuse * Math.cos(angleOfRotation);
                    // curObj.top = ml.y - hypotenuse * Math.sin(angleOfRotation);
                    // curObj.setCoords();
                    const rotatedMovementX = mX * cosAngle + mY * sinAngle;
                    const rotatedMovementY = mX * sinAngle + mY * sinAngle;

                    const newWidth = curObj.path[1][1] + rotatedMovementX
                    //   const newWidth = curObj.width + mX * cosAngle;

                    //   if (newWidth >= 25) {
                    //     curObj.set({
                    //       width: newWidth,
                    //       objectCaching: false,
                    //     }).setCoords();

                    //     return true;
                    //   }
                    if (newWidth >= 25) {
                        curObj.path[1][1] = newWidth;
                        curObj.path[3][1] = curObj.path[1][1] - 20;
                        curObj.path[4][1] = curObj.path[1][1];
                        curObj.path[5][1] = curObj.path[1][1] - 20;
                        curObj.path[6][1] = curObj.path[1][1];
                        curObj.dirty = true;
                        curObj.width = curObj.path[1][1];
                        curObj.pathOffset.x = curObj.width / 2;
                        // curObj.left = curObj.left + rotatedMovementX * cosAngle;
                        // curObj.top = curObj.top + rotatedMovementX * sinAngle;

                        // 更新图像大小
                        curObj.set({
                            width: curObj.width,
                            // angle: fabric.util.radiansToDegrees(rotatedAngle),
                            objectCaching: false,
                        }).setCoords();
                        return true;
                    }
                },
            }),



            ml: new fabric.Control({
                // 左中控制点
                x: -0.5,
                y: 0,
                actionHandler: function (eventData, transform, x, y) {
                    const curObj = transform.target;

                    const angle = fabric.util.degreesToRadians(curObj.angle);
                    const cosAngle = Math.cos(angle);
                    const sinAngle = Math.sin(angle);
                    const cvs = curObj.canvas.getElement();
                    const showW = parseFloat(cvs.style.width);
                    const realW = cvs.width;
                    const ratioW = realW / showW;
                    const showH = parseFloat(cvs.style.height);
                    const realH = cvs.height;
                    const ratioH = realH / showH;
                    const mX = ratioW * eventData.movementX;
                    const mY = ratioH * eventData.movementY;
                    const rotatedMovementX = mX * cosAngle + mY * sinAngle;

                    const newWidth = curObj.path[1][1] - rotatedMovementX;

                    if (newWidth >= 25) {
                        curObj.path[1][1] = newWidth;
                        curObj.path[3][1] = curObj.path[1][1] - 20;
                        curObj.path[4][1] = curObj.path[1][1];
                        curObj.path[5][1] = curObj.path[1][1] - 20;
                        curObj.path[6][1] = curObj.path[1][1];
                        curObj.left = curObj.left + rotatedMovementX * cosAngle;
                        curObj.top = curObj.top + rotatedMovementX * sinAngle;
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

    fabric.ShapeArrow.fromObject = function (object, callback) {
        callback && callback(new fabric.ShapeArrow(object.path, object));
    };

    fabric.ShapeArrow.generate = function (options) {
        return new fabric.ShapeArrow(["M", 0, 20, "H", 100, 20, "M", 80, 0, "L", 100, 20, "M", 80, 40, "L", 100, 20].join(" "), {
            stroke: 'red',
            strokeWidth: 5,
            strokeLineCap: 'round',
            ...options,
        });
    };

    const ShapeArrow = fabric.ShapeArrow.generate();
    canvas.add(ShapeArrow);
}

arrowShape();