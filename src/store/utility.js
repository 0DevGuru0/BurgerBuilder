export const updateObject = (state,{updatedElement})=>{
  return{
    ...state,
    ...updatedElement
  }
 
}