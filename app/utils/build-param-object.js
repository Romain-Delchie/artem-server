module.exports = (fields, data) => {
    const queryParamObject = {};
    fields.forEach((field) => {
      if (field in data) {
        queryParamObject[field] = data[field];
      }
    });
    return queryParamObject;
  };