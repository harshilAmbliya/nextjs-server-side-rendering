import AddUsersButton from "@/components/AddUsersButton";
import EditButton from "@/components/EditButton";
import TrashButton from "@/components/TrashButton";

export default async function Home() {
  const response = await fetch("http://192.168.29.231:8010/api/users", {
    next: { tags: ["user"], revalidate: 60 },
  });

  const users = await response.json();
  return (
    <>
      <div className="bg-gray-200 ">
        <div className="flex justify-between sticky top-0 items-center px-3 !bg-white py-3 border-b shadow-sm  ">
          <p>Server</p>
          <AddUsersButton />
        </div>
        <div className="py-4">
          <p className="text-center text-xl pb-3">Users </p>
          <div className="container mx-auto  grid grid-cols-3 gap-2 min-h-screen">
            {users?.data?.reverse().map((user: any) => {
              return (
                <div
                  className=" rounded-lg shadow-md w-full overflow-hidden bg-white"
                  key={user?._id}
                >
                  <div className="p-4">
                    <div className="flex justify-between items-center gap-1">
                      <h2 className="text-[15px] font-medium text-gray-900 ">
                        {user.name}
                      </h2>
                      <div className="flex justify-center items-center space-x-2">
                        <EditButton user={user} />
                        <TrashButton user={user} />
                      </div>
                    </div>
                    <p className="text-gray-700 mb-3 text-[13px]">
                      {user.email}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
