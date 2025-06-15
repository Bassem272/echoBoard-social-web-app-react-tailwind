
export  const isValidImageUrl = (url)=> {
  return typeof url === 'string' && url.startsWith('http') && url !== "errornot saved"; 
}; 