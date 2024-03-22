import { type GuestsProgressBarProps } from "./guests-status";

const StatusProgressBar = ({ guestStatuses }: GuestsProgressBarProps) => {
  const data = [
    {
      name: "Going",
      counts: guestStatuses.filter((s) => s === "going").length,
      color: "#3DC45D",
    },
    {
      name: "Invited",
      counts: guestStatuses.filter((s) => s === "invited").length,
      color: "#2963EA",
    },
    {
      name: "Not going",
      counts: guestStatuses.filter((s) => s === "not going").length,
      color: "#64758A",
    },
  ];

  return (
    <div className="flex space-x-0.5">
      {guestStatuses.length > 0 &&
        data
          .filter((status) => status.counts > 0)
          .map((status, idx) => {
            const percentage = (
              (status.counts /
                data.reduce(
                  (acc, currentValue) => acc + currentValue.counts,
                  0,
                )) *
              100
            ).toFixed(0);

            const borderRadiusLeft = idx === 0 ? "4px" : "0px";
            const borderRadiusRight =
              idx === data.filter((x) => x.counts > 0).length - 1
                ? "4px"
                : "0px";

            return (
              <div
                key={idx}
                style={{
                  width: `${percentage}%`,
                  height: 8,
                  backgroundColor: `${status.color}`,
                  borderTopLeftRadius: `${borderRadiusLeft}`,
                  borderBottomLeftRadius: `${borderRadiusLeft}`,
                  borderTopRightRadius: `${borderRadiusRight}`,
                  borderBottomRightRadius: `${borderRadiusRight}`,
                }}
              ></div>
            );
          })}
      {guestStatuses.length === 0 && (
        <div className="h-2 w-full rounded bg-foreground/50"></div>
      )}
    </div>
  );
};

export default StatusProgressBar;
