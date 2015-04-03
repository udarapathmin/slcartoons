document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {
	var that = this,
		App = new downloadApp(),
		fileName = "sample.png",
		uri = encodeURI("http://www.telerik.com/sfimages/default-source/logos/app_builder.png"),
		folderName = "test";
    
	navigator.splashscreen.hide();
	App.run(uri, fileName, folderName);
}

var downloadApp = function() {
}

downloadApp.prototype = {
	run: function(uri, fileName, folderName) {
		var that = this,
			filePath = "";
        
		document.getElementById("download").addEventListener("click", function() {
			that.getFilesystem(
				function(fileSystem) {
					console.log("gotFS");
                    
					if (device.platform === "Android") {
						that.getFolder(fileSystem, folderName, function(folder) {
							filePath = folder.toURL() + "\/" + fileName;
							that.transferFile(uri, filePath)
						}, function() {
							console.log("failed to get folder");
						});
					} else {
						var filePath;
						var urlPath = fileSystem.root.toURL();
						if (device.platform == "Win32NT") {
							urlPath = fileSystem.root.fullPath;
						}
						if (parseFloat(device.cordova) <= 3.2) {
							filePath = urlPath.substring(urlPath.indexOf("/var")) + "\/" + fileName;
						} else {
							filePath = urlPath + "\/" + fileName;
						}
						that.transferFile(uri, filePath)
					}
				},
				function() {
					console.log("failed to get filesystem");
				}
				);
		});
		
		
	},
    
	getFilesystem:function (success, fail) {
		window.requestFileSystem = window.requestFileSystem || window.webkitRequestFileSystem;
		window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, success, fail);
	},

	getFolder: function (fileSystem, folderName, success, fail) {
		fileSystem.root.getDirectory(folderName, {create: true, exclusive: false}, success, fail)
	},

	transferFile: function (uri, filePath) {
		var transfer = new FileTransfer();
		transfer.download(
			uri,
			filePath,
			function(entry) {
				var targetPath = entry.toURL();
				if (device.platform == "Win32NT") {
					targetPath = entry.fullPath;
				}
				// var image = document.getElementById("downloadedImage");
				// image.src = targetPath;
				// image.style.display = "block";
				// image.display = targetPath;
				alert("File saved to: " + targetPath);
			},
			function(error) {
				document.getElementById("result").innerHTML = "An error has occurred: Code = " + error.code;
				console.log("download error source " + error.source);
				console.log("download error target " + error.target);
				console.log("upload error code" + error.code);
				alert("error");
			}
			);
	},
	
}