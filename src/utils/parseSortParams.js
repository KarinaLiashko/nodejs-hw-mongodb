const sortOrderList = ['asc', 'desc'];

export const parseSortParams = ({ sortBy, sortOrder }, sortByList) => {
  const parsedSortOrder = sortOrderList.includes(sortOrder)
    ? sortOrder
    : sortOrderList;

  const parsedSortBy = sortByList.includes(sortBy) ? sortBy : '_id';

  return {
    sortBy: parsedSortBy,
    sortOrder: parsedSortOrder,
  };
};

//async, desc
