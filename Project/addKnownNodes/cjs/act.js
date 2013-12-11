!function (exports,undefined){
    exports.actjs = exports.actjs || {};	
    exports.actjs = {
	addHandler:function (element,type,handler){
	    if(element.addEventListener){
   		addEventHandler = function (element,type,handler){
   		    element.addEventListener(type,handler,false);
   	        };
   	    }else if(element.attachEvent){
   		addEventHandler = function (element,type,handler){
   		    element.attachEvent("on" + type,handler);
   	        };
   	    }else{
   		addEventHandler = function (element,type,handler){
   	            element["on" + type] = handler;
   	        };
   	    }
	    addEventHandler(element,type,handler);
	},
	createXHR:function (){
		return new XMLHttpRequest();
	},
        events:function (obj){
	    var el,
	        arr;
	    for(var i in obj){
	        arr = i.split(" ");	
	        el = this.getId(arr[1]);
	        this.addHandler(el,arr[0],this[obj[i]]);
	    }
	},
        getId:function (name){
		return document.getElementById(name);
	},
	getClass:function (name){
		return document.getElementsByClassName(name);
	},
	getQuery:function (name){
		return document.querySelector(name);
	},
	getAllqu:function (name){
		return document.querySelectorAll(name);
	},
	creaEl:function (name,clsName,IDname){
		var reEl = document.createElement(name);
		if(clsName) reEl.className = clsName;
		if(IDname) reEl.id = IDname;
		return reEl;
	},
	ajaxURL:function (options){
	    var xhr = this.createXHR(),
	        URL = options.URL,
	        type = options.type,
	        postcont = options.postcont,
	        parse = options.parse,
	        callback = options.callback;
	    xhr.onreadystatechange=function (){
	    	if(xhr.readyState==4){
	    	    if((xhr.status>=200 && xhr.status<=300) || xhr.status==304){
	    		    var res = JSON.parse(xhr.responseText);
	    		    if(parse){
	    			res = parse(res);
	    		    }
	    		    if(callback){
	    		        callback(res);
	    		    }else{
	    		        return res;
	    		    }
	    		}else{  
	    		    console.log("wrong");
	    		}       
	    	}       
	    };      
	    xhr.open(type,URL,false);
	    xhr.send(null);
	},
	//formdata发送表单数据
	postdata:function (){
	    var formEl = actjs.getId("ipinfo"),
		URL = "cgi-bin/ajaxtest.py",
		callback = actjs.dumpinfo,
		ip = formEl["ipif"].value.trim(),
		port = formEl["portif"].value.trim();
	    if(ip === "" || port === ""){
	    	alert("please write some info");
	    	return false;
	    }
	    actjs.ajaxURL({
	        URL:URL+"?ip="+ip+"&port="+port+"&reqtype=setip",
	        type:"get",
	        callback:callback, 
		postcont:"ip"+ip+"&port="+port
	    });
	},
	//是否发送成功
	dumpinfo:function (res){
	    if(res.status == 0){
	    	alert("wrong info")
	    }else{
	        actjs.achinfo();
	    }
	},
        //页面初始化获得数据
        achinfo:function (){
	    var URL = "cgi-bin/ajaxtest.py",
		callback = actjs.drawlist;
	    actjs.ajaxURL({
	        URL:URL+"?reqtype=achieve",
	        type:"get",
	        callback:callback, 
		postcont:""
	    });
        },
	//初始化渲染数据
        drawlist:function (res){
	    var paul  = actjs.getId("iplist");
	    paul.innerHTML = "";
	    for(var i in res){
	        var el = actjs.creaEl("li","ipname");
		el.innerHTML = "ip address : " + i + " port: " + res[i];
	    	paul.appendChild(el);
	    }
        },
	initialize:function (){
	    this.events({
		"click formsubmit":"postdata"
	    });
	    this.achinfo();
	}
    };
    actjs.initialize();
}(window,undefined)
