
export interface Plan {
  id: string;
  name: string;
  description: string;
  price: number;
}

export interface PlanCardProps {
  planId: string;
  name: string;
  description: string;
  onEdit: (plan: Plan) => void;
  onDelete: (planId: string) => void;
}

export interface PlanFormProps {
  plan?: Plan;
  onSubmit: (plan: Omit<Plan, 'id'>) => void;
  onCancel: () => void;
}

export interface PlanListProps {
  plans: Plan[];
  onEdit: (plan: Plan) => void;
  onDelete: (planId: string) => void;
}
