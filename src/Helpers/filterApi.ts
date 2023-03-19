const filterApi = (data:[]) => {
  return data.slice(0,10)
};

const sortUnlocked = (data:any[]) => {
  data.sort((a, b) => {
    if (a.unlocked === b.unlocked) {
      return 0;
    } else if (a.unlock) {
      return -1;
    } else {
      return 1;
    }
  });
  return data;
}


export { filterApi ,sortUnlocked }; 
