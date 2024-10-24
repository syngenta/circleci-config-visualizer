const checkEmptyObj = (obj: any) => {
    if(!obj) return true;
    return Object.keys(obj).length === 0;
}

export default checkEmptyObj;