import { fabric } from "fabric";

const canvas = new fabric.Canvas("app");

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
                // 根据宽高的变化调整 rx 和 ry 的值
                // const aspectRatio = tobj.width / tobj.height;
                // let newWidth, newHeight;

                // if (Math.abs(rotatedMovementY) > Math.abs(rotatedMovementX)) {
                //     newHeight = tobj.height - rotatedMovementY;
                //     newWidth = newHeight * aspectRatio;
                // } else {
                //     newWidth = tobj.width + rotatedMovementX;
                //     newHeight = newHeight / aspectRatio;
                // }

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

const sr = new fabric.ShapeTriangle({
    left: 100,
    top: 100,
    width: 100,
    height: 100,
    strokeWidth: 5,
    stroke: "#000",
    rx: 10, // border radius
});
// 定义三角形的顶点坐标数组
// const trianglePoints = [
//     { x: 0, y: 100 }, // 第一个顶点（底部左侧）
//     { x: 50, y: 0 }, // 第二个顶点（顶部中间）
//     { x: 100, y: 100 }, // 第三个顶点（底部右侧）
// ];


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
