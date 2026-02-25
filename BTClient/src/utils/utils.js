export const formatCurrency = (amount) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
};

export const formatDate = (dateString) => {
  if (!dateString) return "N/A";

  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return "N/A";

    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    });
  } catch (error) {
    console.error("Error formatting date:", error, dateString);
    return "N/A";
  }
};

export const getCategoryColor = (category) => {
  const colors = {
    Housing: "success",
    Fun: "primary",
    Groceries: "info",
    Savings: "secondary",
    Other: "dark",
  };
  return colors[category] || "secondary";
};
