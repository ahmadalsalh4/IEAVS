import { Link } from "react-router";
export default function Footer() {
  return (
    <div className="flex flex-col justify-center items-center bg-surface h-full">
      <p className="text-xl">all right reserved</p>
      <Link to={"https://github.com/ahmadalsalh4"}>My Githup Profile</Link>
    </div>
  );
}
