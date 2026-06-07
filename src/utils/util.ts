export function SetToken(token: string) {
  localStorage.setItem("token", token);
}
export function GetToken() {
  const token = localStorage.getItem("token");
  if (!token) {
    return null;
  }

  const payload = JSON.parse(atob(token.split(".")[1]));
  if (payload.exp * 1000 < Date.now()) {
    localStorage.removeItem("token");
    return null;
  }
  return token;
}
export function ResetToken() {
  localStorage.removeItem("token");
}

export async function imgToBase64(img: File): Promise<string> {
  return new Promise((res) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      res(result);
    };
    reader.readAsDataURL(img);
  });
}
const categories = [
  { value: 1, label: "elektronik" },
  { value: 2, label: "giyim" },
  { value: 3, label: "ev" },
  { value: 4, label: "arac" },
  { value: 5, label: "ders" },
  { value: 6, label: "spor" },
  { value: 7, label: "endustri" },
  { value: 8, label: "hayvan" },
];

export function getCategoryId(categoryName: string) {
  return String(categories.find((cat) => cat.label === categoryName)?.value);
}
