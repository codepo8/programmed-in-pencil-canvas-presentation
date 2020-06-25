// Get a reference to the canvas and it's context
const c = document.querySelector('canvas');
const cx = c.getContext('2d');

// Once the image was added (functionality in scripts/getimage.js)
const loadImage = (file, name) => {
  // create a new image
  var img = new Image();
  img.src = file;
  // once it is loaded... 
  img.onload = function() {
    // add the image to the container
    imagecontainer.appendChild(img);
    // call dozoom when the mouse is moved over the image
    img.addEventListener('mousemove',dozoom);
    // show the specially styled canvas
    c.classList.add('zoominteractive');
    // resize the canvas
    c.width = 90;
    c.height = 90;
    // make sure pixels don't get blurred
    cx.imageSmoothingEnabled = 0;

    };
}

const dozoom = (ev) => {
  // get the position of the mouse
  let coordinates = getposition(ev);
  // get a reference to the image
  let img = ev.target;
  // Copy a part of the image onto the canvas and resize it.
  // Take 10 pixels left and above the mouse cursor 
  // and slice out a 20 by 20 pixels square
  // then paint it onto the canvas at 0,0 and as 90 pixels
  cx.drawImage(
    img, coordinates.x - 10, coordinates.y - 10, 
    20, 20, 0, 0, 90, 90
  );
};

// get the mouse position relative to the position of the 
// element
const getposition = (ev) => {
  let x = ev.clientX;
  let y = ev.clientY;
  let pos = ev.target.getBoundingClientRect();
  return {x: x - pos.x|1, y: y-pos.y|1};
}
