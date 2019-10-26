const sortItems = (items, sortBy, sortOrder, type) => {
  try {
    items.sort((a, b) => {
      switch (type) {
        case "date":
          if (sortOrder === 1) {
            return Date.parse(a.sortBy) < Date.parse(b.sortBy) ? 1 : -1;
          } else {
            return Date.parse(a.sortBy) > Date.parse(b.sortBy) ? 1 : -1;
          }
        case "number":
          if (sortOrder === 1) {
            return parseInt(a[sortBy]) < parseInt(b[sortBy]) ? 1 : -1;
          } else {
            return parseInt(a[sortBy]) > parseInt(b[sortBy]) ? 1 : -1;
          }
        default:
          if (sortOrder === 1) {
            return a[sortBy] < b[sortBy] ? 1 : -1;
          } else {
            return a[sortBy] > b[sortBy] ? 1 : -1;
          }
      }
    });
  } catch (error) {}
};

export default sortItems;
