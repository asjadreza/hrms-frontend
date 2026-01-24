import { FaExclamationTriangle } from 'react-icons/fa'
import './ErrorMessage.css'

const ErrorMessage = ({ message, onRetry }) => {
  return (
    <div className="error-message">
      <div className="error-icon">
        <FaExclamationTriangle />
      </div>
      <p className="error-text">{message}</p>
      {onRetry && (
        <button className="error-retry" onClick={onRetry}>
          Try Again
        </button>
      )}
    </div>
  )
}

export default ErrorMessage
