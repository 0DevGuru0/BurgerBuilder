
import axios from 'axios';
const instance = axios.create({
  baseURL:'https://burger-cf798.firebaseio.com/ '
})


export default instance ;