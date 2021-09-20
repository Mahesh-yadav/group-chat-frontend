import React from 'react';
import { Link } from 'react-router-dom';
import { getAuth } from 'firebase/auth';

export default function GroupsListItem({
  group,
  isMyGroup,
  submittedGroupRequests,
}) {
  const onJoinGroupRequest = async () => {
    try {
      const auth = getAuth();
      const user = auth.currentUser;

      if (!user) {
        throw new Error('User not logged in');
      }

      const response = await fetch(`/groups/${group.id}/join-request`, {
        method: 'post',
        headers: {
          AuthToken: await user.getIdToken(),
        },
      });

      if (response.ok) {
        alert('Your request has been submitted');
      } else {
        throw new Error('Request Failed');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const isGroupInSubmittedRequests =
    submittedGroupRequests.findIndex(
      (request) => request.groupId === group.id
    ) !== -1;

  return (
    <div className="list-item">
      <div className="list-item-data">
        {isMyGroup ? (
          <Link to={`groups/${group.id}`}>
            <h3 className="group-link">{group.name}</h3>
          </Link>
        ) : (
          <h3>{group.name}</h3>
        )}

        <p>Owned by: {group.owner.fullName} </p>
        <p>{group.members.length} members </p>
      </div>
      {isMyGroup ? null : (
        <>
          {isGroupInSubmittedRequests ? (
            <p className="request-submitted">Request Sent</p>
          ) : (
            <button onClick={onJoinGroupRequest}>Ask To Join</button>
          )}
        </>
      )}
    </div>
  );
}
