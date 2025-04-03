# Format Utility Functions

We are going to create the order details form soon, however ther are some utility functoina that we need to create first.

Open the `lib/utils.js` file. There are two functions that we need to create:

- `formatId` - This will shorten the ID to 6 characters
- `formatDate` - Format the date in 3 different ways (Date & Time, Date Only, Time Only)

Here is the first one:

```js
// Shorten ID
export function formatId(id: string) {
  return `..${id.substring(id.length - 6)}`;
}
```

Here is an example of it's usage:

```js
const id1 = '439dde63-541a-4cc9-891a-ffeae193abc0';
const id2 = '1234567890abcdef';

console.log(formatId(id1)); // Expected: "..abc0"
console.log(formatId(id2)); // Expected: "..cdef"
```

Now let's create the `formatDateTime` function:

```js
export const formatDateTime = (dateString: Date) => {
  const dateTimeOptions: Intl.DateTimeFormatOptions = {
    month: 'short', // abbreviated month name (e.g., 'Oct')
    year: 'numeric', // abbreviated month name (e.g., 'Oct')
    day: 'numeric', // numeric day of the month (e.g., '25')
    hour: 'numeric', // numeric hour (e.g., '8')
    minute: 'numeric', // numeric minute (e.g., '30')
    hour12: true, // use 12-hour clock (true) or 24-hour clock (false)
  };
  const dateOptions: Intl.DateTimeFormatOptions = {
    weekday: 'short', // abbreviated weekday name (e.g., 'Mon')
    month: 'short', // abbreviated month name (e.g., 'Oct')
    year: 'numeric', // numeric year (e.g., '2023')
    day: 'numeric', // numeric day of the month (e.g., '25')
  };
  const timeOptions: Intl.DateTimeFormatOptions = {
    hour: 'numeric', // numeric hour (e.g., '8')
    minute: 'numeric', // numeric minute (e.g., '30')
    hour12: true, // use 12-hour clock (true) or 24-hour clock (false)
  };
  const formattedDateTime: string = new Date(dateString).toLocaleString(
    'en-US',
    dateTimeOptions
  );
  const formattedDate: string = new Date(dateString).toLocaleString(
    'en-US',
    dateOptions
  );
  const formattedTime: string = new Date(dateString).toLocaleString(
    'en-US',
    timeOptions
  );
  return {
    dateTime: formattedDateTime,
    dateOnly: formattedDate,
    timeOnly: formattedTime,
  };
};
```

## Testing

We can get the date and time in different formats. Here is an example:

```js
// Import or copy the function here if necessary
const testDate = new Date('2023-10-25T08:30:00Z'); // Example date string

// Call the formatDateTime function
const formatted = formatDateTime(testDate);

// Log the results
console.log('Full DateTime:', formatted.dateTime); // Expected output: "Oct 25, 2023, 1:30 AM" (adjusted for timezone)
console.log('Date Only:', formatted.dateOnly); // Expected output: "Wed, Oct 25, 2023"
console.log('Time Only:', formatted.timeOnly); // Expected output: "1:30 AM" (adjusted for timezone)
```

Now we can use these around the app.
