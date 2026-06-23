export const getInitials = (name) => {
  if (!name) return 'U';
  return name.charAt(0).toUpperCase();
};

export const formatDate = (date) => {
  if (!date) return '';
  const d = new Date(date);
  return d.toLocaleDateString('bn-BD', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });
};

export const generateSerial = (list) => {
  return list.length + 1;
};

export const isValidAmount = (val) => {
  const num = parseFloat(val);
  return !isNaN(num) && num > 0;
};

export const truncateText = (text, maxLen = 20) => {
  if (text.length <= maxLen) return text;
  return text.slice(0, maxLen) + '...';
};