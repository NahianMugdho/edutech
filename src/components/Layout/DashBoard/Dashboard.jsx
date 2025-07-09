// import React from 'react';
// import Sidebar from './Sidebar';
// import TopBar from './Topbar';

// const Dashboard = () => {
//     return (
//         <div>
//             <TopBar></TopBar>
//             <Sidebar></Sidebar>
            
//         </div>
//     );
// };

// export default Dashboard;
import React, { useState } from 'react';
import useAdmin from '../../RoleHooks/useAdmin';
import TopBar from './Topbar';
import Sidebar from './Sidebar';
// import useTeacher from '../../RoleHooks/useTeacher'; // Future use

// Component Imports (Replace with actual components)


const Dashboard = () => {
  const [isAdmin] = useAdmin();
  // const [isTeacher] = useTeacher(); // Future use
//   const [activeComponent, setActiveComponent] = useState('dashboard');

  // Component render function
//   const renderComponent = () => {
//     switch (activeComponent) {
//       case 'hotQueries':
//         return <HotQueries />;
//       case 'userList':
//         return <UserList />;
//       case 'adminParcels':
//         return <AdminParcels />;
//       case 'deliveryManDashboard':
//         return <DeliveryManDashboard />;
//       case 'bookParcel':
//         return <BookParcel />;
//       case 'userParcels':
//         return <UserParcels />;
//       case 'myProfile':
//         return <MyProfile onUpdateComplete={() => window.location.reload()} />;
//       case 'addDeliveryMen':
//         return <AddQueries />;
//       case 'reviewList':
//         return <ReviewList />;
//       default:
//         return <div>Welcome to the Dashboard!</div>;
//     }
//   };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 text-white p-4">
        <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
        <ul className="space-y-2">

          {/* Admin Sidebar */}
          {isAdmin && (
            <>
            admin sidebar
             <TopBar></TopBar>
             <Sidebar></Sidebar>
            </>
          )}

          {/* Teacher Sidebar (for future use) */}
          {/* {isTeacher && (
            <>
              <li>
                <button
                  onClick={() => setActiveComponent('uploadAssignment')}
                  className="w-full text-left hover:bg-gray-700 p-2 rounded"
                >
                  Upload Assignment
                </button>
              </li>
            </>
          )} */}

          {/* Regular User Sidebar */}
          {!isAdmin && (
            <>
            user sidebar
              <TopBar></TopBar>
             <Sidebar></Sidebar>
            </>
          )}
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8 bg-gray-100">
        <div
          className="hero min-h-[300px] mb-8"
        //   style={{
        //     backgroundImage: "url(https://i.ibb.co.com/JskSgXW/freepik-upload-43996.png)",
        //   }}
        >
          <div className="hero-overlay bg-opacity-30"></div>
          <div className="hero-content text-center text-neutral-content">
            <h1 className="text-5xl font-bold text-red-500 anton-regular">
              {
                isAdmin
                  ? 'Admin Dashboard'
                  // : isTeacher ? 'Teacher Dashboard' // Future condition
                  : 'User Dashboard'
              }
            </h1>
          </div>
        </div>

        {/* Dynamic Component Render */}
        {/* {renderComponent()} */}
      </div>
    </div>
  );
};

export default Dashboard;
