function ajaxGet(path, timeFare){
    var motcData=[];
    $.ajax({ 
        type: 'GET',
        url: path,
        dataType: 'json',
        headers: GetAuthorizationHeader(),
        success: res =>{
            $.each(res, function(i, item) {
                if(timeFare=="time"){
                    for(ii=0; ii<item.TravelTimes.length; ii++){
                        motcData.push({
                            "fromStation" : item.TravelTimes[ii].FromStationName.Zh_tw,
                            "toStation" : item.TravelTimes[ii].ToStationName.Zh_tw,
                            "time" : item.TravelTimes[ii].RunTime,
                        })
                    }
                }
                else if (timeFare=="fare"){
                    motcData.push({
                        "originStationName" : item.OriginStationName.Zh_tw,
                        "destinationStationName" : item.DestinationStationName.Zh_tw,
                        "fares" : [item.Fares[0].Price, item.Fares[1].Price,item.Fares[2].Price, item.Fares[3].Price, item.Fares[4].Price, item.Fares[5].Price, item.Fares[6].Price, item.Fares[7].Price, item.Fares[8].Price, item.Fares[9].Price]
                    })
                }
            })
            console.log(motcData);
            var list=[];
            for(i=0; i<motcData.length; i++){
                list.push(motcData[i].originStationName);
            }
            var result = list.filter(function(element, index, arr){
                return arr.indexOf(element) === index && element !== undefined;
            });
            for(i=0; i<result.length; i++){
                $("#ulOriginFare").append("<li><p class='dropdown-item'>"+ result[i] +"</p></li>");
                $("#ulDestinationFare").append("<li><p class='dropdown-item'>"+ result[i] +"</p></li>");
            }
            $("#ulOriginFare .dropdown-item").on("click", function(){
                $("#dropdown1 button").html($(this).html());
            })
            $("#ulDestinationFare .dropdown-item").on("click", function(){
                $("#dropdown2 button").html($(this).html());
            })
            console.log(result.length);
            console.log(motcData[0].time);
            for(i=0; i<result.length-1; i++){
                var time=motcData[i+1].time-motcData[i].time
                console.log(time);
                $("#rowTime .row").append("<div class='col-1 text-center bg-dark border rounded border-0 border-dark overflow-hidden text-white align-self-center'>"+ result[i] +"</div><div class='col-1 text-center'>-><br>"+time+"s</div></div>");
                if(i!=result.length-1){
                    $("#rowTime .row").append("<div class='col-1 text-center bg-dark border rounded border-0 border-dark overflow-hidden text-white align-self-center'>"+ result[i+1] +"</div>");
                }
            }



            if(timeFare=="time"){
                $("#btFare").on("click", function(){ 
                    var result1 = motcData.filter(function(element, index, arr){
                        return element.fromStation == $("#dropdown1 button").text() && element.toStation == $("#dropdown2 button").text()
                    });
                    $("#Time").text(result1[0].time);
                })
            }
            else if (timeFare=="fare"){
                $("#btFare").on("click", function(){ 
                    var result1 = motcData.filter(function(element, index, arr){
                        return element.originStationName == $("#dropdown1 button").text() && element.destinationStationName == $("#dropdown2 button").text()
                    });
                    $("#price1").text(result1[0].fares[0]);
                    $("#price2").text(result1[0].fares[1]);
                    $("#price3").text(result1[0].fares[2]);
                    $("#price4").text(result1[0].fares[3]);
                    $("#price5").text(result1[0].fares[4]);
                    $("#price6").text(result1[0].fares[5]);
                    $("#price7").text(result1[0].fares[6]);
                    $("#price8").text(result1[0].fares[7]);
                    $("#price9").text(result1[0].fares[8]);
                    $("#price10").text(result1[0].fares[9]);
                })
            }
            
        },
        error: res =>{
            console.log("err");
        }
    });
    //return motcData;
}





$(document).ready(function(){
    $("#btDownload").click(function(){
        farePath="https://ptx.transportdata.tw/MOTC/v2/Rail/Metro/ODFare/TYMC?%24format=JSON";
        timePath="https://ptx.transportdata.tw/MOTC/v2/Rail/Metro/S2STravelTime/TYMC?%24format=JSON";
        ajaxGet(farePath, "fare");
        ajaxGet(timePath, "time");
        //console.log (ajaxGet(farePath, "fare"));
    })
    $("#BtCheckJobNum").click(function () {
        var dataJSON = $("#inputCheckJobNum").val()
        read(dataJSON);
        $("#show").show();
    });
    $("#selectMRT .dropdown-item").on("click", function(){
        $("#selectMRT button").html($(this).html());
    })
    $("#selectMRT button").on("click", function(){
        $("#rowTime").html("");
        $("#ulOriginFare").html("");
        $("#ulDestinationFare").html("");
    })
});



