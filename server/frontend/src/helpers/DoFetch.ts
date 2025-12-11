export function DoFetch(
  address: string,
  retries: number,
  action: (arg: any) => void
) {
  fetch(address)
    .then((result) => {
      if (result && result.ok) {
        return result.json();
      }
      console.log("got null");
      if (retries <= 0) {
        return;
      }
      console.log(address, ". Retries left: ", retries);
      retries -= 1;
    })
    .then((json) => {
      if (json == null) {
        return;
      }
      action(json);
    })
    .catch();
}
