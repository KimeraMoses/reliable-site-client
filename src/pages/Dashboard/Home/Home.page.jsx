import { DashboardLayout } from 'layout';
import React from 'react';

function Home() {
  return (
    <DashboardLayout>
      <div className="bg-black/[.2] p-4 md:px-6">
        <h2 className="text-xl font-normal text-white">Dashboard Page</h2>
      </div>
    </DashboardLayout>
  );
}
export default Home;
