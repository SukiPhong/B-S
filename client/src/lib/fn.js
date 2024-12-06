import { parse } from "path";

export const renderRangeNumber = (start,end) => { 
    return Array.from({ length: end -start +1  }, (_, index) => start + index);
 }
 export const sortObject=(obj) => {
    let sorted = {};
    let str = [];
    let key;
    for (key in obj) {
      if (obj.hasOwnProperty(key)) {
        str.push(encodeURIComponent(key));
      }
    }
    str.sort();
    for (key = 0; key < str.length; key++) {
      sorted[str[key]] = encodeURIComponent(obj[str[key]]).replace(/%20/g, "+");
    }
    return sorted;
  }
  export const changePriceToString =(String)=>{ 
    const number= parse(String)
    if (number > Math.pow(10, 9)) {
      return `${Math.round((number * 10) / Math.pow(10, 6)) / 10}tỷ`;
  } else if (number > Math.pow(10, 6)) {
      return `${Math.round((number * 10) / Math.pow(10, 3)) / 10}triệu`;
  } 
  // else if (number > Math.pow(10, 3)) {

  //   return `${Math.round((number * 10) / Math.pow(10, 3)) / 10}K`;
  // }
    else return number;
  }