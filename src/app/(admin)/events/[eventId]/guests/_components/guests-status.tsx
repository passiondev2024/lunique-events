"use client";

import { CircleIcon } from "lucide-react";

import { type GuestStatus } from "../page";

import StatusProgressBar from "./guests-progress-bar";

export interface GuestsProgressBarProps {
  guestStatuses: GuestStatus[];
}

export const GuestsStatus = ({ guestStatuses }: GuestsProgressBarProps) => {
  const goingGuests = guestStatuses.filter((g) => g === "going").length;
  const notGoingGuests = guestStatuses.filter((g) => g === "not going").length;
  const invitedGuests = guestStatuses.filter((g) => g === "invited").length;

  const status_array = [
    { status: "going", counts: goingGuests, color: "#3DC45D" },
    { status: "not going", counts: notGoingGuests, color: "#64758A" },
    { status: "invited", counts: invitedGuests, color: "#2963EA" },
  ];

  return (
    <div className="flex flex-col space-y-2">
      <div
        className="flex  justify-start space-x-1"
        style={{
          fontSize: 24,
          color: goingGuests > 0 ? "#3DC45D" : "#424E61",
        }}
      >
        <div>
          <p>{status_array.find((el) => el.status === "going")?.counts}</p>
        </div>
        <div className="flex flex-col-reverse">
          <p
            className="pb-0.5"
            style={{
              fontSize: 16,
            }}
          >
            {goingGuests === 1 ? "guest" : "guests"}
          </p>
        </div>
      </div>

      <StatusProgressBar guestStatuses={guestStatuses} />

      <div className="flex space-x-3">
        {status_array
          .filter((element) => element.counts > 0)
          .map((_status, idx) => (
            <div
              key={idx}
              className="flex items-center space-x-2 hover:cursor-pointer"
              style={{
                color: _status.color,
                fontSize: 14,
              }}
            >
              <CircleIcon
                className="size-1.5 rounded-full"
                style={{
                  backgroundColor: _status.color,
                }}
              />
              <div className="flex space-x-1.5">
                <p>{_status.counts}</p>
                <p className="capitalize">{_status.status}</p>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};
