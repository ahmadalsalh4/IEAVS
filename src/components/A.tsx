import React, { useEffect } from "react";

function A() {
  const [form, setForm] = useState(null); // null = still loading

  useEffect(() => {
    fetch("/api/user/42")
      .then((r) => r.json())
      .then((data) => setForm(data)); // pre-fills all fields at once
  }, []);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return <div>A</div>;
}

export default A;
