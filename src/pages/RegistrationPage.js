import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './RegistrationPage.css';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080';

const initialForm = {
  name: '',
  address: '',
  mobile: '',
  district: '',
  yearsOfExperience: '',
  publication: '',
  channel: '',
};

function RegistrationPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState(null); // 'success' | 'error'
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const validate = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = 'Name is required';
    if (!form.address.trim()) newErrors.address = 'Address is required';
    if (!/^[6-9]\d{9}$/.test(form.mobile)) newErrors.mobile = 'Enter a valid 10 digit mobile number';
    if (!form.district.trim()) newErrors.district = 'District is required';
    if (form.yearsOfExperience === '' || isNaN(form.yearsOfExperience)) newErrors.yearsOfExperience = 'Years of experience is required';
    if (!form.publication.trim()) newErrors.publication = 'Publication name is required';
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/journalists/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          yearsOfExperience: parseInt(form.yearsOfExperience),
          channel: form.channel.trim() || null,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setStatus('success');
        setMessage('Registration successful! Welcome to Samvad 2026.');
        setForm(initialForm);
      } else {
        setStatus('error');
        setMessage(data.message || 'Something went wrong. Please try again.');
      }
    } catch {
      setStatus('error');
      setMessage('Could not connect to server. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="reg-container">
      <button className="back-btn" onClick={() => navigate('/')}>← Back</button>

      <h1 className="reg-title">Journalist Registration</h1>
      <p className="reg-subtitle">Samvad 2026 — Malpura</p>

      {status && (
        <div className={`alert ${status}`}>
          {message}
        </div>
      )}

      <form className="reg-form" onSubmit={handleSubmit} noValidate>
        <div className="form-group">
          <label>Full Name *</label>
          <input name="name" value={form.name} onChange={handleChange} placeholder="Enter your full name" />
          {errors.name && <span className="error">{errors.name}</span>}
        </div>

        <div className="form-group">
          <label>Address *</label>
          <textarea name="address" value={form.address} onChange={handleChange} placeholder="Enter your full address" rows={3} />
          {errors.address && <span className="error">{errors.address}</span>}
        </div>

        <div className="form-group">
          <label>Mobile Number *</label>
          <input name="mobile" value={form.mobile} onChange={handleChange} placeholder="10 digit mobile number" maxLength={10} />
          {errors.mobile && <span className="error">{errors.mobile}</span>}
        </div>

        <div className="form-group">
          <label>District *</label>
          <input name="district" value={form.district} onChange={handleChange} placeholder="Enter your district" />
          {errors.district && <span className="error">{errors.district}</span>}
        </div>

        <div className="form-group">
          <label>Years of Experience *</label>
          <input name="yearsOfExperience" type="number" min="0" max="50" value={form.yearsOfExperience} onChange={handleChange} placeholder="e.g. 5" />
          {errors.yearsOfExperience && <span className="error">{errors.yearsOfExperience}</span>}
        </div>

        <div className="form-group">
          <label>Newspaper / Publication *</label>
          <input name="publication" value={form.publication} onChange={handleChange} placeholder="Newspaper or portal you work for" />
          {errors.publication && <span className="error">{errors.publication}</span>}
        </div>

        <div className="form-group">
          <label>Channel Name (Optional)</label>
          <input name="channel" value={form.channel} onChange={handleChange} placeholder="TV / YouTube channel (if any)" />
        </div>

        <button type="submit" className="submit-btn" disabled={loading}>
          {loading ? 'Submitting...' : 'Register'}
        </button>
      </form>
    </div>
  );
}

export default RegistrationPage;
