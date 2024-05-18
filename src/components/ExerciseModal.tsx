import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
interface AlertDialogDemoProps {
  title: string;
  description: string;
  onCancel: () => void;
  onAction: () => void;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}
export function AlertDialogDemo({ 
  title, 
  description, 
  onCancel, 
  onAction, 
  isOpen, 
  setIsOpen 
}: AlertDialogDemoProps) {
  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={onCancel}>kleiner Penis</AlertDialogCancel>
          <AlertDialogAction onClick={onAction}>grosser Penis</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

