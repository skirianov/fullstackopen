import React from 'react';

const Content = ({parts}) => {
    return (
      <div>
        {parts.map(each => <p key={each.id}>{each.name} {each.exercises}</p>)}
      </div>
    )
  }

export default Content;