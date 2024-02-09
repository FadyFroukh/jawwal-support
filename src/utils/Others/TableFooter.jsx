import React from 'react'

const TableFooter = ({length,name}) => {
  return (
    <p>
        In total there are <strong>{`${length} ${name}`}.</strong>
    </p>
  )
}

export default TableFooter
