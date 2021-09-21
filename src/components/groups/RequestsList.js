import React from 'react';

export default function RequestsList({
  requests,
  onAcceptRequest,
  onRejectRequest,
}) {
  return (
    <div style={{ marginBottom: '50px' }}>
      <h2 className="section-heading">Join Requests</h2>
      {requests.length > 0 ? (
        <>
          {requests.map((request) => (
            <div key={request._id} className="request-item">
              <h3>{request.userName}</h3>
              <div>
                <button
                  onClick={() => onAcceptRequest(request.id)}
                  className="btn-accept"
                >
                  Accept
                </button>
                <button
                  onClick={() => onRejectRequest(request.id)}
                  className="btn-reject"
                >
                  Reject
                </button>
              </div>
            </div>
          ))}
        </>
      ) : (
        <p>No pending requests.</p>
      )}
    </div>
  );
}
