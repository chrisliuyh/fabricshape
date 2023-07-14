const createLine = ({
    width = 300,
    height = 130,
    startX = 50,
    startY = 50,
    endX = 250,
    endY = 50,
    lineWidth = 2,
    lineColor = "#000",
    arrowSize = 10,
    arrowColor = "#000",
    dashLength = 10,
    gapLength = 5,
  } = {}) => {
    const totalLength = Math.sqrt(
      Math.pow(endX - startX, 2) + Math.pow(endY - startY, 2)
    );
  
    const segments = Math.floor(totalLength / (dashLength + gapLength));
  
    const dx = (endX - startX) / segments;
    const dy = (endY - startY) / segments;
  
    let svgString = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">`;
  
    for (let i = 0; i < segments; i++) {
      const x1 = startX + dx * i;
      const y1 = startY + dy * i;
      const x2 = startX + dx * (i + 1) - dx / 2;
      const y2 = startY + dy * (i + 1) - dy / 2;
  
      svgString += `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${lineColor}" stroke-width="${lineWidth}" />`;
    }
  
    svgString += `<polygon points="${endX - arrowSize},${endY - arrowSize} ${endX},${endY} ${endX - arrowSize},${endY + arrowSize}" fill="${arrowColor}" />`;
    svgString += `</svg>`;
  
    return svgString;
  };