export const pasreExpiresIn = (expiresIn: string): number => {
    const unit = expiresIn.slice(-1);
    const value = parseInt(expiresIn.slice(0, -1), 10);

    switch (unit) {
      case 's': return value;          // Seconds
      case 'm': return value * 60;      // Minutes
      case 'h': return value * 3600;    // Hours
      case 'd': return value * 86400;   // Days
      default: return 3600;             // Fallback (1 hour)
    }
  };