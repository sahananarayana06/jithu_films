
import { useState, type FormEvent } from "react";
import { ArrowLeft } from "lucide-react";

export default function ChangePassword() {
  const [username, setUsername] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  const changePassword = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setNotice("");

    if (newPassword !== confirmNewPassword) {
      setError("The new passwords do not match.");
      return;
    }

    if (newPassword.length < 12) {
      setError("New password must contain at least 12 characters.");
      return;
    }

    setBusy(true);

    try {
      const response = await fetch("/api/admin/change-password", {
        method: "POST",
        credentials: "same-origin",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username,
          currentPassword,
          newPassword,
        }),
      });

      const result = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(result.error || result.message || "Could not change the password.");
      }

      setCurrentPassword("");
      setNewPassword("");
      setConfirmNewPassword("");
      setNotice("Password changed successfully. Please sign in with your new password.");
    } catch (cause) {
      setError(
        cause instanceof Error
          ? cause.message
          : "Could not change the password."
      );
    } finally {
      setBusy(false);
    }
  };

  return (
    <main className="admin-page">
      <section className="admin-panel admin-login">
        <a className="admin-change-password-link" href="/admin">
          <ArrowLeft size={14} /> Back to Sign in
        </a>

        <p className="admin-eyebrow">Jithu Films</p>
        <h1>Change your password.</h1>
        <p>Enter your current credentials and choose a new password.</p>

        
        <form className="admin-form" onSubmit={changePassword}>
        <div className="admin-fields">
            <label className="admin-field admin-field--wide">
            Username
            <input
                type="text"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
                autoComplete="username"
                required
            />
            </label>

            <label className="admin-field admin-field--wide">
            Current Password
            <input
                type="password"
                value={currentPassword}
                onChange={(event) => setCurrentPassword(event.target.value)}
                autoComplete="current-password"
                required
            />
            </label>

            <label className="admin-field admin-field--wide">
            New Password (minimum 12 characters)
            <input
                type="password"
                value={newPassword}
                onChange={(event) => setNewPassword(event.target.value)}
                autoComplete="new-password"
                minLength={12}
                required
            />
            </label>

            <label className="admin-field admin-field--wide">
            Confirm New Password
            <input
                type="password"
                value={confirmNewPassword}
                onChange={(event) => setConfirmNewPassword(event.target.value)}
                autoComplete="new-password"
                minLength={12}
                required
            />
            </label>
        </div>

        {error && <p className="admin-message admin-message--error">{error}</p>}
        {notice && <p className="admin-message admin-message--success">{notice}</p>}

        <button
            className="button button--dark"
            type="submit"
            disabled={busy}
        >
            {busy ? "Updating..." : "Update Password"}
        </button>
        </form>

      </section>
    </main>
  );
}
