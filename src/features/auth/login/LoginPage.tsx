export default function LoginPage() {
  return (
    <div>
      Login Page
      <form>
        <label htmlFor="Email">Email: </label>
        <input type="text" id="Email" />
        <label htmlFor="Password">Password: </label>
        <input type="password" id="Password" />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}
