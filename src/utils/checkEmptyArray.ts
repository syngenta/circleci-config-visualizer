const checkEmptyArray = (arr: any[]) => {
  if(!arr) return false;
  return arr.length?true:false;
}

export default checkEmptyArray;