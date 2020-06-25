// Get a reference to the canvas element and its context
const c = document.createElement('canvas');
const cx = c.getContext('2d');

// Get a reference to the list to add the colours to
const colourslist = document.querySelector('#colourslist');

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
    // call analysecolours with the image data
    analysecolours(
      cx.getImageData(0 , 0, w, h)
    );

  };
}

const analysecolours = (pixeldata) => {
  // get the data array from the pixel object
  let px = pixeldata.data;
  // define an object to hold all the colours
  let colours = {};
  // loop over all the pixels (4 iterator because of 
  // R-G-B-A)
  let all = px.length;
  for (let i = 0; i < all; i += 4) {
    // create a key from the RGBA value
    let col = `${px[i]}|${px[i+1]}|${px[i+2]}|${px[i+3]}`;
    // if the key already exists in the object, up 
    // its counter, otherwise set the key with a value of 1
    colours[col] = colours[col] ? colours[col] + 1 : 1;
  }
  // sorted the colours in reverse order
  sortedcolours = Object.keys(colours).sort(
    (a, b) => {return -(colours[a] - colours[b])}
  );
  // assemble a list with the results and add it to the 
  // document
  var out = '';
  sortedcolours.forEach(function(key){
    var rgba = key.split('|');
    out += 
    `<li>
        <span style="background:rgba(
          ${rgba[0]},${rgba[1]},${rgba[2]},${rgba[3]}
        )"></span>
        ${colours[key]}
    </li>`;
  });
  colourslist.innerHTML = out;
}
