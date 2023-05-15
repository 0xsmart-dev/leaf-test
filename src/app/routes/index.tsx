import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import userRoutes from "./routes";
import Error404 from "app/pages/404";
import Layout from "app/layouts";

const RouteComponent = () => {
  return (
    <BrowserRouter>
      <Routes>
        {userRoutes.map((item) => {
          return (
            <Route
              key={`router-${item.url}`}
              path={item.url}
              element={
                <Layout>
                  <item.component />
                </Layout>
              }
            ></Route>
          );
        })}
        <Route key={"router-404"} path="/404" element={<Error404 />} />
        <Route path="*" element={<Navigate to="/404" />} />
        <Route path="/" element={<Navigate to="/dashboard" />} />
      </Routes>
    </BrowserRouter>
  );
};
export default RouteComponent;
