export const currentItemsFunc = (currentPage: number, coursesData: any[]) => {
  const indexOfLastItem = currentPage * 5;
  const indexOfFirstItem = indexOfLastItem - 5;

  const currentItems =
    coursesData && coursesData.slice(indexOfFirstItem, indexOfLastItem);

  return currentItems;
};
export const pageNumbersFunc = (currentPage: number, coursesData: any[]) => {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(10 / 5); i++) {
    pageNumbers.push(i);
  }
  return pageNumbers;
};
