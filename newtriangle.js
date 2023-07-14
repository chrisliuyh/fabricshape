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
})