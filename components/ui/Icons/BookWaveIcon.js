const BookWaveIcon = () => {
  return (
    <div className="logo-wave absolute -bottom-1 -right-1 w-5 h-5">
      <svg viewBox="0 0 20 20" className="w-full h-full">
        <path
          d="M2 10 Q6 6, 10 10 T18 10"
          stroke="#D4AF37"
          strokeWidth="2"
          fill="none"
        />
        <path
          d="M2 12 Q6 8, 10 12 T18 12"
          stroke="#D4AF37"
          strokeWidth="1"
          fill="none"
          opacity="0.7"
        />
      </svg>
    </div>
  );
};

export default BookWaveIcon;