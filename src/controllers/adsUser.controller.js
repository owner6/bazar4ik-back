import prisma from '../lib/prisma.js';

export const getUserAds = async (req, res) => {
  try {
    const userId = req.user.id; // The user ID obtained from the JWT token
      
    console.log("Ідентифікатор користувача", userId)
    // Receive all user announcements
    const ads = await prisma.add.findMany({
      where: {
        userId: userId, // Filter by user ID
      },
      orderBy: {
        createdAt: 'desc', // Sort by creation date (optional)
      },
    });
    console.log("Receive all user announcements")

    if (!ads.length) {
      return res.status(404).json({ message: 'No ads found for this user.' });
    }

    // Відповідь з оголошеннями
    res.status(200).json(ads);
  } catch (error) {
    console.error('Error fetching user ads:', error);
    res.status(500).json({ error: 'Internal server error.' });
  }
};
