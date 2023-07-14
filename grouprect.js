import { fabric } from 'fabric';

const canvas = new fabric.Canvas("app");

// 创建一个矩形对象和一个文本框对象
const rect = new fabric.Rect({
  left: 100,
  top: 100,
  width: 200,
  height: 100,
  fill: 'blue',
});

const textbox = new fabric.Textbox('', {
  left: 110,
  top: 110,
  width: 180,
  height: 80,
  fontSize: 20,
  fill: 'white',
});

// 创建一个图形组合，并将矩形和文本框添加到组合中
const group = new fabric.Group([rect, textbox], {
  left: 0,
  top: 0,
});

// 将组合添加到画布中
canvas.add(group);

// 双击图形时进入编辑模式
group.on('mousedblclick', function() {
  // 隐藏组合中的文本框
//   textbox.visible = false;
  canvas.renderAll();

  // 创建一个临时的文本框，用于编辑文字
  const tempTextbox = new fabric.IText('', {
    left: group.left + textbox.left,
    top: group.top + textbox.top,
    width: textbox.width,
    height: textbox.height,
    fontSize: 20,
    fill: 'white',
    originX: 'center',
    originY: 'center',
    hasBorders: false,
    hasControls: false,
  });

  // 将临时文本框添加到组合中
  group.add(tempTextbox);
  canvas.setActiveObject(tempTextbox);
  tempTextbox.enterEditing();

  // 退出编辑模式时的处理
  tempTextbox.on('editing:exited', function() {
    // 更新组合中的文本框的内容，并显示文本框
    textbox.text = tempTextbox.text;
    textbox.visible = true;
    group.remove(tempTextbox);
    canvas.renderAll();
  });
});
