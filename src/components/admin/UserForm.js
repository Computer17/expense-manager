import { useState } from 'react';

export default function UserForm({ onAddUser }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      alert('ইমেইল ও পাসওয়ার্ড দিন।');
      return;
    }
    onAddUser({ email, password, name });
    setEmail('');
    setPassword('');
    setName('');
  };

  return (
    <form onSubmit={handleSubmit} className="flex-row">
      <input
        type="email"
        placeholder="ইমেইল"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="পাসওয়ার্ড"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="নাম (ঐচ্ছিক)"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button type="submit" className="btn-primary">যোগ করুন</button>
    </form>
  );
}