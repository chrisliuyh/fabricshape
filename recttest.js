
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
        if (tobj.height - rotatedMovementY >= 0 && tobj.width + rotatedMovementX >= 0) {
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
      }
      return true;
    },
  })
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
        const rotatedMovementY = -mX * sinAngle + mY * cosAngle;

        const aspectRatio = tobj.width / tobj.height;
        const aspectAdjustedMovementX = rotatedMovementX * Math.abs(cosAngle);
        const aspectAdjustedMovementY = rotatedMovementY * Math.abs(sinAngle);

        let newWidth, newHeight;

        if (Math.abs(aspectAdjustedMovementY) > Math.abs(aspectAdjustedMovementX)) {
          newHeight = tobj.height - aspectAdjustedMovementY;
          newWidth = newHeight * aspectRatio;
        } else {
          newWidth = tobj.width + aspectAdjustedMovementX;
          newHeight = newWidth / aspectRatio;
        }

        const offsetX = newWidth - tobj.width;
        const offsetY = newHeight - tobj.height;

        const updatedLeft = tobj.left + offsetX * sinAngle;
        const updatedTop = tobj.top - offsetY * cosAngle;

        if (newHeight >= 1 && newWidth >= 1) {
          // 更新图像大小和位置
          tobj
            .set({
              width: newWidth,
              height: newHeight,
              left: updatedLeft,
              top: updatedTop,
              objectCaching: false,
            })
            .setCoords();
        }

        return true;
      },
    })