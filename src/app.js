/* eslint-disable import/prefer-default-export */
const showSnippets = (cbFunc) => {
  const path = 'data/';
  let names = [
    'js_snippets',
    'php_snippets',
    'sql_snippets',
    'unit_tests',
    'laravel',
    'linux_commands',
    'Bash',
    'curl_console',
    'git_snippets',
    'Angular',
    'AngularJS ',
    'Handlebars',
    'Twig',
    'Zen HTML'];

  names = names.map((el) => `${path}${el}.xml`);

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

    Object.keys(objs).forEach((index) => {
      // noinspection JSAnnotator
      if (objs[index] === null || objs[index] === undefined) {
        return;
      }
      const objRow = document.createElement('div');
      objRow.className = 'row align-items-center justify-content-center mb-5';
      objRow.style = 'border: 1px solid gray;';

      objTitle = document.createElement('div');
      objTitle.className = 'numTitle col';
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
      objCol2.textContent = (objs[index].attributes.description) ? objs[index].attributes.description.textContent : null; // eslint-disable-line
      objCol2.style = 'word-wrap: break-word;';

      objRow.append(objTitle);
      objRow.append(objCol1);
      objRow.append(objCopy);
      if (namefile === 'data/sql_snippets.xml') {
        const txL = (objCol2.textContent.match(/<{.*}>/)) ? objCol2.textContent.match(/<{.*}>/)[0].length : 0;
        const wl = objCol2.textContent.length - txL;
        objCol2.textContent = objCol2.textContent.slice(0, wl);
        const objImg = document.createElement('img');

        const srcImgRaw = (objs[index].attributes.description !== null && objs[index].attributes.description !== undefined)// eslint-disable-line
          ? objs[index].attributes.description.textContent : null; // eslint-disable-line

        if (srcImgRaw !== null && srcImgRaw.length > 0) {
          const strSrcImgRaw = (srcImgRaw.match(/<{.*}>/)) ? srcImgRaw.match(/<{.*}>/)[0] : '';
          if (strSrcImgRaw !== '') {
            const srcImg = strSrcImgRaw.slice(1, -1).slice(1, -1);
            objImg.src = `img/${srcImg}`;
            objImg.width = 110;
            objCol2.append(objImg);
          }
        }
      }

      objCopy.addEventListener('click', (e) => {
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

  const readAndDraw = (fileName) => new Promise((resolve, reject) => {
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

export { showSnippets };
