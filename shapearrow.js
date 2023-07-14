import { fabric } from "fabric";

const canvas = new fabric.Canvas("app");

fabric.ShapeArrow = fabric.util.createClass(fabric.Path, {
    type: "ShapeArrow",
    initialize: function (points, options) {
        options || (options = {});
        this.callSuper("initialize", points, options);
    },
    toObject: function () {
        return fabric.util.object.extend(this.callSuper("toObject"), {
            name: this.get("name"),
            path: this.path, // 添加path属性
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
    // callback && callback(new fabric.ShapeArrow(object));
    callback && callback(new fabric.ShapeArrow(object.path, object));
};

const arrowStr = 'M 0 20 H 100 20 M 80 0 L 100 20 M 80 40 L 100 20'
const sr = new fabric.ShapeArrow(arrowStr, {
    strokeLineJoin: 'round',
    // absolutePositioned: true,
    originX: 'left',
    originY: 'top',
    stroke: 'green',
    strokeWidth: 5,
    objectCaching: false,
})
canvas.add(sr)

const o = sr.toDatalessObject();

fabric.util.enlivenObjects(
    [o],
    (objs) => {
        console.log(objs[0]);
        canvas.add(objs[0]);
    },
    ""
);
