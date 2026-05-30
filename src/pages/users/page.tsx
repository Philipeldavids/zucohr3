import { useEffect, useState } from "react";
import {userService, roleService, type User, type Role}from "../../lib/api";
import AssignRoleModal from "../roles/AssignRoleModal";
import { toast } from 'sonner';
import {
  Dialog,
  DialogContent,
} from "../../components/ui/dialog";

function ResetPasswordModal({
  user,
  onClose,
}: any) {
  const [password, setPassword] =
    useState("");

  const handleSubmit = async () => {
    try {
      await userService.resetPassword(
        user.id,
        password
      );

      toast.success(
        "Password reset successfully"
      );

      onClose();
    } catch {
      toast.error(
        "Failed to reset password"
      );
    }
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
  <DialogContent>
    <div className="p-6">
      <h2 className="font-semibold mb-4">
        Reset Password
      </h2>

      <input
        type="password"
        value={password}
        onChange={(e) =>
          setPassword(e.target.value)
        }
        placeholder="New Password"
        className="border rounded p-2 w-full"
      />

      <button
        onClick={handleSubmit}
        className="mt-4 bg-purple-600 text-white px-4 py-2 rounded"
      >
        Reset Password
      </button>
    </div>
     </DialogContent>
</Dialog>
  );
}
export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [roles, setRoles] = useState<Role[]>([]);
  const [selectedUser, setSelectedUser] = useState<User>();
  const [open, setOpen] = useState(false);
  const [resetOpen, setResetOpen] = useState(false);

  useEffect(() => {
    fetchUsers();
    fetchRoles();
  }, []);


  const fetchUsers = async () => {
    const res = await userService.list();
    setUsers(res.data);
  };

  const fetchRoles = async () => {
    const res = await roleService.list();
    console.log(res.data);
    setRoles(res.data);
  };
  
const handleRemoveRole = async (userId: string, roleId: string) => {
  try {
    await roleService.removeRole(userId, roleId);
    toast.success("Role removed");

    await fetchUsers();
  } catch (err: any) {
    console.error(err);
    toast.error(err?.response?.data?.message || "Failed to remove role");
  }
};

const handleToggleStatus = async (userId: string, isActive: boolean) => {
  try {
    await roleService.toggleStatus(userId, isActive);
    toast.success("User status updated");

    await fetchUsers();
  } catch (err: any) {
    console.error(err);
    toast.error(err?.response?.data?.message || "Failed to update status");
  }
};
  const handleAssignRole = async (userId: string, roleId: string) => {
    await roleService.assign(userId, roleId);
    await fetchUsers(); // refresh UI
  };

  return (
    <div className="space-y-5">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">
        Users
      </h1>

      <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
        <table className="w-full">
          <thead className="bg-purple-50 text-gray-600 text-sm">
            <tr>
              <th className="p-3 text-left">Email</th>
              <th>Roles</th>
              <th>Status</th>              
              <th></th>
            </tr>
          </thead>

          <tbody>
            {users.map(u => (
              <tr key={u.id} className="border-t hover:bg-gray-50">
                <td className="p-3">{u.email}</td>
                <td className="p-3">
  {u.role ? (
    
      <span
        key={u.role}
        className="inline-flex items-center gap-1 bg-purple-100 text-purple-700 px-2 py-1 rounded text-xs mr-1"
      >
        {u.role}
        <button
          onClick={() => handleRemoveRole(u.id, u.role)}
          className="ml-1 text-red-500 hover:text-red-700"
        >
          ✕
        </button>
      </span>
    )
  : (
    <span className="text-gray-400 text-sm">No role</span>
  )}
</td>
<td className="p-3">
  <button
    onClick={() => handleToggleStatus(u.id, !u.isActive)}
    className={`px-3 py-1 rounded text-xs ${
      u.isActive
        ? "bg-green-100 text-green-700"
        : "bg-gray-200 text-gray-600"
    }`}
  >
    {u.isActive ? "Active" : "Inactive"}
  </button>
</td>
                
            

                <td>
                  <div className="flex gap-3">
                  <button 
                   onClick={() => {
                    setSelectedUser(u);
                    setOpen(true);
                  }}
                  className="text-purple-600 hover:underline text-sm">
                    Manage
                  </button>
                  <button
  onClick={() => {
    setSelectedUser(u);
    setResetOpen(true);
  }}
  className="text-blue-600 hover:underline text-sm"
>
  Reset Password
</button>
</div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {open && selectedUser && (
        <AssignRoleModal
          user={selectedUser}
          roles={roles}
          onAssign={handleAssignRole}
          onClose={() => setOpen(false)}
        />
      )}
 {resetOpen && selectedUser && (
  <ResetPasswordModal
    user={selectedUser}
    onClose={() => {
      setResetOpen(false);
      setSelectedUser(undefined);
    }}
  />
)}
      </div>
     
    </div>
  );
}