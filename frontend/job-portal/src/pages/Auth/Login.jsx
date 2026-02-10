import { useState, useRef } from "react";
import { Link } from "react-router-dom";

function Login() {
  const [form, setForm] = useState({
    email: "",
    password: "",
    role: "seeker",
    workType: "",
  });

  const cardRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const card = cardRef.current;
    const allFilled = Object.values(form).every(
      (v) => v.trim() !== ""
    );

    card.classList.remove("error");

    if (!allFilled) {
      card.classList.add("error");
      setTimeout(() => card.classList.remove("error"), 400);
      return;
    }

    // Auth logic will be integrated here later
    console.log("Login payload:", form);
  };

  return (
    <div className="page-wrapper">
      <div ref={cardRef} className="page">
        {/* Tilt animation disabled intentionally — enable if UX approved */}
        <div
        // className="tilt-layer"
        // onMouseMove={(e) => {
        //   const rect = e.currentTarget.getBoundingClientRect();
        //   const x = e.clientX - rect.left - rect.width / 2;
        //   const y = e.clientY - rect.top - rect.height / 2;

        //   e.currentTarget.style.transform =
        //     `rotateX(${-y / 20}deg) rotateY(${x / 20}deg)`;
        // }}
        // onMouseLeave={(e) => {
        //   e.currentTarget.style.transform =
        //     "rotateX(0deg) rotateY(0deg)";
        // }}
        >
          <h2>Welcome Back</h2>
          <p>Login to continue</p>

          <form onSubmit={handleSubmit}>
            <div className="role-group">
              <label className="role-option">
                <input
                  type="radio"
                  name="role"
                  value="seeker"
                  checked={form.role === "seeker"}
                  onChange={handleChange}
                />
                Job Seeker
              </label>

              <label className="role-option">
                <input
                  type="radio"
                  name="role"
                  value="recruiter"
                  checked={form.role === "recruiter"}
                  onChange={handleChange}
                />
                Recruiter
              </label>
            </div>

            <input
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
            />

            <input
              name="password"
              type="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
            />

            <input
              name="workType"
              placeholder={
                form.role === "seeker"
                  ? "Type of work you are seeking"
                  : "Type of work you are providing"
              }
              value={form.workType}
              onChange={handleChange}
            />

            <button type="submit">Login</button>
          </form>

          <div className="link">
            New user? <Link to="/signUp">Register</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
