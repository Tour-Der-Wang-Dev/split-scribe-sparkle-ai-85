
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { Plus, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { MobileOptimizedContainer } from '@/components/MobileOptimizedContainer';
import { useIsMobile } from '@/hooks/use-mobile';
import { useToast } from '@/hooks/use-toast';
import PlanList from '@/components/PlanList';
import PlanForm from '@/components/PlanForm';
import { Plan } from '@/types/plan';
import { PlanService } from '@/services/PlanService';

const Plans = () => {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [editingPlan, setEditingPlan] = useState<Plan | null>(null);
  const [deletingPlanId, setDeletingPlanId] = useState<string | null>(null);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  
  const isMobile = useIsMobile();
  const { toast } = useToast();

  useEffect(() => {
    loadPlans();
  }, []);

  const loadPlans = () => {
    try {
      const loadedPlans = PlanService.getPlans();
      setPlans(loadedPlans);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to load plans',
        variant: 'destructive',
      });
    }
  };

  const handleCreatePlan = (planData: Omit<Plan, 'id'>) => {
    try {
      const validationErrors = PlanService.validatePlanData(planData.name, planData.description);
      if (validationErrors.length > 0) {
        toast({
          title: 'Validation Error',
          description: validationErrors.join(', '),
          variant: 'destructive',
        });
        return;
      }

      PlanService.createPlan(planData);
      loadPlans();
      setIsCreateDialogOpen(false);
      toast({
        title: 'Success',
        description: 'Plan created successfully',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to create plan',
        variant: 'destructive',
      });
    }
  };

  const handleEditPlan = (plan: Plan) => {
    setEditingPlan(plan);
    setIsEditDialogOpen(true);
  };

  const handleUpdatePlan = (planData: Omit<Plan, 'id'>) => {
    if (!editingPlan) return;

    try {
      const validationErrors = PlanService.validatePlanData(planData.name, planData.description);
      if (validationErrors.length > 0) {
        toast({
          title: 'Validation Error',
          description: validationErrors.join(', '),
          variant: 'destructive',
        });
        return;
      }

      PlanService.updatePlan(editingPlan.id, planData);
      loadPlans();
      setIsEditDialogOpen(false);
      setEditingPlan(null);
      toast({
        title: 'Success',
        description: 'Plan updated successfully',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to update plan',
        variant: 'destructive',
      });
    }
  };

  const handleDeletePlan = (planId: string) => {
    if (!PlanService.validatePlanId(planId)) {
      toast({
        title: 'Error',
        description: 'Invalid plan ID',
        variant: 'destructive',
      });
      return;
    }
    setDeletingPlanId(planId);
    setIsDeleteDialogOpen(true);
  };

  const confirmDeletePlan = () => {
    if (!deletingPlanId) return;

    try {
      PlanService.deletePlan(deletingPlanId);
      loadPlans();
      setIsDeleteDialogOpen(false);
      setDeletingPlanId(null);
      toast({
        title: 'Success',
        description: 'Plan deleted successfully',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to delete plan',
        variant: 'destructive',
      });
    }
  };

  return (
    <MobileOptimizedContainer maxWidth="xl" spacing="md" fullHeight>
      <div className="space-y-6">
        <header>
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
            <div className="flex items-center gap-4">
              <Button asChild variant="ghost" size="sm">
                <Link to="/">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back
                </Link>
              </Button>
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold">Plan Management</h1>
                <p className="text-muted-foreground">Create and manage your application plans</p>
              </div>
            </div>
            <Button
              onClick={() => setIsCreateDialogOpen(true)}
              size={isMobile ? "sm" : "default"}
              className="w-full sm:w-auto"
            >
              <Plus className="h-4 w-4 mr-2" />
              Create Plan
            </Button>
          </div>
        </header>

        <PlanList
          plans={plans}
          onEdit={handleEditPlan}
          onDelete={handleDeletePlan}
        />

        {/* Create Plan Dialog */}
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Create New Plan</DialogTitle>
            </DialogHeader>
            <PlanForm
              onSubmit={handleCreatePlan}
              onCancel={() => setIsCreateDialogOpen(false)}
            />
          </DialogContent>
        </Dialog>

        {/* Edit Plan Dialog */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Edit Plan</DialogTitle>
            </DialogHeader>
            <PlanForm
              plan={editingPlan || undefined}
              onSubmit={handleUpdatePlan}
              onCancel={() => {
                setIsEditDialogOpen(false);
                setEditingPlan(null);
              }}
            />
          </DialogContent>
        </Dialog>

        {/* Delete Confirmation Dialog */}
        <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete the plan.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={() => setIsDeleteDialogOpen(false)}>
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction onClick={confirmDeletePlan}>
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </MobileOptimizedContainer>
  );
};

export default Plans;
