import React from 'react';
import { Link } from 'react-router-dom';
import GroupsList from '../components/groups/GroupsList';
import { useFetch } from '../hooks/useFetch';
import { useUserGroups } from '../components/groups/useUserGroups';
import { useUserRequests } from '../components/auth/useUserRequests';

export default function GroupsListPage() {
  const { isLoading: isLoadingAllGroups, data: allGroups } =
    useFetch('/groups');

  const { isLoading: isLoadingUserGroups, userGroups } = useUserGroups();
  const notUserGroups = allGroups.filter((group) =>
    userGroups.every((userGroup) => userGroup.id !== group.id)
  );
  const { isLoading: isLoadingGroupRequests, userGroupRequests } =
    useUserRequests();

  const isLoading =
    isLoadingAllGroups || isLoadingUserGroups || isLoadingGroupRequests;

  return (
    <div className="centered-container">
      <h1 className="section-heading">My Groups</h1>
      <GroupsList
        isLoading={isLoading}
        isMyGroup={true}
        groups={userGroups}
        submittedGroupRequests={[]}
      />
      <h1 className="section-heading">Other Groups</h1>
      <GroupsList
        isLoading={isLoading}
        isMyGroup={false}
        groups={notUserGroups}
        submittedGroupRequests={userGroupRequests}
      />
      <Link to="/create-group">
        <button className="space-before space-after">Create New Group</button>
      </Link>
    </div>
  );
}
