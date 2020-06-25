// Get a reference to the canvas element and its context
const c = document.createElement('canvas');
const cx = c.getContext('2d');

// Get a reference to the element to show the picked image
const output = document.querySelector('#output');

// Once the image was added (functionality in scripts/getimage.js)
const loadImage = (file, name) => {
  // create a new image
  var img = new Image();
  img.src = file;
  // once it is loaded... 
  img.onload = function() {
    // add the image to the container
    imagecontainer.appendChild(img);

    // get the size of the image
    let w = img.naturalWidth;
    let h = img.naturalHeight;
    // resize the canvas to the size
    c.width = w;
    c.height = h;
    // paint the image onto the canvas at top left
    cx.drawImage(img, 0, 0);
    // call the pick function when the mouse moves 
    // over the image 
    img.addEventListener('mousemove',pick);
  };
}

const pick = (ev) => {
  // get the current mouse position
  let coordinates = getposition(ev);
  // read the colour of the pixel at that location
  let col = cx.getImageData(
    coordinates.x, coordinates.y, 1, 1
  );
  // set the background colour to that value
  output.style.background = `rgba(${col.data.join(',')})`;
};

// get the mouse position relative to the position of the 
// element
const getposition = (ev) => {
  let x = ev.clientX;
  let y = ev.clientY;
  let pos = ev.target.getBoundingClientRect();
  return {x: x - pos.x|1, y: y-pos.y|1};
}
