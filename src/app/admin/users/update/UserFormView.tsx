"use client";

import { paths } from "src/routes/paths";

import { DashboardContent } from "src/layouts/dashboard";

import { CustomBreadcrumbs } from "src/components/custom-breadcrumbs";
import { UserForm } from "./UserForm";
import { useParams } from "next/navigation";
import { GET_USER_QUERY } from "@/graphql-client/user";
import { useQuery } from "@apollo/client";
import { useState } from "react";
import { IUser } from "@/interfaces";
import Loading from "../../loading";

// ----------------------------------------------------------------------

export function UserFormView() {
  const [user, setUser] = useState<IUser>();
  const searchParams = useParams();
  const { id } = searchParams;
  const { data, loading, error } = useQuery(GET_USER_QUERY, {
    variables: { id },
    skip: !id, // Skip the query if `id` is not present
  });
  if (loading) {
    return <Loading />;
  }
  if (!loading && error) {
    return <div>Error loading user data: {error.message}</div>;
  }
  return (
    <DashboardContent>
      <CustomBreadcrumbs
        heading="Update user"
        links={[
          { name: "Dashboard", href: paths.dashboard.root },
          { name: "Users", href: paths.dashboard.user.root },
          { name: "Update user" },
        ]}
        sx={{ mb: { xs: 3, md: 5 } }}
      />

      <UserForm currentUser={data?.getUser} />
    </DashboardContent>
  );
}
