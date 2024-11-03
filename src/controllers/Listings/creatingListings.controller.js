import prisma from '../../lib/prisma.js';

export const createListing = async (req, res) => {
  try {
    const { title, description, price, category} = req.body;
    const userId = req.user.id

    // checking, чи all обов'язкові inputs заповнені
    if (!title || !description || !price || !category || !userId) {
      return res.status(400).json({ error: 'All fields are required.' });
    }

    // creating new listings
    const newListing = await prisma.add.create({
      data: {
        title,
        description,
        price: parseFloat(price),
        category,
        user: { connect: { id: userId } }, // Зв'язування in user
      },
    });

    res.status(201).json(newListing);
  } catch (error) {
    console.error('Error creating ad:', error);
    res.status(500).json({ error: 'Internal server error.' });
  }
};
