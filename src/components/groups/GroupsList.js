import React from 'react';
import Spinner from '../UI/Spinner';
import GroupsListItem from './GroupsListItem';

export default function GroupsList({
  groups,
  isLoading,
  isMyGroup,
  submittedGroupRequests,
}) {
  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      {groups.map((group) => (
        <GroupsListItem
          key={group._id}
          group={group}
          isMyGroup={isMyGroup}
          submittedGroupRequests={submittedGroupRequests}
        />
      ))}
    </>
  );
}
