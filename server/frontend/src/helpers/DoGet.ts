//TODO: improve or rename to DoGet

export function DoGet(
  address: string,
  retries: number,
  setter: (arg: any) => void,
  errorPrefix?: String
): Promise<any> {
  return fetch(address)
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
      setter(json);
      return json;
    })
    .catch((error) => {
      errorPrefix = errorPrefix || "";
      console.log(errorPrefix + error);
    });
}
