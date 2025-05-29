
import React from 'react';
import PlanCard from './PlanCard';
import { PlanListProps } from '@/types/plan';

const PlanList: React.FC<PlanListProps> = ({ plans, onEdit, onDelete }) => {
  if (plans.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground text-lg">No plans found</p>
        <p className="text-muted-foreground text-sm mt-2">Create your first plan to get started</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {plans.map((plan) => (
        <PlanCard
          key={plan.id}
          planId={plan.id}
          name={plan.name}
          description={plan.description}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default PlanList;
