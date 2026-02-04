import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

interface AuthFormData {
  username: string;
}

export const AuthForm: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<AuthFormData>();
  const [modalState, setModalState] = useState<{
    show: boolean;
    type: 'success' | 'error' | null;
    message: string;
  }>({ show: false, type: null, message: '' });

  const onSubmit = (data: AuthFormData) => {
    const { username } = data;
    if (username === 'Alex') {
      setModalState({
        show: true,
        type: 'success',
        message: 'Access Granted'
      });
    } else if (username === 'Anton') {
      setModalState({
        show: true,
        type: 'error',
        message: 'Access Denied'
      });
    } else {
        // Default behavior for other users?
        // User requirements only specified Alex and Anton.
        // I'll show a generic denied or just do nothing?
        // "Verify the login logic remains exactly as follows"
        // I will assume others are denied or just ignored. I'll default to Access Denied for security.
        setModalState({
            show: true,
            type: 'error',
            message: 'Access Denied'
        });
    }
  };

  const closeModal = () => setModalState({ ...modalState, show: false });

  return (
    <div className="card shadow-sm p-4" style={{ maxWidth: '400px', width: '100%', margin: '0 auto' }}>
      <h2 className="text-center mb-4">Login</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-3">
          <label htmlFor="username" className="form-label">Username</label>
          <input
            id="username"
            type="text"
            className={`form-control ${errors.username ? 'is-invalid' : ''}`}
            placeholder="Enter username"
            {...register('username', { required: 'Username is required' })}
          />
          {errors.username && <div className="invalid-feedback">{errors.username.message}</div>}
        </div>
        <button type="submit" className="btn btn-primary w-100">Sign In</button>
      </form>

      {/* Modal Backdrop */}
      {modalState.show && (
        <div className="modal show d-block" tabIndex={-1} style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className={`modal-header ${modalState.type === 'success' ? 'bg-success text-white' : 'bg-danger text-white'}`}>
                <h5 className="modal-title">
                  {modalState.type === 'success' ? (
                     <span>&#10003; Success</span>
                  ) : (
                     <span>&#128683; Error</span>
                  )}
                </h5>
                <button type="button" className="btn-close btn-close-white" onClick={closeModal}></button>
              </div>
              <div className="modal-body text-center">
                <p className="fs-4">{modalState.message}</p>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={closeModal}>Close</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
