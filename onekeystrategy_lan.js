

function unique3(toUnique) {
	var res = [];
	var json = {};
	for (var i = 0; i < toUnique.length; i++) {
		if (!json[toUnique[i]]) {
			res.push(toUnique[i]);
			json[toUnique[i]] = 1;
		}
	}
	return res;
}

function showStrategy(){
	
	if(!uiFilter["toulan"]){
		showStrategy2();
		return;
	}
		
	var theme = allThemes[$("#theme").val()];
	var filters = clone(criteria);
	filters.own = true;
	filters.missing = true;
			
	for (var i in CATEGORY_HIERARCHY) {
		if(i == "襪子"){
			filters[CATEGORY_HIERARCHY[i][0]] = true;	
			filters[CATEGORY_HIERARCHY[i][1]] = true;	
		}
		if(i != "飾品"){
			filters[CATEGORY_HIERARCHY[i]] = true;	
		}
		else{
			for (var j in CATEGORY_HIERARCHY[i]) {
				filters[CATEGORY_HIERARCHY[i][j]] = true;
			}			
		}
	}
	var result = {};
	//套裝
	var suitSet = {};
	for (var i in clothes) {
		var type = clothes[i].type.type
		if (!result[type]) {
			result[type] = [];
		}
		if (matches(clothes[i], {}, filters)) {
			clothes[i].calc(filters);
			if (clothes[i].isF||$.inArray(type,skipCategory)>=0) continue;
			result[type].push(clothes[i]);
			if(clothes[i].isSuit != "" 
				&& type.indexOf("連衣裙") < 0 
				&& type.indexOf("上衣") < 0 
				&& type.indexOf("下裝") < 0
			){
				var quanzhong = 1;
				if(type.indexOf("飾品") > 0)
					quanzhong = 0.5;
				if(suitSet[clothes[i].isSuit] == null)
					suitSet[clothes[i].isSuit] = 0;				
				suitSet[clothes[i].isSuit] +=  clothes[i].sumScore * quanzhong;
			}
		}
	}
	var suitArray = [];
	for(var i in suitSet){
		suitArray.push({"name": i, "score": suitSet[i]});
	}
	suitArray.sort(function(a,b){
		return  b["score"] - a["score"];
	});
	
	console.log(suitArray);
	
	//單品
	var resultWords = {};
	for(var i in result){
		result[i].sort(byScore);
		result[i].splice(80,999);
		resultWords[i] = [];
		for(var j in result[i]){
			resultWords[i].push.apply( resultWords[i], result[i][j].name.split('') );
		}
		resultWords[i] = unique3(resultWords[i]);
	}
	var wordNums = {};
	for(var i in resultWords){
		for(var j in resultWords[i]){
			var quanzhong = 0.35;
			if(i.indexOf("飾品") < 0)
				quanzhong = 1;
			wordNums[resultWords[i][j]] = (wordNums[resultWords[i][j]] == null ? quanzhong : wordNums[resultWords[i][j]] + quanzhong);
		}
	}
	
	var str = "粉毛運動少年雅公子家雪美學長神奇幻者主銀金紅白發黑藍小·棕灰之歌黃冰士楓薔薇女墨綠人精靈馬尾紫花蝶童心青月雲舞娘輕音光曲幽語天兔樂珠華麗珍稀娃可時蕾鹿頭古英糕滿夢星莉蝴水蘭千羅帽甜力寶溫夜愛絲手果泡流的短生戀色姐茶影暖錦聖信海風莓園普通情落香清下意奶高娜暗耳桃帶玫日夏典柔春竹巧調蜜草糖櫻葉羽跡火皮空包迷球瑰克魔裙格結冬衣祥紋上涼牛仔領點巾紗服絨枝套禮外背衫披裝條鏈環褲靴襪飾圈鞋跟冠項頸";
	var notArray = str.split("");
		
	var wordMostNum = [];
	for(var i in wordNums){
		if(wordNums[i] > 3 &&  $.inArray(i, notArray) < 0){
			wordMostNum.push({"name" : i , "num" : wordNums[i]});
		}
	}	
	wordMostNum.sort(function(a,b){
		return a["num"][1] - b["num"][1];
	});
	
	var strWordMostNum = "";
	var selectWordNum = 6;
	for(var i =0; i<selectWordNum && i < wordMostNum.length; i++){
		strWordMostNum += wordMostNum[i].name;
	}	
		
	var selectSuitNum = 6;
	showStrategy2(strWordMostNum.split(""), suitArray.slice(0,selectSuitNum));
	
	$(".stgy_clothes").each(function(){
		var $p = $(this)
		$.each(strWordMostNum.split(""), function(){
			$p.html($p.html().replace(new RegExp(""+this, "g"), "<red>"+this+"</red>"))			
		})
	})
}

