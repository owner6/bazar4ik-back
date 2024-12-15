export const validateListingData = ({ title, description, price, category, userId }) => {
  if (!title) return 'Title is required';
  if (!description) return 'Description is required';
  if (!price) return 'Price is required';
  if (!category) return 'Category is required';
  if (!userId) return 'User ID is required';

  if (typeof price !== 'number') return 'Price must be a number';
  if (price <= 0) return 'Price must be greater than 0';

  if (typeof title !== 'string') return 'Title must be a string';
  if (title.length < 3) return 'Title must be at least 3 characters long';
  if (title.length > 100) return 'Title must not exceed 100 characters';

  if (typeof description !== 'string') return 'Description must be a string';
  if (description.length < 4) return 'Description must be at least 10 characters long';
  if (description.length > 1000) return 'Description must not exceed 1000 characters';

  return null;
};
