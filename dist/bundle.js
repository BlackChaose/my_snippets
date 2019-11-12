(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.showSnippets = void 0;

/* eslint-disable import/prefer-default-export */
const showSnippets = cbFunc => {
  console.log('in showSnippets');
  const path = 'data/';
  let names = ['js_snippets', 'php_snippets', 'sql_snippets', 'linux_commands', 'curl_console', 'Angular', 'AngularJS ', 'Handlebars', 'Twig', 'Zen HTML'];
  names = names.map(el => `${path}${el}.xml`);

  const parseXml = (xml, namefile) => {
    const xmlDoc = xml.responseXML;
    const app = document.getElementById('app');
    const objs = xmlDoc.getElementsByTagName('template');
    const blk = document.createElement('div');
    blk.className = 'content-block';
    const cntnr = document.createElement('div');
    cntnr.className = 'collapse cntnr';
    let objTitle = document.createElement('h2');
    objTitle.className = 'row align-items-center justify-content-center mb-5 p-2';
    objTitle.style = 'color: green; border: 1px dotted lightgreen; cursor: pointer;';
    objTitle.textContent = namefile.match(/\/.*\./)[0].slice(1, -1).toUpperCase();
    blk.appendChild(objTitle);
    Object.keys(objs).forEach(index => {
      const objRow = document.createElement('div');
      objRow.className = 'row align-items-center justify-content-center mb-5';
      objRow.style = 'border: 1px solid gray;';
      objTitle = document.createElement('div');
      objTitle.className = 'numTitle col-1';
      objTitle.textContent = objs[index].attributes.name.textContent;
      const objCol1 = document.createElement('div');
      objCol1.className = 'col-8 align-self-center';
      const objCode = document.createElement('pre');
      objCode.className = 'text-success';
      objCode.textContent = objs[index].attributes.value.textContent;
      objCol1.append(objCode);
      const objCopy = document.createElement('div');
      objCopy.className = 'col-1 copy-btn';
      const objCopyBtn = document.createElement('button');
      objCopyBtn.type = 'button';
      objCopyBtn.className = 'btn btn-light btn-clipboard';
      objCopyBtn.dataOriginalTitel = 'Copy to clipboard';
      objCopyBtn.textContent = 'Copy';
      objCopy.append(objCopyBtn);
      const objCol2 = document.createElement('div');
      objCol2.className = 'col-2 align-self-center text-body';
      objCol2.textContent = objs[index].attributes.description.textContent ? objs[index].attributes.description.textContent : null; // eslint-disable-line

      objCol2.style = 'word-wrap: break-word;';
      objRow.append(objTitle);
      objRow.append(objCol1);
      objRow.append(objCopy);

      if (namefile === 'data/sql_snippets.xml') {
        const txL = objCol2.textContent.match(/<{.*}>/) ? objCol2.textContent.match(/<{.*}>/)[0].length : 0;
        const wl = objCol2.textContent.length - txL;
        objCol2.textContent = objCol2.textContent.slice(0, wl);
        const objImg = document.createElement('img');
        const srcImgRaw = objs[index].attributes.description.textContent;

        if (srcImgRaw.length > 0) {
          const strSrcImgRaw = srcImgRaw.match(/<{.*}>/) ? srcImgRaw.match(/<{.*}>/)[0] : '';

          if (strSrcImgRaw !== '') {
            const srcImg = strSrcImgRaw.slice(1, -1).slice(1, -1);
            objImg.src = `img/${srcImg}`;
            objImg.width = 110;
            objCol2.append(objImg);
          }
        }
      }

      objCopy.addEventListener('click', e => {
        console.log(e.target.parentNode.previousSibling.childNodes[0].textContent);
        const inp = document.createElement('input');
        document.body.appendChild(inp);
        inp.value = e.target.parentNode.previousSibling.childNodes[0].textContent;
        inp.select();
        document.execCommand('copy', false);
        inp.remove();
      });
      objRow.append(objCol2);
      cntnr.append(objRow);
    });
    blk.append(cntnr);
    app.append(blk);
  };

  const readAndDraw = fileName => new Promise((resolve, reject) => {
    const xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = () => {
      if (xhttp.readyState === XMLHttpRequest.DONE && xhttp.status === 200) {
        parseXml(xhttp, fileName);
        resolve(xhttp.responseText);
      }
    };

    xhttp.open('GET', fileName, true);

    xhttp.onerror = () => reject(xhttp.statusText);

    xhttp.send();
  });

  const arrPromises = names.map(readAndDraw);
  Promise.all(arrPromises).then(cbFunc);
};

exports.showSnippets = showSnippets;

},{}],2:[function(require,module,exports){
"use strict";

var _app = require("./app.js");

// import 'jquery'; //eslint-disable-line
// import 'bootstrap';//eslint-disable-line
// import 'popper.js';//eslint-disable-line//todo add mimify preset in babel for minify files!
// eslint-disable-line
const a = _app.showSnippets;
a(() => {
  const list = document.querySelectorAll('.collapse');
  Object.keys(list).forEach(index => {
    list[index].parentElement.addEventListener('click', () => {
      if (list[index].style.display === 'block') {
        list[index].style.display = 'none';
      } else if (list[index].style.display === '' || list[index].style.display === 'none') {
        list[index].style.display = 'block';
      }

      return 0;
    });
  });
});

},{"./app.js":1}]},{},[2]);
