export const getTimeAgo = (date) => {
  date = new Date(date);
  const seconds = Math.floor((Date.now() - date.getTime()) / 1000);

  // Define the time intervals in seconds
  const intervals = [
    { label: 'year', duration: 31536000 },
    { label: 'month', duration: 2592000 },
    { label: 'week', duration: 604800 },
    { label: 'day', duration: 86400 },
    { label: 'hour', duration: 3600 },
    { label: 'minute', duration: 60 }
  ];

  for (let i = 0; i < intervals.length; i++) {
    const interval = intervals[i];
    const count = Math.floor(seconds / interval.duration);
    if (count >= 1) {
      return count === 1 ? `1 ${interval.label} ago` : `${count} ${interval.label}s ago`;
    }
  }

  return 'Just now';
};
