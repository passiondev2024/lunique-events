import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const users = [
  { name: "Nikola Mladenovic", email: "nikola@lunique.tech", src: "/" },
  { name: "Luka Stojadinovic", email: "luka@lunique.tech", src: "/" },
];

export const GuestList = () => {
  return (
    <div className="h-full min-h-[200px] rounded-md bg-muted">
      <div className="border-b border-primary-foreground px-3 py-2">
        <h3 className="text-sm font-semibold uppercase text-muted-foreground">
          Recently accepted
        </h3>
      </div>
      <div className="space-y-1 py-1.5">
        {users.map((user, idx) => (
          <UserItem key={idx} {...user} />
        ))}
      </div>
    </div>
  );
};

const UserItem = (props: { src?: string; name: string; email: string }) => {
  const { name, email } = props;
  return (
    <div className="flex items-center gap-1.5 px-3 py-1.5">
      <Avatar className="size-7">
        <AvatarImage />
        <AvatarFallback className="bg-muted-foreground/20">N</AvatarFallback>
      </Avatar>
      <p className="font-medium">{name}</p>
      <p className="text-sm text-muted-foreground">{email}</p>
    </div>
  );
};
