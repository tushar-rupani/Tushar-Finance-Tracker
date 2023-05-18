export function getCookie(cookieName: string) {
  let cookie: { [key: string]: string } = {};
  document.cookie.split(";").forEach((el) => {
    let [key, value] = el.split("=");
    cookie[key.trim()] = value;
  });
  return cookie[cookieName];
}
