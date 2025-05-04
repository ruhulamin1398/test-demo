import { getResolverErrorMessage } from "@/app/lib/utils";
import { ICategory } from "@/interfaces/category";
import Category from "@/models/Category";
import { applyUpdates } from "@/utils/dynamic-input";
import { IResolvers } from "@graphql-tools/utils";
import { GraphQLError } from "graphql";

const categoryUpdatableFields = ["name", "slug", "description"] as const;
const mutableFields: (keyof ICategory)[] = [...categoryUpdatableFields];

interface CreateCategoryInput {
  input: {
    name: string;
    slug: string;
    description?: string;
  };
}

interface UpdateCategoryInput {
  input: {
    id: string;
    name?: string;
    slug?: string;
    description?: string;
  };
}

interface DeleteCategoryArgs {
  id: string;
}

interface DeleteResponse {
  success: boolean;
  message?: string;
}

const categoryResolvers: IResolvers = {
  Mutation: {
    async createCategory(
      _: unknown,
      { input }: CreateCategoryInput
    ): Promise<ICategory> {
      try {
        const { name, description } = input;
        const category = new Category({ name, description });
        return await category.save();
      } catch (error) {
        const formattedError = getResolverErrorMessage(error);
        throw new GraphQLError(`${formattedError.message}`, {
          extensions: {
            code: formattedError.code,
          },
        });
      }
    },

    async updateCategory(
      _: unknown,
      { input }: UpdateCategoryInput
    ): Promise<ICategory> {
      try {
        const category = await Category.findById(input.id);
        if (!category) {
          throw new GraphQLError("Invalid category.", {
            extensions: {
              code: "BAD_USER_INPUT",
            },
          });
        }

        applyUpdates<ICategory>(category, input, mutableFields);

        return await category.save();
      } catch (error) {
        const formattedError = getResolverErrorMessage(error);
        throw new GraphQLError(`${formattedError.message}`, {
          extensions: {
            code: formattedError.code,
          },
        });
      }
    },

    async deleteCategory(
      _: unknown,
      { id }: DeleteCategoryArgs
    ): Promise<DeleteResponse> {
      try {
        const category = await Category.findById(id);
        if (!category) {
          throw new GraphQLError("Invalid category.", {
            extensions: {
              code: "BAD_USER_INPUT",
            },
          });
        }

        await Category.findByIdAndDelete(id);
        return {
          success: true,
          message: "Category deleted successfully.",
        };
      } catch (error) {
        const formattedError = getResolverErrorMessage(error);
        throw new GraphQLError(`${formattedError.message}`, {
          extensions: {
            code: formattedError.code,
          },
        });
      }
    },
  },

  Query: {
    async categories(): Promise<ICategory[]> {
      return await Category.find().sort({ createdAt: -1 });
    },

    async category(
      _: unknown,
      { id }: { id: string }
    ): Promise<ICategory | null> {
      return await Category.findById(id);
    },
  },
};

export default categoryResolvers;
