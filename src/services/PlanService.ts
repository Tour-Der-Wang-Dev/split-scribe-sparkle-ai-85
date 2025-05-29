
import { Plan } from '@/types/plan';

const STORAGE_KEY = 'application_plans';

export class PlanService {
  static getPlans(): Plan[] {
    try {
      const plans = localStorage.getItem(STORAGE_KEY);
      return plans ? JSON.parse(plans) : [];
    } catch (error) {
      console.error('Failed to load plans:', error);
      return [];
    }
  }

  static savePlans(plans: Plan[]): void {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(plans));
    } catch (error) {
      console.error('Failed to save plans:', error);
      throw new Error('Failed to save plans');
    }
  }

  static createPlan(planData: Omit<Plan, 'id'>): Plan {
    const plans = this.getPlans();
    const newPlan: Plan = {
      ...planData,
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9)
    };
    
    plans.push(newPlan);
    this.savePlans(plans);
    return newPlan;
  }

  static updatePlan(id: string, planData: Omit<Plan, 'id'>): Plan {
    const plans = this.getPlans();
    const planIndex = plans.findIndex(plan => plan.id === id);
    
    if (planIndex === -1) {
      throw new Error(`Plan with ID ${id} not found`);
    }
    
    const updatedPlan = { ...planData, id };
    plans[planIndex] = updatedPlan;
    this.savePlans(plans);
    return updatedPlan;
  }

  static deletePlan(id: string): void {
    const plans = this.getPlans();
    const filteredPlans = plans.filter(plan => plan.id !== id);
    
    if (filteredPlans.length === plans.length) {
      throw new Error(`Plan with ID ${id} not found`);
    }
    
    this.savePlans(filteredPlans);
  }

  static getPlanById(id: string): Plan | null {
    const plans = this.getPlans();
    return plans.find(plan => plan.id === id) || null;
  }

  static validatePlanId(planId: string): boolean {
    if (!planId || planId.trim() === '') {
      return false;
    }
    return true;
  }

  static validatePlanData(name: string, description: string): string[] {
    const errors: string[] = [];
    
    if (!name || name.trim() === '') {
      errors.push('Plan name is required');
    }
    
    if (!description || description.trim() === '') {
      errors.push('Plan description is required');
    }
    
    return errors;
  }
}
