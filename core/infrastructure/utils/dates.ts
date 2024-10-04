export function formatDateAndCompare(dateString: Date): string {
  const date = new Date(dateString);
  const now = new Date();

  const differenceInMilliseconds = now.getTime() - date.getTime();
  const differenceInDays = Math.floor(
    differenceInMilliseconds / (1000 * 60 * 60 * 24)
  );

  if (differenceInDays === 0) {
    return "Today";
  } else if (differenceInDays === 1) {
    return "Yesterday";
  } else if (differenceInDays <= 5) {
    return `${differenceInDays} days ago`;
  } else if (differenceInDays <= 7) {
    return "Last Week";
  } else if (differenceInDays <= 30) {
    return "Last Month";
  } else {
    return formatDate(date);
  }
}

function formatDate(date: Date) {
  const day = date.getDate();
  const month = date.toLocaleString("default", { month: "long" });
  return `${day} ${month}`;
}
