var host;
var btnId;
var currentUrl;
var domainArray;
$(function(){
	chrome.windows.getCurrent(function(w) {
			    wid = w.id;
			    chrome.tabs.getSelected(wid, function(t) {
			            host=getDomainFromUrl(t.url);
			            currentUrl=t.url;
			            listCurrentCookies();
			    });
	});
	$("#filterInput").keyup(function(event){
		if(event.keyCode==8){//backspace
			showAllList();
		}else if(event.keyCode==13){//enter
			showAllList();
			return;
		}
		multiFilter($("#filterInput").val());
	});
	
	$("#cookieInput").keypress(function(event){
		if ( event.which == 13 ) {
			var cookieArray=$("#cookieInput").val().split(";");
			$(cookieArray).each(function(i,cookie){
				var c=cookie.split(",");
				chrome.cookies.set({"url":currentUrl,"name":c[0],"value":c[1],"domain":c[2],"path":c[3]});
			});
			$("#cookieInput").val("");
  		}
	});
	
	$("#domainFilterSelector,#pathFilterSelector").change(function(){
		showAllList();
		var domainF=$("#domainFilterSelector").find("option:selected").text();
		var pathF=$("#pathFilterSelector").find("option:selected").text();
		var keywords=(domainF=="-"?"":("|"+domainF+"|"))+" "+(pathF=="-"?"":("|"+pathF));
		multiFilter(keywords);
	});
	$("#pathCookieSelector").dblclick(function(){
		$("#pathCookieSelector").hide();
		$("#pathCookieInput").show();
		
	});
	$("#pathCookieInput").dblclick(function(){
		$("#pathCookieSelector").show();
		$("#pathCookieInput").hide();
		
	});
	$("#domainCookieSelector").dblclick(function(){
		$("#domainCookieSelector").hide();
		$("#domainCookieInput").show();
		
	});
	$("#domainCookieInput").dblclick(function(){
		$("#domainCookieSelector").show();
		$("#domainCookieInput").hide();
		
	});
	$("#cookieInput").focus();
});//初始化结束

//Array添加方法
Array.prototype.removeDuplication = function(){
	for (var i = 0; i < this.length; i++) {
		for (var j = i + 1; j < this.length; j++) {
			if (this[j]=="/"||this[i] == this[j]) {
				this.splice(j,1);
				i=-1;
				break;
			}
		}
	}
}
function getDomainFromUrl(url){
     var host = "null";
     if(typeof url == "undefined" || null == url)
          url = window.location.href;
     var regex = /.*\:\/\/([^\/]*).*/;
     var match = url.match(regex);
     if(typeof match != "undefined" && null != match)
          host = match[1];
     return host;
}
function addlistShow(val){
	$("#showOl").append("<li><span>"+val+"</span></li>");
}
function clearList(){
	$("#showOl").empty();
}
function showAllList(){
	$("#showOl>li").each(function(i,li){
		$(li).show();
	});
}

function multiFilter(keywords){
	keywords=keywords.split(" ");
	$("#showOl>li>span").each(function(i,span){
				for(var i=0;i<keywords.length;i++){
					var keyword=keywords[i].replace(/\|/gi,'\\|');
					if(!new RegExp(keyword, 'i').test($(span).text())){
						$(span).parent().hide();
						break;
					}
				}
			});
}
function listCurrentCookies(){
	$("#filterInput").focus();
	clearList();
	chrome.cookies.getAll({"url":currentUrl},function(cookies){
		var domainArray=new Array();
		var pathArray=new Array();
		$(cookies).each(function(i,cookie){
			domainArray.push(cookie.domain);
			pathArray.push(cookie.path);
			addlistShow(cookie.name+"<font color='red'>|</font>"+cookie.value+"<font color='red'>|</font>"+cookie.domain+"<font color='red'>|</font>"+cookie.path);
		});
		domainArray.removeDuplication();
		pathArray.removeDuplication();
		for(var i=0;i<domainArray.length;i++){
			$('#domainFilterSelector').append("<option>"+domainArray[i]+"</option>");
			$('#domainCookieSelector').append("<option>"+domainArray[i]+"</option>");
		}
		for(var i=0;i<pathArray.length;i++){
			$('#pathFilterSelector').append("<option>"+pathArray[i]+"</option>");
			$('#pathCookieSelector').append("<option>"+pathArray[i]+"</option>");
		}
	});
}