$(function () {

    var json =
        [{
            "name": "全部文件",
            "code":"ALL",
            "icon": "icon-reduse",
            "isfather":"yes",
            "child": [
                {
                    "name": "营销部",
                    "icon": "icon-reduse",
                    "code":"ONE",
                    "parentCode": "ALL",
                            "child": [
                                {
                                    "name": "大客户部",
                                    "code":"ONE-ONE",
                                    "icon": "icon-reduse",
                                    "parentCode": "ONE",
                                    "child": [{
                                    	"name": "有策管理",
	                                    "code":"YCGL",
	                                    // "icon": "icon-reduse",
	                                    "parentCode": "ONE-ONE",
	                                    "child":[]
                                    }]
                                }
                            ]
                },
                {
                    "name": "管理中心",
                    "icon": "icon-reduse",
                    "code":"TWO",
                    "parentCode": "ALL",
                                "child": [
                                    {
                                        "name": "行政部",
                                        "code":"TWO-ONE",
                                        // "icon": "icon-reduse",
                                        "parentCode": "TWO",
                                        "child": []
                                    }
                                ]
                }
            ]
        }];


    function tree(data) {
        for (var i = 0; i < data.length; i++) {
            // var data2 = data[i];
            if (data[i].isfather == "yes") { //判断是 父级
                $("#rootUL").append("<li data-name='" + data[i].code + "'><span><i class='icon iconfont "+ data[i].icon + "'></i><i class='icon iconfont icon-folder'></i> " + data[i].name + "</span></li>");
            } else {
                var children = $("li[data-name='" + data[i].parentCode + "']").children("ul");//ZKCH
                if (children.length == 0) {
                    $("li[data-name='" + data[i].parentCode + "']").append("<ul></ul>")
                }
                $("li[data-name='" + data[i].parentCode + "'] > ul").append(
                    "<li data-name='" + data[i].code + "'>" +//GZZKCH
                    "<span>" +
                    "<i class='icon iconfont " + data[i].icon + "'></i><i class='icon iconfont icon-folder'></i> " +
                    data[i].name +//营销部
                    "</span>" +
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
                    "<i class='icon iconfont " + child.icon + "'></i><i class='icon iconfont icon-folder'></i> " +
                    child.name +//营销部
                    "</span>" +
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
