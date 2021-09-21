import React from 'react';

export default function MessagesList({ messages }) {
  return (
    <div className="">
      <h2 className="section-heading">Messages</h2>
      {messages.length > 0 ? (
        <>
          {messages.map((message) => (
            <div key={message._id} className="list-item">
              <div className="list-item-data">
                <h3>{message.userName}</h3>
                <p>{message.text}</p>
              </div>
            </div>
          ))}
        </>
      ) : (
        <p>No messages in this group yet.</p>
      )}
    </div>
  );
}
