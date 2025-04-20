class ApiFeatures {
  constructor(query, queryStr) {
    this.query = query;
    this.queryStr = queryStr;
    console.log("Query being sent to MongoDB:", this.query);
  }

  // search
  filter() {
    const queryCopy = { ...this.queryStr };

    // Remove fields that should not be in filters
    const removeFields = ["keyword", "page", "limits"];
    removeFields.forEach((key) => delete queryCopy[key]);

    // Convert filters to proper MongoDB format
    let filterObject = {};

    if (queryCopy.category) {
      filterObject.category = queryCopy.category;
    }

    if (queryCopy.minPrice || queryCopy.maxPrice) {
      filterObject.price = {};
      if (queryCopy.minPrice)
        filterObject.price.$gte = Number(queryCopy.minPrice);
      if (queryCopy.maxPrice)
        filterObject.price.$lte = Number(queryCopy.maxPrice);
    }

    if (queryCopy.rating) {
      filterObject.ratings = { $gte: Number(queryCopy.rating) };
    }

    this.query = this.query.find(filterObject);
    return this;
  }

  //  pagination
}

export default ApiFeatures;
