export const getPagination = (query) => {
  const page = Math.max(parseInt(query.page) || 1, 1);
  const limit = Math.max(parseInt(query.limit) || 10, 1);
  const skip = (page - 1) * limit;

  return { page, limit, skip };
};

export const buildSearchQuery = (search, fields = []) => {
  if (!search || !fields.length) {
    return {};
  }

  return {
    $or: fields.map((field) => ({
      [field]: { $regex: search, $options: 'i' }
    }))
  };
};

export const buildDateRangeQuery = (startDate, endDate, field = 'startDate') => {
  if (!startDate || !endDate) {
    return {};
  }

  return {
    [field]: {
      $gte: new Date(startDate),
      $lte: new Date(endDate)
    }
  };
};
