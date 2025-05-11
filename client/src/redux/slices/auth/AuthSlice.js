import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import customFetch from "../../../utils/axios";
import {
  addUserToLocalStorage,
  getUserFromLocalStorage,
  removeUserFromLocalStorage,
} from "../../../utils/localStorage";
import { toast } from "react-toastify";

//  Register user
export const register = createAsyncThunk("register", async (data, thunkAPI) => {
  try {
    const response = await customFetch.post("/user/register", data);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(
      error.response?.data?.message || "Registration failed!"
    );
  }
});

//  Login user
export const login = createAsyncThunk("login", async (data, thunkAPI) => {
  try {
    const response = await customFetch.post("/user/login", data);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(
      error.response?.data?.message || "Login failed!"
    );
  }
});

//  Logout user
export const logout = createAsyncThunk("logout", async (_, thunkAPI) => {
  try {
    await customFetch.get("/user/logout");
    return null;
  } catch (error) {
    return thunkAPI.rejectWithValue(
      error.response?.data?.message || "Logout failed!"
    );
  }
});
//  Get user details

//  Update profile
export const updateProfile = createAsyncThunk(
  "user/updateProfile",
  async (data, thunkAPI) => {
    try {
      const response = await customFetch.put("/user/me/update", data);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Profile update failed!"
      );
    }
  }
);

//  Update password
export const updatePassword = createAsyncThunk(
  "user/updatePassword",
  async (data, thunkAPI) => {
    try {
      const response = await customFetch.put("/user/password/update", data);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Password update failed!"
      );
    }
  }
);

//  Fetch all users (Admin)
export const fetchAllUsers = createAsyncThunk(
  "auth/fetchAllUsers",
  async (_, thunkAPI) => {
    try {
      const response = await customFetch.get("/user/admin/users");
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || "Failed to fetch users!"
      );
    }
  }
);

//  Update user role (Admin)
export const updateUserRole = createAsyncThunk(
  "auth/updateUserRole",
  async ({ userId, updatedData }, thunkAPI) => {
    try {
      const response = await customFetch.put(
        `/user/admin/user/${userId}`,
        updatedData
      );
      localStorage.removeItem("user");

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || "Role update failed!"
      );
    }
  }
);

export const AuthSlice = createSlice({
  name: "auth",
  initialState: {
    user: getUserFromLocalStorage(),
    isLoading: false,
    error: null,
    allUsers: [],
  },
  reducers: {
    updateRoleInState: (state, action) => {
      const { userId, updatedData } = action.payload;
      const user = state.allUsers.find((u) => u._id === userId);
      if (user) {
        user.role = updatedData.role;
      }
    },
    logoutUser: (state) => {
      state.user = null;
      state.isLoading = false;
      state.error = null;
      state.allUsers = [];
      removeUserFromLocalStorage();
    },
  },
  extraReducers: (builder) => {
    // Register
    builder.addCase(register.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(register.fulfilled, (state, action) => {
      state.isLoading = false;
      toast.success("Registration successful!");
    });
    builder.addCase(register.rejected, (state, action) => {
      state.isLoading = false;
      toast.error(action.payload);
    });

    // Login
    builder.addCase(login.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.isLoading = false;
      if (action.payload) {
        state.user = action.payload;
        addUserToLocalStorage(state.user);
        toast.success("Login successful!");
      } else {
        toast.error("Invalid credentials!");
      }
    });
    builder.addCase(login.rejected, (state, action) => {
      state.isLoading = false;
      toast.error(action.payload);
    });

    // Update Profile
    builder.addCase(updateProfile.pending, (state, action) => {
      state.isLoading = true;
      // state.error = null;
    });
    builder.addCase(updateProfile.fulfilled, (state, action) => {
      state.isLoading = false;
      state.user = action.payload || null;
      addUserToLocalStorage(state.user);
      toast.success("Profile updated successfully!");
    });
    builder.addCase(updateProfile.rejected, (state, action) => {
      state.isLoading = false;
      toast.error(action.payload);
    });

    // Update Password
    builder.addCase(updatePassword.pending, (state, action) => {
      state.isLoading = true;
      // state.error = null;
    });
    builder.addCase(updatePassword.fulfilled, (state, action) => {
      state.isLoading = false;
      toast.success("Password updated successfully!");
    });
    builder.addCase(updatePassword.rejected, (state, action) => {
      state.isLoading = false;
      toast.error(action.payload);
    });

    // Fetch All Users
    builder.addCase(fetchAllUsers.pending, (state, action) => {
      state.isLoading = true;
      toast.error(action.payload);
    });
    builder.addCase(fetchAllUsers.fulfilled, (state, action) => {
      state.isLoading = false;
      state.allUsers = action.payload;
    });
    builder.addCase(fetchAllUsers.rejected, (state, action) => {
      state.isLoading = false;
      toast.error(action.payload);
    });

    // Update User Role
    builder.addCase(updateUserRole.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(updateUserRole.fulfilled, (state, action) => {
      state.isLoading = false;
      state.user = action.payload || null;
      if (state.user) {
        addUserToLocalStorage(state.user);
      }
      toast.success("User role updated!");
    });
    builder.addCase(updateUserRole.rejected, (state, action) => {
      state.isLoading = false;
      toast.error(action.payload);
    });
    // Logout
    builder.addCase(logout.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(logout.fulfilled, (state) => {
      state.isLoading = false;
      toast.success("Logout successful!");
    });
    builder.addCase(logout.rejected, (state, action) => {
      state.isLoading = false;
      toast.error(action.payload);
    });
  },
});

export const { updateRoleInState, logoutUser } = AuthSlice.actions;
export default AuthSlice.reducer;
