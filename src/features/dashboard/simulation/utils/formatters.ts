export function formatSimulationPrimaryAmount(amount: number): string {
  const absolute = Math.abs(Math.round(amount));
  const sign = amount < 0 ? "-" : "";

  if (absolute >= 100_000_000) {
    return `${sign}${(absolute / 100_000_000).toFixed(2)}億円`;
  }

  if (absolute >= 1_000_000) {
    return `${sign}${Math.round(absolute / 10_000).toLocaleString("ja-JP")}万円`;
  }

  return `${sign}￥${absolute.toLocaleString("ja-JP")}`;
}

export function formatSimulationExactAmount(amount: number): string {
  const absolute = Math.abs(Math.round(amount));
  const sign = amount < 0 ? "-" : "";
  return `${sign}￥${absolute.toLocaleString("ja-JP")}`;
}

export function formatSimulationAmountPair(amount: number) {
  return {
    primary: formatSimulationPrimaryAmount(amount),
    exact: formatSimulationExactAmount(amount),
  };
}
