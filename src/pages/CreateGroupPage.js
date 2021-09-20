import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { getAuth } from 'firebase/auth';

export default function AddGroupPage() {
  const [groupName, setGroupName] = useState('');

  const history = useHistory();

  const onCreateGroup = async () => {
    try {
      const auth = getAuth();
      const user = auth.currentUser;

      if (!user) {
        throw new Error('User not logged in');
      }

      const response = await fetch('/groups', {
        method: 'post',
        headers: {
          AuthToken: await user.getIdToken(),
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: groupName,
        }),
      });

      if (response.ok) {
        const { newGroupId } = await response.json();

        history.push(`/groups/${newGroupId}`);
      } else {
        throw new Error('Request Failed');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="centered-container">
      <h1>Create Group</h1>
      <input
        type="text"
        placeholder="Enter group name"
        value={groupName}
        onChange={(e) => setGroupName(e.target.value)}
        style={{
          width: '400px',
        }}
      />
      <button
        style={{
          display: 'block',
          marginTop: '20px',
        }}
        onClick={onCreateGroup}
      >
        Create Group
      </button>
    </div>
  );
}
