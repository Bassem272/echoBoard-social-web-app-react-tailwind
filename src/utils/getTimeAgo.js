export const getTimeAgo = (dateTime) => {
  const current = new Date();
  const creation = new Date(dateTime);
  const ms = current - creation;

  const diffMinutes = Math.floor(ms / (1000 * 60));
  const hours = Math.floor(diffMinutes / 60);
  const minutes = diffMinutes % 60;
  const days = Math.floor(hours / 24);
  const remHours = hours % 24;

  if (days > 0) {
    return `${days} day${days !== 1 ? 's' : ''}${remHours > 0 ? ` ${remHours} hour${remHours !== 1 ? 's' : ''}` : ''}${minutes > 0 ? ` and ${minutes} minute${minutes !== 1 ? 's' : ''}` : ''} ago`;
  } else if (remHours > 0) {
    return `${remHours} hour${remHours !== 1 ? 's' : ''}${minutes > 0 ? ` and ${minutes} minute${minutes !== 1 ? 's' : ''}` : ''} ago`;
  } else if (minutes > 0) {
    return `${minutes} minute${minutes !== 1 ? 's' : ''} ago`;
  } else {
    return `just now`;
  }
};