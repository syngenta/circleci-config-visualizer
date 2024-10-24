const objToArrayConverter = (obj: any) => {
    if(!obj) return [];
    if(Array.isArray(obj)) return obj;
    return Object.keys(obj).map((key) => [key, obj[key]]);
}

export default objToArrayConverter;