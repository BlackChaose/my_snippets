var showSnippets = function(){
	var path="data/";
	var names=["js_snippets","php_snippets","sql_snippets"];
	var fileName1 = path + names[0] + ".xml";
	var fileName2 = path + names[1] + ".xml";
	var fileName3 = path + names[2] + ".xml";
	
	var xhttp = new XMLHttpRequest();
		xhttp.onreadystatechange = function() {
			if (this.readyState == 4 && this.status == 200) {
				parseXml(this, fileName1);
			}
		};
		
	xhttp.open("GET", fileName1, true);
	xhttp.send();

	var xhttp = new XMLHttpRequest();
		xhttp.onreadystatechange = function() {
			if (this.readyState == 4 && this.status == 200) {
				parseXml(this,fileName2);
			}
		};
		
	xhttp.open("GET", fileName2, true);
	xhttp.send();

	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			parseXml(this, fileName3);
		}
	};
	
	xhttp.open("GET", fileName3, true);
	xhttp.send();

function parseXml(xml, namefile) {
    var xmlDoc = xml.responseXML;
    
    var app = document.getElementById("app");
    //~ var objs = xmlDoc.querySelectorAll("template");
    var objs = xmlDoc.getElementsByTagName("template");

    let objTitle = document.createElement('h2');
        objTitle.className="row align-items-center justify-content-center mb-5 p-2";
        objTitle.style="color: green; border: 1px dotted lightgreen;";
        objTitle.textContent = namefile.match(/\/.*\./)[0].slice(1,-1).toUpperCase();
    app.appendChild(objTitle);


	 Object.keys(objs).forEach(function(index){
		
			let objRow=document.createElement('div');
				objRow.className="row align-items-center justify-content-center mb-5";
				objRow.style="border: 1px solid gray;";
			
			let objTitle = document.createElement('div');
				objTitle.className = "numTitle col-1";
				objTitle.textContent = objs[index].attributes.name.textContent;			
				
			let objCol1 = document.createElement('div');
				objCol1.className="col-8 align-self-center";
			
			let objCode = document.createElement('pre');	
				objCode.className = "text-success";
				objCode.textContent = objs[index].attributes.value.textContent;
				objCol1.append(objCode);
				
						
			let objCopy = document.createElement('div');
				objCopy.className = "col-1 copy-btn";
			let objCopyBtn = document.createElement('button');
				objCopyBtn.type = "button";
				objCopyBtn.className = "btn btn-light btn-clipboard";
				objCopyBtn.dataOriginalTitel = "Copy to clipboard";
				objCopyBtn.textContent = "Copy";
			objCopy.append(objCopyBtn);
				
			let objCol2 = document.createElement('div');
				objCol2.className = "col-2 align-self-center text-body";
				objCol2.textContent = objs[index].attributes.description.textContent;
				objCol2.style = "word-wrap: break-word;";
			
			objRow.append(objTitle);	
			objRow.append(objCol1);
			objRow.append(objCopy);
			if(namefile=='data/sql_snippets.xml'){
				let wl = objCol2.textContent.length - objCol2.textContent.match(/<{.*}>/)[0].length;
				console.warn(wl);
				objCol2.textContent =  objCol2.textContent.slice(0, wl);
				let objImg = document.createElement('img');
				let srcImgRaw=objs[index].attributes.description.textContent;
				//console.log(srcImgRaw);
				if (srcImgRaw.length > 0){
					let srcImg = srcImgRaw.match(/<{.*}>/)[0].slice(1,-1).slice(1,-1);
					//console.warn(srcImg);
					objImg.src = 'img/'+srcImg;
					objImg.width= 100;
					objCol2.append(objImg);
				}
			}
			
			objCopy.addEventListener('click',function(e){
				console.log(e.target.parentNode.previousSibling.childNodes[0].textContent);				
				let inp = document.createElement('input');
					document.body.appendChild(inp);
					inp.value = e.target.parentNode.previousSibling.childNodes[0].textContent;
					inp.select();
					document.execCommand('copy',false);
					inp.remove();
				});
			
			objRow.append(objCol2);	
			app.append(objRow);	
		 });	
	
	}
}
