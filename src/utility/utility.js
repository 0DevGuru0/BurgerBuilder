export const checkValidity=(value,rules)=>{
    let isValid = true;
    if(!rules){
      return true;
    }
    if(rules.required){
      isValid = value.trim() !== '' && isValid;
    }
    if(rules.minlength){
      isValid = value.length >= rules.minlength && isValid;
    }
    if(rules.isEmail){
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(value) && isValid;
    }
    if(rules.maxlength){
        isValid = value.length <= rules.maxlength && isValid;
      }
    return isValid;
}