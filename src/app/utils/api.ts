import { ICountryInfo } from "app/config/@interfaces/hook.interface";

export default async function getCountryInfo(
  countryCode: string
): Promise<ICountryInfo> {
  const apiUrl = `https://restcountries.com/v2/alpha/${countryCode}`;
  const result = await fetch(apiUrl).then((response) => response.json());
  const name = result.name;
  const flag = result.flags.png;
  return {
    code: countryCode,
    name,
    flag,
  };
}

export function getDateTime(dateString: string) {
  const date = new Date(dateString);
  const formattedDate = new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone: "UTC",
  }).format(date);
  return formattedDate;
}
export function checkSearch(text: string | null, index: string) {
  if (text === null) return false;
  return text.toLowerCase().includes(index.toLowerCase());
}
