import { ChangeEvent } from "@Kaavish/hooks/useForm";

export function onQueryChange(
  event: ChangeEvent,
  onFetch: (data: string) => void,
  setQuery: (data: string) => void
) {
  const value = event.target.value;

  onFetch(value);
  setQuery(value);
}