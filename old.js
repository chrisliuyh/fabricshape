import { fabric } from "fabric";


// export default function init(){
  
// }
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
        // const tobj = canvas.getActiveObject();
        const tobj = transform.target;
        const angle = fabric.util.degreesToRadians(tobj.angle); // 将角度转换为弧度

        const cosAngle = Math.cos(angle);
        const sinAngle = Math.sin(angle);

        // 计算旋转后的拖拽向量
        const rotatedMovementX =
          eventData.movementX * cosAngle + eventData.movementY * sinAngle;

        tobj.width += rotatedMovementX;
        tobj.setCoords();
        return true;
      },
      // actionHandler: function (eventData, transform, x, y) {
      //   const tobj = transform.target;
      //   const angle = fabric.util.degreesToRadians(tobj.angle);
      //   const cosAngle = Math.cos(angle);
      //   const sinAngle = Math.sin(angle);
      //   const rotatedMovementX = eventData.movementX * cosAngle + eventData.movementY * sinAngle;

      //   // 更新图像大小
      //   tobj.set({
      //     width: tobj.width + rotatedMovementX,
      //   }).setCoords();

      //   // 更新canvas并渲染
      //   canvas.requestRenderAll();

      //   return true;
      // },
    }),
    br: new fabric.Control({
      // 右下控制点
      x: 0.5,
      y: 0.5,
      actionHandler: function (eventData, transform, x, y) {
        // const tobj = canvas.getActiveObject();
        const tobj = transform.target;
        const angle = fabric.util.degreesToRadians(tobj.angle); // 将角度转换为弧度

        const cosAngle = Math.cos(angle);
        const sinAngle = Math.sin(angle);

        // 计算旋转后的拖拽向量
        const rotatedMovementX =
          eventData.movementX * cosAngle + eventData.movementY * sinAngle;
        const rotatedMovementY =
          eventData.movementY * cosAngle - eventData.movementX * sinAngle;

        tobj.width += rotatedMovementX;
        tobj.height += rotatedMovementY;
        tobj.setCoords();
        return true;
      },
    }),
    ml: new fabric.Control({
      // 左中控制点
      x: -0.5,
      y: 0,
      actionHandler: function (eventData, transform, x, y) {
        // const tobj = canvas.getActiveObject();
        const tobj = transform.target;
        const angle = fabric.util.degreesToRadians(tobj.angle); // 将角度转换为弧度

        const cosAngle = Math.cos(angle);
        const sinAngle = Math.sin(angle);

        // 计算旋转后的拖拽向量
        const rotatedMovementX =
          eventData.movementX * cosAngle + eventData.movementY * sinAngle;

        tobj.width -= rotatedMovementX;
        tobj.left += rotatedMovementX * cosAngle; // 根据旋转角度进行修正
        tobj.top += rotatedMovementX * sinAngle; // 根据旋转角度进行修正
        tobj.setCoords();
        return true;
      },
    }),
    bl: new fabric.Control({
      // 左下控制点
      x: -0.5,
      y: 0.5,
      actionHandler: function (eventData, transform, x, y) {
        // const tobj = canvas.getActiveObject();
        const tobj = transform.target;
        const angle = fabric.util.degreesToRadians(tobj.angle); // 将角度转换为弧度

        const cosAngle = Math.cos(angle);
        const sinAngle = Math.sin(angle);

        // 计算旋转后的拖拽向量
        const rotatedMovementX =
          eventData.movementX * cosAngle + eventData.movementY * sinAngle;
        const rotatedMovementY =
          eventData.movementY * cosAngle - eventData.movementX * sinAngle;

        tobj.width -= rotatedMovementX;
        tobj.height += rotatedMovementY;
        tobj.left += rotatedMovementX * cosAngle; // 根据旋转角度进行修正
        tobj.top += rotatedMovementX * sinAngle; // 根据旋转角度进行修正
        tobj.setCoords();
        return true;
      },
    }),
    tl: new fabric.Control({
      // 左上控制点
      x: -0.5,
      y: -0.5,
      actionHandler: function (eventData, transform, x, y) {
        // const tobj = canvas.getActiveObject();
        const tobj = transform.target;
        const angle = fabric.util.degreesToRadians(tobj.angle); // 将角度转换为弧度

        const cosAngle = Math.cos(angle);
        const sinAngle = Math.sin(angle);

        // 计算旋转后的拖拽向量
        const rotatedMovementX =
          eventData.movementX * cosAngle + eventData.movementY * sinAngle;
        const rotatedMovementY =
          -eventData.movementX * sinAngle + eventData.movementY * cosAngle;

        tobj.width -= rotatedMovementX;
        tobj.height -= rotatedMovementY;
        tobj.left += rotatedMovementX * cosAngle - rotatedMovementY * sinAngle; // 根据旋转角度进行修正
        tobj.top += rotatedMovementX * sinAngle + rotatedMovementY * cosAngle; // 根据旋转角度进行修正
        tobj.setCoords();
        return true;
      },
    }),
    tr: new fabric.Control({
      // 右上控制点
      x: 0.5,
      y: -0.5,
      actionHandler: function (eventData, transform, x, y) {
        // const tobj = canvas.getActiveObject();
        const tobj = transform.target;
        const angle = fabric.util.degreesToRadians(tobj.angle); // 将角度转换为弧度
    
        const cosAngle = Math.cos(angle);
        const sinAngle = Math.sin(angle);
    
        // 计算旋转后的拖拽向量
        const rotatedMovementX =
          eventData.movementX * cosAngle + eventData.movementY * sinAngle;
        const rotatedMovementY =
          eventData.movementY * cosAngle - eventData.movementX * sinAngle;
    
        tobj.width += rotatedMovementX;
        tobj.height -= rotatedMovementY;
        tobj.top += rotatedMovementY * cosAngle; // 根据旋转角度进行修正
        tobj.left -= rotatedMovementY * sinAngle; // 根据旋转角度进行修正
        tobj.setCoords();
        return true;
      },
    }),
    mt: new fabric.Control({
      // 上中控制点
      x: 0,
      y: -0.5,
      actionHandler: function (eventData, transform, x, y) {
        // const tobj = canvas.getActiveObject();
        const tobj = transform.target;
        const angle = fabric.util.degreesToRadians(tobj.angle); // 将角度转换为弧度
    
        const cosAngle = Math.cos(angle);
        const sinAngle = Math.sin(angle);
    
        // 计算旋转后的拖拽向量
        const rotatedMovementY =
          eventData.movementY * cosAngle - eventData.movementX * sinAngle;
    
        tobj.height -= rotatedMovementY;
        tobj.top += rotatedMovementY * cosAngle; // 根据旋转角度进行修正
        tobj.left -= rotatedMovementY * sinAngle; // 根据旋转角度进行修正
        tobj.setCoords();
        return true;
      },
    }),
    mb: new fabric.Control({
      // 下中控制点
      x: 0,
      y: 0.5,
      actionHandler: function (eventData, transform, x, y) {
        // const tobj = canvas.getActiveObject();
        const tobj = transform.target;
        const angle = fabric.util.degreesToRadians(tobj.angle); // 将角度转换为弧度
    
        const cosAngle = Math.cos(angle);
        const sinAngle = Math.sin(angle);
    
        // 计算旋转后的拖拽向量
        const rotatedMovementY =
          eventData.movementY * cosAngle - eventData.movementX * sinAngle;
    
        tobj.height += rotatedMovementY;
        tobj.setCoords();
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

