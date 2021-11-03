import React from 'react'
import NewCard from '../../../components/biz/kitchen/NewCard'


const OrderCards = ({orders}) => {
  // parse the orders into respective cards
  // include pagination and user opts on views per page
  // orders should have mode of delivery (eat in or take out)
  const CardList = orders.map(order=> {
    return (
      <li key = { order._id } >
        <NewCard order = { order } />
      </li>
      )
  })

  return (
    <div className="flex flex-row flex-initial space-x-2">
      <ul>
        { CardList }
      </ul>
    </div>
  )

}

export default OrderCards
