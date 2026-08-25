import React from 'react';

interface EntityBadgeProps {
  type: string;
  name?: string;
}

const EntityBadge: React.FC<EntityBadgeProps> = ({ type, name }) => {
  const badgeClass = `badge badge-${type}`;
  return (
    <span className={badgeClass}>
      {name || type}
    </span>
  );
};

export default EntityBadge;
