var app = {

	init: function() {
		console.log('app.init');
		var hash = window.location.hash.replace(/^.*?#/,'');

		if (hash == '') {
			app.getPosts();
			
		}

		$('.app-menu a').on('click', app.menus);

	},

	getPosts: function() {
		console.log('app.getPosts');
		var rootURL = 'http://udara.info/cartoonApp/index.php/api/services';

		$.ajax({
			type: 'GET',
			url: rootURL + '/getImagesFeed/format/json',
			dataType: 'json',
			success: function(data){
				$.each(data, function(index, value) {
			      $('ul.topcoat-list').append('<li class="topcoat-list__item">' +
				    '<h4>'+value.cartoonist+'</h4>'+
			      	'<a class="view-link" href="#'+value.id+'">' +
			      	'<img src="'+value.url+'" style="width:100%" /></a><br><br>' +
			      	'</li>');
			    });
			},
			error: function(error){
				console.log(error);
			}

		});

	},

	getSinglePost: function(postID) {
		console.log('getSinglePost');

		var rootURL = 'http://udara.info/cartoonApp/index.php/api/services';

		$.ajax({
			type: 'GET',
			url: rootURL + '/getSingleImage/' + postID + '?format=json',
			dataType: 'json',
			success: function(data){

	        
	        document.addEventListener("deviceready", onDeviceReady, false);

	        // device APIs are available
	        //
	        function onDeviceReady() {

	        	 var URL = 'http://udara.info/cartoonApp/index.php/api/services/getFavouritesByID/'+ device.uuid +'/' + data[0].id + '?format=json' ;

					$.ajax({
						type: 'GET',
						url: URL,
						dataType: 'json',
						success: function(dataa){

							if(dataa.status == '0'){
								//Status = 0 Cartoon is not faved
								$('.single-post .title').append(data[0].cartoonist);
								$('.single-post .content').append('<img src="'+ data[0].url +'" style="width:100%" />' +
									'<h5><b>Published on </b>'+ data[0].date +'</h5><hr>' +
									'<div class="buttonbardiv">' +
									'<a class="btn btn-default  btn-sm buttonbar share s_twitter" href="#" role="button"><i class="fa fa-twitter fa-2x"></i></a>' +
									'<a class="btn btn-default  btn-sm buttonbar share s_facebook" href="#" role="button"><i class="fa fa-facebook-official fa-2x"></i></a>' +
									'<a class="btn btn-default  btn-sm buttonbar share s_plus" href="#" role="button"><i class="fa fa-google-plus-square fa-2x"></i></a>' +
									'<button id="myBtn" class="btn btn-default  btn-sm buttonbar" href="#" role="button"><i class="fa fa-heart fa-2x"></i></button>' +
									// '<button id ="download" class="btn btn-default  btn-sm buttonbar" href="#" role="button"><i class="fa fa-download fa-2x"></i></button>' +
									'</div>'

								 );

								    $('.share').ShareLink({
				                    title: 'Cartoon by ' + data[0].cartoonist,
				                    text: 'Cartoon by ' + data[0].cartoonist,
				                    image: data[0].url,
				                    url: data[0].url
				                	});

								 //    document.getElementById("download").addEventListener("click", function(){
								 //    	alert("Download clicked!");

								 //    	var that = this,
									// 		filePath = "";
									// 		var fileName = "sample.png",
									// 			uri = encodeURI("http://www.telerik.com/sfimages/default-source/logos/app_builder.png"),
									// 			folderName = "test";

								 //    	this.getFilesystem(
									// 	function(fileSystem) {
									// 		console.log("gotFS");
						                    
									// 		if (device.platform === "Android") {
									// 			this.getFolder(fileSystem, folderName, function(folder) {
									// 				filePath = folder.toURL() + "\/" + fileName;
									// 				this.transferFile(uri, filePath)
									// 			}, function() {
									// 				console.log("failed to get folder");
									// 			});
									// 		} else {
									// 			var filePath;
									// 			var urlPath = fileSystem.root.toURL();
									// 			if (device.platform == "Win32NT") {
									// 				urlPath = fileSystem.root.fullPath;
									// 			}
									// 			if (parseFloat(device.cordova) <= 3.2) {
									// 				filePath = urlPath.substring(urlPath.indexOf("/var")) + "\/" + fileName;
									// 			} else {
									// 				filePath = urlPath + "\/" + fileName;
									// 			}
									// 			this.transferFile(uri, filePath)
									// 		}
									// 	},
									// 	function() {
									// 		console.log("failed to get filesystem");
									// 	}
									// 	);


								    	
									// });


								    document.getElementById("myBtn").addEventListener("click", function(){
									    var rootURL = 'http://udara.info/cartoonApp/index.php/api/services/updateFavourites/'+ device.uuid  +'/' + data[0].id+ '?format=json';
								    		$.ajax({
											type: 'GET',
											url: rootURL,
											dataType: 'json',
											success: function(data){
												alert("Successfully Favourited!");
												$('.single-post .title').html('');;
												$('.single-post .content').html('');
												// document.getElementById("myBtn").setAttribute("class", "btn btn-danger  btn-sm buttonbar");
												app.getSinglePost(postID);
											},
											error: function(error){
												console.log(error);
												alert("failed!");
											}

										});
									});

							} else if(dataa[0].status == '1') {
								//Status = 0 Cartoon is favourited

								$('.single-post .title').append(data[0].cartoonist);
								$('.single-post .content').append('<img src="'+ data[0].url +'" style="width:100%" />' +
									'<h5><b>Published on </b>'+ data[0].date +'</h5><hr>' +
									'<div class="buttonbardiv">' +
									'<a class="btn btn-default  btn-sm buttonbar share s_twitter" href="#" role="button"><i class="fa fa-twitter fa-2x"></i></a>' +
									'<a class="btn btn-default  btn-sm buttonbar share s_facebook" href="#" role="button"><i class="fa fa-facebook-official fa-2x"></i></a>' +
									'<a class="btn btn-default  btn-sm buttonbar share s_plus" href="#" role="button"><i class="fa fa-google-plus-square fa-2x"></i></a>' +
									'<button id="myBtn" class="btn btn-danger  btn-sm buttonbar" href="#" role="button"><i class="fa fa-heart fa-2x"></i></button>' +
									// '<button id ="download" class="btn btn-default  btn-sm buttonbar" href="#" role="button"><i class="fa fa-download fa-2x"></i></button>' +
									'</div>'

								 );

								    $('.share').ShareLink({
				                    title: 'Cartoon by ' + data[0].cartoonist,
				                    text: 'Cartoon by ' + data[0].cartoonist,
				                    image: data[0].url,
				                    url: data[0].url
				                	});

									// document.getElementById("download").addEventListener("click", function(){
								 //    	alert("Download clicked!");
										




									// });

								    document.getElementById("myBtn").addEventListener("click", function(){
									    var rootURL = 'http://udara.info/cartoonApp/index.php/api/services/updateFavourites/'+ device.uuid  +'/' + data[0].id+ '?format=json';
								    		$.ajax({
											type: 'GET',
											url: rootURL,
											dataType: 'json',
											success: function(data){
												alert("Removed from Favourites!");
												// document.getElementById("myBtn").setAttribute("class", "btn btn-default  btn-sm buttonbar");	
												$('.single-post .title').html('');
												$('.single-post .content').html('');
												app.getSinglePost(postID);										
											},
											error: function(error){
												console.log(error);
												alert("failed!");
											}

										});
									});

							} else{
								alert("Error! Please Report");
							}
						},
						error: function(error){
							console.log(error);
							alert("ajax! fails");
						}
						});


	        }

				

			},
			error: function(error){
				console.log(error);
			}

		});

	},

	getMemes: function() {
		console.log('app.getMemes');
		var rootURL = 'http://udara.info/cartoonApp/index.php/api/services';

		$.ajax({
			type: 'GET',
			url: rootURL + '/getMemesFeed/format/json',
			dataType: 'json',
			success: function(data){
				$.each(data, function(index, value) {
			      $('ul.topcoat-list').append('<li class="topcoat-list__item">' +
				    '<h4>'+value.cartoonist+'</h4>'+
			      	'<a class="view-link" href="#'+value.id+'">' +
			      	'<img src="'+value.url+'" style="width:100%" /></a><br><br>' +
			      	'</li>');
			    });
			},
			error: function(error){
				console.log(error);
			}

		});

	},

	getCartoons: function() {
		console.log('app.getCaroons');
		var rootURL = 'http://udara.info/cartoonApp/index.php/api/services';

		$.ajax({
			type: 'GET',
			url: rootURL + '/getCartoonFeed/format/json',
			dataType: 'json',
			success: function(data){
				$.each(data, function(index, value) {
			      $('ul.topcoat-list').append('<li class="topcoat-list__item">' +
				    '<h4>'+value.cartoonist+'</h4>'+
			      	'<a class="view-link" href="#'+value.id+'">' +
			      	'<img src="'+value.url+'" style="width:100%" /></a><br><br>' +
			      	'</li>');
			    });
			},
			error: function(error){
				console.log(error);
			}

		});

	},

	testF: function(){
		alert("success!");
	},


	getFavourites: function() {
		console.log('app.getfavs');
		

		document.addEventListener("deviceready", onDeviceReady, false);


	    function onDeviceReady() {

	    	var did = device.uuid;
	    	var rootURL = 'http://udara.info/cartoonApp/index.php/api/services/getFavourites/'+ device.uuid +'?format=json';

		$.ajax({
			type: 'GET',
			url: rootURL,
			dataType: 'json',
			success: function(data){
				$.each(data, function(index, value) {
			      $('ul.topcoat-list').append('<li class="topcoat-list__item">' +
				    '<h4>'+value.cartoonist+'</h4>'+
			      	'<a class="view-link" href="#'+value.id+'">' +
			      	'<img src="'+value.url+'" style="width:100%" /></a><br><br>' +
					'<div class="buttonbardiv">' +
					'<a class="btn btn-danger btn-sm buttonbar" href="#" role="button"><i class="fa fa-heart fa-2x"></i></a>' +
					// '<a class="btn btn-default  btn-sm buttonbar" href="#" role="button"><i class="fa fa-download fa-2x"></i></a>' +
					'<a class="btn btn-default  btn-sm buttonbar" href="#'+value.id+'" role="button"><i class="fa fa-share-alt-square fa-2x"></i></a>' +
					'</div><br>' +
			      	'</li>');
			    });
			},
			error: function(error){
				console.log(error);
			}

		});

	}

	},

	route: function(event) {
		var homePage =
    		'<div class="home"><ul class="topcoat-list"></ul></div>';

		var singlePost =
		    '<div><article class="single-post">' +
			'<a class="btn btn-primary  btn-sm" href="#" role="button"><span class="glyphicon glyphicon-menu-left"></span> Back</a>' +
		    '<h3 class="title"></h3>' +
		    '<div class="content"></div><br>' +	
		    '</article></div>';

		var aboutPage = 
			'<div><article class="static-page">' +
			'<a class="btn btn-primary  btn-sm" href="#" role="button"><span class="glyphicon glyphicon-menu-left"></span> Back</a>' +
			'<div class="buttonbardiv"><img src="images/icon.png" style="width:30%" />' +
			'<h4>Version 1.0 (Awesome Build)</h4>' +
			'<h5>Send feed back to <b>udarapathmin@gmail.com</b></h5><br>' +
			'<img src="images/sliiit_logo.jpg" style="width:60%" /><br><br>' +
			'<p> Special Credit goes to Sir Lakmal for encouraging us on this mobile application. ' +
		    'Special Thanks goes to Awantha Artigala for giving us the chance to publish these cartoons on our app <br><br>' + 
		    '<b>Made by Arun Thomas and Udara Karunarathna of SLIIT</b></p></div>' +
			'</article></div>';
			
		var settingpage = 
			'<div><h4>Favourites</h4><br>' + 
			'<div class="home"><ul class="topcoat-list"></ul></div>';

		var meme =
			'<div class="home"><ul class="topcoat-list"></ul></div>';

		var cartoon =
			'<div class="home"><ul class="topcoat-list"></ul></div>';

		var page,
        hash = window.location.hash.replace(/^.*?#/,'');
        console.log(hash);

        /* If the hash is sample, show the samplePage. If it's anything else, load the singlePost view, otherwise it's the homePage */

        if (hash == 'about') {
        	page = aboutPage;
        } else if (hash == 'settingpage') {
        	page = settingpage;
        	app.getFavourites();
        } else if (hash == 'meme') {
        	page = meme;
        	app.getMemes();
        } else if (hash == 'cartoon') {
        	page = cartoon;
        	app.getCartoons();
        } else if (hash != '') {
        	page = singlePost;
        	app.getSinglePost(hash);
        } else {
        	console.log('home page');
    		page = homePage;
    		app.init();
    	}

    	slider.slidePage($(page));
	},

	menus: function(event) {

		// Close the slide panel if a menu button is clicked
		$('.js-app-container').removeClass('slideIn').addClass('slideOut');

	},


}

var slider = new PageSlider($("#container"));

$(window).on('hashchange', app.route);

app.route();

