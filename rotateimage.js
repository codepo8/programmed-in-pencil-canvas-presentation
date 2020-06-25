
// Get a reference to the canvas and it's context
const c = document.querySelector('canvas');
const cx = c.getContext('2d');
// define width, height img and angle
let w = 0;
let h = 0;
let angle = 0;
let img = null;

// Once the image was added (functionality in scripts/getimage.js)
const loadImage = (file, name) => {
  // create a new image
  img = new Image();
  img.src = file;
  // once it is loaded... 
  img.onload = function() {
    // add the image to the container
    imagecontainer.appendChild(img);
    // get the size of the image
    w = img.naturalWidth;
    h = img.naturalHeight;
    // resize the canvas to size of the image
    c.width = w;
    c.height = h;
    // start rotating
    rotate();
  };

}
// rotation function called each frame
const rotate = _ => {
    // increase angle 
    angle += .02;
    cx.save();
    // translate the coordinate system to half the 
    // width and height of the image, so that we
    // rotate the image around its center, and not 
    // top left.
    cx.translate(w * 0.5, h * 0.5);  
    // rotate in radians
    cx.rotate(angle);  
    // translate back to top left
    cx.translate(-w * 0.5, -h * 0.5);  
    // paint the image
    cx.drawImage(img, 0, 0);
    cx.restore();
    // call rotate on the next frame
    window.requestAnimationFrame(rotate);
}
