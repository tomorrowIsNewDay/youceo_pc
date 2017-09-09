
$(function () {

    var json =
        [{
            "name": "总公司",
            "code":"GROUP",
            "icon": "icon-group",
            "isfather":"yes",
            "child": [
                {
                    "name": "营销部",
                    "icon": "icon-group",
                    "code":"SALE",
                    "parentCode": "GROUP",
                            "child": [
                                {
                                    "name": "大客户部",
                                    "code":"BIGKEHU",
                                    "icon": "icon-group",
                                    "parentCode": "SALE",
                                    "child": [{
                                        	 "name": "大客户部1",
	                                      "code":"BIGKEHU1",
	                                      "icon": "icon-group",
	                                      "parentCode": "BIGKEHU",
	                                      "child":[]
                                        }]
                                }
                            ]
                },
                {
                    "name": "管理中心",
                    "icon": "icon-group",
                    "code":"CENTER",
                    "parentCode": "GROUP",
                                "child": [
                                    {
                                        "name": "行政部",
                                        "code":"XINZEN",
                                        "icon": "icon-group",
                                        "parentCode": "CENTER",
                                        "child": [{
                                        	 "name": "行政部1",
	                                      "code":"XINZEN1",
	                                      "icon": "icon-group",
	                                      "parentCode": "XINZEN",
	                                      "child":[]
                                        }]
                                    }
                                ]
                }
            ]
        }];


    function tree(data) {
        for (var i = 0; i < data.length; i++) {
            // var data2 = data[i];
            if (data[i].isfather == "yes") { //判断是 父级
                $("#rootUL").append("<li data-name='" + data[i].code + "'><span><i class='icon iconfont "+ data[i].icon + "'></i> " + data[i].name + "<i class='icon iconfont icon-triangle-right pull-right rotate90'></i></span></li>");

            } else {
                var children = $("li[data-name='" + data[i].parentCode + "']").children("ul");//ZKCH
                if (children.length == 0) {
                    $("li[data-name='" + data[i].parentCode + "']").append("<ul></ul>")
                }
                $("li[data-name='" + data[i].parentCode + "'] > ul").append(
                    "<li data-name='" + data[i].code + "'>" +//GZZKCH
                    "<span>" +
                    "<i class='icon iconfont " + data[i].icon + "'></i> " +
                    data[i].name +//营销部
                    "<i class='icon iconfont icon-triangle-right pull-right rotate90'></i></span>" +
                    "</li>")
            }
            for (var j = 0; j < data[i].child.length; j++) {
                var child = data[i].child[j];
                var children = $("li[data-name='" + child.parentCode + "']").children("ul");//ZKCH
                if (children.length == 0) {
                    $("li[data-name='" + child.parentCode + "']").append("<ul></ul>")//ZKCH
                }
                $("li[data-name='" + child.parentCode + "'] > ul").append(
                    "<li data-name='" + child.code + "'>" +//GZZKCH
                    "<span>" +
                    "<i class='icon iconfont " + child.icon + "'></i> " +
                    child.name +//营销部
                    "<i class='icon iconfont icon-triangle-right pull-right rotate90'></i></span>" +
                    "</li>")
                var child2 = data[i].child[j].child;
                tree(child2)
            }
            tree(data[i]);
        }

    }

    tree(json)

// console.log(json[i].icon)

});
