export const parseContactFilterParams = ({ type, isFavourite }) => {
  const filters = {};

  if (type) {
    filters.contactType = type;
  }

  if (typeof isFavourite === 'boolean') {
    filters.isFavourite = isFavourite;
  } else if (typeof isFavourite === 'string') {
    const lowerCaseValue = isFavourite.toLowerCase();
    if (lowerCaseValue === 'true') {
      filters.isFavourite = true;
    } else if (lowerCaseValue === 'false') {
      filters.isFavourite = false;
    }
  }

  return filters;
};
