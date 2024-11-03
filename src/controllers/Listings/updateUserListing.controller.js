import prisma from '../../lib/prisma.js';

export const updateUserListing = async (req, res) => {
  try {
    const userId = req.body.userId; 
    
    console.log("Получаем пользователя", userId)

    const { id, title, description, price, category } = req.body; // Ensure you're extracting all necessary fields for the update

    console.log("Получаем ID товара", id);
    console.log("кто пользователь товара", userId);

    // Checking if both ID and userId are provided
    if (!id || !userId) {
      return res.status(400).json({ error: 'ID and userId must be provided.' });
    }

    // Find the existing listing
    const listing = await prisma.add.findUnique({
      where: { id: parseInt(id) },
    });
    console.log("Получаем обявление", listing.id)
    
    // Check if the listing exists and if the user is the owner
    if (!listing) {
      return res.status(404).json({ error: 'Listing not found.' });
    }

    if (listing.userId !== userId) {
      return res.status(403).json({ error: 'You are not authorized to update this listing.' });
    }

    // Update the listing
    const updatedListing = await prisma.add.update({
      where: { id: parseInt(id) },
      data: {
        title,
        description,
        price,
        category,
      },
    });

    return res.status(200).json(updatedListing);
  } catch (error) {
    console.error("Error updating listing:", error);
    return res.status(500).json({ error: 'An error occurred while updating the listing.' });
  }
};
