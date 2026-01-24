import { FaClipboardList } from 'react-icons/fa'
import './EmptyState.css'

const EmptyState = ({ message, action }) => {
  return (
    <div className="empty-state">
      <div className="empty-icon">
        <FaClipboardList />
      </div>
      <p className="empty-message">{message}</p>
      {action && <div className="empty-action">{action}</div>}
    </div>
  )
}

export default EmptyState
