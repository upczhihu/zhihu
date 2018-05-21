var map = new BMap.Map('map');
var poi = new BMap.Point(116.307852, 40.057031);
map.centerAndZoom(poi, 16);//设置中心点坐标和地图级别
map.enableScrollWheelZoom(); //启用鼠标滚动对地图放大缩小

//鼠标绘制完成回调方法   获取各个点的经纬度
var overlays = [];
var overlaycomplete = function (e) {
    overlays.push(e.overlay);
    var path = e.overlay.getPath();//Array<Point> 返回多边型的点数组
    var points = [] //围栏点
    for (var i = 0; i < path.length; i++) {
        points.push({"longitude": path[i].lng, "latitude": path[i].lat})
    }
    var postdata = {
        "uid": 1,//用户id 暂时用1代替，以后取变量
        "points": points
    };
    $.ajax({
        url: "http://120.78.149.248:8080/fence/addfence",
        data: JSON.stringify(postdata),
        contentType: "application/json;charset=utf-8",
        dataType: "JSON",
        type: "POST",
        headers:{
            "Authorization":"Bearer"+localStorage.getItem("token")
    },
        success: function (responseJSON) {
            console.log(responseJSON)
        }
    });
};
var styleOptions = {
    strokeColor: "red",    //边线颜色。
    fillColor: "red",      //填充颜色。当参数为空时，圆形将没有填充效果。
    strokeWeight: 3,       //边线的宽度，以像素为单位。
    strokeOpacity: 0.8,       //边线透明度，取值范围0 - 1。
    fillOpacity: 0.6,      //填充的透明度，取值范围0 - 1。
    strokeStyle: 'solid' //边线的样式，solid或dashed。
};
//实例化鼠标绘制工具
var drawingManager = new BMapLib.DrawingManager(map, {
    isOpen: false, //是否开启绘制模式
    enableDrawingTool: true, //是否显示工具栏
    drawingMode: BMAP_DRAWING_POLYGON,//绘制模式  多边形
    drawingToolOptions: {
        anchor: BMAP_ANCHOR_TOP_RIGHT, //位置
        offset: new BMap.Size(5, 5), //偏离值
        drawingModes: [
            BMAP_DRAWING_POLYGON,
            BMAP_DRAWING_MARKER,
            BMAP_DRAWING_CIRCLE,
            BMAP_DRAWING_POLYLINE,
            BMAP_DRAWING_RECTANGLE,
        ]
    },
    polygonOptions: styleOptions //多边形的样式
});
//添加鼠标绘制工具监听事件，用于获取绘制结果
drawingManager.addEventListener('overlaycomplete', overlaycomplete);

function clearAll() {
    for (var i = 0; i < overlays.length; i++) {
        map.removeOverlay(overlays[i]);
    }
    overlays.length = 0
}
