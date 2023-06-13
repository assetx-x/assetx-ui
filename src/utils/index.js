export function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export function formatDateToDashFormat(dateString) {
  // Create a new Date object using the input string
  const date = new Date(dateString);

  // Extract the year, month, and day from the date object
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
  const day = String(date.getDate()).padStart(2, '0');

  // Format the date as "YYYY-MM-DD"
  const formattedDate = `${year}-${month}-${day}`;

  return formattedDate;
}