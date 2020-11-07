function getDateArray(date){
    var m=date.getMonth()+1;
    if(m == 12)
        m = 0;
    var weekOfDay = date.getDay();
    var arr = new Array();
    var tmpDate = new Date(date);
    var storage=window.localStorage;
    var current = new Date();
    while(weekOfDay != 1){
        var obj = new Object();
        date = new Date(date - 24*60*60*1000);
        if(storage.getItem(toStr(date))){
            obj.task = JSON.parse(storage.getItem(toStr(date)));
        }
        if(date.getDate() == current.getDate() && date.getMonth() == current.getMonth() && date.getFullYear() == current.getFullYear()){
            obj2.currentDate = true;
        }
        obj.date = new Date(date);
        arr.unshift(obj);
        weekOfDay = date.getDay();
    }
    while(m  != tmpDate.getMonth() || weekOfDay != 1){
        var obj2 = new Object();
        obj2.date = new Date(tmpDate);
        if(storage.getItem(toStr(tmpDate))){
            obj2.task = JSON.parse(storage.getItem(toStr(tmpDate)));
        }
        if(m != tmpDate.getMonth()){
            obj2.currentMonth = true;
        }
        if(tmpDate.getDate() == current.getDate() && tmpDate.getMonth() == current.getMonth() && tmpDate.getFullYear() == current.getFullYear()){
            obj2.currentDate = true;
        }
        arr.push(obj2);
        tmpDate.setDate(tmpDate.getDate() + 1);
        weekOfDay = tmpDate.getDay();
    }
    return arr;
  }
  function toStr(date){
      return date.getFullYear().toString()+date.getMonth().toString()+date.getDate().toString();
  }
  function getLastMonth(date){
    var year = date.getFullYear();
    var month = date.getMonth();
    if(month == 0){
         year = year -1;
         month = 11; 
    }else{
        month = month - 1;
    }
    console.log("year="+year+"month="+month)
    return [year,month];
}
export { getDateArray,getLastMonth }