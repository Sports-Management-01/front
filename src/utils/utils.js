import dayjs from 'dayjs'
const findItemByObjectID = (arr, id) => {
  for (var i = 0; i < arr.length; i++) {
    if ([arr[i].id] == id) {
      return i;
    }
  }
  return -1;
};

const isPass =(date)=>{
  return date.isBefore(dayjs(new Date()))
   
}

export default findItemByObjectID;
