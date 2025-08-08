import * as AlertDialog from "@radix-ui/react-alert-dialog";
import { Button } from "../ui/button";

interface RemoveMealDialogProps {
  open: boolean;
  mealTitle: string;
  setOpen: (open: boolean) => void;
  onRemove: () => void;
}

const RemoveMealDialog = ({
  open,
  setOpen,
  mealTitle,
  onRemove,
}: RemoveMealDialogProps) => {
  return (
    <>
      <AlertDialog.Root open={open} onOpenChange={setOpen}>
        <AlertDialog.Portal>
          <AlertDialog.Overlay className="fixed inset-0 bg-black/40" />
          <AlertDialog.Content className="fixed top-1/2 left-1/2 bg-white p-6 rounded shadow-lg -translate-x-1/2 -translate-y-1/2">
            <AlertDialog.Title className="font-bold">
              Remove meal?
            </AlertDialog.Title>
            <AlertDialog.Description>
              Are you sure you want to remove <span>{mealTitle}</span> meal?
              This action cannot be undone.
            </AlertDialog.Description>
            <div className="flex justify-end gap-4 mt-6">
              <AlertDialog.Cancel asChild>
                <Button>Cancel</Button>
              </AlertDialog.Cancel>
              <AlertDialog.Action asChild>
                <Button variant="destructive" onClick={onRemove}>
                  Remove
                </Button>
              </AlertDialog.Action>
            </div>
          </AlertDialog.Content>
        </AlertDialog.Portal>
      </AlertDialog.Root>
    </>
  );
};

export default RemoveMealDialog;
