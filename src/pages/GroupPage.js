import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useUser } from '../components/auth/useUser';
import { useGroup } from '../components/groups/useGroup';
import Spinner from '../components/UI/Spinner';
import MessagesList from '../components/groups/MessagesList';
import RequestsList from '../components/groups/RequestsList';
import { getAuth } from 'firebase/auth';

export default function GroupPage() {
  const [message, setMessage] = useState('');

  const { id } = useParams();
  const { user } = useUser();

  const { isLoading, group, setGroup } = useGroup(`/groups/${id}`);

  const onAcceptRequest = async (requestId) => {
    try {
      const auth = getAuth();
      const user = auth.currentUser;

      if (!user) {
        throw new Error('User not logged in');
      }

      const response = await fetch(
        `/groups/${id}/requests/${requestId}/accept`,
        {
          method: 'post',
          headers: {
            AuthToken: await user.getIdToken(),
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({}),
        }
      );

      if (response.ok) {
        const updatedRequests = await response.json();

        setGroup({
          ...group,
          requests: updatedRequests,
        });
      } else {
        throw new Error('Request Failed');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onRejectRequest = async (requestId) => {
    try {
      const auth = getAuth();
      const user = auth.currentUser;

      if (!user) {
        throw new Error('User not logged in');
      }

      const response = await fetch(
        `/groups/${id}/requests/${requestId}/reject`,
        {
          method: 'post',
          headers: {
            AuthToken: await user.getIdToken(),
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({}),
        }
      );

      if (response.ok) {
        const updatedRequests = await response.json();

        setGroup({
          ...group,
          requests: updatedRequests,
        });
      } else {
        throw new Error('Request Failed');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onPostMessage = async () => {
    if (message.length === 0) {
      return;
    }

    try {
      const auth = getAuth();
      const user = auth.currentUser;

      if (!user) {
        throw new Error('User not logged in');
      }

      const response = await fetch(`/groups/${id}/messages`, {
        method: 'post',
        headers: {
          AuthToken: await user.getIdToken(),
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: message,
        }),
      });

      if (response.ok) {
        const updatedMessages = await response.json();

        setGroup({
          ...group,
          messages: updatedMessages,
        });
        setMessage('');
      } else {
        throw new Error('Request Failed');
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="centered-container">
      <h1>{group.name}</h1>
      <p>Owned by: {group.owner.fullName}</p>
      <MessagesList messages={group.messages} />
      <div className="new-message-form">
        <input
          type="text"
          placeholder="Type message here..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button
          style={{
            display: 'block',
            marginTop: '20px',
          }}
          onClick={onPostMessage}
        >
          Send Message
        </button>
      </div>
      {group.ownerId === user.uid ? (
        <RequestsList
          onAcceptRequest={onAcceptRequest}
          onRejectRequest={onRejectRequest}
          requests={group.requests}
        />
      ) : null}
    </div>
  );
}