function GetAuthorizationHeader() {
    var AppID = 'FFFFFFFF-FFFF-FFFF-FFFF-FFFFFFFFFFFF';
    var AppKey = 'FFFFFFFF-FFFF-FFFF-FFFF-FFFFFFFFFFFF';

    var GMTString = new Date().toGMTString();
    var ShaObj = new jsSHA('SHA-1', 'TEXT');
    ShaObj.setHMACKey(AppKey, 'TEXT');
    ShaObj.update('x-date: ' + GMTString);
    var HMAC = ShaObj.getHMAC('B64');
    var Authorization = 'hmac username=\"' + AppID + '\", algorithm=\"hmac-sha1\", headers=\"x-date\", signature=\"' + HMAC + '\"';

    return { 'Authorization': Authorization, 'X-Date': GMTString /*,'Accept-Encoding': 'gzip'*/}; //如果要將js運行在伺服器，可額外加入 'Accept-Encoding': 'gzip'，要求壓縮以減少網路傳輸資料量
}

// S2STravelTime 取得捷運列車站間運行時間資料

var TravelTime_Array = [];
var TravelTime_Counter = [0, 20, 39, 57, 74, 90, 105, 119, 132, 144, 155, 165, 174, 182, 189, 195, 200, 204, 207, 209];

$(function ()
{
    $.ajax(
    {
        type: 'GET',
        url: 'https://ptx.transportdata.tw/MOTC/v2/Rail/Metro/S2STravelTime/TYMC?%24format=JSON',
        dataType: 'json',
        headers: GetAuthorizationHeader(),
        success: 
            function(result)
            {
                $.each(result, function (i, index)
                {
                    if (i == 0)
                    {
                        $.each(TravelTime_Counter, function (j, TravelTime_Counter)
                        {
                            TravelTime_Array[j] = index.TravelTimes[TravelTime_Counter].RunTime;
                        });
                    }
                    else
                    {
                        return false;
                    }
                });
            
                // console.log(TravelTime_Array);
            }
    });
});

// ODFare 取得捷運起迄站間票價資料

var Fare_Array = [];
var NUM = 0;

$(function ()
{
    $.ajax(
        {
            type: 'GET',
            url: 'https://ptx.transportdata.tw/MOTC/v2/Rail/Metro/ODFare/TYMC?%24format=JSON',
            dataType: 'json',
            headers: GetAuthorizationHeader(),
            success: 
                function (result)
                {
                    $.each(result, function (i, index)
                    {
                        if (i % 21 == 0)
                        {
                            Fare_Array[NUM] = index.Fares[0].Price;
                            NUM++;
                        }
                        else
                        {
                            return true;
                        }
                    });
                }
        });
});

// Station 取得捷運車站基本資料

var Station_Name = [];
var Station_Address = [];

$(function ()
{
    $.ajax(
        {
            type: 'GET',
            url: 'https://ptx.transportdata.tw/MOTC/v2/Rail/Metro/Station/TYMC?%24format=JSON',
            dataType: 'json',
            headers: GetAuthorizationHeader(),
            success: 
                function (result) 
                {
                    $.each(result, function (i, index) 
                    {
                        if (i <= 20) 
                        {
                            Station_Name[i] = index.StationID + " " + index.StationName.Zh_tw;
                            Station_Address[i] = index.StationAddress;
                        }
                        else 
                        {
                            return true;
                        }
                })
        }});
});

document.addEventListener('keydown',Setting,false);

function Setting()
{
$(function () 
{
    for (var i = 0; i <= 20; i++) 
    {
        if (i == 20) 
        {
            $("#RESULT").append('<center>' + Station_Name[i] + '（' + Station_Address[i]+ '）'+ '</center>');
        }
        else 
        {
            $("#RESULT").append('<center>' + Station_Name[i] + '（' + Station_Address[i] + '）' + '</center>' + '<br></br>'
                +'<center>' + '票價:NT$ ' + Fare_Array[i] + '<font color="#FF0000">' + '　▼　' + '</font>'
                + '時間: ' + TravelTime_Array[i] / 60 + " 分 " + TravelTime_Array[i] % 60 + " 秒" + '<br></br>' + '</center>');
        }
    }
});
document.removeEventListener('keydown',Setting,false);
};

function GetAuthorizationHeader() 
{
    var AppID = 'FFFFFFFF-FFFF-FFFF-FFFF-FFFFFFFFFFFF';
    var AppKey = 'FFFFFFFF-FFFF-FFFF-FFFF-FFFFFFFFFFFF';

    var GMTString = new Date().toGMTString();
    var ShaObj = new jsSHA('SHA-1', 'TEXT');
    ShaObj.setHMACKey(AppKey, 'TEXT');
    ShaObj.update('x-date: ' + GMTString);
    var HMAC = ShaObj.getHMAC('B64');
    var Authorization = 'hmac username=\"' + AppID + '\", algorithm=\"hmac-sha1\", headers=\"x-date\", signature=\"' + HMAC + '\"';

    return { 'Authorization': Authorization, 'X-Date': GMTString /*,'Accept-Encoding': 'gzip'*/}; //如果要將js運行在伺服器，可額外加入 'Accept-Encoding': 'gzip'，要求壓縮以減少網路傳輸資料量
}