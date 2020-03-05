const clamp = ({ number, min = 0, max }) => {
  return Math.min(Math.max(number, min), max);
};

export default clamp;
