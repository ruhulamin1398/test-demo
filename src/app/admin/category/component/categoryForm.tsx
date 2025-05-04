import type { IUserItem } from "src/types/user";

import { z as zod } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import LoadingButton from "@mui/lab/LoadingButton";

import {
  Box,
  Alert,
  Button,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
} from "@mui/material";
import { toast } from "@/components/snackbar";
import { Form, Field } from "@/components/hook-form";
import { ICategory } from "@/interfaces/category";

// ----------------------------------------------------------------------

export type UserQuickEditSchemaType = zod.infer<typeof UserQuickEditSchema>;

export const UserQuickEditSchema = zod.object({
  name: zod.string().min(1, { message: "Name is required!" }),
  description: zod.string().optional(),
});

// ----------------------------------------------------------------------

type Props = {
  open: boolean;
  onClose: () => void;
  currentCategory?: ICategory;
};

export const CategoryForm = ({ currentCategory, open, onClose }: Props) => {
  const defaultValues: UserQuickEditSchemaType = {
    name: "",
    description: "",
  };

  const methods = useForm<UserQuickEditSchemaType>({
    mode: "all",
    resolver: zodResolver(UserQuickEditSchema),
    defaultValues,
    values: currentCategory,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    const promise = new Promise((resolve) => setTimeout(resolve, 1000));

    try {
      reset();
      onClose();

      toast.promise(promise, {
        loading: "Loading...",
        success: "Update success!",
        error: "Update error!",
      });

      await promise;

      console.info("DATA", data);
    } catch (error) {
      console.error(error);
    }
  });

  return (
    <Dialog
      fullWidth
      maxWidth={false}
      open={open}
      onClose={onClose}
      slotProps={{
        paper: {
          sx: {
            maxWidth: 720,
          },
        },
      }}
    >
      <DialogTitle>{`${
        currentCategory ? "Update" : "Create"
      } Category`}</DialogTitle>

      <Form methods={methods} onSubmit={onSubmit}>
        <DialogContent>
          <Box py={1}>
            <Field.Text name="name" label="Category name" />
          </Box>
          <Box py={1}>
            <Field.Text
              multiline
              rows={3}
              name="description"
              label="Description"
            />
          </Box>
        </DialogContent>

        <DialogActions>
          <Button variant="outlined" onClick={onClose}>
            Cancel
          </Button>

          <LoadingButton
            type="submit"
            variant="contained"
            loading={isSubmitting}
          >
            {currentCategory ? "Update" : "Create"}
          </LoadingButton>
        </DialogActions>
      </Form>
    </Dialog>
  );
};

export default CategoryForm;
