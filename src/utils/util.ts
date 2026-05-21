export function SetToken(token: string) {
  localStorage.setItem("token", token);
}
export function GetToken() {
  return localStorage.getItem("token");
}
export function ResetToken() {
  localStorage.removeItem("token");
}
