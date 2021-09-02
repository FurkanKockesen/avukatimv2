import axios from "axios";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function YTG() {
  const router = useRouter();

  const fetchData = () => {
    const arr = router.query["slug"].split("beko");
    const uuid = arr[0];
    const token = arr[1];
    const url = "http://127.0.0.1:8000/api/users/verify/" + uuid + "/" + token;
    console.log(url);
    axios.get(url);
  };
  try {
    fetchData();
    router.push("/");
  } catch {
  } finally {
  }

  return <div>dsa</div>;
}
