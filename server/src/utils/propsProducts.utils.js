function propsProductUtils(data) {
  const { title, photo, price, stock } = data;
  if (!title || !photo || !price || !stock) {
    const error = new Error(`title & photo & price & stock are required`);
    error.statusCode = 404;
    throw error;
  }
}

export default propsProductUtils;
