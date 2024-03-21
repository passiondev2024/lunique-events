import { type SVGProps } from "react";
import { type Event, type User } from "@prisma/client";

type Icon = SVGProps<SVGSVGElement>;

type ImageProps = {
  id: number;
  src: string;
};

type ImageAttributes = {
  id: number;
  src: string;
};

type EventWithOwnerAndImages = Event & {
  owner: User;
};

type EventWithOwner = Event & {
  owner: User;
};

type Place = {
  placeId: string;
  descripton: string;
  mainText: string;
  secondaryText: string;
  position: {
    lat: number;
    lng: number;
  };
};
