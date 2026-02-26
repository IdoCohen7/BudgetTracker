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

// Category color palette
export const CATEGORY_COLORS = {
  Housing: "#ef4444",
  Groceries: "#f59e0b",
  Savings: "#10b981",
  Fun: "#5c71f6",
  Other: "#6b7280",
};

export const getCategoryColor = (category) => {
  return CATEGORY_COLORS[category] || CATEGORY_COLORS.Other;
};

export const parseErrorResponse = (
  error,
  defaultMessage = "An error occurred",
) => {
  const errorData = error.response?.data;

  if (errorData && typeof errorData === "object") {
    if (errorData.errors) {
      const errorMessages = Object.entries(errorData.errors)
        .map(([field, messages]) => {
          const msgArray = Array.isArray(messages) ? messages : [messages];
          return `${field}: ${msgArray.join(", ")}`;
        })
        .join("; ");
      return errorMessages;
    }
    return (
      errorData.title || errorData.detail || errorData.message || defaultMessage
    );
  }

  if (typeof errorData === "string") {
    return errorData;
  }

  return error.message || defaultMessage;
};
