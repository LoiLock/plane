import React from "react";

import { useRouter } from "next/router";

import useSWR from "swr";

// services
import workspaceService from "services/workspace.service";
// layouts
import { WorkspaceAuthorizationLayout } from "layouts/auth-layout";
// ui
import { SecondaryButton } from "components/ui";
import { BreadcrumbItem, Breadcrumbs } from "components/breadcrumbs";
// types
import type { NextPage } from "next";
// fetch-keys
import { WORKSPACE_DETAILS } from "constants/fetch-keys";

const BillingSettings: NextPage = () => {
  const {
    query: { workspaceSlug },
  } = useRouter();

  const { data: activeWorkspace } = useSWR(
    workspaceSlug ? WORKSPACE_DETAILS(workspaceSlug as string) : null,
    () => (workspaceSlug ? workspaceService.getWorkspace(workspaceSlug as string) : null)
  );

  return (
    <WorkspaceAuthorizationLayout
      breadcrumbs={
        <Breadcrumbs>
          <BreadcrumbItem
            title={`${activeWorkspace?.name ?? "Workspace"}`}
            link={`/${workspaceSlug}`}
          />
          <BreadcrumbItem title="Members Settings" />
        </Breadcrumbs>
      }
    >
      <section className="space-y-8">
        <div>
          <h3 className="text-3xl font-bold leading-6 text-gray-900">Billing & Plans</h3>
          <p className="mt-4 text-sm text-gray-500">[Free launch preview] plan Pro</p>
        </div>
        <div className="space-y-8 md:w-2/3">
          <div>
            <div className="w-80 rounded-md border bg-white p-4 text-center">
              <h4 className="text-md mb-1 leading-6 text-gray-900">Payment due</h4>
              <h2 className="text-3xl font-extrabold">--</h2>
            </div>
          </div>
          <div>
            <h4 className="text-md mb-1 leading-6 text-gray-900">Current plan</h4>
            <p className="mb-3 text-sm text-gray-500">You are currently using the free plan</p>
            <a href="https://plane.so/pricing" target="_blank" rel="noreferrer">
              <SecondaryButton outline>View Plans and Upgrade</SecondaryButton>
            </a>
          </div>
          <div>
            <h4 className="text-md mb-1 leading-6 text-gray-900">Billing history</h4>
            <p className="mb-3 text-sm text-gray-500">There are no invoices to display</p>
          </div>
        </div>
      </section>
    </WorkspaceAuthorizationLayout>
  );
};

export default BillingSettings;
