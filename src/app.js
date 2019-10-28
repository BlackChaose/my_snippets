const showSnippets = function () {
  const path = 'data/';
  let names = ['js_snippets', 'php_snippets', 'sql_snippets', 'linux_commands', 'Angular', 'AngularJS ', 'Handlebars', 'Twig', 'Zen HTML'];

  names = names.map((el) => `${path}${el}.xml`);

  const parseXml = (xml, namefile) => {
    const xmlDoc = xml.responseXML;

    const app = document.getElementById('app');

    const objs = xmlDoc.getElementsByTagName('template');

    let objTitle = document.createElement('h2');
    objTitle.className = 'row align-items-center justify-content-center mb-5 p-2';
    objTitle.style = 'color: green; border: 1px dotted lightgreen;';
    objTitle.textContent = namefile.match(/\/.*\./)[0].slice(1, -1).toUpperCase();
    app.appendChild(objTitle);

    Object.keys(objs).forEach((index) => {
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
      objCol2.textContent = objs[index].attributes.description.textContent;
      objCol2.style = 'word-wrap: break-word;';

      objRow.append(objTitle);
      objRow.append(objCol1);
      objRow.append(objCopy);
      if (namefile === 'data/sql_snippets.xml') {
        const wl = objCol2.textContent.length - objCol2.textContent.match(/<{.*}>/)[0].length;
        objCol2.textContent = objCol2.textContent.slice(0, wl);
        const objImg = document.createElement('img');
        const srcImgRaw = objs[index].attributes.description.textContent;

        if (srcImgRaw.length > 0) {
          const srcImg = srcImgRaw.match(/<{.*}>/)[0].slice(1, -1).slice(1, -1);
          objImg.src = `img/${srcImg}`;
          objImg.width = 110;
          objCol2.append(objImg);
        }
      }

      objCopy.addEventListener('click', (e) => {
        console.log(e.target.parentNode.previousSibling.childNodes[0].textContent);
        const inp = document.createElement('input');
        document.body.appendChild(inp);
        inp.value = e.target.parentNode.previousSibling.childNodes[0].textContent;
        inp.select();
        document.execCommand('copy', false);
        inp.remove();
      });

      objRow.append(objCol2);
      app.append(objRow);
    });
  };
  const readAndDraw = (fileName) => {
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
      if (this.readyState === 4 && this.status === 200) {
        parseXml(this, fileName);
      }
    };

    xhttp.open('GET', fileName, true);
    xhttp.send();
  };
  names.forEach(readAndDraw);
};
