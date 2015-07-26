google.maps.event.addDomListener(window, 'load', function()
        {
<<<<<<< HEAD
	    // マーカー表示状態

	    // イベント数から
	    var flags = new Array(0,0,1,0,1,0,0,1,0,0);
	    // 建物数から
	    var flags_num = new Array(0,2,1,3);
	    var zoom = 15;
	    var zoom_bef = 15;
=======
            var result {};
            $ajax({
                type: 'GET',
                dataType: 'json',
                url: 'localhost:5000/search',
                data: data,
                cache: false
            }).done(function(json){
                if(!json.error.length){
                    result.data = json.data;
                    if(json.data.length){
                        pick_result();
                    }    
                    else {
                        alert('データを取得できませんでした。');
                    }
                }
                else {
                    alert(json.error.join("\n"));
                }).fail(function(data){
                    alert('データ取得に失敗しました。');
            });
                
>>>>>>> 187c8fa9f625291106b229b67989b00ad0269edf
            var lng = 139.762087;
            var lat = 35.713290;
            var img_src = "/Users/AppBs/Work_master/Hackathon2015_5_25/event_map/app/static/img/";

            var mapCenter = new google.maps.LatLng(lat, lng);
            var mapOptions = {
		heading: 45,
                zoom: 15,
                center: mapCenter,
                mapTypeId: google.maps.MapTypeId.ROADMAP,
                scaleControl: true
            };
            var mapObj = new google.maps.Map(document.getElementById('gmap'), mapOptions);
	    var marker_list = new google.maps.MVCArray();
	    var infowindow;

            // マーカー用変数の設定
	    var markerUrl_num = new Array("../static/img/1_markers.png","../static/img/2_markers.png","../static/img/3_markers.png","../static/img/4_markers.png","../static/img/5_markers.png","../static/img/other_marker_yellow.png");
            var markerUrl_yel = new Array("../static/img/exhibit_marker_yellow.png","../static/img/job_marker_yellow.png","../static/img/networking_marker_yellow.png","../static/img/seminar_marker_yellow.png","../static/img/university_marker_yellow.png","../static/img/other_marker_yellow.png");
	    var markerUrl_red = new Array("../static/img/exhibit_marker_red.png","../static/img/job_marker_red.png","../static/img/networking_marker_red.png","../static/img/seminar_marker_red.png","../static/img/university_marker_red.png","../static/img/other_marker_red.png");
	    var markerUrl_eve = new Array("","","","","","","","","","");
	    var markerUrl_bui = new Array("","","","");
	    var genre = new Array(1,3,5,2,6,2,1,3,2,4);

	    // 適当なイベントデータ
	    var c_string = new Array('00','アントレ道場ハッカソン','勉強会','産学連携プラザ','15/07/26','Hack+Marathonで課題解決しましょう！\n http://www.ducr.u-tokyo.ac.jp/jp/venture/dojo/dojosummer/2015/index.html');
	    var contentString == '<b style="color: Blue;">ID</b> : ' + c_string[0] + '\t ジャンル: ' + c_string[2] + '\nイベント名: ' + c_string[1] +  '\n 開催＠' + c_string[3] + '\t 申込〆切: ' + c_string[4] + '\n 詳細: ' + c_string[5];

            var markerSize = new google.maps.Size(30, 30);
            var originPoint = new google.maps.Point(0, 0);
            var anchorPoint = new google.maps.Point(15, 30);
            var markerImg = null;

            // 各アイコンの座標位置
	    // これはデータベースから
            var latlngs = new Array(
                // kou2 35.714244, 139.761877
                new google.maps.LatLng(35.714244, 139.761877),
                // yasuda 35.713447, 139.762350
                new google.maps.LatLng(35.713447, 139.762350),
                // rigaku 35.709553, 139.761178
                new google.maps.LatLng(35.709553, 139.761178),
		//
		new google.maps.LatLng(35.712042, 139.761540),
		//
		new google.maps.Latlng(35.714844, 139.761177)
            );
	    var latlng_eve = new Array(latlngs[3],latlngs[0],latlngs[5],latlngs[1],latlngs[4],latlngs[2],latlngs[3],latlngs[5],latlngs[0],latlngs[2]);
	    var latlng_bui = new Array(latlngs[0],latlngs[3],latlngs[2],latlngs[1]);

            for (var i = 0; i < 5; i++) {
                // マーカー画像を作成
                var markerImg = new google.maps.MarkerImage(
                    markerUrl_yel[i],
                    markerSize,
                    originPoint,
                    anchorPoint
                );
                // マーカーを作成
                var marker = new google.maps.Marker({
                    position: latlngs[i],
                    map: mapObj,
                    icon: markerImg
                });
		marker_list.push(marker);
            }

	    for (var i = 0; i < marker_list.length; i++){
		google.maps.event.addListener(marker_list[i], 'click', function() {
		    showInfoWindow(this);
		});
	    }

	    google.maps.event.addListener(map, 'zoom_changed',function(){
		zoom = this.getZoom();
		for(var i = 0; i < flags.length; i++){
		    if((zoom == 17)&&(zoom-zoom_bef>0)){
			// 数
			display_marker_num();
		    }
		    else if((zoom == 17)&&(zoom-zoon_bef<0)){
			// ピクト
			display_marker_pict();
		    }
		}
		zoom_bef = zoom;
	    });	    

	    function showInfoWindow(obj){
		if(infowindow) infowindow.close();
		infowindow = new gooogle.maps.InfoWindow({
		    content: contentString
		});
		infowindow.open(mapObj,obj);
	    }

	    function display_marker_pict(){
		var add = 0;
                for(var j = 0; j < markerUrl_eve.length; j++){
		    add = genre[j] - 1;
                    if (flags[j] == 0){
                        markerUrl_eve[j] = markerUrl_yel[add];
                    }
                    else if (flags[j] == 1){
                        markerUrl_eve[j] = markerUrl_red[add];
                    }
		    else
			markerUrl_eve[j] = markerUrl_yel[5];
                }
		removeMarker();
		for (var i = 0; i < flags.length; i++) {
                    // マーカー画像を作成
                    var markerImg = new google.maps.MarkerImage(
			markerUrl_eve[i],
			markerSize,
			originPoint,
			anchorPoint
                    );
                    // マーカーを作成                                      
		    var marker = new google.maps.Marker({
			position: latlng_eve[i],
			map: mapObj,
			icon: markerImg
		    });
		    marker_list.push(marker);
		}
	    }
            function display_marker_zoom(){
		for (var j = 0; j < markerUrl_bui.length; j++){
		    switch(flags_num[j]){
		    case 1:
			markerUrl_bui[j] = markerUrl_num[0];
			break;
		    case 2:
			markerUrl_bui[j] = markerUrl_num[1];
			break;
		    case 3:
			markerUrl_bui[j] = markerUrl_num[2];
			break;
		    case 4:
			markerUrl_bui[j] = markerUrl_num[3];
			break;
		    case 5:
			markerUrl_bui[j] = markerUrl_num[4];
			break;
		    case 0:
			markerUrl_bui[j] = markerUrl_num[5];
			break;
		    }
		}
		removeMarker();
                for (var i = 0; i < flags_num.length; i++) {    
                    // マーカー画像を作成                                  
                    var markerImg = new google.maps.MarkerImage(
                        markerUrl_bui[i],
                        markerSize,
			originPoint,
			anchorPoint
                    );
                    // マーカーを作成                                      
                    var marker = new google.maps.Marker({
                        position: latlng_bui[i],
                        map: mapObj,
                        icon: markerImg
                    });
		    marker_list.push(marker);
                }
	    }
	    function removeMarker(){
		marker_list.forEach(function(marker, idx) {
		    marker.setMap(null);
		});
	    }
        });
