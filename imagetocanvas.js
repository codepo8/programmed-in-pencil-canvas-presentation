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
    // get the size of the image
    let w = img.naturalWidth;
    let h = img.naturalHeight;
    // define a zoom factor
    let zoomfactor = 3;
    // resize the canvas to that size
    c.width = w * zoomfactor;
    c.height = h * zoomfactor;
    // important! this makes sure canvas doesn't try to smooth 
    // the pixels
    cx.imageSmoothingEnabled = 0;
    // scale the context's coordinate system 
    cx.scale(zoomfactor, zoomfactor);
    // paint the image
    cx.drawImage(img, 0, 0);
    // store the pixel data of the image in the pixels 
    // variable and print it out to the console
    let pixels = cx.getImageData(0 , 0, w, h);
    console.log(pixels);
  };
}

