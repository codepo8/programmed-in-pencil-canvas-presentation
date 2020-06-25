let pages = {
  'index': "What's all this then?",
  'getimage': 'Getting an image into the document',
  'imagetocanvas': 'Adding an image to a canvas',
  'analysecolours': 'Analyse colours of an image',
  'colourpicker': 'Pick a colour from an image',
  'rotateimage': 'Rotating an image',
  'zoomimage': 'Zooming an image',
  'zoomimageinteractive': 'Interactively zooming an image',
  'zoomimage-save-as': 'Adding a link to save the image'
}
let nav = document.createElement('nav');
let ul = document.createElement('ul');
let button = document.createElement('button');
button.innerHTML = '👉🏻';
button.addEventListener('click', (ev) => {
  document.body.classList.toggle('navopen');
  ev.target.innerText = ev.target.innerText === '👉🏻' ? '👈🏻' : '👉🏻';
});
nav.appendChild(ul);
nav.appendChild(button);
let out = '';
let current = document.location.href.replace(/.*\//,'');
Object.keys(pages).forEach(p => {
  if (`${p}.html` === current) {
    out += `<li><strong>${pages[p]}</strong></li>`;
  } else {
    out += `<li><a href="${p}.html">${pages[p]}</a></li>`;
  }
});
ul.innerHTML = out;
document.body.appendChild(nav);
if (document.querySelector('#demo')) {
  document.querySelector('#demo').addEventListener('click',(ev) => {
    loadImage('roundatlpdaunity.png');
    ev.preventDefault();
  })
  let codelink = document.createElement('a');
  codelink.href = 'https://github.com/codepo8/programmed-in-pencil-canvas-presentation/blob/master/' + current.replace('.html','.js');
  codelink.className = 'codelink';
  codelink.innerText = 'Check code on GitHub';
  document.querySelector('#container').appendChild(codelink);
  let codeblock = document.createElement('pre');
  codeblock.className = 'code';
  document.querySelector('#container').appendChild(codeblock);
  fetch(current.replace('.html','.js'))
    .then(response => response.text())
    .then(data => {
      out = '';
      let lines = data.split("\n");
      lines.forEach(l => {
        l = l.replace(/</g,'&lt;');
        if(l.indexOf('//') === -1) {
          l = l + "\n";
        } else {
          l = `<span>${l}</span>`+"\n";
        }
        out += l;
      })
      codeblock.innerHTML = out;
    })
}
  
