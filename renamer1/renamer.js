function readSingleFile(evt) {
	//Retrieve the first (and only!) File from the FileList object
	// let output = document.getElementById("thumbs");
	console.log("evt======",evt);

	var f = evt.target.files[0]; 
	console.log("f======",f,"files[0]=========",files[0]);

	if (f) {
		var r = new FileReader();
		console.log("r======",r);

		r.onload = function(e) { 
			console.log("e======",e,">>>",e.target.result);
			var contents = String(e.target.result);
			console.log("contents======",contents);
			var imgArray = contents.split("\n");
			for(var i = 0; i < imgArray.length-1; i++){
				$("#thumbs").append("<img src='file:///"+imgArray[i]+"' crossOrigin='Anonymous' />")	
				 // let item = document.createElement("li");
     //             item.innerHTML = imgArray[i].webkitRelativePath;
				 // output.appendChild(item);			
				}
			}
			r.readAsText(f);
			console.log("++++++",r);
		}
	}


// =============================
function readFiles(evt) {
	//Retrieve the first (and only!) File from the FileList object
	// let output = document.getElementById("thumbs");
	console.log("event======",evt);
  // let output = document.getElementById("listing");
  let f = evt.target.files;
  // console.log("f======",f,"files[0]=========",files[0]);

  if(f){
  	// var r = new FileReader();
  	// console.log("r======",r);

  	// r.onload = function(e) { 
  	// 	console.log("e======",e,">>>",e.target.result);
  	// 	var contents = String(e.target.result);
  	// 	console.log("contents======",contents);
  	var files = evt.target.files;

  	for (let i=0; i<files.length-1; i++) {
  		$("#listing").append("<img src='file:///"+files[i].webkitRelativePath+"' crossOrigin='Anonymous' />");
  	}
  }

}

// =============================



window.onload = function() {

  // ========================
  // ========================


  document.getElementById('files').addEventListener('change', readSingleFile, false);
  document.getElementById("filess").addEventListener("change",readFiles, false);



function previewFile() {
  var preview = document.querySelector('img');
  var file    = document.querySelector('input[type=file]').files[0];
  var reader  = new FileReader();

  reader.addEventListener("load", function () {
    preview.src = reader.result;
  }, false);

  if (file) {
    reader.readAsDataURL(file);
  }
}


  var img = new Image;

  $("#listing").on("click", "img", function(e){
  	$('#canvas-container').html("Waiting For Image");
  	$('#canvas-container').html("<canvas id='imgModifier'></canvas>");
  	var canvas = new fabric.Canvas('imgModifier');
  	var size = window.innerWidth;
  	canvas.setHeight(size);
  	canvas.setWidth(size);
  	canvas.renderAll();
  	img = e.currentTarget;
  	img.crossOrigin = "Anonymous";
  	imgInstance = new fabric.Image(img, {
  		left: 10,
  		top: 10
  	});
  	canvas.add(imgInstance);		
  })

  $("#thumbs").on("click", "img", function(e){
  	$('#canvas-container').html("Waiting For Image");
  	$('#canvas-container').html("<canvas id='imgModifier'></canvas>");
  	var canvas = new fabric.Canvas('imgModifier');
  	var size = window.innerWidth;
  	canvas.setHeight(size);
  	canvas.setWidth(size);
  	canvas.renderAll();
  	img = e.currentTarget;
  	img.crossOrigin = "Anonymous";
  	imgInstance = new fabric.Image(img, {
  		left: 10,
  		top: 10
  	});
  	canvas.add(imgInstance);		
  })

  $("#saveImage").on("click", function(){
  	var gstId = $("#gstId").val();
  	var brandOwner = $("#brandOwner").val();
  	var templateNo = $("#templateNo").val();
  	var retailerId = $("#retailerId").val();
  	var date = $("#date").val();
  	var pageNo = $("#pageNo").val();
  	var noOfLines = $("#noOfLines").val();
  	var amount = $("#amount").val();
  	if(gstId == '' || brandOwner == '' || templateNo == '' || retailerId == '' || date == '' || pageNo == '' || noOfLines ==''){
  		alert('missing info in file name');
  	} else {
  		var fileName = gstId + "_" + brandOwner + "_" + templateNo + "_" + retailerId + "_" + date + "_" + pageNo + "_" + noOfLines + "_" + amount;
  		$("#imgModifier").get(0).toBlob(function(blob){
  			saveAs(blob, fileName+".png")
  		});
  	}
  })


  $("#gstId").on("change", function(e){
  	var gstId = $("#gstId").val();
  	var b     = gstId.split("_");
  	$("#gstId").val(b[0]);
  	$("#brandOwner").val(b[1]);
  	$("#templateNo").val(b[2]);

  	console.log(gstId);
  	console.log(b[0]);
  })
}