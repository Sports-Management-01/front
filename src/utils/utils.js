import dayjs from 'dayjs'
export const findItemByObjectID = (arr, id) => {
  for (var i = 0; i < arr.length; i++) {
    if ([arr[i].id] == id) {
      return i;
    }
  }
  return -1;
};

export const isPass =(date)=>{
  return date.isBefore(dayjs(new Date()))
   
}
export const timesOptions = [
  "00:00", "01:00", "02:00", "03:00", "04:00", "05:00", "06:00", "07:00","08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00", "22:00", "23:00", "24:00"
]
