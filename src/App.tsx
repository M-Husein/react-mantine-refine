import { Authenticated, ErrorComponent, Refine } from "@refinedev/core";
import { DevtoolsPanel, DevtoolsProvider } from "@refinedev/devtools";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";

import routerBindings, {
  CatchAllNavigate,
  DocumentTitleHandler,
  NavigateToResource,
  UnsavedChangesNotifier,
} from "@refinedev/react-router-v6";
import dataProvider from "@refinedev/simple-rest";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import { authProvider } from "./authProvider";
import { Layout } from "./components/layout";
// import { BlogPostCreate, BlogPostEdit, BlogPostList, BlogPostShow } from "./pages/blog-posts";
import { CategoryCreate, CategoryEdit, CategoryList, CategoryShow } from "./pages/categories";
import { ForgotPassword } from "./pages/forgotPassword";
import { Login } from "./pages/login";
import { Register } from "./pages/register";

export default function App(){
  return (
    <BrowserRouter>
      <RefineKbarProvider>
        <DevtoolsProvider>
          <Refine
            dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
            routerProvider={routerBindings}
            authProvider={authProvider}
            resources={[
              // {
              //   name: "blog_posts",
              //   list: "/blog-posts",
              //   create: "/blog-posts/create",
              //   edit: "/blog-posts/edit/:id",
              //   show: "/blog-posts/show/:id",
              //   meta: {
              //     canDelete: true,
              //   },
              // },
              {
                name: "categories",
                list: "/categories",
                create: "/categories/create",
                edit: "/categories/edit/:id",
                show: "/categories/show/:id",
                meta: {
                  canDelete: true,
                },
              },
            ]}
            options={{
              /** @DOCS : https://refine.dev/docs/core/refine-component/#disabletelemetry */
              disableTelemetry: true,

              /** @DOCS : https://refine.dev/docs/core/refine-component/#syncwithlocation */
              syncWithLocation: false,

              /** @DOCS : https://refine.dev/docs/core/refine-component/#warnwhenunsavedchanges */
              // warnWhenUnsavedChanges: true,
              
              /** @DOCS : https://refine.dev/docs/core/refine-component/#usenewquerykeys */
              useNewQueryKeys: true,
              
              /** @DOCS : https://refine.dev/docs/core/refine-component/#disableserversidevalidation */
              // disableServerSideValidation: true,

              /** @DOCS : https://refine.dev/docs/core/refine-component/#redirect */
              redirect: {
                // If the resource doesn't have a show page defined, the user will be redirected to the list page.
                // afterCreate: false, // "show"
                // If the mutation mode is `undoable` or `optimistic`, the redirect happens before the mutation succeeds. Therefore, if there is no known `id` value, the user will be redirected to the list page.
                // afterClone: "edit",
                // If set to `false`, no redirect is performed after a successful form mutation.
                afterEdit: false,
              },

              /** @DOCS : https://refine.dev/docs/core/refine-component/#reactquery */
              reactQuery: {
                clientConfig: {
                  defaultOptions: {
                    queries: {
                      // staleTime: Infinity,
                      retry: false,
                    },
                  },
                },
              },

              // projectId: "QLbvtU-RQeVmE-T9Vad1",
            }}
          >
            <Routes>
              <Route
                element={
                  <Authenticated
                    key="authenticated-inner"
                    fallback={<CatchAllNavigate to="/login" />}
                  >
                    <Layout>
                      <Outlet />
                    </Layout>
                  </Authenticated>
                }
              >
                <Route
                  index
                  element={<NavigateToResource resource="blog_posts" />}
                />

                {/* <Route path="/blog-posts">
                  <Route index element={<BlogPostList />} />
                  <Route path="create" element={<BlogPostCreate />} />
                  <Route path="edit/:id" element={<BlogPostEdit />} />
                  <Route path="show/:id" element={<BlogPostShow />} />
                </Route> */}

                <Route path="/categories">
                  <Route index element={<CategoryList />} />
                  <Route path="create" element={<CategoryCreate />} />
                  <Route path="edit/:id" element={<CategoryEdit />} />
                  <Route path="show/:id" element={<CategoryShow />} />
                </Route>

                <Route path="*" element={<ErrorComponent />} />
              </Route>

              <Route
                element={
                  <Authenticated
                    key="authenticated-outer"
                    fallback={<Outlet />}
                  >
                    <NavigateToResource />
                  </Authenticated>
                }
              >
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
              </Route>
            </Routes>

            <RefineKbar />
            <UnsavedChangesNotifier />
            <DocumentTitleHandler />
          </Refine>
          
          <DevtoolsPanel />
        </DevtoolsProvider>
      </RefineKbarProvider>
    </BrowserRouter>
  );
}
