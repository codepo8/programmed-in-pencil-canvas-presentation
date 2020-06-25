(function(){

  const fileinput = document.querySelector('#getfile');
  const output = document.querySelector('output');
  const imagecontainer = document.querySelector('#imagecontainer');

  // Show the image once we have it 
  const loadImage = (file, name) => {
    if (name) {
      output.innerText = 'Filename: ' + name;
    }
    var img = new Image();
    img.src = file;
    img.onload = function() {
      imagecontainer.appendChild(img);
    };
  }

  // Image from Clipboard 
  const getClipboardImage = (ev) => {
    let items = ev.clipboardData.items;
    for (var i = 0; i < items.length; i++) {
      if (items[i].type.indexOf('image') !== -1) {
        var blob = items[i].getAsFile();
        loadImage(window.URL.createObjectURL(blob));
        break;
      }
    }
  }
  window.addEventListener('paste', getClipboardImage, false);

  // Image from Drag and Drop
  const imageFromDrop = (e) => {
    var file = e.dataTransfer.files[0];
    loadImage(window.URL.createObjectURL(file), file.name);
    e.preventDefault();
  }
  container.addEventListener('drop', imageFromDrop, false);
  // Override the normal drag and drop behaviour
  container.addEventListener('dragover', (ev) => {
    ev.preventDefault();
  }, false);

  // Image from Upload 
  const imageFromUpload = (e) => {
    var file = e.target.files[0];
    loadImage(window.URL.createObjectURL(file), file.name);
    e.preventDefault();
  }
  fileinput.addEventListener('change', imageFromUpload, false);

  })();
