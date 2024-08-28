import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userActive: {},
  userAppointments: [],
};

export const userSlice = createSlice({
  name: "userData",
  initialState: initialState,
  reducers: {
    addUser: (state, action) => {
      state.userActive = action.payload;
    },
    addAppointments: (state, action) => {
      state.userAppointments = action.payload;
    },
    cancelAppointmentAction: (state, action) => {
      state.userAppointments = state.userAppointments.map((appointment) => {
        if (appointment.id === action.payload) {
          return { ...appointment, status: "cancelled" };
        }
        return appointment;
      });
    },

    addAppointment(state, action) {
      state.userAppointments.push(action.payload);
    },

    removeUser: (state, action) => {
      state.userActive = {};
    },
  },
});

export const { addUser, addAppointments, cancelAppointmentAction, removeUser, addAppointment } =
  userSlice.actions;
