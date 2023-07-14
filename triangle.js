const createTriangle = ({
    width = 300,
    height = 130,
    points = "0,50 25,0 50,50",
    borderColor = "#000",
    borderWidth = 2,
    gradientColor1 = "#f06",
    gradientColor2 = "#f06",
    gradientStop = 0.5,
  } = {}) => {
    const svgString = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">
      <polygon points="${points}" fill="url(#gradient)" stroke="${borderColor}" stroke-width="${borderWidth}" />
      <defs>
        <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="${gradientColor1}" stop-opacity="${gradientStop}" />
          <stop offset="100%" stop-color="${gradientColor2}" stop-opacity="${gradientStop}" />
        </linearGradient>
      </defs>
    </svg>`;
  
    return svgString;
  };