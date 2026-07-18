// Tire size calculation utilities

export function parseTireSize(sizeStr: string) {
  const match = sizeStr.match(/^(\d{3})\/(\d{2})\s*R(\d{2})$/i);
  if (!match) return null;
  return {
    width: parseInt(match[1]),
    profile: parseInt(match[2]),
    rim: parseInt(match[3]),
  };
}

export function calcOverallDiameter(width: number, profile: number, rim: number): number {
  const sidewall = (width * profile) / 100;
  return sidewall * 2 + rim * 25.4;
}

export function calcSidewallHeight(width: number, profile: number): number {
  return (width * profile) / 100;
}

export function calcCircumference(diameter: number): number {
  return Math.PI * diameter;
}

export function calcSpeedError(stockDia: number, newDia: number): number {
  return ((newDia - stockDia) / stockDia) * 100;
}

export function calcClearanceChange(stockDia: number, newDia: number): number {
  return (newDia - stockDia) / 2;
}

export function getPlusOneSize(width: number, profile: number, rim: number) {
  // Plus 1: increase rim by 1, decrease profile, increase width slightly
  const newRim = rim + 1;
  const stockDia = calcOverallDiameter(width, profile, rim);
  // Try common plus-one combinations
  const candidates = [
    { w: width + 10, p: profile - 5 },
    { w: width + 20, p: profile - 10 },
    { w: width + 10, p: profile - 10 },
  ];
  for (const c of candidates) {
    const newDia = calcOverallDiameter(c.w, c.p, newRim);
    if (Math.abs(newDia - stockDia) < stockDia * 0.03) {
      return { width: c.w, profile: c.p, rim: newRim };
    }
  }
  return { width: width + 10, profile: profile - 5, rim: newRim };
}

export function getPlusTwoSize(width: number, profile: number, rim: number) {
  const plusOne = getPlusOneSize(width, profile, rim);
  return getPlusOneSize(plusOne.width, plusOne.profile, plusOne.rim);
}

export function getMinusOneSize(width: number, profile: number, rim: number) {
  const newRim = rim - 1;
  const stockDia = calcOverallDiameter(width, profile, rim);
  const candidates = [
    { w: width - 10, p: profile + 5 },
    { w: width - 20, p: profile + 10 },
    { w: width - 10, p: profile + 10 },
  ];
  for (const c of candidates) {
    const newDia = calcOverallDiameter(c.w, c.p, newRim);
    if (Math.abs(newDia - stockDia) < stockDia * 0.03) {
      return { width: c.w, profile: c.p, rim: newRim };
    }
  }
  return { width: width - 10, profile: profile + 5, rim: newRim };
}

// Wheel offset calculator
export function calcWheelPosition(widthInch: number, offset: number) {
  const widthMm = widthInch * 25.4;
  const halfWidth = widthMm / 2;
  const innerDistance = halfWidth + offset; // from mounting surface to inner edge
  const outerDistance = halfWidth - offset; // from mounting surface to outer edge
  return {
    innerDistance,
    outerDistance,
    totalWidth: widthMm,
    poke: offset < 0 ? Math.abs(offset) : 0,
    flush: offset === 0,
  };
}
