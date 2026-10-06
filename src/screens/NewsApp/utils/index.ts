export function transformDate(d: any) {
  const date = new Date(d);

  const formattedDate = new Intl.DateTimeFormat('en-GB', {
    weekday: 'short',
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    // hour: '2-digit',
    // minute: '2-digit',
    // second: '2-digit',
    // hour12: false,
  })
    .format(date)
    .replace(/,/g, '');
  return formattedDate;
}
