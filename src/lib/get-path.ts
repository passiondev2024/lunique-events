export const getGalleryImagePath = (
  userId: string,
  eventId: string,
  fileName: string,
) => {
  const date = new Date();
  const datePrefix = `${date.getHours()}-${date.getMinutes()}-${date.getSeconds()}`;

  return `user-${userId}/event-${eventId}/${datePrefix}-${fileName}`;
};
