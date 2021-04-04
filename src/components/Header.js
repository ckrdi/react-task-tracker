import PropTypes from 'prop-types'
import Button from './Button'

const Header = ({ title, onAdd, showAddTask }) => {
  return (
    <header className='header'>
      <h1>{title}</h1>
      <Button text={!showAddTask ? 'Add' : 'Close'} color={!showAddTask ? 'green' : 'red'} onClick={onAdd} />
    </header>
  )
}

Header.defaultProps = {
  title: "Task Tracker"
}

Header.propTypes = {
  title: PropTypes.string,
}

// CSS in JS
// const headingStyle = {
//   color: 'gray',
//   backgroundColor: 'blue'
// }

export default Header
