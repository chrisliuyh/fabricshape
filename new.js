 //左上控制点 旋转后有问题
  obj.controls.tl.actionHandler = (eventData, transformData, x, y) => {
    const tobj = cvs.getActiveObject();
    const angle = fabric.util.degreesToRadians(tobj.angle); // 将角度转换为弧度

    const cosAngle = Math.cos(angle);
    const sinAngle = Math.sin(angle);

    // 计算旋转后的拖拽向量
    const rotatedMovementX =
      eventData.movementX * cosAngle + eventData.movementY * sinAngle;
    const rotatedMovementY =
      eventData.movementY * cosAngle - eventData.movementX * sinAngle;

    tobj.width -= rotatedMovementX;
    tobj.height -= rotatedMovementY;
    tobj.left += rotatedMovementX * cosAngle; // 根据旋转角度进行修正
    tobj.top += rotatedMovementY * cosAngle; // 根据旋转角度进行修正
    tobj.setCoords();
    return true;
  };
// 左上控制点 旋转后只有0度和180度没问题
obj.controls.tl.actionHandler = (eventData, transformData, x, y) => {
    const tobj = cvs.getActiveObject();
    const angle = fabric.util.degreesToRadians(tobj.angle); // 将角度转换为弧度
  
    const cosAngle = Math.cos(angle);
    const sinAngle = Math.sin(angle);
  
    // 计算旋转后的拖拽向量
    const rotatedMovementX = eventData.movementX * cosAngle + eventData.movementY * sinAngle;
    const rotatedMovementY = eventData.movementX * sinAngle + eventData.movementY * cosAngle;
  
    tobj.width -= rotatedMovementX;
    tobj.height -= rotatedMovementY;
    tobj.left += rotatedMovementX * cosAngle - rotatedMovementY * sinAngle; // 根据旋转角度进行修正
    tobj.top += rotatedMovementX * sinAngle + rotatedMovementY * cosAngle; // 根据旋转角度进行修正
    tobj.setCoords();
    return true;
  };
  
  // 左上控制点 旋转后拖拽没问题 但是点了控制点后 鼠标回到了图像中心 我需要鼠标跟随拖拽点
  obj.controls.tl.actionHandler = (eventData, transformData, x, y) => {
    const tobj = cvs.getActiveObject();
    const angle = fabric.util.degreesToRadians(tobj.angle); // 将角度转换为弧度
  
    const center = tobj.getCenterPoint(); // 获取旋转中心点坐标
  
    // 计算拖拽向量相对于旋转中心的偏移量
    const offsetX = x - center.x;
    const offsetY = y - center.y;
  
    // 将偏移量旋转回原始坐标系
    const cosAngle = Math.cos(angle);
    const sinAngle = Math.sin(angle);
    const rotatedOffsetX = offsetX * cosAngle + offsetY * sinAngle;
    const rotatedOffsetY = offsetY * cosAngle - offsetX * sinAngle;
  
    // 更新对象的宽度、高度、位置等属性
    tobj.width -= rotatedOffsetX;
    tobj.height -= rotatedOffsetY;
    tobj.left += rotatedOffsetX * cosAngle - rotatedOffsetY * sinAngle;
    tobj.top += rotatedOffsetY * cosAngle + rotatedOffsetX * sinAngle;
    tobj.setCoords();
    return true;
  };