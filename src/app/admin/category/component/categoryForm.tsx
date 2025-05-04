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
import { useEffect } from "react";

// ----------------------------------------------------------------------

export type CategorySchemaType = zod.infer<typeof CategorySchema>;

export const CategorySchema = zod.object({
  name: zod.string().min(1, { message: "Name is required!" }),
  description: zod.string().optional(),
});

// ----------------------------------------------------------------------

type Props = {
  open: boolean;
  onClose: () => void;
  currentCategory?: ICategory;
  onSubmit?: (data: CategorySchemaType) => void;
  loading: boolean;
  error?: string;
};

export const CategoryForm = ({
  currentCategory,
  open,
  onClose,
  onSubmit,
  loading,
}: Props) => {
  const defaultValues: CategorySchemaType = {
    name: "",
    description: "",
  };

  const methods = useForm<CategorySchemaType>({
    mode: "all",
    resolver: zodResolver(CategorySchema),
    defaultValues,
    values: currentCategory,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmitFormData = handleSubmit(async (data) => {
    onSubmit?.(data);
  });

  useEffect(() => {
    if (currentCategory) {
      reset({
        name: currentCategory.name,
        description: currentCategory.description,
      });
    } else {
      reset(defaultValues);
    }
  }, [currentCategory, reset]);

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

      <Form methods={methods} onSubmit={onSubmitFormData}>
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
            loading={isSubmitting || loading}
          >
            {currentCategory ? "Update" : "Create"}
          </LoadingButton>
        </DialogActions>
      </Form>
    </Dialog>
  );
};

export default CategoryForm;
