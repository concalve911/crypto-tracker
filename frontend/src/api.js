export async function fetchCrypto() {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      "X-API-KEY": "Y9Vx7vhSvVm/JRiwGHo14MPuMFW9uIer5vW4gOFeK9Y=",
    },
  };

  try {
    const res = await fetch("https://openapiv1.coinstats.app/coins", options);
    const data = await res.json();
    return data;
  } catch (err) {
    console.error(err);
  }
}

export function fetchAssets() {
  return new Promise((resolve) => {
    setTimeout(() => {
      const savedAssets = localStorage.getItem("userAssets");
      resolve(savedAssets ? JSON.parse(savedAssets) : []);
    }, 2000);
  });
}

export async function fetchCryptoNews() {
  const response = await fetch("https://api.coincap.io/v2/assets?limit=10");
  const data = await response.json();
  return data.data;
}
