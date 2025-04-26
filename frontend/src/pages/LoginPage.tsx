"use client"

import { useState, type FormEvent, type ChangeEvent } from "react"
import { Link, useNavigate } from "react-router-dom"
import "../styles/AuthPages.css"

interface FormData {
  email: string
  password: string
  role: "student" | "admin"
}

interface FormErrors {
  email?: string
  password?: string
  role?: string
}

const LoginPage = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
    role: "student",
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [isLoading, setIsLoading] = useState(false)
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null)

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}

    if (!formData.email) {
      newErrors.email = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid"
    }

    if (!formData.password) {
      newErrors.password = "Password is required"
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters"
    }

    if (!formData.role) {
      newErrors.role = "Role is required"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsLoading(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Show success toast
      setToast({
        message: `Logged in as ${formData.role}`,
        type: "success",
      })

      // Redirect based on role
      setTimeout(() => {
        if (formData.role === "admin") {
          navigate("/admin/dashboard")
        } else {
          navigate("/student/dashboard")
        }
      }, 1000)
    } catch (error) {
      setToast({
        message: "Login failed. Please check your credentials.",
        type: "error",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="auth-container">
      <Link to="/" className="back-link">
        ← Back
      </Link>

      <div className="auth-card">
        <div className="auth-header">
          <h2 className="auth-title">Login</h2>
          <p className="auth-description">Enter your credentials to access your account</p>
        </div>

        <div className="auth-content">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">Role</label>
              <div className="radio-group">
                <label className="radio-item">
                  <input
                    type="radio"
                    name="role"
                    value="student"
                    checked={formData.role === "student"}
                    onChange={handleChange}
                  />
                  Student
                </label>
                <label className="radio-item">
                  <input
                    type="radio"
                    name="role"
                    value="admin"
                    checked={formData.role === "admin"}
                    onChange={handleChange}
                  />
                  Administrator
                </label>
              </div>
              {errors.role && <div className="form-error">{errors.role}</div>}
            </div>

            <div className="form-group">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="form-input"
                placeholder="example@email.com"
                value={formData.email}
                onChange={handleChange}
              />
              {errors.email && <div className="form-error">{errors.email}</div>}
            </div>

            <div className="form-group">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                className="form-input"
                value={formData.password}
                onChange={handleChange}
              />
              {errors.password && <div className="form-error">{errors.password}</div>}
            </div>

            <button type="submit" className="btn btn-block" disabled={isLoading}>
              {isLoading ? "Logging in..." : "Login"}
            </button>
          </form>
        </div>

        <div className="auth-footer">
          <p>
            Don't have an account?{" "}
            <Link to="/register" className="link">
              Register
            </Link>
          </p>
        </div>
      </div>

      {toast && <div className={`toast ${toast.type === "error" ? "toast-error" : ""}`}>{toast.message}</div>}
    </div>
  )
}

export default LoginPage
